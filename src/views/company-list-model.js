import ApiService from "../services/api-service";

const getDataFromStorage = (storageKey) =>
    JSON.parse(localStorage.getItem(storageKey));

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
                this.setLatestData(response);
            } catch (error) {
                console.error(error.response);
            }
        },
        setLatestData(response) {
            const data = response.map(({ data }) => data);
            console.log("data set", data);
        },
    },
    render() {
        return this.$scopedSlots.default({
            chosenCompanies: this.chosenCompanies,
        });
    },
};
