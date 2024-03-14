<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-container>
    <v-app-bar>
      <v-app-bar-title
        ><router-link to="/"
          ><v-btn>VersaLog</v-btn></router-link
        ></v-app-bar-title
      >
      <v-btn @click="toggleTheme">Change theme</v-btn>
      <router-link to="login"><v-btn>Login</v-btn></router-link>
      <router-link to="register"><v-btn>Register</v-btn></router-link>
    </v-app-bar>
  </v-container>
</template>

<style scoped></style>
