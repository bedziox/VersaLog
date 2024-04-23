<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<script lang="ts">
import { toast } from "vue-sonner";
import { useUserStore } from "@/stores/user";

export default {
  data(vm) {
    return {
      userStore: useUserStore(),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("id");
      this.userStore.$reset();
      toast.success("Logged out successfully");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <v-container>
    <v-app-bar v-if="!userStore.$state.isLoggedIn">
      <v-app-bar-title
        ><router-link to="/"
          ><v-btn>VersaLog</v-btn></router-link
        ></v-app-bar-title
      >
      <v-btn @click="toggleTheme">Change theme</v-btn>
      <router-link to="login"><v-btn>Login</v-btn></router-link>
      <router-link to="register"><v-btn>Register</v-btn></router-link>
    </v-app-bar>
    <v-app-bar v-if="userStore.$state.isLoggedIn && !userStore.$state.isAdmin">
      <v-app-bar-title
        ><router-link to="/dashboard"
          ><v-btn>VersaLog</v-btn></router-link
        ></v-app-bar-title
      >
      <v-btn @click="toggleTheme">Change theme</v-btn>
      <router-link to="profile"><v-btn>Profile</v-btn></router-link>
      <router-link to="summary"><v-btn>Summary</v-btn> </router-link>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-app-bar v-if="userStore.$state.isLoggedIn && userStore.$state.isAdmin">
      <v-app-bar-title
        ><router-link to="/dashboard"
          ><v-btn>VersaLog</v-btn></router-link
        ></v-app-bar-title
      >
      <v-btn @click="toggleTheme">Change theme</v-btn>
      <router-link to="/admin/profile"><v-btn>Profile</v-btn></router-link>
      <router-link to="/admin/summary"><v-btn>Summary</v-btn> </router-link>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
  </v-container>
</template>

<style scoped></style>
