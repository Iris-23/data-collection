

const { insertUser, existsUser, User: UserModel } = require('../db/models/User')
const { SuccessModel, ErrorModel } = require('../utils/resModel')
const { genPassword } = require('../utils/cryp')
const { genToken } = require('../utils/token')

/* 注册 */
const register = async (req, res, next) => {
  let { username, password, nickname } = req.body
  try {
    await insertUser({ username, password: genPassword(password), nickname })
    res.json(new SuccessModel('注册成功'))
    return
  } catch (error) {
    console.log(error)
  }
}

/* 登录 */
const login = async (req, res, next) => {

  let { username, password } = req.body

  const user = await existsUser({ username, password: genPassword(password) })

  if (!user) {
    res.json(new ErrorModel('账号或者密码错误'))
    return
  }

  const token = genToken({ username, password, userId: user._id.toString() })
  res.json(new SuccessModel({ token }, '登录成功'))
  return
}

/* 用户信息 */
const info = async (req, res, next) => {
  let { userId } = req.auth
  const userInfo = await UserModel.findOne({ _id: userId }, { '_id': 0, 'username': 1, 'nickname': 1 })

  return res.json(new SuccessModel(userInfo))
}

module.exports = {
  register,
  login,
  info
}