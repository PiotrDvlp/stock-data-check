<template>
    <b-col>
        <data-model>
            <template v-slot="{ chosenCompanies }">
                <ul>
                    <company-list-item
                        v-for="company in chosenCompanies"
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
<style lang="scss" scoped>
.company-data {
    &__logo {
        margin-right: 10px;
    }

    &__info {
        padding: 0 4px;
        font-size: 14px;

        &--big {
            font-size: 18px;
        }

        &--bold {
            font-weight: bold;
        }
    }
}
</style>
