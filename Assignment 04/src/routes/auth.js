// routes/auth.js
const jwt = require('jsonwebtoken');

const jwtSecret = 'your-jwt-secret-key';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
