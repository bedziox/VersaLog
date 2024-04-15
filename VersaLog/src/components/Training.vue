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
      statuses: ["New", "InProgress", "Done", "Cancelled", "Outdated"],
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
            this.$emit("forceUpdate");
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
    removeExercise(exerciseResult) {
      const index = this.training.exerciseResults.findIndex(
        (ex) => ex.exerciseResultId === exerciseResult.exerciseResultId,
      );
      if (index > -1) {
        this.training.exerciseResults.splice(index, 1);
      }
    },
  },
};
</script>

<template>
  <v-card class="training-item">
    <v-card-text v-if="!isEditing">
      <v-row>
        <v-col cols="6">
          <span
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
          <template v-if="this.training.exerciseResults.length">
            <v-list
              v-for="exercise in this.training.exerciseResults"
              :key="exercise.id"
            >
              <v-card style="min-width: 30px; min-height: 30px">
                <v-card-title>{{ exercise.exercise.name }}</v-card-title>
                <v-card-text>Sets: {{ exercise.sets }}</v-card-text>
                <v-card-text>Reps: {{ exercise.reps }}</v-card-text>
                <v-card-text>Result: {{ exercise.result }}</v-card-text>
              </v-card>
            </v-list>
          </template>
        </v-col>
        <v-col>
          <span>Notes:</span>
          <v-card-text>
            {{ this.training.notes }}
          </v-card-text>
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
        <v-card-text>Exercises:</v-card-text>
        <v-col cols="12" class="exercises-and-results">
          <v-list
            v-for="exercise in this.training.exerciseResults"
            :key="exercise.id"
          >
            <v-card>
              <v-card-text> {{ exercise.exercise.name }}</v-card-text>
              <v-text-field label="Sets" v-model="exercise.sets">
              </v-text-field>
              <v-text-field label="Reps" v-model="exercise.reps">
              </v-text-field>
              <v-text-field label="Result" v-model="exercise.result">
              </v-text-field>
              <v-btn
                icon="mdi-delete"
                @click="removeExercise(exercise)"
              ></v-btn>
            </v-card>
          </v-list>
        </v-col>
        <v-col>
          <span>Notes:</span>
          <v-text-field v-model:="this.training.notes"> </v-text-field>
        </v-col>
      </v-row>
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
  flex-wrap: wrap;
  align-items: center;
}
.separator {
  width: 100%;
  height: 1px;
  background-color: #ddd;
}
.v-text-field {
  min-width: 100px;
}

.v-card {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
