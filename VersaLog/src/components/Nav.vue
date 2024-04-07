<script setup lang="ts">
import { useTheme } from "vuetify";
import { useUserStore } from "@/stores/user";

const theme = useTheme();
const userStore = useUserStore();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("id");
  userStore.$reset();
  alert("Logged out successfully");
  window.location.href = "/";
}
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
    <v-app-bar v-if="userStore.$state.isLoggedIn">
      <v-app-bar-title
        ><router-link to="/dashboard"
          ><v-btn>VersaLog</v-btn></router-link
        ></v-app-bar-title
      >
      <v-btn @click="toggleTheme">Change theme</v-btn>
      <router-link to="profile"><v-btn>Profile</v-btn></router-link>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
  </v-container>
</template>

<style scoped></style>
