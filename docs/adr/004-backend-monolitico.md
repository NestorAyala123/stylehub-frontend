# ADR 004 – Estructura Monolítica Modular en el Backend

## Estado
Aceptado

## Contexto
El equipo necesitaba un backend simple para manejar enrutamiento, autenticación y conexión con Supabase sin complejidad adicional.

## Decisión
Se decidió implementar un backend monolítico modular usando Node.js y Express, organizando el código en módulos separados según funcionalidad.

## Alternativas consideradas
- Microservicios: excesivamente complejo para la escala actual del proyecto.
- NestJS: demasiado robusto para la necesidad inicial.

## Consecuencias
Se logra rapidez de desarrollo y menor curva de aprendizaje, pero puede dificultar la escalabilidad si el sistema crece en el futuro.
