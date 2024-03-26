<script setup lang="ts">
import Training from "@/components/Training.vue";
</script>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import axios from "axios";

export default {
  data() {
    return {
      trainings: [],
    };
  },
  methods: {
    handleTrainingDeleted(deletedTrainingId) {
      // Update training data based on deleted training ID
      this.trainings = this.trainings.filter(
        (training) => training.trainingId !== deletedTrainingId,
      );
    },
  },
  async created() {
    try {
      const userStore = useUserStore();
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "Training/user?userId=" +
          userStore.getId,
      );
      this.trainings = response.data;
    } catch (error) {
      alert("Something wrong " + error.response.data);
    }
  },
};
</script>

<template>
  <h3>Training history</h3>
  <li v-for="training in trainings" :key="training.id">
    <Training :training-data="training" />
  </li>
</template>

<style scoped>
* {
  max-width: 50vw;
}
li {
  list-style: none;
}
</style>
