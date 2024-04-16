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

<template>
  <v-card>
    <tr>
      <td>
        <v-col>{{ this.training.dateAssigned.slice(0, 10) }}</v-col>
      </td>
      <td v-for="exerciseResult in training.exerciseResults">
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-card-title v-bind="props">{{
              exerciseResult.exercise.name
            }}</v-card-title>
            <v-card-item
              >S:{{ exerciseResult.sets }} R:{{
                exerciseResult.reps
              }}</v-card-item
            >
          </template>
          <span>{{ exerciseResult.exercise.description }}</span>
        </v-tooltip>
      </td>
    </tr>
  </v-card>
  <v-divider> </v-divider>
</template>

<style scoped>
tr {
  display: flex;
  align-items: center;
  padding: 5px;
  overflow: scroll;
}
td {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.v-card {
  max-width: 50rem;
  margin: 5px;
}
.v-card-item {
  display: flex;
  justify-content: space-around;
}
</style>
