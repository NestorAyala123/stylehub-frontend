async function simulatePayment(provider, amount) {
  if (provider === "Stripe") {
    return {
      status: "success",
      transaction_id: "STRIPE123",
    };
  }
  if (provider === "PayPal") {
    return {
      status: "success",
      transaction_id: "PAYPAL123",
    };
  }
  return { status: "failed" };
}
