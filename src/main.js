import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";

Vue.config.productionTip = false;

//Vue.use(VueRouter);

// const router = new VueRouter({
//   routes: [
//     {
//       patch: "/",
//       name: HomePage,
//       component: HomePage,
//     },
//     {
//       patch: "/champions",
//       name: ChampionSelected,
//       component: ChampionSelected,
//     },
//   ],
// });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
