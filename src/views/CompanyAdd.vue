<template>
    <b-form @submit.prevent="addCompany">
        <b-form-group
            id="input-group-1"
            label="Company symbol:"
            label-for="company-symbol"
            description="Provide the stock exchange symbol of a company you want to track."
        >
            <vue-bootstrap-typeahead
                v-model="companySymbol"
                placeholder="Enter company symbol"
                @hit="selectCompany($event)"
            >
                <template v-slot:suggestion="{ data, htmlText }">
                    <span class="d-flex justify-content-between align-center">
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

<script>
export default {
    name: "CompanyAdd",
    data() {
        return {
            companySymbol: "",
        };
    },
};
</script>

<style></style>
