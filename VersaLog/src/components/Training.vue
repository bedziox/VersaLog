<script setup lang="ts">
import { formatDate } from "@vueuse/core";
</script>

<script lang="ts">
import axios from "axios";
import { toast } from "vue-sonner";

export default {
  props: {
    trainingData: Object,
  },
  data() {
    return {
      isEditing: false,
      training: this.trainingData,
      statuses: ["New", "InProgress", "Done", "Cancelled", "Outdated"],
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
            toast.success("Training deleted successfully");
            this.$emit("forceUpdate");
          })
          .catch((error) => {
            toast.error("There was a problem during training deletion");
          });
      }
    },
    editTraining() {
      this.isEditing = !this.isEditing;
    },
    saveTraining() {
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL +
            `Training/${this.training.trainingId}`,
          this.trainingData,
        )
        .then((response) => {
          this.$emit("trainingUpdated", this.training);
          this.isEditing = false;
          toast.success("Training saved successfully");
        })
        .catch((error) => {
          toast.error("There was a problem during training saving");
        });
    },
    removeExercise(exerciseResult) {
      const index = this.training.exerciseResults.findIndex(
        (ex) => ex.exerciseResultId === exerciseResult.exerciseResultId,
      );
      if (index > -1) {
        this.training.exerciseResults.splice(index, 1);
      }
    },
    iconPicker(status) {
      switch (status) {
        case "New": {
          return "mdi-information-outline";
        }
        case "InProgress": {
          return "mdi-progress-check";
        }
        case "Done": {
          return "mdi-check";
        }
        case "Cancelled": {
          return "mdi-cancel";
        }
        case "Outdated": {
          return "mdi-calendar-lock";
        }
      }
    },
    getClassByStatus(status) {
      const statusClasses = {
        New: "border-new",
        InProgress: "border-inprogress",
        Done: "border-done",
        Cancelled: "border-cancelled",
        Outdated: "border-outdated",
      };
      return statusClasses[status] || "";
    },
    getClassByExerciseType(exerciseType) {
      const exerciseTypeClass = {
        Strength: "exercise-strength",
        Balance: "exercise-balance",
        Cycling: "exercise-cycling",
        Flexibility: "exercise-flexibility",
        Aerobic: "exercise-aerobic",
        Jogging: "exercise-jogging",
        TeamGame: "exercise-teamgame",
      };
      return exerciseTypeClass[exerciseType] || "";
    },
  },
};
</script>

<template>
  <v-card class="training-item" style="max-width: 600px; margin: 5px">
    <v-card-text v-if="!isEditing">
      <v-row>
        <v-col
          cols="12"
          :class="`date-status ${getClassByStatus(this.training.status)}`"
        >
          <span
            ><b>Date assigned:</b>
            {{ formatDate(new Date(this.training.dateAssigned), "DD-MM-YYYY") }}
            <v-icon>mdi-calendar</v-icon></span
          >
          <span
            ><b>Status: </b>{{ this.training.status }}
            <v-icon>{{ iconPicker(this.training.status) }}</v-icon></span
          >
        </v-col>
        <v-col cols="12" class="exercises-and-results">
          <template v-if="this.training.exerciseResults.length">
            <v-list
              v-for="exerciseResult in this.training.exerciseResults"
              :key="exerciseResult.id"
              style="margin: 5px"
            >
              <v-card
                :class="`${getClassByExerciseType(exerciseResult.exercise.type)}`"
                style="min-width: 5rem; min-height: 5rem; height: 10rem"
              >
                <v-card-title v-bind="props"
                  >{{ exerciseResult.exercise.name }}
                  <v-tooltip activator="parent" location="top"
                    >{{ exerciseResult.exercise.description }}
                  </v-tooltip></v-card-title
                >
                <v-card-subtitle>{{
                  exerciseResult.exercise.type
                }}</v-card-subtitle>
                <v-card-text
                  >{{ exerciseResult.sets }} /
                  {{ exerciseResult.reps }}</v-card-text
                >
                <v-card-text>{{ exerciseResult.result }}</v-card-text>
              </v-card>
            </v-list>
          </template>
        </v-col>
        <v-col>
          <span><b>Notes: </b></span>
          <v-card-text>
            {{ this.training.note }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text v-if="isEditing">
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Date"
            type="date"
            v-model="training.dateAssigned"
          />
        </v-col>
        <v-col cols="6">
          <v-select v-model="this.training.status" :items="this.statuses" />
        </v-col>
        <v-card-text>Exercises:</v-card-text>
        <v-col cols="12" class="exercises-and-results">
          <v-list
            v-for="exerciseResult in this.training.exerciseResults"
            :key="exerciseResult.id"
          >
            <v-card
              :class="`${getClassByExerciseType(exerciseResult.exercise.type)}`"
            >
              <v-card-text> {{ exerciseResult.exercise.name }}</v-card-text>
              <v-text-field label="Sets" v-model="exerciseResult.sets">
              </v-text-field>
              <v-text-field label="Reps" v-model="exerciseResult.reps">
              </v-text-field>
              <v-textarea label="Result" v-model="exerciseResult.result">
              </v-textarea>
              <v-btn
                icon="mdi-delete"
                @click="removeExercise(exerciseResult)"
              ></v-btn>
            </v-card>
          </v-list>
        </v-col>
        <v-col>
          <span>Notes:</span>
          <v-textarea v-model="this.training.note" clearable> </v-textarea>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn @click="editTraining">{{ isEditing ? "Cancel" : "Edit" }}</v-btn>
      <v-btn @click="saveTraining" v-if="isEditing" color="primary">Save</v-btn>
      <v-btn @click="deleteTraining" v-if="isEditing" color="error"
        >Delete</v-btn
      >
    </v-card-actions>
    <v-divider class="separator" />
  </v-card>
</template>

<style scoped>
.training-item .exercises-and-results {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.exercises-and-results {
  max-width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.date-status {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #ddd;
}
.v-text-field {
  min-width: 80%;
}
.v-card > .v-textarea {
  max-width: 80%;
}

.v-card {
  margin: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.v-list {
  width: 10rem;
}
.border-new {
  background-color: rgba(84, 231, 236, 0.2);
  border-radius: 10px;
}
.border-inprogress {
  background-color: rgba(39, 110, 250, 0.2);
  border-radius: 10px;
}
.border-done {
  background-color: rgba(92, 252, 38, 0.2);
  border-radius: 10px;
}
.border-cancelled {
  background-color: rgba(255, 22, 22, 0.2);
  border-radius: 10px;
}
.border-outdated {
  background-color: rgba(255, 249, 62, 0.2);
  border-radius: 10px;
}
.exercise-strength {
  background-color: rgba(250, 79, 79, 0.4);
}
.exercise-balance {
  background-color: rgba(146, 219, 229, 0.4);
}
.exercise-cycling {
  background-color: rgba(144, 238, 144, 0.4);
}
.exercise-flexibility {
  background-color: rgba(215, 174, 70, 0.4);
}
.exercise-aerobic {
  background-color: rgba(255, 105, 180, 0.4);
}
.exercise-jogging {
  background-color: rgba(204, 204, 255, 0.4);
}
.exercise-teamgame {
  background-color: rgba(247, 202, 201, 0.4);
}
</style>
