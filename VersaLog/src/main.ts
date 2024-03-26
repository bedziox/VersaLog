import "./assets/main.css";
import App from "./App.vue";
import { createApp, watch } from "vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import Profile from "@/views/Profile.vue";
import { useUserStore } from "@/stores/user.ts";
import { createPinia } from "pinia";

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // without token
    { path: "/", component: Home, meta: { requiresAuth: false } },
    { path: "/login", component: Login, meta: { requiresAuth: false } },
    { path: "/register", component: Register, meta: { requiresAuth: false } },
    // need authorization
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (!to.meta.requiresAuth) {
    next();
  } else {
    let token = localStorage.getItem("jwtToken");
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "Auth/valid/",
        {},
        {
          params: {
            token,
          },
        },
      )
      .then((response) => {
        next();
      })
      .catch((error) => {
        localStorage.removeItem("jwtToken");
        router.push("/");
        alert("Token not valid, please log in again.");
        userStore.$reset();
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

const app = createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
