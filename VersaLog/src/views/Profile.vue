<script setup lang="ts">
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
</script>

<script lang="ts">
import axios from "axios";
export default {
  methods: {
    async deleteAccount() {
      const userStore = useUserStore();
      if (confirm("Are you sure?")) {
        const response = await axios
          .delete(
            import.meta.env.VITE_BACKEND_URL + `User?id=${userStore.getId}`,
          )
          .then((response) => {
            alert("Account deleted successfully");
            userStore.$reset();
            this.$router.push("/");
          })
          .catch((error) => {
            alert("There was a problem during account deletion");
          });
      }
    },
  },
};
</script>
<template class="d-flex-column mb-6">
  <h1>TEST PROFIL :)</h1>
  <v-card class="ma-2 pa-2"> Hello {{ userStore.getUsername }}</v-card>

  <v-btn class="ma-2 pa-2" @click="deleteAccount">Delete account</v-btn>
</template>

<style scoped></style>
