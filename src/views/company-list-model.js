import ApiService from "../services/api-service";
import { camelCase } from "lodash";

const formatKey = (str) => camelCase(str.substring(str.indexOf(" ") + 1));
const renameKeys = (obj) =>
    Object.keys(obj).reduce(
        (acc, key) => ({
            ...acc,
            ...{ [formatKey(key)]: obj[key] },
        }),
        {}
    );
const getDataFromStorage = (storageKey) =>
    JSON.parse(localStorage.getItem(storageKey));

const addDataToStorage = (storageKey, data) =>
    localStorage.setItem(storageKey, JSON.stringify(data));

export default {
    data() {
        return {
            chosenCompanies: null,
            error: null,
        };
    },
    created() {
        const savedCompanies = getDataFromStorage("chosenCompanies");

        if (savedCompanies.length) {
            this.chosenCompanies = savedCompanies;

            this.getLatestData();
        }
    },
    methods: {
        async getLatestData() {
            const preparedApiCalls = this.chosenCompanies.map(({ symbol }) =>
                ApiService.getAlphavInterday(symbol)
            );

            try {
                const response = await Promise.all(preparedApiCalls);

                this.formatLatestData(response);
            } catch (error) {
                console.error(error);
            }
        },
        formatLatestData(response) {
            const formatedData = response
                .filter(({ data }) => data["Meta Data"])
                .reduce((acc, curr) => {
                    const { symbol, lastRefreshed } = renameKeys(
                        curr.data["Meta Data"]
                    );
                    const { close } = renameKeys(
                        curr.data["Time Series (5min)"][lastRefreshed]
                    );
                    const preparedData = {
                        close,
                        lastRefreshed,
                        symbol,
                    };

                    acc.push(preparedData);

                    return acc;
                }, []);

            this.setLatestData(formatedData);
        },
        setLatestData(formatedData) {
            this.chosenCompanies = this.chosenCompanies.map((company) => {
                const updated = formatedData.find(
                    (updatedData) => updatedData.symbol === company.symbol
                );

                return updated ? Object.assign(company, updated) : company;
            });

            addDataToStorage("chosenCompanies", this.chosenCompanies);
        },
        removeCompany(id) {
            this.chosenCompanies = this.chosenCompanies.filter(
                ({ uuid }) => uuid !== id
            );

            addDataToStorage("chosenCompanies", this.chosenCompanies);
        },
    },
    render() {
        return this.$scopedSlots.default({
            chosenCompanies: this.chosenCompanies,
            removeFromList: this.removeCompany,
        });
    },
};
