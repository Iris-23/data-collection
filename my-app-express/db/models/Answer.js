const mongoose = require('../db')
const Schema = mongoose.Schema

const AnswerSchema = Schema({
  questionId: {
    type: String,
    require: true,
  },
  answerList: {
    type: Array
  }
})

const Answer = mongoose.model('answer', AnswerSchema)


const createAnswerData = async (answerInfo) => {
  const newAnswer = new Answer(answerInfo)
  const res = await newAnswer.save()
  return res
}

const getAnswerData = async ({ questionId, page, pageSize }) => {
  let list = await Answer.find({ questionId }).skip((page - 1) * pageSize).limit(pageSize)
  const total = await Answer.find({ questionId }).countDocuments().exec()
  return { total, list }

}


module.exports = {
  createAnswerData,
  getAnswerData,
  Answer
}
