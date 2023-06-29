const jwt = require('jsonwebtoken');

const JWT_SECRET = 'unique-secret-key';

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET);

const verifyToken = (token) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) return false;
  return decoded.id;
});

module.exports = {
  generateToken,
  verifyToken,
};
