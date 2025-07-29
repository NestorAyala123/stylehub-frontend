const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY
);

/**
 * @swagger
 * /api/checkout/stripe:
 *   post:
 *     summary: Crea una sesión de pago Stripe
 *     tags: [Pagos Stripe]
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
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: URL de sesión Stripe creada
 *       500:
 *         description: Error en la creación de sesión
 */
router.post(
  "/checkout/stripe",
  async (req, res) => {
    try {
      const { items, email } = req.body;

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(
            item.price * 100
          ),
        },
        quantity: item.quantity,
      }));

      const session =
        await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          customer_email: email,
          success_url:
            "http://localhost:3000/success",
          cancel_url:
            "http://localhost:3000/cancel",
        });

      res.json({ url: session.url });
    } catch (error) {
      console.error(
        "Error creando sesión Stripe:",
        error.message
      );
      res
        .status(500)
        .json({
          error: "Error al procesar pago Stripe",
        });
    }
  }
);

module.exports = router;
