
const mongoose = require('../db')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'teacher'],  // 'admin' 表示管理员, 'user' 表示普通用户
    default: 'admin'          // 默认值设为 'user'
  }
})

const User = mongoose.model('User', userSchema)


const existsUser = async (userInfo) => {
  const res = await User.findOne(userInfo)
  return res
}

const insertUser = async (userInfo) => {
  const newUser = new User(userInfo)
  const res = await newUser.save()
  return res
}


module.exports = {
  User,
  existsUser,
  insertUser
}