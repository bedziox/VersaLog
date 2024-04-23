<script setup lang="ts">
import Navbar from "./components/Nav.vue";
import { Toaster } from "vue-sonner";
</script>

<template>
  <v-app>
    <Toaster richColors position="bottom-right" />
    <Navbar></Navbar>
    <RouterView />
  </v-app>
</template>

<style scoped>
* {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
</style>
