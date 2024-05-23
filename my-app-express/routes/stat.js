/**
 * 描述: 统计相关路由
 * 作者: yoy
 * 日期: 2023-07-26
*/

const express = require('express')
const router = express.Router()
const { getStatList, getComponentIdData } = require('../controller/Stat')

router.get('/stat/:id', getStatList)
router.get('/stat/:id/:componentId', getComponentIdData)

module.exports = router