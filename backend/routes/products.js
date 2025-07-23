const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints relacionados con los productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: prod123
 *                   name:
 *                     type: string
 *                     example: Camisa oversize
 *                   price:
 *                     type: number
 *                     example: 45.99
 */
router.get("/", (req, res) => {
  const productos = [
    {
      id: "prod123",
      name: "Camisa oversize",
      price: 45.99,
    },
    {
      id: "prod124",
      name: "Pantalón wide leg",
      price: 49.99,
    },
  ];
  res.json(productos);
});

module.exports = router;
