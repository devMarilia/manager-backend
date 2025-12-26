# API de Gerenciamento de Tarefas 🚀

Uma aplicação simples e didática de gerenciamento de tarefas com autenticação, CRUD completo, colaboração entre usuários e relatórios.

## 📋 Funcionalidades

✅ **Autenticação JWT** - Login e cadastro de usuários  
✅ **CRUD de Tarefas** - Criar, listar, atualizar e deletar tarefas  
✅ **Colaboração** - Atribuir tarefas a outros usuários  
✅ **Relatórios** - Estatísticas e agrupamento por categoria  
✅ **Permissões** - Apenas criador pode deletar, criador/responsável podem editar

---

## 🏗️ Estrutura do Projeto

```
src/
├── index.js                    # Arquivo principal (Server Express)
├── database.js                 # Banco de dados em memória
├── middleware/
│   └── auth.js                # Middleware de autenticação JWT
├── controllers/
│   ├── authController.js      # Login e cadastro
│   ├── taskController.js      # CRUD de tarefas
│   └── reportController.js    # Relatórios
└── routes/
    ├── authRoutes.js          # Rotas de autenticação
    ├── taskRoutes.js          # Rotas de tarefas
    └── reportRoutes.js        # Rotas de relatórios
```

---

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor
```bash
npm start
```

O servidor rodará em `http://localhost:3000`

---

## 📚 Explicação Simples do Código

### 1. **database.js** - O Banco de Dados
Armazena usuários e tarefas em memória (reseta quando reinicia).

```javascript
const database = {
  users: [ ... ],    
  tasks: [ ... ]     
```

### 2. **middleware/auth.js** - Autenticação
```javascript
// Verifica se o token é válido
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  req.userId = decoded.id; // Adiciona na request
  next();
};
```

### 3. **controllers/** - A Lógica de Negócio
Cada controller tem funções específicas:
- `authController.js` - Login/Cadastro
- `taskController.js` - CRUD de tarefas
- `reportController.js` - Estatísticas

### 4. **routes/** - As Rotas
Define os endpoints da API.

```javascript
router.post("/login", login);        // POST /auth/login
router.get("/", verificarToken, listarTarefas);  // GET /tasks
```

---

## 📖 Endpoints da API

### 🔐 Autenticação

**Cadastro:**
```http
POST /auth/cadastro
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Login:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

Retorna:
```json
{
  "token": "eyJhbGc...",
  "user": { "id": 1, "name": "João Silva", "email": "joao@email.com" }
}
```

---

### 📝 Tarefas (requer token)

**Listar:**
```http
GET /tasks
Authorization: Bearer SEU_TOKEN_AQUI
```

**Criar:**
```http
POST /tasks
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "title": "Estudar Node.js",
  "description": "Aprender middlewares",
  "category": "Estudos",
  "assignedTo": 2
}
```

**Atualizar:**
```http
PUT /tasks/1
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "done": true,
  "category": "Trabalho"
}
```

**Deletar:**
```http
DELETE /tasks/1
Authorization: Bearer SEU_TOKEN_AQUI
```

---

### 📊 Relatórios (requer token)

**Por Categoria:**
```http
GET /reports/categoria
Authorization: Bearer SEU_TOKEN_AQUI
```

Retorna:
```json
{
  "Casa": {
    "total": 1,
    "concluidas": 1,
    "pendentes": 0
  },
  "Trabalho": {
    "total": 2,
    "concluidas": 0,
    "pendentes": 2
  }
}
```

**Estatísticas:**
```http
GET /reports/estatisticas
Authorization: Bearer SEU_TOKEN_AQUI
```

Retorna:
```json
{
  "totalTarefas": 5,
  "tarefasConcluidas": 2,
  "tarefasPendentes": 3,
  "percentualConclusao": "40.00%"
}
```

**Minhas Tarefas:**
```http
GET /reports/minhas-tarefas
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 👥 Usuários Padrão

Para testar, existem 2 usuários pré-cadastrados:

| Email | Senha |
|-------|-------|
| joao@email.com | 123456 |
| maria@email.com | 123456 |

---

## 🔑 Conceitos Principais

### JWT (JSON Web Token)
Um token que prova quem você é. Você recebe ao fazer login e usa em todas as requisições.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Middleware
Uma função que executa ANTES do controller. Exemplo: verificarToken valida o JWT antes de acessar a rota.

### CRUD
Create (POST) - Ler (GET) - Update (PUT) - Delete (DELETE)

### Permissões
- Qualquer um pode ler suas tarefas
- Qualquer um pode editar tarefas atribuídas a si
- Apenas o criador pode deletar

---

## 🛠️ Próximos Passos para Aprender

1. **Banco de Dados Real** - Trocar a memória por MongoDB ou PostgreSQL
2. **Validação** - Usar biblioteca como `joi` ou `yup`
3. **Hashing de Senha** - Usar `bcrypt` em vez de texto plano
4. **Logs** - Adicionar logs com `winston` ou `pino`
5. **Testes** - Adicionar testes com `jest`

---

## 📝 Licença

Projeto de aprendizado - Use livremente!
