const { SuccessModel } = require('../utils/resModel')
const { createAnswerData, Answer } = require('../db/models/Answer')

const answer = async (req, res, next) => {
 const { answer } = req.body;
 console.log('Request body:', req.body);
 const { questionId, username, answerList } = answer;

try {
 const existingAnswer = await Answer.findOneAndUpdate(
 { questionId, username },
 { answerList },
 { new: true, upsert: true } // new: true 返回更新后的文档，upsert: true 如果没有找到则创建一个新文档
 );

 return res.json(new SuccessModel({ id: existingAnswer._id.toString() }));
 } catch (error) {
 console.error('Failed to create or update answer:', error);
 return res.status(500).json({ error: error.message });
 }
};

module.exports = {
  answer
};