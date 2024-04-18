import type { Exercise } from "@/stores/exercise";

export interface User {
  username: string;
  id: number;
  Trainings: Training[];
}

export interface Training {
  id: number;
  date: Date;
  status: string;
  exercises: Exercise[];
  results: string[];
}
