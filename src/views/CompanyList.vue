<template>
    <b-col>
        <company-list-model>
            <template v-slot="{ chosenCompanies }">
                <ul>
                    <company-list-item
                        v-for="company in chosenCompanies"
                        :company="company"
                        :key="company.uuid"
                    ></company-list-item>
                </ul>
            </template>
        </company-list-model>
    </b-col>
</template>

<script>
import CompanyListModel from "./company-list-model";
import CompanyListItem from "../components/CompanyListItem.vue";
export default {
    name: "CompanyList",
    components: {
        CompanyListItem,
        CompanyListModel,
    },
};
</script>
