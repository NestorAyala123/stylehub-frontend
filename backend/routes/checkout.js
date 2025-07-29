const express = require("express");
const router = express.Router();
const supabase = require("../services/supabaseClient");

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Crea una orden y registra el pago simulado
 *     tags: [Pagos Simulados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - items
 *               - total
 *               - provider
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "user_123"
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
 *               total:
 *                 type: number
 *                 example: 50
 *               provider:
 *                 type: string
 *                 example: "paypal"
 *     responses:
 *       200:
 *         description: Orden creada exitosamente
 *       402:
 *         description: Pago fallido
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", async (req, res) => {
  const { user_id, items, total, provider } =
    req.body;

  const { status, transaction_id } =
    await simulatePayment(provider, total);

  if (status !== "success")
    return res
      .status(402)
      .json({ error: "Pago fallido" });

  const { data, error } = await supabase
    .from("orders")
    .insert([
      { user_id, items, total, transaction_id },
    ]);

  if (error)
    return res.status(500).json({ error });

  res.json({
    message: "Orden creada",
    order: data,
  });
});

async function simulatePayment(provider, amount) {
  return {
    status: "success",
    transaction_id: `${provider}_${Math.floor(
      Math.random() * 10000
    )}`,
  };
}

module.exports = router;
