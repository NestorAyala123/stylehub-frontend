const Stripe = require("stripe");
const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY
);

exports.createStripeCheckout = async (
  req,
  res
) => {
  try {
    const { items, email } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // en centavos
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
      "Error creando sesión de Stripe:",
      error.message
    );
    res.status(500).json({
      error:
        "Error al procesar el pago con Stripe",
    });
  }
};

const paypal = require("@paypal/checkout-server-sdk");

// Configuración del entorno sandbox
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

// Crear orden de pago
exports.createPayPalOrder = async (req, res) => {
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
    const order = await client().execute(request);
    const approveUrl = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;
    res.json({ url: approveUrl });
  } catch (error) {
    console.error("PayPal error:", error.message);
    res.status(500).json({
      error: "Error al crear orden en PayPal",
    });
  }
};

exports.capturePayPalOrder = async (req, res) => {
  const { token } = req.query;

  const request =
    new paypal.orders.OrdersCaptureRequest(token);
  request.requestBody({});

  try {
    const capture = await client().execute(
      request
    );

    // Aquí podrías guardar la orden en Supabase si quieres
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
      "❌ Error al capturar orden PayPal:",
      error.message
    );
    res
      .status(500)
      .send("Error al capturar el pago.");
  }
};
