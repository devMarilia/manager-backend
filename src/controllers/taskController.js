const database = require("../database");

// Listar todas as tarefas do usuário logado
const listarTarefas = (req, res) => {
  const userId = req.userId; // Vem do middleware de autenticação

  const tarefasDoUsuario = database.tasks.filter(
    (task) => task.createdBy === userId || task.assignedTo === userId
  );

  res.json(tarefasDoUsuario);
};

// Criar uma nova tarefa
const criarTarefa = (req, res) => {
  const { title, description, category, assignedTo } = req.body;
  const userId = req.userId;

  if (!title || !category) {
    return res.status(400).json({ message: "Título e categoria são obrigatórios" });
  }

  const novaTarefa = {
    id: database.tasks.length + 1,
    title,
    description: description || "",
    category,
    done: false,
    createdBy: userId,
    assignedTo: assignedTo || userId, // Se não especificar, atribui a si mesmo
    createdAt: new Date()
  };

  database.tasks.push(novaTarefa);

  res.status(201).json({
    message: "Tarefa criada com sucesso",
    task: novaTarefa
  });
};

// Atualizar uma tarefa (marcar como feita, mudar categoria, etc)
const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { title, description, category, done, assignedTo } = req.body;
  const userId = req.userId;

  const tarefa = database.tasks.find((t) => t.id === parseInt(id));

  if (!tarefa) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  // Verifica se o usuário é o criador ou responsável
  if (tarefa.createdBy !== userId && tarefa.assignedTo !== userId) {
    return res.status(403).json({ message: "Você não tem permissão para editar esta tarefa" });
  }

  // Atualiza os campos
  if (title) tarefa.title = title;
  if (description !== undefined) tarefa.description = description;
  if (category) tarefa.category = category;
  if (done !== undefined) tarefa.done = done;
  if (assignedTo) tarefa.assignedTo = assignedTo;

  res.json({
    message: "Tarefa atualizada com sucesso",
    task: tarefa
  });
};

// Deletar uma tarefa
const deletarTarefa = (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const indice = database.tasks.findIndex((t) => t.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  const tarefa = database.tasks[indice];

  // Apenas o criador pode deletar
  if (tarefa.createdBy !== userId) {
    return res.status(403).json({ message: "Você não tem permissão para deletar esta tarefa" });
  }

  database.tasks.splice(indice, 1);

  res.json({ message: "Tarefa deletada com sucesso" });
};

module.exports = {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa
};
