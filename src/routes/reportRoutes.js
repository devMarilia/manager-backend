const express = require("express");
const { verificarToken } = require("../middleware/auth");
const {
  relatoriosPorCategoria,
  estatisticas,
  tarefasAtribuidasAMim
} = require("../controllers/reportController");

const router = express.Router();

// GET /reports/categoria - Relatório de tarefas por categoria
router.get("/categoria", verificarToken, relatoriosPorCategoria);

// GET /reports/estatisticas - Estatísticas gerais
router.get("/estatisticas", verificarToken, estatisticas);

// GET /reports/minhas-tarefas - Tarefas atribuídas a mim
router.get("/minhas-tarefas", verificarToken, tarefasAtribuidasAMim);

module.exports = router;
