<script setup lang="ts">
import Exercise from "@/components/Exercise.vue";
</script>

<script lang="ts">
import axios from "axios";

export default {
  props: {
    trainingData: Object,
  },
  data() {
    return {
      isEditing: false,
      training: this.trainingData,
    };
  },
  created() {},

  methods: {
    deleteTraining() {
      if (confirm("Are you sure?")) {
        const response = axios
          .delete(
            import.meta.env.VITE_BACKEND_URL +
              `Training?trainingId=${this.training.trainingId}`,
          )
          .then((response) => {
            this.$emit("trainingDeleted", this.training.id);
            alert("Training deleted successfully");
          })
          .catch((error) => {
            alert("There was a problem during training deletion");
          });
      }
    },
    editTraining() {
      this.isEditing = !this.isEditing;
    },
    saveTraining() {
      // Implement logic to send updated training data to your backend API
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL +
            `Training/${this.training.trainingId}`,
          this.trainingData,
        )
        .then((response) => {
          this.$emit("trainingUpdated", this.training); // Notify parent of update
          this.isEditing = false;
          alert("Training saved successfully");
        })
        .catch((error) => {
          alert("There was a problem during training saving");
        });
    },
  },
};
</script>
<template>
  <div class="training-item">
    <template v-if="!isEditing">
      <span class="date">{{ Date(training.date) }}</span>
      <span class="status">{{ trainingData.status }}</span>
      <span class="exercises">
        <template v-if="trainingData.exercises.length">
          Exercises:
          <ol>
            <li v-for="exercise in trainingData.exercises" :key="exercise.id">
              {{ exercise.name }}
            </li>
          </ol>
        </template>
      </span>
      <span class="results">
        <template v-if="trainingData.results.length">
          Results:
          <ol>
            <li v-for="result in trainingData.results" :key="result.id">
              {{ result.name }}: {{ result.value }}
            </li>
          </ol>
        </template>
      </span>
    </template>

    <template v-if="isEditing">
      <input type="text" v-model="trainingData.date" placeholder="Date" />
      <select v-model="trainingData.status">
        <option value="new">New</option>
        <option value="completed">Completed</option>
        <option value="inProgress">In progress</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <div class="exercise-list">
        <ol>
          <li v-for="exercise in trainingData.exercises" :key="exercise.id">
            <input type="text" v-model="exercise.name" placeholder="Exercise" />
          </li>
        </ol>
      </div>
      <div class="result-list">
        <ol>
          <li v-for="result in trainingData.results" :key="result.id">
            <input
              type="text"
              v-model="result.name"
              placeholder="Result Name"
            />
            <input
              type="text"
              v-model="result.value"
              placeholder="Result Value"
            />
          </li>
        </ol>
      </div>
    </template>

    <div class="actions">
      <button @click="editTraining">
        {{ isEditing ? "Cancel" : "Edit" }}
      </button>
      <button @click="saveTraining" v-if="isEditing">Save</button>
      <button @click="deleteTraining" v-if="isEditing">Delete</button>
    </div>
  </div>
</template>

CSS

<style scoped>
.training-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%; /* Added width for consistent size */
}

.training-item span {
  margin-right: 10px;
  /* Added flex: 1 for equal width distribution */
  flex: 1;
}

.training-item .actions {
  margin-left: auto;
}

.date {
  font-weight: bold;
}

.exercises,
.results {
  font-style: italic;
  margin-right: 20px;
  /* Added flex: 1 for equal width distribution */
  flex: 1;
}

.exercise-list,
.result-list {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.exercise-list li,
.result-list li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.result-list li input {
  margin-right: 5px;
  flex: 1;
}

/* Added styles for separator */
.separator {
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 10px;
}
</style>
