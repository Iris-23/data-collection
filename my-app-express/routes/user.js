
const express = require('express')
const router = express.Router()
const { registerValidator, loginValidator } = require('../validator/user')
const { register, login, info } = require('../controller/User')

router.post('/user/register', registerValidator, register)
router.post('/user/login', loginValidator, login)
router.get('/user/info', info)

module.exports = router