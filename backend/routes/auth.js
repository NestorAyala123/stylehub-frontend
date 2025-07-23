const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@stylehub.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token JWT de sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: fake-jwt-token
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@stylehub.com" &&
    password === "123456"
  ) {
    res.json({ token: "fake-jwt-token" });
  } else {
    res.status(401).json({
      mensaje: "Credenciales inválidas",
    });
  }
});

module.exports = router;
