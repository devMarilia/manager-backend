/**
 * 📋 Lambda Handlers - Tarefas (POST, PUT, DELETE)
 */

const { success, error, parseBody, validateRequired, log } = require('../../utils/response');

// Simular banco de dados (depois será DynamoDB)
let TASKS_DB = [
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
 * POST /tasks - Criar nova tarefa
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.create = async (event, context) => {
  try {
    log('LAMBDA', 'createTask iniciado');

    const body = parseBody(event.body);

    // Validar campos obrigatórios
    const validation = validateRequired(body, ['title']);
    if (!validation.isValid) {
      log('WARN', validation.error);
      return error(400, validation.error);
    }

    // Validar tamanho do título
    if (body.title.length < 3) {
      log('WARN', 'Título muito curto');
      return error(400, 'Título deve ter no mínimo 3 caracteres');
    }

    // Criar tarefa
    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || '',
      status: body.status || 'pendente',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    TASKS_DB.push(newTask);

    log('INFO', 'Tarefa criada', { taskId: newTask.id });

    return success(201, newTask);
  } catch (err) {
    log('ERROR', 'Erro ao criar tarefa', { error: err.message });
    return error(500, 'Erro ao criar tarefa', err);
  }
};

/**
 * PUT /tasks/{id} - Atualizar tarefa
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.update = async (event, context) => {
  try {
    const taskId = event.pathParameters?.id;
    const body = parseBody(event.body);

    log('LAMBDA', 'updateTask iniciado', { taskId });

    if (!taskId) {
      log('WARN', 'ID não fornecido');
      return error(400, 'ID da tarefa é obrigatório');
    }

    const taskIndex = TASKS_DB.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      log('WARN', 'Tarefa não encontrada', { taskId });
      return error(404, `Tarefa ${taskId} não encontrada`);
    }

    // Atualizar apenas campos fornecidos
    const updatedTask = {
      ...TASKS_DB[taskIndex],
      ...(body.title && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.status && { status: body.status }),
      updatedAt: new Date().toISOString()
    };

    TASKS_DB[taskIndex] = updatedTask;

    log('INFO', 'Tarefa atualizada', { taskId });

    return success(200, updatedTask);
  } catch (err) {
    log('ERROR', 'Erro ao atualizar tarefa', { error: err.message });
    return error(500, 'Erro ao atualizar tarefa', err);
  }
};

/**
 * DELETE /tasks/{id} - Deletar tarefa
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.delete = async (event, context) => {
  try {
    const taskId = event.pathParameters?.id;

    log('LAMBDA', 'deleteTask iniciado', { taskId });

    if (!taskId) {
      log('WARN', 'ID não fornecido');
      return error(400, 'ID da tarefa é obrigatório');
    }

    const taskIndex = TASKS_DB.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      log('WARN', 'Tarefa não encontrada', { taskId });
      return error(404, `Tarefa ${taskId} não encontrada`);
    }

    const deletedTask = TASKS_DB[taskIndex];
    TASKS_DB.splice(taskIndex, 1);

    log('INFO', 'Tarefa deletada', { taskId });

    return success(200, {
      message: 'Tarefa deletada com sucesso',
      id: taskId,
      deletedAt: new Date().toISOString()
    });
  } catch (err) {
    log('ERROR', 'Erro ao deletar tarefa', { error: err.message });
    return error(500, 'Erro ao deletar tarefa', err);
  }
};
