const { SuccessModel } = require('../utils/resModel');
const { getAnswerByUsername } = require('../db/models/Answer');

const getAnswerByUsernameHandler = async (req, res, next) => {
  const { username } = req.params;

  try {
    const answerData = await getAnswerByUsername(username);
    return res.json(new SuccessModel(answerData));
  } catch (err) {
    console.error('Error fetching answer data by username:', err);
    return res.json(new SuccessModel('获取答案数据失败'));
  }
};

module.exports = {
  getAnswerByUsernameHandler
};
