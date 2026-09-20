# Misión 7 — Prototipado rápido

## 1. Objetivo

Construir y validar un prototipo funcional de alta fidelidad que permita a un médico seleccionar una dieta segura para un paciente. La solución cruza la enfermedad registrada con el catálogo de dietas y verifica alergias e incompatibilidades antes de confirmar la asignación.

El prototipo utiliza únicamente datos ficticios con fines académicos.

## 2. Alcance

La solución se concentra en la historia épica EPC28. Incluye la consulta del contexto clínico, la recomendación de dietas, la identificación de conflictos, la consulta de la ficha técnica y la confirmación de una dieta segura.

No incluye autenticación, backend, inteligencia artificial ni administración completa de los catálogos, debido a que estas funciones no son necesarias para validar los criterios entregados.

## 3. Requisitos funcionales priorizados

| ID | Requisito funcional | Prioridad |
|---|---|---|
| RF-EPC28-01 | El sistema debe permitir seleccionar un paciente y consultar su enfermedad, alergias e incompatibilidades registradas. | Alta |
| RF-EPC28-02 | El sistema debe mostrar automáticamente las dietas asociadas con la enfermedad del paciente. | Alta |
| RF-EPC28-03 | El sistema debe comparar los componentes de cada dieta con las alergias e incompatibilidades del paciente. | Alta |
| RF-EPC28-04 | El sistema debe mostrar el alimento que produce el conflicto y bloquear la asignación de una dieta insegura. | Alta |
| RF-EPC28-05 | El sistema debe mostrar la ficha técnica de la dieta sin perder el contexto del paciente. | Alta |
| RF-EPC28-06 | El sistema debe permitir confirmar y registrar localmente la asignación de una dieta segura. | Alta |

### Requisito no funcional

| ID | Requisito | Prioridad |
|---|---|---|
| RNF-EPC28-01 | Un usuario nuevo debe poder elegir una dieta segura en menos de 90 segundos, sin pasar por alto ninguna alerta. | Alta |

## 4. Diseño técnicamente viable

El prototipo se construyó con React, TypeScript y Vite. Los pacientes, enfermedades y dietas se almacenan como datos locales. La compatibilidad se calcula mediante reglas determinísticas, por lo que el resultado puede verificarse y repetirse.

El motor de compatibilidad realiza las siguientes operaciones:

1. Filtra las dietas relacionadas con la enfermedad registrada.
2. Revisa los alérgenos de cada ingrediente.
3. Revisa las incompatibilidades de cada ingrediente.
4. Clasifica primero las dietas seguras.
5. Deshabilita la asignación cuando existe algún conflicto.

La asignación confirmada se guarda en el almacenamiento local del navegador para simular la persistencia sin utilizar información real ni un servidor.

## 5. Decisiones de experiencia de usuario

- El contexto clínico permanece visible mientras se revisan las dietas.
- Las dietas seguras se muestran antes que las dietas con alertas.
- Las alertas combinan texto, iconos y color.
- La advertencia identifica el alimento y la condición registrada.
- El botón de asignación queda deshabilitado cuando la dieta no es segura.
- La ficha técnica se abre en un panel lateral e incluye nuevamente el contexto del paciente.
- El flujo se divide en tres pasos visibles: paciente, dieta y confirmación.

## 6. Casos de prueba

| ID | Escenario | Resultado esperado | Estado inicial |
|---|---|---|---|
| CP-01 | Seleccionar un paciente con diabetes tipo 2. | Se muestran únicamente las dietas asociadas con la enfermedad. | Automatizado: aprobado |
| CP-02 | Revisar una dieta que contiene frutos secos para un paciente alérgico. | Se identifica el ingrediente, se muestra la alerta y se bloquea la asignación. | Automatizado: aprobado |
| CP-03 | Revisar una dieta con lactosa para un paciente incompatible. | Se identifica el ingrediente, se muestra la alerta y se bloquea la asignación. | Automatizado: aprobado |
| CP-04 | Revisar el orden de resultados. | Las dietas seguras aparecen antes que las dietas con conflictos. | Automatizado: aprobado |
| CP-05 | Abrir una ficha técnica. | Se conserva dentro del panel el nombre y el diagnóstico del paciente. | Automatizado: aprobado |
| CP-06 | Confirmar una dieta segura. | La asignación se registra y aparece un mensaje de confirmación. | Automatizado: aprobado |
| CP-07 | Realizar el flujo como usuario nuevo. | El usuario selecciona una dieta segura en menos de 90 segundos y reconoce todas las alertas. | Pendiente de prueba con usuario |

## 7. Lista de verificación

| Criterio | Pregunta de control | Estado inicial |
|---|---|---|
| Corrección | ¿La recomendación se basa en la enfermedad registrada? | Cumple |
| Completitud | ¿El flujo permite consultar, revisar y confirmar? | Cumple |
| Consistencia | ¿Los estados seguros y bloqueados se muestran de la misma manera? | Cumple |
| Claridad | ¿Cada alerta explica qué alimento produce el conflicto? | Cumple |
| Verificabilidad | ¿Cada requisito tiene al menos un caso de prueba? | Cumple |
| Viabilidad | ¿La solución puede ejecutarse sin servicios externos? | Cumple |
| Trazabilidad | ¿Los criterios se relacionan con requisitos, componentes y pruebas? | Cumple |
| Usabilidad | ¿Un usuario nuevo completa el flujo en menos de 90 segundos? | Pendiente de prueba |

## 8. Registro de defectos

Los defectos encontrados durante la prueba con usuarios se registrarán antes de simular la reunión del CCB.

| ID | Requisito | Descripción | Severidad | Responsable | Estado |
|---|---|---|---|---|---|
| Pendiente | Pendiente | Se completa con los resultados reales de la validación. | Pendiente | Pendiente | Pendiente |

### Escala de severidad

- **Crítica:** permite asignar una dieta insegura o impide completar la tarea.
- **Alta:** dificulta reconocer una alerta o tomar una decisión segura.
- **Media:** genera confusión, pero existe una alternativa clara para continuar.
- **Baja:** afecta principalmente la presentación y no altera la decisión.
