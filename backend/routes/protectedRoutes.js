const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    res.status(200).json({
      message:
        "Ruta protegida accedida con éxito",
      user: req.user,
    });
  }
);

module.exports = router;
