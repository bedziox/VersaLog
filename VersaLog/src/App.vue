<script setup lang="ts">
import Navbar from "./components/Nav.vue";
</script>

<template>
  <v-app>
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
