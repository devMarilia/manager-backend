// Banco de dados em memória (simples)
const database = {
  // Usuários registrados
  users: [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      password: "123456"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      password: "123456"
    }
  ],

  // Tarefas com quem criou e quem foi atribuído
  tasks: [
    {
      id: 1,
      title: "Comprar leite",
      description: "Leite integral 1L",
      category: "Casa",
      done: false,
      createdBy: 1,
      assignedTo: 1,
      createdAt: new Date()
    }
  ]
};

module.exports = database;
