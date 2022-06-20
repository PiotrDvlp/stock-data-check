<template>
    <b-col cols="3">
        <data-model :filter="companySymbol">
            <template v-slot="{ addCompany, companies, selectCompany }">
                <b-form @submit.prevent="addCompany">
                    <b-form-group
                        id="input-group-1"
                        label="Company symbol:"
                        label-for="company-symbol"
                        description="Provide the stock exchange symbol of a company you want to track."
                    >
                        <vue-bootstrap-typeahead
                            v-model="companySymbol"
                            :data="companies"
                            :serializer="(company) => company.symbol"
                            placeholder="Enter company symbol"
                            @hit="selectCompany($event)"
                        >
                            <template v-slot:suggestion="{ data, htmlText }">
                                <span
                                    class="d-flex justify-content-between align-center"
                                >
                                    <span v-html="htmlText"></span
                                    ><small>{{ data.name }}</small>
                                </span>
                            </template>
                        </vue-bootstrap-typeahead>
                    </b-form-group>
                    <b-button
                        :disabled="!companySymbol.length"
                        class="mt-4"
                        type="submit"
                        variant="primary"
                        >Track</b-button
                    >
                </b-form>
            </template>
        </data-model>
    </b-col>
</template>

<script>
import DataModel from "./data-model";

export default {
    name: "CompanyAdd",
    components: {
        DataModel,
    },
    data() {
        return {
            companySymbol: "",
        };
    },
};
</script>

<style></style>
