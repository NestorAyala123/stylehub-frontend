# 🛍️ StyleHub – Plataforma de E-commerce de Moda

**StyleHub** es una plataforma de venta de ropa que permite a los usuarios explorar un catálogo de productos, simular inicio de sesión y visualizar una interfaz moderna optimizada con Astro y Tailwind CSS. Actualmente el sistema se encuentra en fase inicial, utilizando datos simulados (*mock*) para pruebas y desarrollo.

---

## 🚧 Estado del proyecto

> 🟡 En desarrollo  
> 🔧 Funcionalidades básicas disponibles con endpoints simulados.  
> 📄 Documentación técnica y decisiones arquitectónicas disponibles en `/docs/adr/`.

---

## 📁 Estructura del Proyecto

```bash
stylehub/
├── frontend/          # Proyecto Astro con interfaz
├── backend/           # Servidor Node.js con Express y endpoints mock
├── docs/
│   └── adr/           # Registros de Decisiones Arquitectónicas (ADRs)
├── README.md          # Este archivo
```

---

## 🔌 Endpoints simulados (Mock)

### `GET /products`
- Devuelve una lista estática de productos.
- Útil para pruebas de frontend mientras se integra una base de datos real.

### `POST /login`
- Simula el inicio de sesión.
- Requiere `email` y `password` en la solicitud.
- Devuelve datos ficticios del usuario y un mensaje de éxito.

---

## 🌐 Tecnologías utilizadas

### Frontend
- **Astro** – Framework moderno para sitios rápidos y optimizados.
- **Tailwind CSS** – Estilos utilitarios responsive.
- **JavaScript / TypeScript**
- **HTMX o Alpine.js** – Para interactividad ligera

### Backend
- **Node.js + Express**
- **Supabase Client** – Para futuras integraciones reales

### Base de Datos (planeado)
- **Supabase** – PostgreSQL administrado + autenticación integrada

### Despliegue
- Frontend: **Vercel**
- Backend: **Render**
- Base de datos: **Supabase** (modo gratuito)

---

## 📦 Estructura del Frontend

Proyecto generado con Astro Starter Kit.

```bash
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   └── pages/
└── package.json
```

Para más detalles, consulta la documentación oficial de Astro.

---

## 🧾 Comandos principales

Desde la raíz de cada proyecto (`frontend/` o `backend/`):

| Comando         | Descripción                               |
|-----------------|-------------------------------------------|
| `npm install`   | Instala las dependencias del proyecto     |
| `npm run dev`   | Inicia el servidor de desarrollo          |
| `npm run build` | Compila el sitio para producción          |
| `npm run preview`| Previsualiza el sitio compilado         |

---

## 📚 Documentación adicional

- 📌 Registros ADR – Decisiones Arquitectónicas en `/docs/adr/`
- 📦 Repositorio organizado por carpetas: `frontend`, `backend`, `docs`
---

Este proyecto está siendo desarrollado como parte del curso de **Ingeniería en Software – ULEAM, Julio 2025**.

**Equipo**:  
- Néstor Ayala  
- Odalia Serge  
- Renato Capa  
- Dana Murillo  
- Antonio Medranda  

**Docente**: Ing. Israel Gómez
