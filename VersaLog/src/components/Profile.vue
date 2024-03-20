<script setup lang="ts">

import {useUserStore} from "@/stores/user.js"
import {useRoute} from "vue-router";

const userStore = useUserStore();

</script>

<template class="d-flex-column">
  <h1>TEST PROFIL :)</h1>
  <v-card class="ma-2 pa-2" v-model="userStore.User"> Hello {{userStore.getUsername}}</v-card>
</template>

<style scoped>

</style>