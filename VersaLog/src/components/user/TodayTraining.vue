<script lang="ts">
import { defineComponent } from "vue";
import Training from "@/components/Training.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { toast } from "vue-sonner";

export default defineComponent({
  name: "TodayTraining",
  components: { Training },
  data() {
    return {
      trainings: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const userStore = useUserStore();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "Training/user/type/date",
          {
            params: {
              userId: userStore.getId,
              dateStart: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        );
        this.trainings = response.data;
      } catch (error) {
        toast.error("Something went wrong during training retrieval");
      }
    },
  },
  created() {
    this.fetchData();
  },
});
</script>

<template>
  <h3>Today's trainings</h3>
  <v-card-title v-if="!this.trainings.length">
    No trainings assigned today!</v-card-title
  >
  <v-list
    v-for="training in trainings"
    :key="training.id"
    v-if="this.trainings.length"
  >
    <Training :training-data="training" v-on:forceUpdate="fetchData" />
  </v-list>
</template>

<style scoped></style>
