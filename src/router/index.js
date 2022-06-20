import Vue from "vue";
import VueRouter from "vue-router";
import CompanyAdd from "../views/CompanyAdd.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "CompanyAdd",
        component: CompanyAdd,
    },
    {
        path: "/companies",
        name: "CompanyList",
        component: () => import("../views/CompanyList.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
