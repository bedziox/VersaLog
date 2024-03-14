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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // without token
    { path: "/", component: Home, meta: { requiresAuth: false } },
    { path: "/login", component: Login, meta: { requiresAuth: false } },
    { path: "/register", component: Register, meta: { requiresAuth: false } },
    // need authorization
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
  } else {
    axios
      .put(import.meta.env.VITE_BACKEND_URL + "Auth/valid/", {
        token: localStorage.getItem("jwtToken"),
      })
      .then((response) => {
        next();
      })
      .catch((error) => {
        router.push("/");
        alert("Token not valid, please log in again.");
      });
  }
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App).use(router).use(vuetify).mount("#app");
