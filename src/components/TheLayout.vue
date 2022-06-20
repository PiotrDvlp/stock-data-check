<template>
    <div class="layout">
        <the-navbar></the-navbar>
        <main class="layout__main pt-4">
            <b-container fluid>
                <b-row>
                    <b-col>
                        <h1 class="h4 mb-4">Track new company</h1>
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
import TheNavbar from "@/components/TheNabvar";

export default {
    name: "TheLayout",
    components: {
        TheNavbar,
    },
};
</script>

<style></style>
