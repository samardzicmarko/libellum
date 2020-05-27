import Vue from "vue";
import VueRouter from "vue-router";
import Invoice from "../components/Invoice.vue";
import CreatePDF from "../components/CreatePDF.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/create/Invoice",
    name: "Invoice",
    component: Invoice,
    props: true,
  },
  {
    path: "/create/PDF/",
    name: "CreatePDF",
    component: CreatePDF,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
