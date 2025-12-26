/**
 * 🛠️ Utilitários para Lambda
 * Funções reutilizáveis para respostas HTTP
 */

const config = require('../config');

/**
 * Resposta HTTP padronizada
 * @param {number} statusCode - HTTP status code
 * @param {object} body - Corpo da resposta
 * @param {object} headers - Headers adicionais (opcional)
 * @returns {object} Resposta formatada para Lambda
 */
exports.success = (statusCode = 200, body = {}, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': config.corsOrigin,
      ...headers
    },
    body: JSON.stringify({
      success: true,
      data: body,
      timestamp: new Date().toISOString()
    })
  };
};

/**
 * Resposta de erro padronizada
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Mensagem de erro
 * @param {object} error - Objeto do erro (opcional)
 * @returns {object} Resposta de erro formatada
 */
exports.error = (statusCode = 500, message = 'Erro interno', error = null) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': config.corsOrigin
    },
    body: JSON.stringify({
      success: false,
      error: {
        message,
        ...(config.isDevelopment && error && { details: error.message })
      },
      timestamp: new Date().toISOString()
    })
  };
};

/**
 * Parsear body JSON
 * @param {string|object} body - Body da requisição
 * @returns {object} Objeto parseado
 */
exports.parseBody = (body) => {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }
  return body || {};
};

/**
 * Validar campos obrigatórios
 * @param {object} data - Objeto a validar
 * @param {array} fields - Campos obrigatórios
 * @returns {object} { isValid: bool, error: string }
 */
exports.validateRequired = (data, fields = []) => {
  for (const field of fields) {
    if (!data[field]) {
      return {
        isValid: false,
        error: `Campo "${field}" é obrigatório`
      };
    }
  }
  return { isValid: true };
};

/**
 * Extrair path parameters
 * @param {object} event - Lambda event
 * @param {string} param - Nome do parâmetro
 * @returns {string} Valor do parâmetro
 */
exports.getPathParam = (event, param) => {
  return event.pathParameters?.[param];
};

/**
 * Extrair query parameters
 * @param {object} event - Lambda event
 * @param {string} param - Nome do parâmetro
 * @returns {string} Valor do parâmetro
 */
exports.getQueryParam = (event, param) => {
  return event.queryStringParameters?.[param];
};

/**
 * Extrair header
 * @param {object} event - Lambda event
 * @param {string} header - Nome do header
 * @returns {string} Valor do header
 */
exports.getHeader = (event, header) => {
  return event.headers?.[header.toLowerCase()];
};

/**
 * Log estruturado
 * @param {string} level - LOG, INFO, DEBUG, ERROR
 * @param {string} message - Mensagem
 * @param {object} data - Dados adicionais
 */
exports.log = (level = 'LOG', message = '', data = {}) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    timestamp,
    level: `[${level}]`,
    message,
    data: Object.keys(data).length > 0 ? data : undefined
  }));
};
