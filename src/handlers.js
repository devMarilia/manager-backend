/**
 * 📋 Tasks Handlers
 */

// GET /tasks
exports.getTasks = async (event) => {
  console.log("Getting tasks...");
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      tasks: [
        { id: 1, title: "Tarefa 1", status: "pendente" },
        { id: 2, title: "Tarefa 2", status: "concluída" }
      ]
    })
  };
};

// POST /tasks
exports.createTask = async (event) => {
  console.log("Creating task:", event.body);
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Task created",
      task: { id: 3, title: "Nova Tarefa", status: "pendente" }
    })
  };
};

// PUT /tasks/{id}
exports.updateTask = async (event) => {
  console.log("Updating task:", event.pathParameters.id);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Task updated",
      task: { id: event.pathParameters.id, title: "Tarefa Atualizada", status: "em progresso" }
    })
  };
};

// DELETE /tasks/{id}
exports.deleteTask = async (event) => {
  console.log("Deleting task:", event.pathParameters.id);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Task deleted",
      id: event.pathParameters.id
    })
  };
};

// GET /reports
exports.getReports = async (event) => {
  console.log("Getting reports...");
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      reports: [
        { id: 1, title: "Relatório de Tarefas", data: "2025-12-26" }
      ]
    })
  };
};
