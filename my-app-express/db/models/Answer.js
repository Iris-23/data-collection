const mongoose = require('../db')
const Schema = mongoose.Schema

const AnswerSchema = Schema({
  questionId: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  answerList: {
    type: Array,
    required: true,
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

const getAnswerByUsername = async (username) => {
  try {
    const list = await Answer.find({ username });
    const total = list.length; // 如果需要总数，可以直接使用数组的长度

    return { total, list };
  } catch (error) {
    console.error('Error fetching answers by username:', error);
    throw error;
  }
};

module.exports = {
  createAnswerData,
  getAnswerData,
  getAnswerByUsername,
  Answer
}
