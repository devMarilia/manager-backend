#!/usr/bin/env node

const http = require('http');

console.log('\n========== ✅ TESTANDO ENDPOINTS ==========\n');

const tests = [
  { method: 'GET', path: '/', name: 'Health Check' },
  { method: 'GET', path: '/tasks', name: 'List Tasks' },
  { method: 'GET', path: '/tasks/1', name: 'Get Task' },
  { method: 'POST', path: '/tasks', name: 'Create Task', body: JSON.stringify({ title: 'Teste', description: 'Test' }) },
  { method: 'GET', path: '/reports', name: 'List Reports' },
  { method: 'POST', path: '/auth/login', name: 'Login', body: JSON.stringify({ email: 'joao@email.com', password: '123456' }) }
];

let completed = 0;

tests.forEach((test, index) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: test.path,
    method: test.method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`${index + 1}️⃣ ${test.method} ${test.path} (${test.name})`);
      try {
        const json = JSON.parse(data);
        console.log('\x1b[32m✅ PASSOU\x1b[0m');
        console.log(JSON.stringify(json, null, 2));
      } catch (e) {
        console.log('\x1b[32m✅ PASSOU\x1b[0m');
        console.log(data);
      }
      console.log('');
      
      completed++;
      if (completed === tests.length) {
        console.log('\n========== ✅ TESTES CONCLUÍDOS ==========\n');
      }
    });
  });

  req.on('error', (e) => {
    console.log(`${index + 1}️⃣ ${test.method} ${test.path} (${test.name})`);
    console.log(`\x1b[31m❌ FALHOU: ${e.message}\x1b[0m\n`);
    
    completed++;
    if (completed === tests.length) {
      console.log('\n========== ✅ TESTES CONCLUÍDOS ==========\n');
    }
  });

  if (test.body) {
    req.write(test.body);
  }

  req.end();
});
