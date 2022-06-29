import ApiService from "../services/api-service";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
    addDataToStorage,
    getDataFromStorage,
} from "../helpers/storage-helpers";
import { renameKeys } from "../helpers/object-helpers";

export default {
    props: {
        filter: String,
    },
    data() {
        return {
            bestMatches: [],
            chosenCompanies: [],
            chosenCompany: null,
            error: null,
            loading: false,
        };
    },
    created() {
        const savedCompanies = getDataFromStorage("chosenCompanies") ?? [];

        if (savedCompanies.length) {
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
        selectCompany(selected) {
            this.chosenCompany = selected;
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
                console.error(error.response);
            }
        },
        addCompany() {
            const isCompanyAlreadyPresent = this.chosenCompanies.some(
                ({ symbol }) => this.chosenCompany.symbol === symbol
            );
            const companyName = this.chosenCompany.name.replace(
                /[^a-z0-9]+/gi,
                ""
            );

            if (isCompanyAlreadyPresent) {
                console.error("Company is already present");

                return;
            }

            this.getAdditionalCompanyData(companyName);
        },
        async getAdditionalCompanyData(companyName) {
            this.loading = true;

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
                this.error = error.response;
                console.error(this.response);
            } finally {
                this.loading = false;
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

            this.handleStorage();
        },
        handleStorage() {
            if (!this.chosenCompanies) {
                addDataToStorage("chosenCompanies", [this.chosenCompany]);
            } else {
                addDataToStorage("chosenCompanies", [
                    ...this.chosenCompanies,
                    this.chosenCompany,
                ]);

                this.$router.push("/company-list");
            }
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
            chosenCompanies: this.chosenCompanies,
            companies: this.companies,
            loading: this.loading,
            selectCompany: this.selectCompany,
        });
    },
};
