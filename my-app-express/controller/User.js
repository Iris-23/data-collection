

const { insertUser, existsUser, User: UserModel } = require('../db/models/User')
const { SuccessModel, ErrorModel } = require('../utils/resModel')
const { genPassword } = require('../utils/cryp')
const { genToken } = require('../utils/token')
const bcrypt = require('bcrypt');

/* 注册 */
const register = async (req, res, next) => {
  let { username, password, role } = req.body
  try {
    const hashedPassword = await genPassword(password);
    await insertUser({ username, password: hashedPassword, role});
    res.json(new SuccessModel('注册成功'));
    return
  } catch (error) {
    console.log(error)
  }
}

/* 登录 */
const login = async (req, res, next) => {
  let { username, password, role } = req.body;

  try {
    // 查询用户信息，包括密码哈希
    const user = await existsUser({ username });

    if (!user) {
      res.json(new ErrorModel('账号不存在'));
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      res.json(new ErrorModel('账号或密码错误'));
      return;
    }

    if (user.role !== role) {
      res.json(new ErrorModel('身份不匹配'));
      return;
    }
    
    // 登录成功，生成 token 并返回
    const token = genToken({ username, userId: user._id.toString() });
    res.json(new SuccessModel({ token }, '登录成功'));
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json(new ErrorModel('登录失败'));
  }
}

/* 用户信息 */
const info = async (req, res, next) => {
  let { userId } = req.auth;
  try {
    const userInfo = await UserModel.findOne({ _id: userId }, { '_id': 0, 'username': 1 });
    res.json(new SuccessModel(userInfo));
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json(new ErrorModel('获取用户信息失败'));
  }
}

module.exports = {
  register,
  login,
  info
}