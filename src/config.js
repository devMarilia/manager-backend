/**
 * 📋 Configurações Centralizadas
 * Carrega todas as variáveis de ambiente em um único lugar
 * Facilita manutenção e rastreamento de configurações
 */

require("dotenv").config();

const config = {
  // 🎯 Ambiente
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  // 🌐 Servidor
  port: parseInt(process.env.PORT, 10) || 3000,
  apiUrl: process.env.API_URL || "http://localhost:3000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // 🔐 Segurança
  jwtSecret: process.env.JWT_SECRET || "dev123",
  corsOrigin: process.env.CORS_ORIGIN || "*",

  // 📊 Logging
  logLevel: process.env.LOG_LEVEL || "debug",
};

// 📤 Exportar configuração
module.exports = config;
