<script setup lang="ts">
import Exercise from "@/components/Exercise.vue";
</script>

<script lang="ts">
import axios from "axios";

export default {
  props: {
    trainingData: Object,
  },
  data() {
    return {
      isEditing: false,
      training: this.trainingData,
      statuses: ["New", "Completed", "inProgress", "Done", "Cancelled"],
    };
  },
  created() {},

  methods: {
    deleteTraining() {
      if (confirm("Are you sure?")) {
        const response = axios
          .delete(
            import.meta.env.VITE_BACKEND_URL +
              `Training?trainingId=${this.training.trainingId}`,
          )
          .then((response) => {
            this.$emit("trainingDeleted", this.training.id);
            alert("Training deleted successfully");
          })
          .catch((error) => {
            alert("There was a problem during training deletion");
          });
      }
    },
    editTraining() {
      this.isEditing = !this.isEditing;
    },
    saveTraining() {
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL +
            `Training/${this.training.trainingId}`,
          this.trainingData,
        )
        .then((response) => {
          this.$emit("trainingUpdated", this.training);
          this.isEditing = false;
          alert("Training saved successfully");
        })
        .catch((error) => {
          alert("There was a problem during training saving");
        });
    },
  },
};
</script>

<template>
  <v-card class="training-item">
    <v-card-text v-if="!isEditing">
      <v-row>
        <v-col cols="6">
          <span class="date"
            >Date assigned:
            {{
              new Date(this.training.dateAssigned)
                .toISOString()
                .substring(0, 10)
            }}</span
          >
        </v-col>
        <v-col cols="6">
          <span class="status">Status: </span>
          <span class="status">{{ this.training.status }}</span>
        </v-col>
        <v-col cols="12" class="exercises-and-results">
          <template v-if="this.training.exercises.length">
            <v-list
              v-for="exercise in this.training.exercises"
              :key="exercise.id"
            >
              <v-list-item v-row>
                <v-list-item-title>{{ exercise.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text v-if="isEditing">
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Date"
            type="date"
            v-model="training.dateAssigned"
          />
        </v-col>
        <v-col cols="6">
          <v-select v-model="this.training.status" :items="this.statuses" />
        </v-col>
        <v-col cols="12" class="exercises-and-results">
          <v-subheader>Exercises:</v-subheader>
          <v-list
            v-for="exercise in this.training.exercises"
            :key="exercise.id"
          >
            <v-list-item v-row>
              <v-list-item-content>
                <v-text-field v-model="exercise.name" label="Exercise" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-for="result in trainingData.results" :key="result.id">
            <v-list-item v-row>
              <v-list-item-content>
                <v-text-field v-model="result.value" label="Result: " />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col> </v-row
      >g
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn @click="editTraining">{{ isEditing ? "Cancel" : "Edit" }}</v-btn>
      <v-btn @click="saveTraining" v-if="isEditing" color="primary">Save</v-btn>
      <v-btn @click="deleteTraining" v-if="isEditing" color="error"
        >Delete</v-btn
      >
    </v-card-actions>
    <v-divider class="separator" />
  </v-card>
</template>

<style scoped>
.training-item .exercises-and-results {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* Wrap if content overflows */
  align-items: center; /* Align vertically */
}
.date {
  font-weight: bold;
}
.separator {
  width: 100%;
  height: 1px;
  background-color: #ddd;
}
</style>
