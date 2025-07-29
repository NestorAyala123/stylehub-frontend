const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");

// Configuración PayPal Sandbox
function environment() {
  return new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
}

function client() {
  return new paypal.core.PayPalHttpClient(
    environment()
  );
}

/**
 * @swagger
 * /api/checkout/paypal:
 *   post:
 *     summary: Crea una orden de pago PayPal
 *     tags: [Pagos PayPal]
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
  async (req, res) => {
    const { items } = req.body;
    const total = items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    const request =
      new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "StyleHub",
        user_action: "PAY_NOW",
        return_url:
          "http://localhost:3000/api/paypal-success",
        cancel_url:
          "http://localhost:3000/api/paypal-cancel",
      },
    });

    try {
      const order = await client().execute(
        request
      );
      const approveUrl = order.result.links.find(
        (link) => link.rel === "approve"
      ).href;
      res.json({ url: approveUrl });
    } catch (error) {
      console.error(
        "PayPal error:",
        error.message
      );
      res.status(500).json({
        error: "Error al crear orden en PayPal",
      });
    }
  }
);

/**
 * @swagger
 * /api/paypal-success:
 *   get:
 *     summary: Captura orden PayPal (éxito)
 *     tags: [Pagos PayPal]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de la orden PayPal
 *     responses:
 *       200:
 *         description: Pago capturado correctamente
 *       500:
 *         description: Error al capturar el pago
 */
router.get(
  "/paypal-success",
  async (req, res) => {
    const { token } = req.query;

    const request =
      new paypal.orders.OrdersCaptureRequest(
        token
      );
    request.requestBody({});

    try {
      const capture = await client().execute(
        request
      );
      console.log(
        "🟢 Orden capturada:",
        capture.result.id
      );

      res.send(`
      <h1>Pago exitoso</h1>
      <p>ID de orden: ${capture.result.id}</p>
      <p>Estado: ${capture.result.status}</p>
    `);
    } catch (error) {
      console.error(
        "Error al capturar orden PayPal:",
        error.message
      );
      res
        .status(500)
        .send("Error al capturar el pago.");
    }
  }
);

module.exports = router;
