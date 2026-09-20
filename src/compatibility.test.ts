import { describe, expect, it } from "vitest";
import { diets, patients } from "./data";
import { evaluateDiet, getAssociatedDiets } from "./compatibility";

describe("motor de compatibilidad EPC28", () => {
  it("muestra únicamente dietas asociadas a la enfermedad del paciente", () => {
    const results = getAssociatedDiets(diets, patients[0]);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(({ diet }) => diet.diseaseIds.includes("dm2"))).toBe(true);
  });

  it("detecta un alérgeno antes de asignar la dieta", () => {
    const evaluation = evaluateDiet(diets[1], patients[0]);
    expect(evaluation.isSafe).toBe(false);
    expect(evaluation.conflicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "allergy", ingredient: "Nueces" }),
      ]),
    );
  });

  it("detecta una incompatibilidad antes de asignar la dieta", () => {
    const evaluation = evaluateDiet(diets[2], patients[0]);
    expect(evaluation.isSafe).toBe(false);
    expect(evaluation.conflicts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "incompatibility", ingredient: "Yogur natural" }),
      ]),
    );
  });

  it("prioriza las dietas seguras", () => {
    const results = getAssociatedDiets(diets, patients[0]);
    expect(results[0].isSafe).toBe(true);
    expect(results.at(-1)?.isSafe).toBe(false);
  });
});
