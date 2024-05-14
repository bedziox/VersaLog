<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "@vueuse/core";

export default defineComponent({
  name: "TrainingCompact",
  methods: {
    formatDate,
    getClassByStatus(status) {
      const statusClasses = {
        New: "border-new",
        InProgress: "border-inprogress",
        Done: "border-done",
        Cancelled: "border-cancelled",
        Outdated: "border-outdated",
      };
      return statusClasses[status] || "";
    },
  },
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
    <tr :class="`${getClassByStatus(this.training.status)}`">
      <td>
        <v-col>{{
          formatDate(new Date(this.training.dateAssigned), "DD-MM-YYYY")
        }}</v-col>
        <v-col>{{ this.training.status }} </v-col>
      </td>
      <td v-for="exerciseResult in training.exerciseResults">
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-card-title v-bind="props">{{
              exerciseResult.exercise.name
            }}</v-card-title>
            <v-card-item
              >{{ exerciseResult.sets }} /
              {{ exerciseResult.reps }}</v-card-item
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

.border-new {
  background-color: rgba(84, 231, 236, 0.2);
  border-radius: 10px;
}
.border-inprogress {
  background-color: rgba(39, 110, 250, 0.2);
  border-radius: 10px;
}
.border-done {
  background-color: rgba(92, 252, 38, 0.2);
  border-radius: 10px;
}
.border-cancelled {
  background-color: rgba(255, 22, 22, 0.2);
  border-radius: 10px;
}
.border-outdated {
  background-color: rgba(255, 249, 62, 0.2);
  border-radius: 10px;
}
</style>
