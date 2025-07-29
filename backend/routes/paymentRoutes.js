// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post(
  "/checkout/stripe",
  paymentController.createStripeCheckout
);
router.post(
  "/checkout/paypal",
  paymentController.createPayPalOrder
);
router.get(
  "/paypal-success",
  paymentController.capturePayPalOrder
);


module.exports = router;
