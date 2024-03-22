import { defineStore } from "pinia";

export const useExerciseStore = defineStore("exercise", {
  state: () => {
    return {
      Exercises: [] as Exercise[],
    };
  },
  getters: {
    getExercise:
      (state) =>
      (exerciseId: number): Exercise => {
        return state.Exercises[exerciseId];
      },
    getAllExercises: (state): Exercise[] => {
      return state.Exercises;
    },
  },
});

export interface Exercise {
  id: number;
  name: string;
  description: string;
  type: string;
}
