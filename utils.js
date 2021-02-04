const jwt = require('jsonwebtoken');
const keys = require('./config/keys');

function getTokenPayload(token) {
  return jwt.verify(token, keys.secret);
}

function getUserId(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found.');
  }

  const { userId } = getTokenPayload(token);
  return userId;
}

function requireAuth(context) {
  const { userId } = context;

  if (!userId) {
    throw new Error('Not authenticated.');
  }
}

module.exports = { getUserId, requireAuth };
