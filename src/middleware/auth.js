const jwt = require("jsonwebtoken");

const SECRET_KEY = "sua_chave_secreta_aqui";

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Pega "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id; // Adiciona o ID do usuário na request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Gera um token JWT
const gerarToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "7d" });
};

module.exports = { verificarToken, gerarToken };
