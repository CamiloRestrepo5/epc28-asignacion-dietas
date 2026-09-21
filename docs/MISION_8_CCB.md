# Misión 8 — Comité de Control de Cambios

## Metadatos

| Campo | Valor |
|---|---|
| ID único | CCB-EPC28-001 |
| Versión | v1.0 |
| Estado final | Cerrada |
| Autor | Camilo Restrepo Rosas |
| Fecha de cierre | 20 de septiembre de 2026 |
| Artefactos relacionados | VAL-EPC28-001, DEF-001, RFC-EPC28-001, RFC-EPC28-002, RFC-EPC28-003 |

## 1. Propósito

Simular una reunión del Comité de Control de Cambios para evaluar los ajustes identificados durante la validación del prototipo. Las decisiones deben considerar las perspectivas de negocio, desarrollo, calidad y usuario.

## 2. Integrantes requeridos

| Rol | Responsabilidad | Integrante |
|---|---|---|
| Representante de negocio | Verificar el valor y el alcance de EPC28. | Rol simulado |
| Líder de desarrollo | Estimar viabilidad, esfuerzo e impacto técnico. | Rol simulado |
| Responsable de calidad | Analizar pruebas, defectos y riesgos. | Rol simulado |
| Representante clínico o del usuario | Evaluar claridad y seguridad del flujo. | Rol simulado |

## 3. Información de entrada

- Historia épica EPC28.
- Criterios de aceptación CA1 a CA4.
- Prototipo funcional.
- Resultados de las pruebas automáticas.
- Resultados de la prueba con usuarios.
- Registro de defectos.
- Matriz de trazabilidad.

## 4. Agenda de la reunión

1. Presentación del objetivo y el alcance.
2. Revisión de los resultados de validación.
3. Presentación de cada defecto o solicitud de cambio.
4. Análisis del impacto en negocio, desarrollo, calidad y usuario.
5. Revisión de riesgos y criterios de aceptación.
6. Decisión: aprobar, rechazar o aplazar.
7. Asignación de responsable y fecha objetivo.
8. Actualización de la matriz de trazabilidad.

## 5. Acta de la reunión

| Campo | Información |
|---|---|
| Fecha | 20 de septiembre de 2026 |
| Hora de inicio | No aplica: simulación académica |
| Hora de finalización | No aplica: simulación académica |
| Modalidad | Simulación académica |
| Participantes | Roles de negocio, desarrollo, calidad y usuario clínico |
| Objetivo | Evaluar los cambios identificados durante la validación de EPC28. |

## 6. Evaluación de cambios

| ID | Origen | Cambio propuesto | Beneficio | Impacto técnico | Riesgo | Decisión | Responsable |
|---|---|---|---|---|---|---|---|
| RFC-EPC28-001 (SC-001) | Validación de usabilidad | Reducir el tamaño del encabezado principal. | Facilita llegar al flujo y apoya CA4. | Bajo | Bajo | Aprobada e implementada | Desarrollo |
| RFC-EPC28-002 (SC-002) | Revisión de claridad y seguridad | Mantener visible el contexto del paciente y mejorar el contraste. | Refuerza CA2 y CA3. | Bajo-medio | Bajo | Aprobada e implementada | Desarrollo y calidad |
| RFC-EPC28-003 (SC-003) | DEF-001 | Agregar una opción visible para reiniciar la demostración. | Facilita repetir las pruebas. | Bajo | Bajo | Aplazada | Desarrollo |

## 7. Criterios de decisión

Un cambio se aprobará cuando:

- Corrija un riesgo de seguridad.
- Sea necesario para cumplir CA1, CA2, CA3 o CA4.
- Tenga un esfuerzo proporcional al beneficio.
- No introduzca una contradicción con otro requisito.
- Pueda verificarse mediante una prueba concreta.

Un cambio podrá aplazarse cuando aporte valor, pero no sea necesario para cumplir la actividad. Se rechazará si amplía el alcance sin relación con EPC28 o si duplica una función existente.

## 8. Cierre

El CCB aprobó los dos cambios que mejoraban la comprensión y la continuidad del contexto sin ampliar el alcance. La opción de reinicio quedó aplazada por su baja prioridad. La matriz de trazabilidad y el registro de cambios fueron actualizados con las decisiones.
