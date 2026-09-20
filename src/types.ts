export type Severity = "critical" | "warning";

export interface Disease {
  id: string;
  name: string;
  shortName: string;
}

export interface Patient {
  id: string;
  name: string;
  document: string;
  age: number;
  sex: string;
  diseaseIds: string[];
  allergies: string[];
  incompatibilities: string[];
  currentTreatment?: string;
}

export interface Ingredient {
  name: string;
  allergens?: string[];
  incompatibilities?: string[];
}

export interface Diet {
  id: string;
  name: string;
  summary: string;
  objective: string;
  diseaseIds: string[];
  calories: string;
  duration: string;
  frequency: string;
  route: string;
  ingredients: Ingredient[];
  recommendations: string[];
}

export interface Conflict {
  type: "allergy" | "incompatibility";
  severity: Severity;
  ingredient: string;
  patientCondition: string;
  message: string;
}

export interface DietEvaluation {
  diet: Diet;
  conflicts: Conflict[];
  isSafe: boolean;
  matchScore: number;
}

export interface Assignment {
  patientId: string;
  dietId: string;
  assignedAt: string;
}
