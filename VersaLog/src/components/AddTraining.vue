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
      <v-select
        v-model="selectedExercise"
        :items="exercises"
        label="Add Exercises"
        persistent-hint
        :item-props="itemProps"
      >
        <template #prepend>
          <v-text-field
            v-model="filterText"
            label="Filter"
            type="search"
            @input="$emit('input', filterText)"
          ></v-text-field>
        </template>
      </v-select>
      <v-btn fab small @click="addExercise" color="primary">
        Add exercise
      </v-btn>
      <v-divider></v-divider>
      <v-list v-if="newTraining.exercises.length > 0" two-line subheader>
        <v-subheader>Exercises</v-subheader>
        <v-list-item
          v-for="exercise in newTraining.exercises"
          :key="exercise.name"
        >
          <v-list-item-content>
            <v-list-item-title>{{ exercise.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ exercise.type }}</v-list-item-subtitle>
          </v-list-item-content>
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
        exercises: [],
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
        this.newTraining.exercises.push({ ...this.selectedExercise });
        this.selectedExercise = null;
      } else {
        this.showNewExerciseInput = true;
      }
    },
    cancelAddExercise() {
      this.showNewExerciseInput = false;
    },
    removeExercise(exercise) {
      const index = this.newTraining.exercises.findIndex(
        (ex) => ex.exerciseId === exercise.exerciseId,
      );
      if (index > -1) {
        this.newTraining.exercises.splice(index, 1);
      }
    },
    addNewExercise() {
      try {
        let exercise = {
          name: this.newExerciseName,
          type: this.newExerciseType,
          description: this.newExerciseDescription,
        };
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
          this.showNewExerciseModal = false;
          this.newTraining.exercises.push(response.data);
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
  computed: {
    filteredExercises() {
      return this.exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(this.filterText.toLowerCase()),
      );
    },
  },
};
</script>

<style scoped></style>
