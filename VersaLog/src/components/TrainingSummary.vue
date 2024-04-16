<script setup lang="ts"></script>
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
          import.meta.env.VITE_BACKEND_URL +
            "Training/user/type/date?userId=" +
            userStore.getId +
            this.type ??
            "&type=" +
              this.type +
              "&startDate=" +
              this.dateStart +
              "&endDate=" +
              this.dateEnd,
        );
        this.trainings = response.data;
        console.log(this.trainings);
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
    <v-text-field label="Date" type="date" v-model="dateStart" />
    <v-text-field label="Date" type="date" v-model="dateEnd" />
    <v-select
      ref="newExerciseType"
      v-model="type"
      :items="this.exerciseTypes"
      label="Exercise Type"
      style="min-width: 100px"
    ></v-select>
    <v-btn color="success" @click="fetchData">Submit</v-btn>
  </v-container>
  <v-container> </v-container>
</template>

<style scoped></style>
