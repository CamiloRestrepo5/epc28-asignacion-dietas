# Matriz de trazabilidad — EPC28

## Metadatos

| Campo | Valor |
|---|---|
| ID único | TRACE-EPC28-001 |
| Versión | v1.0 |
| Estado final | Verificada |
| Autor | Camilo Restrepo Rosas |
| Fecha de cierre | 21 de septiembre de 2026 |
| Artefactos relacionados | SRS-EPC28-001, TEST-EPC28-001, RFC-REG-EPC28-001, AUD-EPC28-001 |

| Épica | Criterio | Requisito | Componente | Regla o comportamiento | Prueba | Estado |
|---|---|---|---|---|---|---|
| EPC28 | CA1 | RF-EPC28-01 | Selector y resumen del paciente | La selección actualiza el contexto clínico. | CP-01 | Implementado |
| EPC28 | CA1 | RF-EPC28-02 | Lista de dietas asociadas | Solo aparecen dietas vinculadas con la enfermedad. | CP-01 | Implementado |
| EPC28 | CA2 | RF-EPC28-03 | Motor de compatibilidad | Cruza ingredientes con alergias e incompatibilidades. | CP-02, CP-03 | Implementado |
| EPC28 | CA2 | RF-EPC28-04 | Tarjeta de dieta y botón de asignación | Muestra el alimento conflictivo y bloquea la acción. | CP-02, CP-03 | Implementado |
| EPC28 | CA3 | RF-EPC28-05 | Panel de ficha técnica | Conserva nombre y diagnóstico del paciente. | CP-05 | Implementado y probado |
| EPC28 | CA2 | RF-EPC28-06 | Modal de confirmación | Solo permite confirmar dietas sin conflictos. | CP-06 | Implementado y probado |
| EPC28 | CA4 | RNF-EPC28-01 | Flujo completo | La tarea se realiza sin ayuda en menos de 90 segundos. | CP-07 | Verificado mediante simulación |

## Actualización después del CCB

- RFC-EPC28-001 (SC-001) se relaciona con RF-EPC28-01 y RNF-EPC28-01. Fue aprobada e implementada.
- RFC-EPC28-002 (SC-002) se relaciona con RF-EPC28-03, RF-EPC28-04 y RF-EPC28-05. Fue aprobada e implementada.
- RFC-EPC28-003 (SC-003) se relaciona con RNF-EPC28-01 y DEF-001. Quedó aplazada.
