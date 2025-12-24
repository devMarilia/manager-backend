const express = require("express");
const { login, cadastro } = require("../controllers/authController");

const router = express.Router();

// POST /auth/login - Fazer login
router.post("/login", login);

// POST /auth/cadastro - Registrar novo usuário
router.post("/cadastro", cadastro);

module.exports = router;
