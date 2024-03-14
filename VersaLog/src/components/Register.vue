<script setup lang="ts"></script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="submitForm" ref="form">
        <v-text-field
          v-model="FirstName"
          label="First Name"
          placeholder="John"
        ></v-text-field>
        <v-text-field
          v-model="LastName"
          label="Last Name"
          placeholder="Lemon"
        ></v-text-field>
        <v-text-field
          v-model="Username"
          label="Username"
          placeholder="Your username"
        ></v-text-field>
        <v-text-field
          v-model="Password"
          label="password"
          placeholder="Your password"
        ></v-text-field>
        <v-text-field
          v-model="Email"
          label="Email"
          placeholder="example@email.com"
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-2">Register</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Already have an account?
          <v-btn><router-link to="/login">Login</router-link></v-btn>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import axios from "axios";
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
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "Auth/register/",
          this.$data,
        );
        console.log("User registration response:", response.data);
        this.$refs.form.reset();
        alert("Registration successful");
        this.$router.push("/");
      } catch (error) {
        alert("Registration unsuccessful: " + error.response.data);
      }
    },
  },
};
</script>

<style scoped></style>
