<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { emitted } from "@vue/test-utils/dist/emit";

export default {
  data() {
    return {
      userList: [],
      selectedUser: null,
    };
  },

  created() {
    const response = axios
      .get(import.meta.env.VITE_BACKEND_URL + "User")
      .then((response) => {
        this.userList = response.data;
      })
      .catch((error) => {
        toast.error("There was a problem during exercises retrieval");
      });
  },
  methods: {
    itemProps(item) {
      return {
        title: item.firstName + " " + item.lastName,
        subtitle: item.username + " id: " + item.userId,
      };
    },
  },
  watch: {
    selectedUser(oldval, newval) {
      this.$emit("userSelected", this.selectedUser);
    },
  },
};
</script>

<template>
  <v-card-title>Select user:</v-card-title>
  <v-autocomplete
    :items="userList"
    :item-props="itemProps"
    :label="Users"
    v-model="selectedUser"
    @change="(event) => onChange(event)"
  >
  </v-autocomplete>
</template>

<style scoped></style>
