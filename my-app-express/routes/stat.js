

const express = require('express')
const router = express.Router()
const { getStatList, getComponentIdData } = require('../controller/Stat')

router.get('/stat/:id', getStatList)
router.get('/stat/:id/:componentId', getComponentIdData)

module.exports = router