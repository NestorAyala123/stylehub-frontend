const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
} = require("../controllers/authController");
const {
  SIGN_OUT_SCOPES,
} = require("@supabase/supabase-js");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 */
router.post("/signup", signUp);
router.post("/signin", signIn);

router.post(
  "/checkout/paypal",
  paymentController.createPayPalOrder
);


module.exports = router;
