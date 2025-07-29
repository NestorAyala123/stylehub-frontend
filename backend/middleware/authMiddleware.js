const supabase = require("../services/supabaseClient");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validación de encabezado Authorization
  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res
      .status(401)
      .json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  // Verificar sesión desde el token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;
