<script setup lang="ts">
import Training from "@/components/Training.vue";
</script>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import axios from "axios";
import {toast} from "vue-sonner";

export default {
  data() {
    return {
      trainings: [],
      visibleTrainings: [],
    };
  },
  methods: {
    handleTrainingDeleted(deletedTrainingId) {
      this.trainings = this.trainings.filter(
        (training) => training.trainingId !== deletedTrainingId,
      );
    },
    showMore() {
      const additionalCount = 3;
      this.visibleTrainings.push(
        ...this.trainings.slice(
          this.visibleTrainings.length,
          this.visibleTrainings.length + additionalCount,
        ),
      );
    },
    async fetchData() {
      try {
        this.training = [];
        const userStore = useUserStore();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "Training/user",
          {
            params: {
              userId: userStore.getId,
            },
          },
        );
        this.trainings = response.data;
        this.trainings.sort(function (a, b) {
          return new Date(b.dateAssigned) - new Date(a.dateAssigned);
        });
      } catch (error) {
        toast.error("Something wrong " + error.response.data);
      }
      this.visibleTrainings = this.trainings.slice(0, 3);
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<template>
  <h3>Training history</h3>
  <v-list v-for="training in visibleTrainings" :key="training.id">
    <Training :training-data="training" v-on:forceUpdate="fetchData" />
  </v-list>
  <v-btn v-if="trainings.length > visibleTrainings.length" @click="showMore">
    Show More
  </v-btn>
</template>

<style scoped>
* {
  max-width: 70vw;
}
</style>
