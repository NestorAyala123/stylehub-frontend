// routes/checkout.js
const express = require("express");
const router = express.Router();
const supabase = require("../services/supabaseClient");

router.post("/", async (req, res) => {
  const { user_id, items, total, provider } =
    req.body;

  // Simulación de pago
  const { status, transaction_id } =
    await simulatePayment(provider, total);
  if (status !== "success")
    return res
      .status(402)
      .json({ error: "Pago fallido" });

  // Inserta orden
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
