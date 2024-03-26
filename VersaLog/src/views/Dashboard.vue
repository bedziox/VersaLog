<script setup lang="ts">
import Training from "@/components/Training.vue";
import TrainingHistory from "@/components/TrainingHistory.vue";
import AddTraining from "@/components/AddTraining.vue";
import Exercise from "@/components/Exercise.vue";
import ExerciseList from "@/components/ExerciseList.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
</script>
<script lang="ts"></script>

<template class="flex-column">
  <h1>TEST DASHBOARD</h1>
  <v-divider class=""></v-divider>
  <TrainingHistory></TrainingHistory>
  <v-divider class=""></v-divider>
  <AddTraining></AddTraining>
  <ExerciseList></ExerciseList>
</template>

<style scoped></style>
