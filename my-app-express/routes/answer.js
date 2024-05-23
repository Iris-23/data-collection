/**
 * 描述: 答卷相关路由
 * 作者: yoy
 * 日期: 2023-07-26
*/

const express = require('express')
const router = express.Router()
const { answer } = require('../controller/Answer')

router.post('/answer', answer)

module.exports = router
