<script setup lang="ts">
import TrainingHistory from "@/components/TrainingHistory.vue";
import AddTraining from "@/components/AddTraining.vue";
</script>
<script lang="ts"></script>

<template class="flex-column">
  <h1>DASHBOARD</h1>
  <v-divider class="separator"></v-divider>
  <TrainingHistory></TrainingHistory>
  <v-divider class="separator"></v-divider>
  <AddTraining></AddTraining>
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
