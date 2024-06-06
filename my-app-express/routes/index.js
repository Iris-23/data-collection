const express = require('express')
const userRouter = require('./user')
const questionRouter = require('./question')
const answerRouter = require('./answer')
const StatRouter = require('./stat')

const router = express.Router()

router.use('/api', userRouter)
router.use('/api', questionRouter)
router.use('/api', answerRouter)
router.use('/api', StatRouter)



module.exports = router