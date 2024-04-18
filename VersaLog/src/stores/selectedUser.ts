import { defineStore } from "pinia";
import type { User } from "@/util.ts";
import type { Training } from "@/util.ts";
import type { Exercise } from "@/stores/exercise";

export const useSelectedUserStore = defineStore("selectedUser", {
  state: () => {
    return {
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
