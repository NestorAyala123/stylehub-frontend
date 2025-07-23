# ADR 005 – Elección de Render y Vercel para Despliegue

## Estado
Aceptado

## Contexto
El equipo necesitaba plataformas de despliegue sencillas, gratuitas y con buena integración con GitHub.

## Decisión
Se eligió Vercel para el frontend (por su compatibilidad directa con Astro) y Render para el backend Node.js.

## Alternativas consideradas
- Heroku: buena opción pero con cambios recientes en los planes gratuitos.
- Railway: potente pero menos especializado para Astro.

## Consecuencias
Se logró automatizar el despliegue desde GitHub sin complicaciones, pero depender de plataformas externas implica limitaciones si cambian sus planes o políticas.
