# ADR 002 – Elección de Astro como Framework para el Frontend

## Estado
Aceptado

## Contexto
El frontend necesitaba ser rápido, optimizado para SEO y con tiempos de carga mínimos, ya que se trata de una plataforma de e-commerce.

## Decisión
Se optó por Astro, un framework moderno que permite generar sitios estáticos y también usar renderizado del lado del servidor (SSR) cuando es necesario.

## Alternativas consideradas
- React/Next.js: muy robusto, pero más pesado para un proyecto enfocado en velocidad y simplicidad.
- Vue/Nuxt: buena opción, pero el equipo tenía mayor experiencia con Astro.

## Consecuencias
El frontend es muy rápido y fácil de desplegar con Vercel, pero puede requerir configuraciones adicionales para funcionalidades más complejas de e-commerce.
