/**
 * 📋 Lambda Handlers - Tarefas (GET /tasks)
 */

const { success, error, log } = require('../../utils/response');

// Simular banco de dados (depois será DynamoDB)
const TASKS_DB = [
  {
    id: '1',
    title: 'Implementar autenticação',
    description: 'Adicionar JWT',
    status: 'em-progresso',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Configurar DynamoDB',
    description: 'Setup local e AWS',
    status: 'pendente',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

/**
 * GET /tasks - Listar todas as tarefas
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.list = async (event, context) => {
  try {
    log('LAMBDA', 'getTasks iniciado', { path: event.path });

    // Filtrar por status se enviado como query param
    const status = event.queryStringParameters?.status;
    let tasks = TASKS_DB;

    if (status) {
      tasks = tasks.filter(t => t.status === status);
      log('INFO', 'Filtrando por status', { status, total: tasks.length });
    }

    log('INFO', 'Tarefas recuperadas', { total: tasks.length });

    return success(200, {
      tasks,
      total: tasks.length,
      filters: { status: status || null }
    });
  } catch (err) {
    log('ERROR', 'Erro ao listar tarefas', { error: err.message });
    return error(500, 'Erro ao buscar tarefas', err);
  }
};

/**
 * GET /tasks/{id} - Obter uma tarefa específica
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.get = async (event, context) => {
  try {
    const taskId = event.pathParameters?.id;
    
    log('LAMBDA', 'getTask iniciado', { taskId });

    if (!taskId) {
      log('WARN', 'ID não fornecido');
      return error(400, 'ID da tarefa é obrigatório');
    }

    const task = TASKS_DB.find(t => t.id === taskId);

    if (!task) {
      log('WARN', 'Tarefa não encontrada', { taskId });
      return error(404, `Tarefa ${taskId} não encontrada`);
    }

    log('INFO', 'Tarefa encontrada', { taskId });

    return success(200, task);
  } catch (err) {
    log('ERROR', 'Erro ao buscar tarefa', { error: err.message });
    return error(500, 'Erro ao buscar tarefa', err);
  }
};
