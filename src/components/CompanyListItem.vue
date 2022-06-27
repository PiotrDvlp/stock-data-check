<template>
    <li
        class="company-data d-flex flex-row py-2"
        @mouseover="showRemoveOption = true"
        @mouseleave="showRemoveOption = false"
    >
        <span
            v-show="showRemoveOption"
            class="company-data__remove"
            @click="removeCompany"
        >
            <b-icon-x-lg class=""></b-icon-x-lg>
        </span>
        <div class="company-data__logo">
            <b-img :src="setImage" fluid />
        </div>
        <div class="company-data__details">
            <div class="company-data__name">
                <span
                    class="company-data__info company-data__info--bold compaenvny-data__info--big"
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
                    >{{ parseNumber.price }} {{ company.currency }}</span
                >
                <span :class="classObject" class="company-data__info"
                    >{{ parseNumber.change }} ({{ company.changePercent }})
                    <component :is="setArrow"></component
                ></span>
                <span class="company-data__info"
                    >Closed: {{ company.latestTradingDay }}</span
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
    data() {
        return {
            showRemoveOption: false,
        };
    },
    computed: {
        setImage() {
            return this.company.logo
                ? this.company.logo
                : "https://via.placeholder.com/64x64";
        },
        parseNumber() {
            return {
                change: parseFloat(this.company.change),
                price: parseFloat(this.company.price),
            };
        },
        getChange() {
            return this.parseNumber.change > 0;
        },
        classObject() {
            return {
                "company-data__info--green": this.getChange,
                "company-data__info--red": !this.getChange,
            };
        },
        setArrow() {
            return this.getChange ? "b-icon-arrow-up" : "b-icon-arrow-down";
        },
    },
    methods: {
        removeCompany() {
            this.$emit("remove-company", this.company.uuid);
        },
    },
};
</script>

<style lang="scss" scoped>
.company-data {
    position: relative;

    &__logo {
        display: flex;
        justify-content: center;
        align-items: center;
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

        &--green {
            color: #00cc00;
        }

        &--red {
            color: #ff0000;
        }
    }

    &__remove {
        padding: 5px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
}
</style>
