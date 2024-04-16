<script setup lang="ts">
import TrainingCompact from "@/components/TrainingCompact.vue";
</script>
<script lang="ts">
import { useUserStore } from "@/stores/user";
import axios from "axios";

export default {
  data() {
    return {
      trainings: [],
      dateStart: null,
      dateEnd: null,
      type: null,
      exerciseTypes: [
        "Strength",
        "Balance",
        "Cycling",
        "Flexibility",
        "Aerobic",
        "Jogging",
        "TeamGame",
      ],
    };
  },
  methods: {
    async fetchData() {
      try {
        const userStore = useUserStore();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "Training/user/type/date/",
          {
            params: {
              userId: userStore.getId,
              dateStart: this.dateStart,
              dateEnd: this.dateEnd,
              type: this.type,
            },
          },
        );
        this.trainings = response.data;
        this.trainings.sort(function (a, b) {
          return new Date(b.dateAssigned) - new Date(a.dateAssigned);
        });
        this.$emit("trainingFetch");
      } catch (error) {
        alert("Something wrong " + error.response.data);
      }
    },
  },
};
</script>

<template>
  <v-container
    style="
      display: flex;
      gap: 5px;
      justify-content: space-evenly;
      align-items: center;
    "
  >
    <v-tooltip location="top" text="Default value is today's date">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          label="Date"
          type="date"
          v-model="dateStart"
        />
      </template>
    </v-tooltip>
    <v-tooltip location="top" text="Default value is today's date - end of day">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          label="Date"
          type="date"
          v-model="dateEnd"
        />
      </template>
    </v-tooltip>

    <v-tooltip
      location="top"
      text="Select trainings containing specific exercise type"
    >
      <template v-slot:activator="{ props }">
        <v-select
          v-bind="props"
          v-model="type"
          :items="this.exerciseTypes"
          label="Exercise Type"
          style="min-width: 10rem"
        ></v-select
      ></template>
    </v-tooltip>
    <v-btn color="success" @click="fetchData">Submit</v-btn>
  </v-container>
  <v-card-title>Trainings:</v-card-title>
  <v-container>
    <v-table>
      <tbody>
        <tr v-if="trainings" v-for="training in trainings">
          <TrainingCompact :training-data="training"></TrainingCompact>
        </tr>
        <template v-if="!trainings.length">
          <tr>
            <v-card-title>No trainings to display for this period</v-card-title>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>
.v-table {
  width: 100%;
}
.v-row {
  width: 80%;
}
template {
  max-width: 60rem;
}
</style>
