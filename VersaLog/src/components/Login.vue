<script setup lang="ts">
</script>

<template>
  <v-form class="w-50">
    <v-container>
      <v-col class="">
        <v-row>
          <v-text-field
              label="Username or email"
              hide-details
              required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              label="Password"
              hide-details
              required
          ></v-text-field>
        </v-row>
        <v-btn>Submit</v-btn>
      </v-col>
    </v-container>
  </v-form>
</template>

<style scoped>

</style>