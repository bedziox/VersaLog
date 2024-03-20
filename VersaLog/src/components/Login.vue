<script setup lang="ts"></script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="submitForm" ref="form">
        <v-text-field
          v-model="Username"
          label="Username"
          placeholder="Your username"
        ></v-text-field>
        <v-text-field
          v-model="Password"
          label="Password"
          placeholder="Your password"
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-2">Login</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Don't have an account?
          <v-btn><router-link to="/register">Register</router-link></v-btn>
        </p>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {useUserStore} from "@/stores/user.js"

export default {
  data() {
    return {
      FirstName: "",
      LastName: "",
      Username: "",
      Password: "",
      Email: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const userStore = useUserStore();
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "Auth/login/",
          this.$data,
        );
        this.$refs.form.reset();
        alert("Login successful");
        sessionStorage.setItem("jwtToken", response.data.token);
        userStore.$patch({
          isLoggedIn: true,
          User: {
            username: response.data.username,
            id: response.data.id
          }
        })
        this.$router.push("/dashboard");
      } catch (error) {
        alert("Login unsuccessful: " + error.response.data);
      }
    },
  },
};
</script>
<style scoped></style>
