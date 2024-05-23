
const { SuccessModel } = require('../utils/resModel')
const { createAnswerData } = require('../db/models/Answer')

const answer = async (req, res, next) => {

  const { answer } = req.body
  const { questionId, answerList } = answer

  const answerData = await createAnswerData({ questionId, answerList })

  return res.json(new SuccessModel({ id: answerData._id.toString() }))
}

module.exports = {
  answer
}