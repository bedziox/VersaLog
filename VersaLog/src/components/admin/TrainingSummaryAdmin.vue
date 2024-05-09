<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import TrainingCompact from "@/components/TrainingCompact.vue";
import AdminUserSelect from "@/components/admin/AdminUserSelect.vue";
import { useSelectedUserStore } from "@/stores/selectedUser";
import { toast } from "vue-sonner";

export default defineComponent({
  name: "TrainingSummaryAdmin",
  components: { AdminUserSelect, TrainingCompact },
  data() {
    return {
      user: null,
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
    async fetchData(userId) {
      try {
        const userStore = useUserStore();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "Training/user/type/date/",
          {
            params: {
              userId: userId,
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
        toast.error("Something wrong " + error.response.data);
      }
    },
    fetchGuard(user) {
      if (user !== null) {
        this.fetchData(user.userId);
      } else {
        toast.error("User is not selected");
      }
    },
    receiveUser(user) {
      this.user = user;
    },
  },
});
</script>

<template>
  <AdminUserSelect v-on:userSelected="receiveUser"></AdminUserSelect>
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
          label="Start date"
          type="date"
          v-model="dateStart"
        />
      </template>
    </v-tooltip>
    <v-tooltip location="top" text="Default value is today's date - end of day">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          label="End date"
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
        <v-autocomplete
          v-bind="props"
          v-model="type"
          :items="this.exerciseTypes"
          label="Exercise Type"
          style="min-width: 10rem"
          clearable
        ></v-autocomplete
      ></template>
    </v-tooltip>
    <v-btn color="success" @click="fetchGuard(this.user)">Submit</v-btn>
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

<style scoped></style>
