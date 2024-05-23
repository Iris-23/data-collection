/**
 * 描述: 用户相关路由
 * 作者: yoy
 * 日期: 2023-07-20
*/

const express = require('express')
const router = express.Router()
const { registerValidator, loginValidator } = require('../validator/user')
const { register, login, info } = require('../controller/User')

router.post('/user/register', registerValidator, register)
router.post('/user/login', loginValidator, login)
router.get('/user/info', info)

module.exports = router