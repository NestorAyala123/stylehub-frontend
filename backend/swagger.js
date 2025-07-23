// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de StyleHub',
      version: '1.0.0',
      description: 'Documentación interactiva del backend de StyleHub',
    },
  },
  apis: ['./routes/*.js'], // buscará los comentarios en tus rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
