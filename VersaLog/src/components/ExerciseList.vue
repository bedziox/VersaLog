<script setup lang="ts"></script>

<script lang="ts">
import axios from "axios";
import { useExerciseStore } from "@/stores/exercise";
import { onUpdated } from "vue";

export default {
  data() {
    return {
      selected: [],
      items: [],
    };
  },
  computed() {},
};
</script>

<template>
  <h3>Available exercises:</h3>
  <v-data-table :items="items" item-value="name" items-per-page="5">
  </v-data-table>
</template>

<style scoped></style>
