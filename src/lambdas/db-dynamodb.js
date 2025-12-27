/**
 * 📦 Banco de Dados DynamoDB
 * Para persistência em AWS Lambda (produção)
 */

const AWS = require('aws-sdk');
const config = require('../config');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

// ==================== USERS ====================
async function findUserByEmail(email) {
  try {
    const result = await dynamodb.query({
      TableName: USERS_TABLE,
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).promise();
    
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
  } catch (error) {
    console.error('DynamoDB findUserByEmail error:', error);
    return null;
  }
}

async function findUserById(id) {
  try {
    const result = await dynamodb.get({
      TableName: USERS_TABLE,
      Key: { id }
    }).promise();
    
    return result.Item || null;
  } catch (error) {
    console.error('DynamoDB findUserById error:', error);
    return null;
  }
}

async function createUser(email, password, name) {
  try {
    const id = Date.now().toString();
    const user = {
      id,
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };
    
    await dynamodb.put({
      TableName: USERS_TABLE,
      Item: user
    }).promise();
    
    return user;
  } catch (error) {
    console.error('DynamoDB createUser error:', error);
    throw error;
  }
}

async function userExists(email) {
  try {
    const user = await findUserByEmail(email);
    return user !== null;
  } catch (error) {
    console.error('DynamoDB userExists error:', error);
    return false;
  }
}

// ==================== EXPORTS ====================
module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  userExists
};
