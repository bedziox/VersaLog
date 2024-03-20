import { defineStore } from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLoggedIn: false,
      User: null as User | null,
    };
  },
    getters: {
      getUsername: (state) => {
          return state.User.username;
      },
    }
});

export interface User{
    username: string,
    id: number;
}