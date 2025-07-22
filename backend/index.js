const express = require("express");
const app = express();

app.use(express.json());

// Mock de productos (simulación de base de datos)
const products = [
  { id: 1, name: "Camiseta", price: 20 },
  { id: 2, name: "Pantalón", price: 35 },
  { id: 3, name: "Zapatos", price: 50 },
];

// Endpoint GET /products
app.get("/products", (req, res) => {
  res.json(products);
});

// Endpoint POST /login (simulación simple)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Aquí podrías validar con tu base de datos
  if (
    email === "danna@example.com" &&
    password === "123456"
  ) {
    res.json({
      message: "Login exitoso",
      user: { email },
    });
  } else {
    res
      .status(401)
      .json({ error: "Credenciales inválidas" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );
});
