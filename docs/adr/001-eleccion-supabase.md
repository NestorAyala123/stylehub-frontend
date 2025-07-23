# ADR 001 – Elección de Supabase como Base de Datos y Autenticación

## Estado
Aceptado

## Contexto
Se necesitaba una solución backend que integrara una base de datos relacional con servicios de autenticación seguros y fáciles de implementar, sin requerir una configuración avanzada.

## Decisión
Se eligió Supabase, que proporciona una base de datos PostgreSQL administrada y autenticación lista para usar, todo bajo una API sencilla.

## Alternativas consideradas
- Firebase: buena opción pero con base de datos NoSQL, lo cual no se ajustaba al modelo relacional del proyecto.
- PostgreSQL autohospedado: requería más tiempo de configuración y mantenimiento.

## Consecuencias
Se obtiene una solución escalable, segura y gratuita para entornos de desarrollo. Se limita algo la personalización avanzada del backend, ya que gran parte depende de Supabase.
