import { defineStore } from "pinia";
import { ref } from "vue";
import { state } from "vue-tsc/out/shared";
import type { Exercise } from "@/stores/exercise";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLoggedIn: false,
      User: null as User | null,
    };
  },
  getters: {
    getUsername: (state): string => {
      return state.User.username;
    },
    getId: (state): number => {
      return state.User.id;
    },
    getTrainings: (state): Training[] => {
      return state.User.Trainings;
    },
  },
});

export interface User {
  username: string;
  id: number;
  Trainings: Training[];
}

export interface Training {
  id: number;
  date: Date;
  status: string;
  exercises: Exercise[];
  results: string[];
}
