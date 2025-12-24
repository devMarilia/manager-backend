const express = require("express");
const app = express();
app.use(express.json());

// Importar login e tarefas
const login = require("./auth/login");
const tasks = require("./tasks"); // importar o array de tarefas

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API rodando com sucesso 🚀" });
});

// Rota de login
app.post("/login", login);

// Rota para listar tarefas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Rota para criar uma nova tarefa
app.post("/tasks", (req, res) => {
  const { title, category } = req.body; // pegar título e categoria do corpo da requisição

  if (!title || !category) {
    return res.status(400).json({ message: "Título e categoria são obrigatórios" });
  }

  // Criar tarefa com ID simples
  const task = {
    id: tasks.length + 1,
    title,
    category,
    done: false // status inicial
  };

  tasks.push(task); // adicionar ao array

  res.status(201).json(task); // retornar a tarefa criada
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
