// backend/controllers/authController.js
const supabase = require("../services/supabaseClient");

const signUp = async (req, res) => {
  const { email, password } = req.body; 

  // Validar datos
  if (!email || !password) {
    return res.status(400).json({
      error: "Email y contraseña son requeridos",
    });
  }

  // Crear usuario en Supabase
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    return res
      .status(400)
      .json({ error: error.message });
  }

  res.status(200).json({
    message:
      "Usuario registrado. Verifica tu correo",
    user: data.user,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email y contraseña son requeridos",
    });
  }

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    return res
      .status(401)
      .json({ error: error.message });
  }

  res.status(200).json({
    message: "Inicio de sesión exitoso",
    user: data.user,
    session: data.session,
  });
};

module.exports = { signUp, signIn };
