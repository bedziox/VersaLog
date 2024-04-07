import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";

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
  let userId = userStore.getId;
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
            userId,
          },
        },
      )
      .then((response) => {
        next();
        userStore.isLoggedIn = true;
      })
      .catch((error) => {
        localStorage.removeItem("jwtToken");
        router.push("/");
        alert("Token not valid, please log in again.");
        userStore.$reset();
      });
  }
});

export default router;
