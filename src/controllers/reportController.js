const database = require("../database");

// Relatório simples: tarefas por categoria
const relatoriosPorCategoria = (req, res) => {
  const userId = req.userId;

  const tarefasDoUsuario = database.tasks.filter(
    (task) => task.createdBy === userId || task.assignedTo === userId
  );

  // Agrupa tarefas por categoria
  const relatorio = {};

  tarefasDoUsuario.forEach((task) => {
    if (!relatorio[task.category]) {
      relatorio[task.category] = {
        total: 0,
        concluidas: 0,
        pendentes: 0
      };
    }

    relatorio[task.category].total++;
    if (task.done) {
      relatorio[task.category].concluidas++;
    } else {
      relatorio[task.category].pendentes++;
    }
  });

  res.json({
    message: "Relatório por categoria",
    relatorio
  });
};

// Relatório: estatísticas gerais
const estatisticas = (req, res) => {
  const userId = req.userId;

  const tarefasDoUsuario = database.tasks.filter(
    (task) => task.createdBy === userId || task.assignedTo === userId
  );

  const totalTarefas = tarefasDoUsuario.length;
  const tarefasConcluidas = tarefasDoUsuario.filter((t) => t.done).length;
  const tarefasPendentes = totalTarefas - tarefasConcluidas;
  const percentualConclusao = totalTarefas > 0 ? ((tarefasConcluidas / totalTarefas) * 100).toFixed(2) : 0;

  res.json({
    message: "Estatísticas do usuário",
    estatisticas: {
      totalTarefas,
      tarefasConcluidas,
      tarefasPendentes,
      percentualConclusao: `${percentualConclusao}%`
    }
  });
};

// Relatório: tarefas atribuídas a mim
const tarefasAtribuidasAMim = (req, res) => {
  const userId = req.userId;

  const tarefas = database.tasks.filter((task) => task.assignedTo === userId);

  res.json({
    message: "Tarefas atribuídas a você",
    tarefas
  });
};

module.exports = {
  relatoriosPorCategoria,
  estatisticas,
  tarefasAtribuidasAMim
};
