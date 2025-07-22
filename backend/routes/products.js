const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// GET /products
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");
  if (error)
    return res
      .status(500)
      .json({ error: error.message });
  res.json(data);
});

module.exports = router;
