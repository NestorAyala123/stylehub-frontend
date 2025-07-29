const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const checkoutRoutes = require("./routes/checkout"); // Pago simulado
const stripeRoutes = require("./routes/stripeRoutes"); // Stripe
const paypalRoutes = require("./routes/paypalRoutes"); // PayPal

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola. Bienvenid@ StyleHub");
});

// Swagger docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/checkout", checkoutRoutes); // Ruta para pagos simulados
app.use("/api", stripeRoutes); // Rutas Stripe
app.use("/api", paypalRoutes); // Rutas PayPal

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  );
});
