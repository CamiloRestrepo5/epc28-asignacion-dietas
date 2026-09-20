import type { Conflict, Diet, DietEvaluation, Patient, Severity } from "./types";

const normalize = (value: string) => value.trim().toLocaleLowerCase("es");

export function evaluateDiet(diet: Diet, patient: Patient): DietEvaluation {
  const patientAllergies = new Set(patient.allergies.map(normalize));
  const patientIncompatibilities = new Set(patient.incompatibilities.map(normalize));
  const conflicts: Conflict[] = [];

  for (const ingredient of diet.ingredients) {
    for (const allergen of ingredient.allergens ?? []) {
      if (patientAllergies.has(normalize(allergen))) {
        conflicts.push({
          type: "allergy",
          severity: "critical",
          ingredient: ingredient.name,
          patientCondition: allergen,
          message: `${ingredient.name} contiene ${allergen}, registrado como alergia del paciente.`,
        });
      }
    }

    for (const incompatibility of ingredient.incompatibilities ?? []) {
      if (patientIncompatibilities.has(normalize(incompatibility))) {
        conflicts.push({
          type: "incompatibility",
          severity: "warning",
          ingredient: ingredient.name,
          patientCondition: incompatibility,
          message: `${ingredient.name} contiene ${incompatibility}, registrado como incompatibilidad del paciente.`,
        });
      }
    }
  }

  const matchedDiseases = diet.diseaseIds.filter((id) => patient.diseaseIds.includes(id)).length;
  const matchScore = Math.round((matchedDiseases / patient.diseaseIds.length) * 100);

  return {
    diet,
    conflicts,
    isSafe: conflicts.length === 0,
    matchScore,
  };
}

export function getAssociatedDiets(diets: Diet[], patient: Patient): DietEvaluation[] {
  return diets
    .filter((diet) => diet.diseaseIds.some((id) => patient.diseaseIds.includes(id)))
    .map((diet) => evaluateDiet(diet, patient))
    .sort((a, b) => {
      if (a.isSafe !== b.isSafe) return a.isSafe ? -1 : 1;
      return b.matchScore - a.matchScore;
    });
}

export function getWorstSeverity(conflicts: Conflict[]): Severity | null {
  if (conflicts.some((conflict) => conflict.severity === "critical")) return "critical";
  return conflicts.length > 0 ? "warning" : null;
}
