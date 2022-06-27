<template>
    <b-col cols="4">
        <company-list-model>
            <template v-slot="{ chosenCompanies, removeFromList }">
                <div>
                    <ul v-if="chosenCompanies.length" class="company__list">
                        <company-list-item
                            v-for="company in chosenCompanies"
                            :company="company"
                            :key="company.uuid"
                            @remove-company="removeFromList"
                        ></company-list-item>
                    </ul>
                    <div v-else>
                        <div>
                            <p>
                                There are no companies yet.
                                <router-link to="/">
                                    Track your first company.</router-link
                                >
                            </p>
                        </div>
                    </div>
                </div>
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
