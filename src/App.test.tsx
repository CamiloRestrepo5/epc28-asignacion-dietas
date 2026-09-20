// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("flujo principal de EPC28", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("muestra las dietas de Laura y bloquea las que tienen conflictos", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Dietas asociadas" })).toBeTruthy();
    expect(screen.getAllByRole("article").filter((item) => item.classList.contains("diet-card"))).toHaveLength(3);

    const assignmentButtons = screen.getAllByRole("button", { name: "Asignar dieta" });
    expect(assignmentButtons).toHaveLength(3);
    expect(assignmentButtons.filter((button) => button.hasAttribute("disabled"))).toHaveLength(2);
    expect(screen.getByText(/Nueces contiene frutos secos/i)).toBeTruthy();
    expect(screen.getByText(/Yogur natural contiene lactosa/i)).toBeTruthy();
  });

  it("mantiene el contexto del paciente dentro de la ficha técnica", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "Ver ficha técnica" })[0]);
    const dialog = screen.getByRole("dialog", { name: "Plan vegetal de bajo índice glucémico" });

    expect(within(dialog).getByText("Contexto del paciente")).toBeTruthy();
    expect(within(dialog).getByText("Laura Martínez")).toBeTruthy();
    expect(within(dialog).getByText("Diabetes mellitus tipo 2")).toBeTruthy();
  });

  it("confirma y conserva localmente una asignación segura", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "Asignar dieta" })[0]);
    const confirmation = screen.getByRole("dialog", { name: "Confirmar asignación" });
    expect(within(confirmation).getByText("Verificación completada")).toBeTruthy();

    await user.click(within(confirmation).getByRole("button", { name: "Confirmar y asignar" }));

    expect(screen.getByRole("status").textContent).toContain("Asignación completada");
    expect(localStorage.getItem("epc28-diet-assignment")).toContain("diet-001");
  });
});
