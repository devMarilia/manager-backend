const express = require("express");
const { verificarToken } = require("../middleware/auth");
const {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa
} = require("../controllers/taskController");

const router = express.Router();

// Todas essas rotas precisam de autenticação

// GET /tasks - Listar tarefas do usuário
router.get("/", verificarToken, listarTarefas);

// POST /tasks - Criar nova tarefa
router.post("/", verificarToken, criarTarefa);

// PUT /tasks/:id - Atualizar tarefa
router.put("/:id", verificarToken, atualizarTarefa);

// DELETE /tasks/:id - Deletar tarefa
router.delete("/:id", verificarToken, deletarTarefa);

module.exports = router;
