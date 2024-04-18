<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import TrainingSummaryAdmin from "@/components/admin/TrainingSummaryAdmin.vue";
const userStore = useUserStore();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import TrainingSummary from "@/components/user/TrainingSummary.vue";
import TrainingSummaryAdmin from "@/components/admin/TrainingSummaryAdmin.vue";

export default defineComponent({
  name: "Summary",
  components: { TrainingSummary },
});
</script>

<template>
  <v-card style="max-width: 60rem; min-width: 40rem">
    <v-card-title>Training summary</v-card-title>
    <v-divider class="separator"></v-divider>
    <TrainingSummary v-if="!userStore.$state.isAdmin"></TrainingSummary>
    <TrainingSummaryAdmin
      v-if="userStore.$state.isAdmin"
    ></TrainingSummaryAdmin>
  </v-card>
</template>

<style scoped></style>
