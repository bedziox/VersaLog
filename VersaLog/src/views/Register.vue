<script setup lang="ts"></script>

<template>
  <div class="container">
    <v-sheet class="mx-auto">
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
          label="Password"
          placeholder="Your password"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="Email"
          label="Email"
          placeholder="example@email.com"
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-2">Register</v-btn>
      </v-form>
      <div class="login-span">
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
import { toast } from "vue-sonner";
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
        this.$refs.form.reset();
        toast.success("Registration successful");
        this.$router.push("/");
      } catch (error) {
        toast.error("Registration unsuccessful: " + error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.v-sheet {
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  padding: 3rem 0;
  align-items: center;
  width: 25vw;
}
.v-form {
  width: 80%;
}
.login-span {
  padding: 0 10px;
}
</style>
