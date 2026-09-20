# Asignación segura de dietas — EPC28

Prototipo académico de alta fidelidad para validar la asignación de tratamientos nutricionales de acuerdo con la enfermedad, las alergias y las incompatibilidades registradas de un paciente.

> Todos los nombres y datos clínicos incluidos son ficticios y se utilizan únicamente con fines académicos.

## Criterios cubiertos

- **CA1:** muestra en un único paso las dietas asociadas con la enfermedad registrada.
- **CA2:** identifica de forma inequívoca alérgenos e incompatibilidades antes de confirmar.
- **CA3:** permite consultar la ficha técnica completa sin perder el contexto del paciente.
- **CA4:** propone un flujo breve y jerarquizado para seleccionar una dieta segura en menos de 90 segundos.

## Tecnologías

- React
- TypeScript
- Vite
- CSS responsive
- Vitest
- Persistencia local con `localStorage`

## Ejecución local

```bash
npm install
npm run dev
```

## Verificaciones

```bash
npm test
npm run build
```

## Alcance

El prototipo simula el cruce entre una historia clínica y un catálogo de dietas. No incluye autenticación, backend ni datos personales reales.

## Documentación académica

- [Misión 7: Prototipado rápido](docs/MISION_7_PROTOTIPADO.md)
- [Guía de prueba con usuarios](docs/GUIA_PRUEBA_USUARIO.md)
- [Misión 8: Comité de Control de Cambios](docs/MISION_8_CCB.md)
- [Matriz de trazabilidad](docs/MATRIZ_TRAZABILIDAD.md)
