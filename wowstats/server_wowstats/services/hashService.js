var bcrypt = require('bcrypt');

async function hashPassword(str) {
  return await bcrypt.hash(str, 10);
}

async function verifyPassword(plaintext, hashedPwd) {
  return await bcrypt.compare(plaintext, hashedPwd);
}

module.exports = { hashPassword, verifyPassword}