#!/usr/bin/env pwsh

Write-Host "`n========== 🧪 TESTE COMPLETO DA API ==========`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"
$passed = 0
$failed = 0

# Aguarda servidor
Start-Sleep -Seconds 2

# Test 1: Health Check
Write-Host "1️⃣ GET / (Health Check)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   API: $($data.message)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 2: List Tasks
Write-Host "2️⃣ GET /tasks (List Tasks)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/tasks" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Total de tarefas: $($data.data.Count)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 3: Get Task by ID
Write-Host "3️⃣ GET /tasks/1 (Get Task by ID)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/tasks/1" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Tarefa: $($data.data.title)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 4: Create Task
Write-Host "4️⃣ POST /tasks (Create Task)" -ForegroundColor Yellow
try {
    $body = @{
        title = "Tarefa de Teste - $(Get-Date -Format 'HH:mm:ss')"
        description = "Teste da API Lambda"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/tasks" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Nova tarefa ID: $($data.data.id)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 5: Update Task
Write-Host "5️⃣ PUT /tasks/1 (Update Task)" -ForegroundColor Yellow
try {
    $body = @{
        title = "Tarefa Atualizada"
        done = $true
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/tasks/1" -Method Put -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Tarefa atualizada: $($data.data.title)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 6: Delete Task
Write-Host "6️⃣ DELETE /tasks/2 (Delete Task)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/tasks/2" -Method Delete -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Tarefa deletada: $($data.message)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 7: List Reports
Write-Host "7️⃣ GET /reports (List Reports)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/reports" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Total de relatórios: $($data.data.Count)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 8: Get Report
Write-Host "8️⃣ GET /reports/1 (Get Report)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/reports/1" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Relatório: $($data.data.title)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 9: Login
Write-Host "9️⃣ POST /auth/login (Login)" -ForegroundColor Yellow
try {
    $body = @{
        email = "joao@email.com"
        password = "123456"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Token gerado: $($data.data.token.Substring(0, 20))..." -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 10: Register
Write-Host "🔟 POST /auth/register (Register)" -ForegroundColor Yellow
try {
    $body = @{
        name = "Novo Usuário"
        email = "novo@email.com"
        password = "senha123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/register" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ PASSOU - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Usuário criado: $($data.data.email)" -ForegroundColor Gray
    $passed++
} catch {
    Write-Host "❌ FALHOU: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Summary
Write-Host "========== 📊 RESUMO DOS TESTES ==========" -ForegroundColor Cyan
Write-Host "✅ Testes que passaram: $passed" -ForegroundColor Green
Write-Host "❌ Testes que falharam: $failed" -ForegroundColor Red

if ($failed -eq 0) {
    Write-Host "`n🎉 TODOS OS TESTES PASSARAM! API PRONTA PARA DEPLOY!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Alguns testes falharam. Verifique os erros acima." -ForegroundColor Yellow
}
Write-Host ""
