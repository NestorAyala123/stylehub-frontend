const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", user_id);

  if (error)
    return res
      .status(500)
      .json({ error: error.message });
  res.json(data);
});

module.exports = router;
