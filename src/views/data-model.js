import ApiService from "../services/api-service";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";

const formatKey = (str) => str.substring(str.indexOf(" ") + 1);
const renameKeys = (obj) =>
    Object.keys(obj).reduce(
        (acc, key) => ({
            ...acc,
            ...{ [formatKey(key)]: obj[key] },
        }),
        {}
    );
const addDataToStorage = (storageKey, data) =>
    localStorage.setItem(storageKey, JSON.stringify(data));
const getDataFromStorage = (storageKey) =>
    JSON.parse(localStorage.getItem(storageKey));

export default {
    props: {
        filter: String,
    },
    data() {
        return {
            additionalData: null,
            bestMatches: [],
            chosenCompanies: null,
            chosenCompany: null,
            error: null,
        };
    },
    created() {
        const savedCompanies = getDataFromStorage("chosenCompanies");

        if (savedCompanies) {
            this.chosenCompanies = savedCompanies;
        }
    },
    computed: {
        companies() {
            return this.bestMatches.length
                ? this.bestMatches.map((match) => renameKeys(match))
                : [];
        },
    },
    methods: {
        addCompany() {
            const companyName = this.chosenCompany.name.replace(
                /[^a-z0-9]+/gi,
                ""
            );

            this.findAdditionalData(companyName);
        },
        async findCompanyBySymbol(symbol) {
            try {
                const getCompanyData = await ApiService.getCompanyBySymbol(
                    symbol
                );

                this.bestMatches = getCompanyData.data.bestMatches;
                this.error = null;
            } catch (error) {
                this.bestMatches = [];
                this.error = error.response;
            }
        },
        async findAdditionalData(companyName) {
            try {
                const getClearbitData = ApiService.getClearbitData(companyName);
                const getAlphavData = ApiService.getAlphavData(
                    this.chosenCompany.symbol
                );

                const [clearbitResponse, alphaVResponse] = await Promise.all([
                    getClearbitData,
                    getAlphavData,
                ]);

                this.setAdditionalData(
                    clearbitResponse.data,
                    alphaVResponse.data
                );

                this.error = null;
            } catch (error) {
                this.additionalData = null;
                this.error = error.response;
            }
        },
        setAdditionalData(clearbitData, alphaVData) {
            const uuid = uuidv4();
            const additionalData = {
                ...(clearbitData[0] && {
                    ...clearbitData[0],
                }),
                ...(alphaVData["Global Quote"] && {
                    ...renameKeys(alphaVData["Global Quote"]),
                }),
                ...this.chosenCompany,
                uuid,
            };

            this.chosenCompany = additionalData;

            this.saveToStorage();
            this.$router.push("/company-list");
        },
        saveToStorage() {
            const observedCompanies = getDataFromStorage("chosenCompanies");

            if (!observedCompanies) {
                addDataToStorage("chosenCompanies", [this.chosenCompany]);
            } else {
                const isCompanyAlreadyPresent = observedCompanies.some(
                    ({ symbol }) => this.chosenCompany.symbol === symbol
                );

                if (isCompanyAlreadyPresent) return;

                addDataToStorage("chosenCompanies", [
                    ...observedCompanies,
                    this.chosenCompany,
                ]);
            }
        },
        selectCompany(selected) {
            this.chosenCompany = selected;
        },
    },
    watch: {
        filter: debounce(function (symbol) {
            if (symbol.length) this.findCompanyBySymbol(symbol);
        }, 500),
    },
    render() {
        return this.$scopedSlots.default({
            addCompany: this.addCompany,
            companies: this.companies,
            selectCompany: this.selectCompany,
            chosenCompanies: this.chosenCompanies,
        });
    },
};
