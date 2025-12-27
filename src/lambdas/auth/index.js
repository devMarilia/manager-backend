/**
 * 🔐 Lambda Handlers - Autenticação
 */

const { success, error, parseBody, validateRequired, log } = require('../../utils/response');

// Usar DynamoDB em produção (AWS), memória em desenvolvimento
const db = process.env.NODE_ENV === 'production' 
  ? require('../db-dynamodb')
  : require('../db');

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

    // Validar se usuário existe e senha está correta
    const user = await db.findUserByEmail(body.email);
    
    console.log('DEBUG: user encontrado:', JSON.stringify(user, null, 2));
    
    if (!user) {
      log('WARN', 'Usuário não encontrado', { email: body.email });
      return error(401, 'Email ou senha inválidos');
    }
    
    if (user.password !== body.password) {
      log('WARN', 'Senha incorreta', { email: body.email });
      return error(401, 'Email ou senha inválidos');
    }

    // Gerar token (implementar JWT)
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      email: user.email,
      iat: Date.now()
    })).toString('base64');

    log('INFO', 'Login bem-sucedido', { email: user.email, name: user.name });

    return success(200, {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
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

    // Validar se usuário já existe
    if (await db.userExists(body.email)) {
      log('WARN', 'Email já cadastrado', { email: body.email });
      return error(400, 'Email já cadastrado');
    }

    // Validar senha
    if (body.password.length < 6) {
      log('WARN', 'Senha muito curta');
      return error(400, 'Senha deve ter no mínimo 6 caracteres');
    }

    // Criar novo usuário no banco
    const newUser = await db.createUser(body.email, body.password, body.name);

    // Gerar token automaticamente após registro
    const token = Buffer.from(JSON.stringify({
      userId: newUser.id,
      email: newUser.email,
      iat: Date.now()
    })).toString('base64');

    log('INFO', 'Usuário registrado', { userId: newUser.id, email: newUser.email });

    return success(201, {
      message: 'Usuário registrado com sucesso',
      token,
      user: newUser
    });
  } catch (err) {
    log('ERROR', 'Erro ao registrar', { error: err.message });
    return error(500, 'Erro ao registrar usuário', err);
  }
};
