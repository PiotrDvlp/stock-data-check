<template>
    <b-col>
        <data-model>
            <template v-slot="{ chosenCompanies }">
                <ul>
                    <company-list-item
                        v-for="company in chosenCompanies"
                        :company="company"
                        :key="company.uuid"
                    ></company-list-item>
                </ul>
            </template>
        </data-model>
    </b-col>
</template>

<script>
import DataModel from "./data-model";
import CompanyListItem from "../components/CompanyListItem.vue";
export default {
    name: "CompanyList",
    components: {
        CompanyListItem,
        DataModel,
    },
};
</script>
