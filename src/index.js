const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar handlers Lambda
const healthHandler = require('./lambdas/health');
const tasksGet = require('./lambdas/tasks/get');
const tasksMutate = require('./lambdas/tasks/mutate');
const reportsHandler = require('./lambdas/reports/index');
const authHandler = require('./lambdas/auth/index');

// Função auxiliar para converter Lambda event/context para Express
const wrapLambda = (handler) => {
  return async (req, res) => {
    try {
      const event = {
        httpMethod: req.method,
        path: req.path,
        body: JSON.stringify(req.body),
        headers: req.headers,
        pathParameters: req.params,
        queryStringParameters: req.query
      };

      const context = {
        functionName: handler.name,
        requestId: Math.random().toString(36).substring(7)
      };

      const result = await handler(event, context);
      
      const statusCode = result.statusCode || 200;
      const body = result.body ? JSON.parse(result.body) : {};
      
      res.status(statusCode).json(body);
    } catch (error) {
      console.error('Lambda Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
};

// ====== ROTAS DE SAÚDE ======
app.get('/', wrapLambda(healthHandler.handler));

// ====== ROTAS DE TAREFAS ======
app.get('/tasks', wrapLambda(tasksGet.list));
app.get('/tasks/:id', wrapLambda(tasksGet.get));
app.post('/tasks', wrapLambda(tasksMutate.create));
app.put('/tasks/:id', wrapLambda(tasksMutate.update));
app.delete('/tasks/:id', wrapLambda(tasksMutate.delete));

// ====== ROTAS DE RELATÓRIOS ======
app.get('/reports', wrapLambda(reportsHandler.list));
app.get('/reports/:id', wrapLambda(reportsHandler.get));

// ====== ROTAS DE AUTENTICAÇÃO ======
app.post('/auth/login', wrapLambda(authHandler.login));
app.post('/auth/register', wrapLambda(authHandler.register));

// Rota GET para /auth/login com instruções
app.get('/auth/login', (req, res) => {
  res.status(405).json({
    success: false,
    error: 'Método GET não permitido',
    hint: 'Use POST http://localhost:3000/auth/login com body: {"email":"joao@email.com","password":"123456"}'
  });
});

// Rota GET para /auth/register com instruções
app.get('/auth/register', (req, res) => {
  res.status(405).json({
    success: false,
    error: 'Método GET não permitido',
    hint: 'Use POST http://localhost:3000/auth/register com body: {"email":"novo@email.com","password":"123456","name":"Seu Nome"}'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`\n📍 Endpoints disponíveis:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/tasks`);
  console.log(`   POST http://localhost:${PORT}/tasks`);
  console.log(`   GET  http://localhost:${PORT}/reports`);
  console.log(`   POST http://localhost:${PORT}/auth/login`);
  console.log(`   POST http://localhost:${PORT}/auth/register\n`);
});
