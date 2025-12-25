const express = require("express");
const path = require("path");
const app = express();

// Middleware para CORS - permite requisições do navegador
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Servir arquivos estáticos (index.html)
app.use(express.static(path.join(__dirname, "..")));

// Importar as rotas
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Rota de teste
app.get("/", (req, res) => {
  res.json({ 
    message: "API de Gerenciamento de Tarefas 🚀",
    versao: "1.0.0"
  });
});

// Usar as rotas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/reports", reportRoutes);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
