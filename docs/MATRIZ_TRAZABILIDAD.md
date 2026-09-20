# Matriz de trazabilidad — EPC28

| Épica | Criterio | Requisito | Componente | Regla o comportamiento | Prueba | Estado |
|---|---|---|---|---|---|---|
| EPC28 | CA1 | RF-EPC28-01 | Selector y resumen del paciente | La selección actualiza el contexto clínico. | CP-01 | Implementado |
| EPC28 | CA1 | RF-EPC28-02 | Lista de dietas asociadas | Solo aparecen dietas vinculadas con la enfermedad. | CP-01 | Implementado |
| EPC28 | CA2 | RF-EPC28-03 | Motor de compatibilidad | Cruza ingredientes con alergias e incompatibilidades. | CP-02, CP-03 | Implementado |
| EPC28 | CA2 | RF-EPC28-04 | Tarjeta de dieta y botón de asignación | Muestra el alimento conflictivo y bloquea la acción. | CP-02, CP-03 | Implementado |
| EPC28 | CA3 | RF-EPC28-05 | Panel de ficha técnica | Conserva nombre y diagnóstico del paciente. | CP-05 | Implementado y probado |
| EPC28 | CA2 | RF-EPC28-06 | Modal de confirmación | Solo permite confirmar dietas sin conflictos. | CP-06 | Implementado y probado |
| EPC28 | CA4 | RNF-EPC28-01 | Flujo completo | La tarea se realiza sin ayuda en menos de 90 segundos. | CP-07 | Pendiente de prueba con usuarios |

## Actualización después del CCB

Las solicitudes de cambio aprobadas se agregarán como nuevas filas, relacionando el defecto de origen, el componente modificado, la prueba de regresión y la decisión del comité.
