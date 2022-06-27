<template>
    <div class="layout">
        <the-navbar></the-navbar>
        <main class="layout__main pt-4">
            <b-container fluid>
                <b-row>
                    <b-col>
                        <h1 class="h4 mb-4">{{ setTitle }}</h1>
                    </b-col>
                </b-row>
                <b-row>
                    <slot></slot>
                </b-row>
            </b-container>
        </main>
    </div>
</template>

<script>
import TheNavbar from "./TheNavbar.vue";

export default {
    name: "TheLayout",
    components: {
        TheNavbar,
    },
    computed: {
        setTitle() {
            return this.$route.name === "CompanyAdd"
                ? "Track new company"
                : "Companies";
        },
    },
};
</script>

<style></style>
