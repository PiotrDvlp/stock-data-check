<template>
    <header class="layout__header">
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-container fluid>
                <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

                <b-navbar-brand>Stock Tracker</b-navbar-brand>

                <b-collapse id="nav-text-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Track New Company</b-nav-item>
                        <b-nav-item href="#">Companies</b-nav-item>
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
