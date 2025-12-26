@echo off
REM 🧪 Script de Testes - Serverless Offline
REM Testa as funcoes Lambda em desenvolvimento local

echo.
echo ====================================
echo 🧪 Testes - Serverless Offline
echo ====================================
echo.
echo Servidor rodando em: http://localhost:3001
echo.

REM Teste 1: GET /
echo === Teste 1: GET / ===
curl -s http://localhost:3001/ | powershell -Command "ConvertFrom-Json | ConvertTo-Json -Depth 5"
echo.

REM Teste 2: GET /tasks
echo === Teste 2: GET /tasks ===
curl -s http://localhost:3001/tasks | powershell -Command "ConvertFrom-Json | ConvertTo-Json -Depth 5"
echo.

REM Teste 3: POST /tasks
echo === Teste 3: POST /tasks ===
curl -s -X POST http://localhost:3001/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"Tarefa de Teste\", \"description\": \"Testando Serverless Offline\"}" | powershell -Command "ConvertFrom-Json | ConvertTo-Json -Depth 5"
echo.

echo ====================================
echo ✅ Testes Concluidos!
echo ====================================
