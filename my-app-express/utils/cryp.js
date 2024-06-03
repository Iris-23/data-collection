const bcrypt = require('bcrypt');

// 加密函数
async function genPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

module.exports = {
  genPassword
};
