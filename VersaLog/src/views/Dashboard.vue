<script setup lang="ts">
import Training from "@/components/Training.vue";
import TrainingHistory from "@/components/TrainingHistory.vue";
import AddTraining from "@/components/AddTraining.vue";
</script>
<script lang="ts"></script>

<template class="flex-column">
  <h1>TEST DASHBOARD</h1>
  <Training> </Training>
  <v-divider class="border-opacity-100"></v-divider>
  <TrainingHistory></TrainingHistory>
  <v-divider class="border-opacity-100"></v-divider>
  <AddTraining></AddTraining>
</template>

<style scoped></style>
