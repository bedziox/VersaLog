<script setup lang="ts">
import TrainingHistory from "@/components/user/TrainingHistory.vue";
import AddTraining from "@/components/user/AddTraining.vue";
import { useUserStore } from "@/stores/user";
import AddTrainingAdmin from "@/components/admin/AddTrainingAdmin.vue";
import TrainingHistoryAdmin from "@/components/admin/TrainingHistoryAdmin.vue";
import AdminUserSelect from "@/components/admin/AdminUserSelect.vue";
import { useSelectedUserStore } from "@/stores/selectedUser";
import TodayTraining from "@/components/user/TodayTraining.vue";
const userStore = useUserStore();
const selectedUserStore = useSelectedUserStore();
</script>
<script lang="ts">
import { useSelectedUserStore } from "@/stores/selectedUser";

export default {
  methods: {
    receiveUser(user) {
      const selectedUserStore = useSelectedUserStore();
      selectedUserStore.$patch({ User: user });
    },
  },
};
</script>

<template class="flex-column">
  <v-card>
    <h1>DASHBOARD</h1>
    <AdminUserSelect
      v-if="userStore.$state.isAdmin"
      v-on:userSelected="receiveUser"
    ></AdminUserSelect>
    <TodayTraining></TodayTraining>
    <v-divider class="separator"></v-divider>
    <TrainingHistory v-if="!userStore.$state.isAdmin"></TrainingHistory>
    <TrainingHistoryAdmin
      v-if="userStore.$state.isAdmin"
      :selected-user="selectedUserStore.User"
    >
    </TrainingHistoryAdmin>
    <v-divider class="separator"></v-divider>
    <AddTraining v-if="!userStore.$state.isAdmin"></AddTraining>
    <AddTrainingAdmin
      v-if="userStore.$state.isAdmin"
      :selected-user="selectedUserStore.User"
    ></AddTrainingAdmin>
  </v-card>
</template>

<style scoped>
.separator {
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  margin-bottom: 10px;
  opacity: 100%;
}
.v-card {
  padding: 15px;
}
</style>
