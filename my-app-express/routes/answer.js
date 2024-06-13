
const express = require('express')
const router = express.Router()
const { answer } = require('../controller/Answer')
const { userGet, userSet } = require('../controller/userGet')
const { titleGet } = require('../controller/compQuestion')

router.post('/answer', answer)
router.get('/answer/:username', userGet)
router.put('/answer/:username',userSet)
router.get('/answer/:questionId',titleGet)

module.exports = router
