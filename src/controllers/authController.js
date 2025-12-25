const { gerarToken } = require("../middleware/auth");
const database = require("../database");

// LOGIN - recebe email e senha, retorna token
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  // Procura o usuário no banco de dados
  const user = database.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }

  // Gera um token JWT
  const token = gerarToken(user.id);

  res.json({
    message: "Login bem-sucedido",
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

// CADASTRO - registra um novo usuário
const cadastro = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
  }

  // Verifica se email já existe
  const usuarioExistente = database.users.find((u) => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  // Cria novo usuário
  const novoUsuario = {
    id: database.users.length + 1,
    name,
    email,
    password
  };

  database.users.push(novoUsuario);

  const token = gerarToken(novoUsuario.id);

  res.status(201).json({
    message: "Usuário cadastrado com sucesso",
    token,
    user: { id: novoUsuario.id, name: novoUsuario.name, email: novoUsuario.email }
  });
};

module.exports = { login, cadastro };
