import axios from "axios";
const apiKey = process.env.VUE_APP_ALPHA_VANTAGE_KEY;

class ApiService {
    constructor() {
        const service = axios.create();

        this.service = service;
    }

    getCompanyBySymbol(symbol) {
        return this.service.get(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`
        );
    }

    getClearbitData(companyName) {
        return this.service.get(
            `https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`
        );
    }

    getAlphavData(symbol) {
        return this.service.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );
    }
}

export default new ApiService();
