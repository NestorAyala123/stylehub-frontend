const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

/**
 * @swagger
 * /api/checkout/stripe:
 *   post:
 *     summary: Crea una sesión de pago en Stripe
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL de la sesión de pago en Stripe
 */

router.post(
  "/checkout/stripe",
  paymentController.createStripeCheckout
);

/**
 * @swagger
 * /api/checkout/paypal:
 *   post:
 *     summary: Crea una orden de pago PayPal
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *                 example:
 *                   - name: "Camiseta"
 *                     quantity: 2
 *                     price: 25
 *     responses:
 *       200:
 *         description: URL de orden PayPal creada
 *       500:
 *         description: Error en la creación de orden
 */


router.post(
  "/checkout/paypal",
  paymentController.createPayPalOrder
);
router.get(
  "/paypal-success",
  paymentController.capturePayPalOrder
);

module.exports = router;
