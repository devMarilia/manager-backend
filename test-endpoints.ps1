#!/usr/bin/env pwsh
# Script de teste de endpoints

Write-Host "`n========== ✅ TESTANDO ENDPOINTS ==========`n" -ForegroundColor Green

# Aguarda o servidor inicializar
Start-Sleep -Seconds 2

# Teste 1: Health Check
Write-Host "1️⃣ GET / (Health Check)" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://[::1]:3000/" -UseBasicParsing
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3) -ForegroundColor Green
    Write-Host "✅ PASSOU`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FALHOU: $_`n" -ForegroundColor Red
}

# Teste 2: List Tasks
Write-Host "2️⃣ GET /tasks (List Tasks)" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://[::1]:3000/tasks" -UseBasicParsing
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3) -ForegroundColor Green
    Write-Host "✅ PASSOU`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FALHOU: $_`n" -ForegroundColor Red
}

# Teste 3: Get Task by ID
Write-Host "3️⃣ GET /tasks/1 (Get Task)" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://[::1]:3000/tasks/1" -UseBasicParsing
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3) -ForegroundColor Green
    Write-Host "✅ PASSOU`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FALHOU: $_`n" -ForegroundColor Red
}

# Teste 4: Create Task
Write-Host "4️⃣ POST /tasks (Create Task)" -ForegroundColor Cyan
try {
    $body = @{
        title = "Tarefa de Teste"
        description = "Descrição da tarefa"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://[::1]:3000/tasks" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3) -ForegroundColor Green
    Write-Host "✅ PASSOU`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FALHOU: $_`n" -ForegroundColor Red
}

# Teste 5: Login
Write-Host "5️⃣ POST /auth/login (Login)" -ForegroundColor Cyan
try {
    $body = @{
        email = "joao@email.com"
        password = "123456"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://[::1]:3000/auth/login" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3) -ForegroundColor Green
    Write-Host "✅ PASSOU`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FALHOU: $_`n" -ForegroundColor Red
}

# Teste 6: List Reports
Write-Host "6️⃣ GET /reports (List Reports)" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://[::1]:3000/reports" -UseBasicParsing
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3) -ForegroundColor Green
    Write-Host "✅ PASSOU`n" -ForegroundColor Green
} catch {
    Write-Host "❌ FALHOU: $_`n" -ForegroundColor Red
}

Write-Host "`n========== ✅ TESTES CONCLUÍDOS ==========`n" -ForegroundColor Green
