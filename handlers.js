/**
 * 🚀 Lambda Handlers para Serverless Offline
 * Adaptados para rodar em AWS Lambda
 */

const config = require('./src/config');

// ✅ Função helper para respostas HTTP
const response = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': config.corsOrigin,
      ...headers
    },
    body: JSON.stringify(body)
  };
};

// ❌ Função helper para erros
const errorResponse = (statusCode, message, error = null) => {
  return response(statusCode, {
    error: true,
    message,
    ...(config.isDevelopment && error && { details: error.message })
  });
};

// 🏠 GET / - Informações da API
exports.hello = async (event) => {
  try {
    console.log('[LAMBDA] hello - Requisição recebida', event);
    
    return response(200, {
      message: "API de Gerenciamento de Tarefas 🚀",
      versao: "1.0.0",
      ambiente: config.nodeEnv,
      timestamp: new Date().toISOString(),
      endpoints: {
        root: "GET /",
        tasks: "GET /tasks",
        createTask: "POST /tasks"
      }
    });
  } catch (error) {
    console.error('[LAMBDA ERROR] hello:', error);
    return errorResponse(500, 'Erro ao processar requisição', error);
  }
};

// 📋 GET /tasks - Listar tarefas
exports.getTasks = async (event) => {
  try {
    console.log('[LAMBDA] getTasks - Query params:', event.queryStringParameters);
    
    // Simular busca do banco de dados
    const tasks = [
      {
        id: "1",
        title: "Implementar autenticação",
        description: "Adicionar JWT",
        status: "em-progresso",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "2",
        title: "Configurar DynamoDB",
        description: "Setup local e AWS",
        status: "pendente",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: "3",
        title: "Deploy na AWS",
        description: "Deploy inicial do projeto",
        status: "pendente",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return response(200, {
      success: true,
      data: tasks,
      total: tasks.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LAMBDA ERROR] getTasks:', error);
    return errorResponse(500, 'Erro ao buscar tarefas', error);
  }
};

// ➕ POST /tasks - Criar tarefa
exports.createTask = async (event) => {
  try {
    console.log('[LAMBDA] createTask - Body:', event.body);
    
    // Parse do body
    let body = event.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    // Validação
    if (!body.title) {
      return errorResponse(400, 'Campo "title" é obrigatório');
    }

    if (body.title.length < 3) {
      return errorResponse(400, 'Título deve ter no mínimo 3 caracteres');
    }

    // Simular criação
    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || '',
      status: 'pendente',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('[LAMBDA] Task criada:', newTask);

    return response(201, {
      success: true,
      message: 'Tarefa criada com sucesso',
      data: newTask,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LAMBDA ERROR] createTask:', error);
    return errorResponse(500, 'Erro ao criar tarefa', error);
  }
};

// ✏️ PUT /tasks/{id} - Atualizar tarefa
exports.updateTask = async (event) => {
  try {
    const taskId = event.pathParameters?.id;
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    console.log('[LAMBDA] updateTask - ID:', taskId, 'Body:', body);

    if (!taskId) {
      return errorResponse(400, 'ID da tarefa é obrigatório');
    }

    // Simular atualização
    const updatedTask = {
      id: taskId,
      title: body.title || 'Tarefa Atualizada',
      description: body.description || '',
      status: body.status || 'em-progresso',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString()
    };

    return response(200, {
      success: true,
      message: 'Tarefa atualizada com sucesso',
      data: updatedTask,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LAMBDA ERROR] updateTask:', error);
    return errorResponse(500, 'Erro ao atualizar tarefa', error);
  }
};

// 🗑️ DELETE /tasks/{id} - Deletar tarefa
exports.deleteTask = async (event) => {
  try {
    const taskId = event.pathParameters?.id;

    console.log('[LAMBDA] deleteTask - ID:', taskId);

    if (!taskId) {
      return errorResponse(400, 'ID da tarefa é obrigatório');
    }

    return response(200, {
      success: true,
      message: 'Tarefa deletada com sucesso',
      data: { id: taskId, deletedAt: new Date().toISOString() },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LAMBDA ERROR] deleteTask:', error);
    return errorResponse(500, 'Erro ao deletar tarefa', error);
  }
};

// 📊 GET /reports - Listar relatórios
exports.getReports = async (event) => {
  try {
    console.log('[LAMBDA] getReports - Requisição recebida');

    const reports = [
      {
        id: "1",
        title: "Relatório de Tarefas Concluídas",
        generatedAt: new Date().toISOString(),
        totalTasks: 10,
        completedTasks: 3,
        pendingTasks: 7
      },
      {
        id: "2",
        title: "Relatório de Produtividade",
        generatedAt: new Date().toISOString(),
        productivity: 30,
        trend: "up"
      }
    ];

    return response(200, {
      success: true,
      data: reports,
      total: reports.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LAMBDA ERROR] getReports:', error);
    return errorResponse(500, 'Erro ao buscar relatórios', error);
  }
};

