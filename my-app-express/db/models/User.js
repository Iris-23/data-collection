
const mongoose = require('../db')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  password: {
    type: String,
    required: true,
  },
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