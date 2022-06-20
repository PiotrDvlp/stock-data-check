<template>
    <li class="company-data d-flex flex-row">
        <div class="company-data__logo">
            <img src="https://via.placeholder.com/64x64" />
        </div>
        <div class="company-data__details">
            <div class="company-data__name">
                <span
                    class="company-data__info company-data__info--bold company-data__info--big"
                    >Alphabet Inc.</span
                >
                <span class="company-data__info">GOOG</span>
                <span class="company-data__info">abc.xyz</span>
            </div>
            <div class="company-data__local">
                <span class="company-data__info">United States</span>
                <span class="company-data__info">09.30 - 16.00</span>
                <span class="company-data__info">UTC-5</span>
            </div>
            <div class="company-data__stock">
                <span class="company-data__info company-data__info--bold"
                    >131.73 USD</span
                >
                <span class="company-data__info">−13.73 (1.32%)</span>
                <span class="company-data__info">Closed: 2018-11-23</span>
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
};
</script>

<style></style>
