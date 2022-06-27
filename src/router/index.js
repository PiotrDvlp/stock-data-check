import Vue from "vue";
import VueRouter from "vue-router";
import CompanyAdd from "../views/CompanyAdd.vue";
import CompanyList from "../views/CompanyList.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "CompanyAdd",
        component: CompanyAdd,
    },
    {
        path: "/company-list",
        name: "CompanyList",
        component: CompanyList,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
