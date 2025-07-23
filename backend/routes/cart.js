const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Endpoints del carrito de compras
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user789
 *               productId:
 *                 type: string
 *                 example: prod123
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Producto agregado al carrito
 */
router.post("/", (req, res) => {
  const { userId, productId, quantity } =
    req.body;
  res.status(201).json({
    mensaje: "Producto agregado al carrito",
    data: { userId, productId, quantity },
  });
});

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Obtener carrito de un usuario
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Carrito del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   quantity:
 *                     type: integer
 */
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const carrito = [
    {
      productId: "prod123",
      quantity: 1,
      userId: "user001",
    },
    {
      productId: "prod124",
      quantity: 2,
      userId: "user002",
    },
  ];
  const carritoUsuario = carrito.filter(
    (item) => item.userId === userId
  );
  res.json(carritoUsuario);
});

module.exports = router;
