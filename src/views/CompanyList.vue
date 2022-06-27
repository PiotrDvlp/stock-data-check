<template>
    <b-col cols="4">
        <company-list-model>
            <template v-slot="{ chosenCompanies, removeFromList }">
                <ul class="company__list">
                    <company-list-item
                        v-for="company in chosenCompanies"
                        :company="company"
                        :key="company.uuid"
                        @remove-company="removeFromList"
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
<style lang="scss" scoped>
.company {
    &__list {
        padding: 0;
    }
}
</style>
