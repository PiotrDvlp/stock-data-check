<template>
    <header class="layout__header">
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-container fluid>
                <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

                <b-navbar-brand>Stock Tracker</b-navbar-brand>

                <b-collapse id="nav-text-collapse" is-nav>
                    <b-navbar-nav>
                        <router-link to="/">Track New Company</router-link>
                        |
                        <router-link to="/company-list">Companies</router-link>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </header>
</template>

<script>
export default {
    name: "TheNavbar",
};
</script>

<style></style>
