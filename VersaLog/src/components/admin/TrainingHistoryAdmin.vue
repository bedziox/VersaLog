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
      status: null,
      statuses: ["New", "InProgress", "Done", "Cancelled", "Outdated"],
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
      this.trainings = [];
      this.visibleTrainings = [];
      try {
        const userStore = useUserStore();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL +
            "Training/user/" +
            (this.status ? "status" : ""),
          {
            params: {
              userId: userId,
              status: this.status,
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
    clearStatus() {
      this.status = null;
      this.fetchData(this.user.userId);
    },
  },
  watch: {
    selectedUser() {
      this.fetchData(this.user.userId);
    },
  },
};
</script>

<template>
  <h3>Training history</h3>
  <v-select
    v-model="this.status"
    :items="this.statuses"
    v-on:update:model-value="fetchData"
  >
    <template #prepend>
      <v-btn icon @click="clearStatus">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-select>
  <v-list v-for="training in visibleTrainings" :key="training.id">
    <Training :training-data="training" v-on:forceUpdate="fetchData" />
  </v-list>
  <button v-if="trainings.length > visibleTrainings.length" @click="showMore">
    Show More
  </button>
</template>
<style scoped></style>
