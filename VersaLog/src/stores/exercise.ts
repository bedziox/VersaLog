import { defineStore } from "pinia";

export const useExerciseStore = defineStore("exercise", {
  state: () => {
    return {
      Exercises: [] as exercise[],
    };
  },
  getters: {
    getExercise:
      (state) =>
      (exerciseId: number): exercise => {
        return state.Exercises[exerciseId];
      },
    getAllExercises: (state): exercise[] => {
      return state.Exercises;
    },
  },
});

export interface exercise {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface exerciseResult {
  exerciseResultId: number;
  exercise: exercise;
  sets: number;
  reps: number;
  result: string;
}
