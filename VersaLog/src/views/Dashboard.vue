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
  <h1>DASHBOARD</h1>
  <v-divider class="separator"></v-divider>
  <TrainingHistory></TrainingHistory>
  <v-divider class="separator"></v-divider>
  <AddTraining></AddTraining>
  <ExerciseList></ExerciseList>
</template>

<style scoped>
.separator {
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  margin-bottom: 10px;
  opacity: 100%;
}
</style>
