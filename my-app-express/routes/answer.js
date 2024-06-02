
const express = require('express')
const router = express.Router()
const { answer } = require('../controller/Answer')

router.post('/answer', answer)

module.exports = router
