# 🧪 Guia de Testes - Serverless Offline

## 🚀 Como Iniciar o Serverless Offline

### Opção 1: Usando npm script
```bash
npm run serverless:start
```

### Opção 2: Comando direto
```bash
npx serverless offline start
```

---

## 📊 Portas Utilizadas

| Serviço | Porta | URL |
|---------|-------|-----|
| **HTTP (APIs)** | 3001 | `http://localhost:3001` |
| **WebSocket** | 3002 | `ws://localhost:3002` |
| **Lambda** | 3003 | `http://localhost:3003` |

---

## 🧪 Testando as Endpoints

### 1. Login (POST)
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "123456"}'
```

### 2. Listar Tarefas (GET)
```bash
curl http://localhost:3001/tasks
```

### 3. Criar Tarefa (POST)
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Nova Tarefa", "descricao": "Descrição"}'
```

### 4. Atualizar Tarefa (PUT)
```bash
curl -X PUT http://localhost:3001/tasks/123 \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Tarefa Atualizada"}'
```

### 5. Deletar Tarefa (DELETE)
```bash
curl -X DELETE http://localhost:3001/tasks/123
```

### 6. Listar Relatórios (GET)
```bash
curl http://localhost:3001/reports
```

---

## 🔧 Usando Postman ou Insomnia

1. **Abra o Postman/Insomnia**
2. **Crie requisições para:**
   - `http://localhost:3001/auth/login` (POST)
   - `http://localhost:3001/tasks` (GET)
   - `http://localhost:3001/reports` (GET)

---

## 📝 Logs do Serverless

Quando você executa o serverless offline, verá logs como:

```
✔ offline: HTTP Server ready at http://localhost:3001
✔ offline: WebSocket Server ready at ws://localhost:3002
✔ offline: Lambda Server ready at http://localhost:3003

functions:
  login ...................... http://localhost:3001/auth/login
  getTasks ................... http://localhost:3001/tasks
  createTask ................. http://localhost:3001/tasks
  updateTask ................. http://localhost:3001/tasks/{id}
  deleteTask ................. http://localhost:3001/tasks/{id}
  getReports ................. http://localhost:3001/reports
```

---

## 🐛 Troubleshooting

### Porta já em uso
Se a porta 3001 já está em uso:
```bash
npm run serverless:start -- --httpPort 3002
```

### Módulos não encontrados
```bash
npm install
```

### Erro ao iniciar
Verifique se o `serverless.yml` está bem formatado:
```bash
npm run serverless:start
```

---

## 💡 Dicas

- Use `Ctrl+C` para parar o servidor
- Os logs aparecem em tempo real no terminal
- Cada requisição mostra o tempo de execução
- Perfeito para testes antes de deploy na AWS!

---

**Próximos Passos:**
- Implementar os handlers das funções em `src/`
- Testar cada endpoint
- Fazer deploy na AWS quando pronto!
