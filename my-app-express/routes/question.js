
const express = require('express')
const router = express.Router()
const { getQuestionList, createQuestion, getQuestionDetail, updateQuestion, delQuestion, duplicateQuestion } = require('../controller/Question')


router.get('/question', getQuestionList)
router.get('/question/:id', getQuestionDetail)
router.post('/question', createQuestion)
router.patch('/question/:id', updateQuestion)
router.delete('/question', delQuestion)
router.post('/question/duplicate/:id', duplicateQuestion)

module.exports = router