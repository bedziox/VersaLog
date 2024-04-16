<script lang="ts">
import { defineComponent } from "vue";
import TrainingSummary from "@/components/TrainingSummary.vue";

export default defineComponent({
  name: "Summary",
  components: { TrainingSummary },
});
</script>

<template>
  <v-card style="max-width: 60rem; min-width: 40rem">
    <v-card-title>Training summary</v-card-title>
    <v-divider class="separator"></v-divider>
    <TrainingSummary></TrainingSummary>
  </v-card>
</template>

<style scoped></style>
