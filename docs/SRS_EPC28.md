# Especificación de requisitos - EPC28

## Metadatos

| Campo | Valor |
|---|---|
| ID único | SRS-EPC28-001 |
| Versión | v1.0 |
| Estado final | Verificado |
| Autor | Camilo Restrepo Rosas |
| Fecha de cierre | 21 de septiembre de 2026 |
| Artefactos relacionados | EPC28, PROTO-EPC28-001, TEST-EPC28-001, TRACE-EPC28-001 |

## 1. Objetivo

Documentar los requisitos del prototipo que permite asignar dietas seguras a pacientes. La solución relaciona el diagnóstico con el catálogo de dietas y revisa alergias e incompatibilidades antes de confirmar.

## 2. Alcance

El prototipo incluye selección del paciente, visualización de su contexto clínico, consulta de dietas relacionadas, identificación de conflictos, ficha técnica y confirmación de una dieta segura. Utiliza datos ficticios y persistencia local.

No incluye autenticación, backend, administración de catálogos ni conexión con historias clínicas reales.

## 3. Necesidad de negocio

| ID | Descripción | Fuente |
|---|---|---|
| EPC28 | Permitir que el médico asigne una dieta segura de acuerdo con la enfermedad, las alergias y las incompatibilidades del paciente. | Historia épica y criterios CA1 a CA4 entregados por el docente. |

## 4. Requisitos

| ID | Tipo | Requisito | Prioridad | Criterios relacionados |
|---|---|---|---|---|
| RF-EPC28-01 | Funcional | El sistema debe permitir seleccionar un paciente y mostrar su diagnóstico, alergias e incompatibilidades. | Must have | CA1 |
| RF-EPC28-02 | Funcional | El sistema debe mostrar automáticamente las dietas asociadas con la enfermedad registrada. | Must have | CA1 |
| RF-EPC28-03 | Funcional | El sistema debe comparar los componentes de cada dieta con las alergias e incompatibilidades del paciente. | Must have | CA2 |
| RF-EPC28-04 | Funcional | El sistema debe identificar el alimento en conflicto y bloquear la asignación de una dieta insegura. | Must have | CA2 |
| RF-EPC28-05 | Funcional | El sistema debe mostrar la ficha técnica completa sin perder el contexto del paciente. | Must have | CA3 |
| RF-EPC28-06 | Funcional | El sistema debe confirmar y guardar localmente la asignación de una dieta segura. | Must have | CA2 |
| RNF-EPC28-01 | No funcional | Un usuario nuevo debe poder elegir una dieta segura en menos de 90 segundos sin pasar por alto las alertas. | Must have | CA4 |

## 5. Criterios de aceptación

- **CA1:** dado un paciente con una enfermedad registrada, el sistema muestra las dietas asociadas en un único paso.
- **CA2:** si una dieta contiene un alimento alérgeno o incompatible, el sistema lo señala de forma inequívoca antes de confirmar.
- **CA3:** el médico accede a la ficha técnica completa de la dieta sin perder el contexto del paciente.
- **CA4:** un usuario nuevo elige una dieta segura en menos de 90 segundos sin pasar por alto ninguna alerta.

## 6. Reglas de negocio

1. Solo se muestran dietas relacionadas con al menos una enfermedad registrada del paciente.
2. Una coincidencia con una alergia genera un conflicto crítico.
3. Una coincidencia con una incompatibilidad genera una advertencia y bloquea la asignación.
4. Las dietas seguras aparecen antes que las dietas con conflictos.
5. Solo una dieta sin conflictos puede confirmarse.

## 7. Datos y limitaciones

Los pacientes, diagnósticos y dietas son ficticios. La asignación se guarda en `localStorage` únicamente para demostrar persistencia. El prototipo no debe utilizarse para tomar decisiones médicas reales.

