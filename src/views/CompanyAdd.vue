<template>
    <b-col cols="3" class="d-flex justify-content-center align-center">
        <form-data-model :filter="companySymbol">
            <template
                v-slot="{ addCompany, companies, loading, selectCompany }"
            >
                <b-spinner v-if="loading" class="m-5"></b-spinner>
                <b-form v-else @submit.prevent="addCompany">
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
        </form-data-model>
    </b-col>
</template>

<script>
import FormDataModel from "./form-data-model";

export default {
    name: "CompanyAdd",
    components: {
        FormDataModel,
    },
    data() {
        return {
            companySymbol: "",
        };
    },
};
</script>

<style></style>
