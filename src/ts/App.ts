// Imports
import Vue from "vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import Axios from "axios";
import "./../scss/style.scss";

// Components
import App from "../vue/App.vue";
import ProjectsPage from "../vue/pages/ProjectsPage.vue";
import StartPage from "../vue/pages/StartPage.vue";

Axios.defaults.baseURL = "https://api.github.com";
Axios.defaults.headers.common["Accept"] = "application/vnd.github.v3+json";
Axios.defaults.headers.common["Authorization"] = "token a0a02a08500c5b45844a99d265a45a5328e853a8";

Vue.use(VueRouter);
Vue.use(VueMaterial);

(Vue as any).material.registerTheme("default", {
  primary: {
    color: "cyan",
    hue: 700
  },
  accent: {
    color: "green",
    hue: 500
  },
  warn: {
    color: "red",
    hue: 500
  },
  background: {
    color: "white",
    hue: 500
  }
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/projects",
      component: ProjectsPage
    },
    {
      path: "/start",
      component: StartPage
    },
    {
      path: "/",
      redirect: "/projects"
    }
  ]
});

const app = new Vue({
  el: "#app",
  router: router,
  render: r => r(App, {
  })
});