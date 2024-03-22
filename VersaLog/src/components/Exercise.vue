<script setup lang="ts">
const exerciseStore = useExerciseStore();
</script>

<script lang="ts">
import { useExerciseStore } from "@/stores/exercise";
import axios from "axios";
export default {
  data() {
    return {};
  },
  mounted() {
    const exerciseStore = useExerciseStore();
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "Exercise")
      .then((response) => {
        exerciseStore.$patch({
          Exercises: response.data,
        });
      })
      .catch((error) => {
        alert("Error during exercises retrieval");
        exerciseStore.$reset();
      });
  },
};
</script>
<template></template>

<style scoped></style>
