
const { ErrorModel } = require('../utils/resModel')

const NO_LOGIN_CODE = 401

const UnAuthException = (err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(NO_LOGIN_CODE).json(new ErrorModel('token过期,请重新登录'))
    return
  }
}

module.exports = UnAuthException