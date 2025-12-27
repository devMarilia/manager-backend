/**
 * 📦 Banco de Dados em Memória
 * (Será substituído por DynamoDB em produção)
 */

// Usuários registrados (inicialmente vazio, mas pode adicionar defaults)
let users = [
  {
    id: '1',
    email: 'joao@email.com',
    password: '123456',
    name: 'João Silva',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'maria@email.com',
    password: '123456',
    name: 'Maria Santos',
    createdAt: new Date().toISOString()
  }
];

// Tarefas
let tasks = [
  {
    id: '1',
    title: 'Estudar Node.js',
    description: 'Aprender middlewares e rotas',
    category: 'Estudos',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Fazer deploy',
    description: 'Deploy na AWS Lambda',
    category: 'Trabalho',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Relatórios
let reports = [
  {
    id: '1',
    title: 'Relatório de Tarefas',
    category: 'Estudos',
    totalTasks: 5,
    completedTasks: 2,
    pendingTasks: 3,
    percentageComplete: '40%',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Relatório de Trabalho',
    category: 'Trabalho',
    totalTasks: 3,
    completedTasks: 3,
    pendingTasks: 0,
    percentageComplete: '100%',
    createdAt: new Date().toISOString()
  }
];

// ==================== USERS ====================
function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function createUser(email, password, name) {
  const id = Date.now().toString();
  const newUser = {
    id,
    email,
    password,
    name,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
}

function userExists(email) {
  return users.some(u => u.email === email);
}

// ==================== TASKS ====================
function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(t => t.id === id);
}

function createTask(title, description, category) {
  const id = Date.now().toString();
  const newTask = {
    id,
    title,
    description,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;
  
  const updatedTask = {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  const index = tasks.findIndex(t => t.id === id);
  tasks[index] = updatedTask;
  return updatedTask;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  
  tasks.splice(index, 1);
  return true;
}

// ==================== REPORTS ====================
function getAllReports() {
  return reports;
}

function getReportById(id) {
  return reports.find(r => r.id === id);
}

// ==================== EXPORTS ====================
module.exports = {
  // Users
  findUserByEmail,
  findUserById,
  createUser,
  userExists,
  
  // Tasks
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  
  // Reports
  getAllReports,
  getReportById
};
