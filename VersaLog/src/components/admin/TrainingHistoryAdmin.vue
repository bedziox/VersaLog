<script lang="ts">
import { defineComponent } from "vue";
import Training from "@/components/Training.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { toast } from "vue-sonner";

export default {
  name: "TrainingHistoryAdmin",
  components: { Training },
  props: {
    selectedUser: Object,
  },
  data() {
    return {
      user: this.selectedUser,
      trainings: [],
      visibleTrainings: [],
    };
  },
  methods: {
    showMore() {
      const additionalCount = 5;
      this.visibleTrainings.push(
        ...this.trainings.slice(
          this.visibleTrainings.length,
          this.visibleTrainings.length + additionalCount,
        ),
      );
    },
    async fetchData(userId) {
      try {
        this.training = [];
        const userStore = useUserStore();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "Training/user",
          {
            params: {
              userId: userId,
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
      this.visibleTrainings = this.trainings.slice(0, 5);
    },
  },
  watch: {
    selectedUser() {
      this.fetchData(this.selectedUser.userId);
    },
  },
};
</script>

<template>
  <h3>Training history</h3>
  <v-list v-for="training in visibleTrainings" :key="training.id">
    <Training :training-data="training" v-on:forceUpdate="fetchData" />
  </v-list>
  <button v-if="trainings.length > visibleTrainings.length" @click="showMore">
    Show More
  </button>
</template>
<style scoped></style>
