import HomePage from "../components/HomePage.vue";
import ChampionSelected from "../components/page/ChampionSelected.vue";
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

let home = [
  {
    path: "/",
    component: HomePage,
  },
];

let components = [
  {
    path: "/champion",
    component: ChampionSelected,
  },
];

export default new Router({
  mode: "history",
  base: "/",
  routes: [...home, ...components],
});
