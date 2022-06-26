<template>
    <li class="company-data d-flex flex-row">
        <div class="company-data__logo">
            <b-img :src="setImage" fluid />
        </div>
        <div class="company-data__details">
            <div class="company-data__name">
                <span
                    class="company-data__info company-data__info--bold company-data__info--big"
                    >{{ company.name }}</span
                >
                <span class="company-data__info">{{ company.symbol }}</span>
                <span class="company-data__info">{{ company.domain }}</span>
            </div>
            <div class="company-data__local">
                <span class="company-data__info">{{ company.region }}</span>
                <span class="company-data__info"
                    >{{ company.marketOpen }} - {{ company.marketClose }}</span
                >
                <span class="company-data__info">{{ company.timezone }}</span>
            </div>
            <div class="company-data__stock">
                <span class="company-data__info company-data__info--bold"
                    >{{ company.price }} {{ company.currency }}</span
                >
                <span class="company-data__info"
                    >{{ company.change }} ({{
                        company["change percent"]
                    }})</span
                >
                <span class="company-data__info"
                    >Closed: {{ company["latest trading day"] }}</span
                >
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: "CompanyListItem",
    props: {
        company: {
            type: Object,
        },
    },
    computed: {
        setImage() {
            return this.company.logo
                ? this.company.logo
                : "https://via.placeholder.com/64x64";
        },
    },
};
</script>

<style lang="scss" scoped>
.company-data {
    &__logo {
        margin-right: 10px;
        width: 64px;
        height: 64px;
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
