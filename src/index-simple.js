// Carrega variáveis de ambiente
require("dotenv").config();

const express = require("express");
const config = require("./config");

const app = express();

// Middleware para CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.corsOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// 🏠 Rota raiz
app.get("/", (req, res) => {
  res.json({ 
    message: "API de Gerenciamento de Tarefas 🚀",
    versao: "1.0.0",
    ambiente: config.nodeEnv,
    porta: config.port
  });
});

// 📋 Tarefas
app.get("/tasks", (req, res) => {
  res.json({
    tasks: [
      { id: 1, title: "Tarefa 1", status: "pendente" },
      { id: 2, title: "Tarefa 2", status: "concluída" }
    ]
  });
});

app.post("/tasks", (req, res) => {
  res.status(201).json({
    message: "Tarefa criada",
    task: { id: 3, title: "Nova Tarefa", status: "pendente" }
  });
});

// 📊 Relatórios
app.get("/reports", (req, res) => {
  res.json({
    reports: [
      { id: 1, title: "Relatório de Tarefas", data: "2025-12-26" }
    ]
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Iniciar
app.listen(config.port, () => {
  console.log(`\n🚀 Servidor rodando em ${config.apiUrl}`);
  console.log(`📝 Ambiente: ${config.nodeEnv.toUpperCase()}`);
  console.log(`🔐 JWT Secret configurado: ${config.jwtSecret ? "✅" : "❌"}`);
  console.log(`📊 Log Level: ${config.logLevel}`);
  console.log(`\n✨ Pronto para receber requisições!\n`);
});
