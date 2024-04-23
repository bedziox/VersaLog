import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import Summary from "@/views/Summary.vue";
import { toast } from "vue-sonner";

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
    { path: "/summary", component: Summary, meta: { requiresAuth: true } },
    {
      path: "/admin/profile",
      component: Profile,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/summary",
      component: Summary,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (!to.meta.requiresAuth) {
    next();
  } else {
    let token = localStorage.getItem("jwtToken");
    let userId = localStorage.getItem("id");
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
        userStore.$patch({
          isLoggedIn: true,
          isAdmin: response.data.role === "Admin",
          User: {
            username: response.data.username,
            id: response.data.userId,
          },
        });
        next();
      })
      .catch((error) => {
        localStorage.removeItem("jwtToken");
        router.push("/");
        toast.warning("Token not valid, please log in again.");
        userStore.$reset();
      });
  }
});

export default router;
