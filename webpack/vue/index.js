import Vue from "vue";
import Router from "vue-router";
import Index from "./index.vue";
import routes from "./src/routes";
const router = new Router({
  linkActiveClass: "active",
  routes: routes,
});
Vue.use(Router);
new Vue({
  el: "#app",
  router,
  ...Index,
});
