const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // ✅

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

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", paymentRoutes); // ✅ aquí se conectan Stripe y PayPal

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  );
});
