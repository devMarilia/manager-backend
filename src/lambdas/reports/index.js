/**
 * 📊 Lambda Handlers - Relatórios
 */

const { success, error, log } = require('../../utils/response');

/**
 * GET /reports - Listar relatórios
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.list = async (event, context) => {
  try {
    log('LAMBDA', 'getReports iniciado');

    const reports = [
      {
        id: '1',
        title: 'Relatório de Tarefas Concluídas',
        generatedAt: new Date().toISOString(),
        totalTasks: 10,
        completedTasks: 3,
        pendingTasks: 7,
        completionRate: '30%'
      },
      {
        id: '2',
        title: 'Relatório de Produtividade',
        generatedAt: new Date(Date.now() - 86400000).toISOString(),
        productivity: 30,
        trend: 'up',
        tasksCompletedToday: 2
      }
    ];

    log('INFO', 'Relatórios recuperados', { total: reports.length });

    return success(200, {
      reports,
      total: reports.length,
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    log('ERROR', 'Erro ao listar relatórios', { error: err.message });
    return error(500, 'Erro ao buscar relatórios', err);
  }
};

/**
 * GET /reports/{id} - Obter relatório específico
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.get = async (event, context) => {
  try {
    const reportId = event.pathParameters?.id;

    log('LAMBDA', 'getReport iniciado', { reportId });

    if (!reportId) {
      log('WARN', 'ID não fornecido');
      return error(400, 'ID do relatório é obrigatório');
    }

    // Simular busca do relatório
    const report = {
      id: reportId,
      title: `Relatório ${reportId}`,
      generatedAt: new Date().toISOString(),
      data: {
        totalTasks: 10,
        completedTasks: 3,
        pendingTasks: 7
      }
    };

    log('INFO', 'Relatório recuperado', { reportId });

    return success(200, report);
  } catch (err) {
    log('ERROR', 'Erro ao buscar relatório', { error: err.message });
    return error(500, 'Erro ao buscar relatório', err);
  }
};
