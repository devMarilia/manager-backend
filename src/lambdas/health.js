/**
 * 🏠 Lambda Handler - Health Check
 */

const { success, log } = require('../utils/response');
const config = require('../config');

/**
 * GET / - Health check / Info da API
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.handler = async (event, context) => {
  try {
    log('LAMBDA', 'health check iniciado');

    return success(200, {
      message: 'API de Gerenciamento de Tarefas 🚀',
      version: '1.0.0',
      environment: config.nodeEnv,
      endpoints: {
        tasks: {
          list: 'GET /tasks',
          get: 'GET /tasks/{id}',
          create: 'POST /tasks',
          update: 'PUT /tasks/{id}',
          delete: 'DELETE /tasks/{id}'
        },
        reports: {
          list: 'GET /reports',
          get: 'GET /reports/{id}'
        },
        auth: {
          login: 'POST /auth/login',
          register: 'POST /auth/register'
        }
      },
      status: 'healthy'
    });
  } catch (err) {
    log('ERROR', 'Erro no health check', { error: err.message });
    return success(200, { status: 'unknown', error: err.message });
  }
};
