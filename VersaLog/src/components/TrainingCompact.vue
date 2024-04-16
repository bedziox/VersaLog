<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TrainingCompact",
  props: {
    trainingData: Object,
  },
  data() {
    return {
      training: this.trainingData,
    };
  },
});
</script>

<template></template>

<style scoped></style>
