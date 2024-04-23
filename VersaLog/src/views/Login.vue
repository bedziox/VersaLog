<script setup lang="ts"></script>

<template>
  <div class="container">
    <v-sheet class="">
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
          type="password"
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="">Login</v-btn>
      </v-form>
      <div class="register-span">
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
import { useUserStore } from "@/stores/user.js";
import { onMounted } from "vue";
import { toast } from "vue-sonner";
async function loadExercises() {
  try {
    const userStore = useUserStore();
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "Training/user",
      {
        params: {
          userId: userStore.getId,
        },
      },
    );
    userStore.$patch({
      Trainings: response.data,
    });
  } catch (error) {
    toast.error("Something wrong " + error.response.data);
  }
}
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
        toast.success("Login successful");
        localStorage.setItem("jwtToken", response.data.token);
        userStore.$patch({
          isLoggedIn: true,
          isAdmin: response.data.role === "Admin",
          User: {
            username: response.data.username,
            id: response.data.id,
          },
        });
        localStorage.setItem("id", userStore.getId);
        await loadExercises();
        if (userStore.$state.isAdmin == true) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/dashboard");
        }
      } catch (error) {
        toast.error("Login unsuccessful: " + error.response.data);
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
.register-span {
  padding: 0 10px;
}
</style>
