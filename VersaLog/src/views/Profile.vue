<script setup lang="ts">
import { useUserStore } from "@/stores/user.js";
import { toast } from "vue-sonner";
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
            toast.success("Account deleted successfully");
            userStore.$reset();
            this.$router.push("/");
          })
          .catch((error) => {
            toast.error("There was a problem during account deletion");
          });
      }
    },
  },
};
</script>
<template>
  <div class="profile-container">
    <v-card class="item">
      Hello {{ userStore.getUsername }}
      <v-avatar> <v-icon>mdi-account </v-icon></v-avatar></v-card
    >
    <v-card>
      <v-card-text>
        <v-card-title>Your Profile</v-card-title>
        <v-card-text p="">
          This is your profile page. You can edit your profile information and
          manage your account.
        </v-card-text>
      </v-card-text>
    </v-card>
    <v-btn class="item" @click="deleteAccount">Delete account</v-btn>
  </div>
</template>

<style scoped>
* {
  padding: 10px;
}
.item {
  margin: 1rem;
}
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
