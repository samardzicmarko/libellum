import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import { currency } from "./plugins/currency";
Vue.filter("currency", currency);

Vue.config.productionTip = false;
Vue.use(moment);
Vue.prototype.moment = moment;
Vue.use(VueRouter);

export const bus = new Vue();

import router from "./router";

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
