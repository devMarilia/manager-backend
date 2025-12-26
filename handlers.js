/**
 * Lambda Handlers para Serverless Offline
 */

// GET /
exports.hello = async (event) => {
  console.log("Hello endpoint called");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "API de Gerenciamento de Tarefas 🚀",
      versao: "1.0.0",
      ambiente: "offline",
      endpoints: {
        root: "GET /",
        tasks: "GET /tasks",
        createTask: "POST /tasks"
      }
    })
  };
};

// GET /tasks
exports.getTasks = async (event) => {
  console.log("GET /tasks called");
  return {
    statusCode: 200,
    body: JSON.stringify({
      tasks: [
        { id: 1, title: "Tarefa 1", status: "pendente", createdAt: "2025-12-26" },
        { id: 2, title: "Tarefa 2", status: "concluída", createdAt: "2025-12-25" },
        { id: 3, title: "Tarefa 3", status: "em progresso", createdAt: "2025-12-24" }
      ],
      total: 3
    })
  };
};

// POST /tasks
exports.createTask = async (event) => {
  console.log("POST /tasks called with body:", event.body);
  
  let body = event.body;
  if (typeof body === 'string') {
    body = JSON.parse(body);
  }
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Tarefa criada com sucesso",
      task: {
        id: 4,
        title: body.title || "Nova Tarefa",
        status: "pendente",
        createdAt: new Date().toISOString()
      }
    })
  };
};
