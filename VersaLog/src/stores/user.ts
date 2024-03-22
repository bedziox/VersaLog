import { defineStore } from "pinia";
import { ref } from "vue";
import { state } from "vue-tsc/out/shared";

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
  },
});

export interface User {
  username: string;
  id: number;
}
