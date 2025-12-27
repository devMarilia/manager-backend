# 🔴 BUG CRÍTICO - Validação AWS Lambda

## Problema

Login em **AWS Lambda** aceita qualquer email/senha, enquanto **localhost** rejeita corretamente.

### Causa Raiz

**AWS Lambda = Stateless** (sem memória persistente)
- Cada invocação = nova instância
- Banco em memória volta aos valores iniciais
- Usuários registrados não são salvos

**Express (localhost) = Stateful** (mantém memória)
- Uma única instância rodando
- Banco em memória persiste
- Usuários registrados ficam salvos

## Teste que Comprova

```javascript
// Em localhost:3000
POST /auth/register
{"email":"novo@email.com","password":"123456","name":"Novo"}
✅ Registra com sucesso

POST /auth/login
{"email":"novo@email.com","password":"123456"}
✅ Login funciona (usuário existe no banco)

POST /auth/login
{"email":"aleatorio@nao.existe","password":"123456"}
❌ Erro 401 (usuário não existe)

// Em AWS Lambda
POST /auth/register
{"email":"novo@email.com","password":"123456","name":"Novo"}
✅ Retorna sucesso (mas NÃO salva!)

POST /auth/login
{"email":"novo@email.com","password":"123456"}
❌ Erro 401 (usuário não foi salvo!)

POST /auth/login
{"email":"aleatorio@nao.existe","password":"123456"}
❌ Erro 401 (correto, pois só tem joao@email.com e maria@email.com pré-cadastrados)
```

## Solução

### Opção 1: DynamoDB (Recomendado para Produção)
```javascript
// db-dynamodb.js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createUser(email, password, name) {
  const user = {
    id: Date.now().toString(),
    email,
    password,
    name,
    createdAt: new Date().toISOString()
  };
  
  await dynamodb.put({
    TableName: 'users',
    Item: user
  }).promise();
  
  return user;
}
```

### Opção 2: Manter Memória (apenas para DEV)
```javascript
// serverless.yml
provider:
  environment:
    NODE_ENV: development  # Em dev, usa memória
    DYNAMODB_TABLE: users  # Em produção, usa DynamoDB
```

## Status

- ✅ **localhost:3000** - Funcionando corretamente
- ❌ **AWS Lambda** - Requer DynamoDB para persistência

## Próximos Passos

1. Criar tabela DynamoDB
2. Atualizar `auth/index.js` para usar DynamoDB
3. Redeployar com `npx serverless deploy`

## Referências

- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [Serverless DynamoDB Plugin](https://www.serverless.com/plugins/serverless-plugin-dynamodb-local)
