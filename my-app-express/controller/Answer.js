
const { SuccessModel } = require('../utils/resModel')
const { createAnswerData } = require('../db/models/Answer')

const answer = async (req, res, next) => {

  const { answer } = req.body
  console.log('Request body:', req.body);
  const { questionId, username, answerList } = answer

  const answerData = await createAnswerData({ questionId, username, answerList })

  return res.json(new SuccessModel({ id: answerData._id.toString() }))
}

// const answer = async (req, res) => {
//   const { questionId, username, answerList } = req.body; // 确保从请求体中获取这些数据

//   if (!username ) {
//     return res.status(400).json({ error: 'username is required' });
//   }

//   try {
//     const answerData = await createAnswerData({ questionId, username, answerList });
//     return res.status(201).json(answerData);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  answer
};