/**
 * 🔐 Lambda Handlers - Autenticação
 */

const { success, error, parseBody, validateRequired, log } = require('../../utils/response');

/**
 * POST /auth/login - Autenticação
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.login = async (event, context) => {
  try {
    log('LAMBDA', 'login iniciado');

    const body = parseBody(event.body);

    // Validar campos obrigatórios
    const validation = validateRequired(body, ['email', 'password']);
    if (!validation.isValid) {
      log('WARN', validation.error);
      return error(400, validation.error);
    }

    // Simular validação (depois será integrado com DynamoDB)
    if (body.email !== 'user@example.com' || body.password !== '123456') {
      log('WARN', 'Credenciais inválidas', { email: body.email });
      return error(401, 'Email ou senha inválidos');
    }

    // Gerar token (implementar JWT)
    const token = Buffer.from(JSON.stringify({
      userId: '1',
      email: body.email,
      iat: Date.now()
    })).toString('base64');

    log('INFO', 'Login bem-sucedido', { email: body.email });

    return success(200, {
      token,
      user: {
        id: '1',
        email: body.email,
        name: 'Test User'
      }
    });
  } catch (err) {
    log('ERROR', 'Erro ao fazer login', { error: err.message });
    return error(500, 'Erro ao fazer login', err);
  }
};

/**
 * POST /auth/register - Registrar novo usuário
 * @param {object} event - Lambda event
 * @param {object} context - Lambda context
 */
module.exports.register = async (event, context) => {
  try {
    log('LAMBDA', 'register iniciado');

    const body = parseBody(event.body);

    // Validar campos obrigatórios
    const validation = validateRequired(body, ['email', 'password', 'name']);
    if (!validation.isValid) {
      log('WARN', validation.error);
      return error(400, validation.error);
    }

    // Validar email
    if (!body.email.includes('@')) {
      log('WARN', 'Email inválido');
      return error(400, 'Email inválido');
    }

    // Validar senha
    if (body.password.length < 6) {
      log('WARN', 'Senha muito curta');
      return error(400, 'Senha deve ter no mínimo 6 caracteres');
    }

    // Simular criação de usuário (depois será DynamoDB)
    const newUser = {
      id: Date.now().toString(),
      email: body.email,
      name: body.name,
      createdAt: new Date().toISOString()
    };

    log('INFO', 'Usuário registrado', { userId: newUser.id, email: newUser.email });

    return success(201, {
      message: 'Usuário registrado com sucesso',
      user: newUser
    });
  } catch (err) {
    log('ERROR', 'Erro ao registrar', { error: err.message });
    return error(500, 'Erro ao registrar usuário', err);
  }
};
