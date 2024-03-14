import "./assets/main.css";
import App from "./App.vue";
import { createApp } from "vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";

const guard = function (to, from, next) {
  // check for valid auth token
  axios
    .post(
      import.meta.env.BACKEND_URL + "Auth/valid/",
      localStorage.getItem("jwtToken"),
    )
    .then((response) => {
      next();
    })
    .catch((error) => {
      window.location.href = "/login";
    });
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // without token
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    // need authorization
    { path: "/dashboard", component: Dashboard },
  ],
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App).use(router).use(vuetify).mount("#app");
