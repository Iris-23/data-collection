

const jwt = require('jsonwebtoken')
const SECRET = 'WeQHnyPeiW' // 密匙
const expireTime = 30 * 30 * 24 * 30 // 过期时间


const genToken = (data) => {
  const token = jwt.sign(data, SECRET, {
    expiresIn: expireTime
  })

  return token
}

module.exports = {
  genToken,
  SECRET
}