<script lang="ts">
import { defineComponent } from "vue";
import TrainingSummary from "@/components/TrainingSummary.vue";

export default defineComponent({
  name: "Summary",
  components: { TrainingSummary },
});
</script>

<template>
  <h1>Training summary</h1>
  <v-divider class="separator"></v-divider>
  <TrainingSummary></TrainingSummary>
</template>

<style scoped></style>
