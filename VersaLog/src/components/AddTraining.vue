<script setup lang="ts"></script>

<template>
  <v-card>
    <v-card-title>Add Training</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="newTraining.dateAssigned"
        label="Training Date"
        type="date"
      ></v-text-field>
      <v-autocomplete
        style="min-width: 500px"
        v-model="selectedExercise"
        :items="exercises"
        label="Add Exercises"
        persistent-hint
        :item-props="itemProps"
      >
      </v-autocomplete>
      <v-btn fab small @click="addExercise" color="primary">
        Add exercise
      </v-btn>
      <v-divider></v-divider>
      <v-subheader>Exercises</v-subheader>
      <v-list
        v-if="newTraining.exerciseResults.length > 0"
        two-line
        subheader
        style=""
      >
        <v-list-item
          v-for="exercise in newTraining.exerciseResults"
          :key="exercise.exerciseResultId"
          class="exeResultItem"
        >
          <v-list-item-title>{{ exercise.exercise.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            exercise.exercise.type
          }}</v-list-item-subtitle>
          <v-text-field style="min-width: 30px" label="Sets"> </v-text-field>
          <v-text-field style="min-width: 30px" label="Reps"> </v-text-field>
          <v-list-item-action>
            <v-btn color="error" small @click="removeExercise(exercise)">
              Delete
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-text-field
        ref="newExerciseName"
        v-model="newExerciseName"
        label="Exercise Name"
        v-if="showNewExerciseInput"
        :rules="[() => !!newExerciseName || 'This field is required']"
        required
      ></v-text-field>
      <v-text-field
        ref="newExerciseDescription"
        v-model="newExerciseDescription"
        label="Exercise Description"
        :rules="[() => !!newExerciseDescription || 'This field is required']"
        v-if="showNewExerciseInput"
        required
      ></v-text-field>
      <v-select
        ref="newExerciseType"
        v-model="newExerciseType"
        :items="this.exerciseTypes"
        :rules="[() => !!newExerciseType || 'This field is required']"
        label="Exercise Type"
        v-if="showNewExerciseInput"
        required
      >
      </v-select>
      <v-btn v-if="showNewExerciseInput" color="primary" @click="addNewExercise"
        >Save Exercise</v-btn
      >
      <v-btn
        v-if="showNewExerciseInput"
        color="error"
        @click="cancelAddExercise"
        >Cancel</v-btn
      >
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="saveTraining">Save Training</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { useUserStore } from "@/stores/user";

export default {
  data() {
    return {
      newTraining: {
        dateAssigned: new Date().toISOString().slice(0, 10),
        exerciseResults: [],
        note: "",
        userId: 0,
      },
      selectedExercise: null,
      exercises: [],
      exerciseTypes: [
        "Strength",
        "Balance",
        "Cycling",
        "Flexibility",
        "Aerobic",
        "Jogging",
        "TeamGame",
      ],
      showNewExerciseInput: false,
      newExerciseName: "",
      newExerciseType: "",
      newExerciseDescription: "",
      showNewExerciseModal: false,
    };
  },
  methods: {
    addExercise() {
      if (this.selectedExercise) {
        this.newTraining.exerciseResults.push({
          exercise: this.selectedExercise,
          reps: 0,
          sets: 0,
          result: "",
        });
        this.selectedExercise = null;
      } else {
        this.showNewExerciseInput = true;
      }
    },
    cancelAddExercise() {
      this.showNewExerciseInput = false;
    },
    removeExercise(exercise) {
      const index = this.newTraining.exerciseResults.findIndex(
        (ex) => ex.exerciseResultId === exercise.exerciseResultId,
      );
      if (index > -1) {
        this.newTraining.exerciseResults.splice(index, 1);
      }
    },
    addNewExercise() {
      try {
        this.createExercise();
        this.showNewExerciseInput = false;
        this.newExerciseName = "";
        this.newExerciseType = "";
      } catch (error) {
        console.log(error);
      }
    },
    saveTraining() {
      try {
        axios
          .post(import.meta.env.VITE_BACKEND_URL + "Training", this.newTraining)
          .then((response) => {
            alert("Training added successfully");
            this.$emit("forceUpdate");
          });
      } catch (error) {
        alert("There was a problem creating the training.");
        console.error(error);
      }
    },
    createExercise() {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "Exercise", {
          name: this.newExerciseName,
          type: this.newExerciseType,
          description: this.newExerciseDescription,
        })
        .then((response) => {
          this.exercises.push(response.data);
          let exercise = {
            name: this.newExerciseName,
            type: this.newExerciseType,
            description: this.newExerciseDescription,
          };
          this.showNewExerciseModal = false;
          let exerciseResult = {
            exercise: exercise,
            reps: 0,
            sets: 0,
            result: "",
          };
          this.newTraining.exerciseResults.push(exerciseResult);
          alert("New exercise added");
        })
        .catch((error) => {
          alert("There was a problem creating the exercise.");
          console.error(error);
        });
    },
    itemProps(item) {
      return {
        title: item.name,
        subtitle: item.type,
      };
    },
  },
  created() {
    const response = axios
      .get(import.meta.env.VITE_BACKEND_URL + "Exercise")
      .then((response) => {
        this.exercises = response.data;
      })
      .catch((error) => {
        alert("There was a problem during exercises retrieval");
      });
    const userStore = useUserStore();
    this.newTraining.userId = userStore.getId;
  },
};
</script>

<style scoped>
.v-text-field {
  min-width: 30px;
}
</style>
