<template>
    <div id="app">
        <the-layout>
            <router-view></router-view>
        </the-layout>
    </div>
</template>

<script>
import TheLayout from "./components/TheNavbar";

export default {
    name: "App",
    components: {
        TheLayout,
    },
};
</script>
