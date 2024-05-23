
const { createQuestionData, Question: QuestionModal, getQuestionData, updateQuestionData, delQuestionData, getQuestionDetailData } = require('../db/models/Question')
const { SuccessModel, ErrorModel } = require('../utils/resModel')

const getQuestionList = async (req, res, next) => {
  const { userId } = req.auth

  const { page, pageSize, keyword = '', isStar, isDeleted = false } = req.query
  let { list, total } = await getQuestionData({ userId, page, pageSize, isStar, keyword, isDeleted })
  return res.json(new SuccessModel({ list, total }))
}

const createQuestion = async (req, res, next) => {
  const { userId } = req.auth
  const question = await createQuestionData({ userId })
  return res.json(new SuccessModel({ id: question._id.toString() }))
}

const getQuestionDetail = async (req, res, next) => {
  const { id: _id } = req.params

  const data = await getQuestionDetailData({ _id })

  return res.json(new SuccessModel(data))
}

const updateQuestion = async (req, res, next) => {

  const { userId } = req.auth

  const { id: _id } = req.params

  const { componentList, css, isDeleted, isStar, isPublished, js, title, desc } = req.body

  try {
    const { acknowledged } = await updateQuestionData({ userId, _id, componentList, css, isStar, isDeleted, isPublished, js, title, desc })
    if (acknowledged) {
      res.json(new SuccessModel('更新成功'))
    } else {
      res.json(new ErrorModel('更新失败'))
    }
    return
  } catch (error) {
    return res.json(new ErrorModel('当前用户找不到该问卷'))
  }
}


const delQuestion = async (req, res, next) => {
  const { userId } = req.auth
  const { ids } = req.body

  try {
    const { deletedCount } = await delQuestionData({ userId, ids })

    if (deletedCount) {
      res.json(new SuccessModel(`删除${deletedCount}条数据`))
    } else {
      res.json(new ErrorModel('删除失败'))
    }
    return
  } catch (error) {
    res.json(new ErrorModel('该问卷找不到'))
  }

}


const duplicateQuestion = async (req, res, next) => {

  const { userId } = req.auth
  const { id: _id } = req.params

  const { componentList, css, isStar, isDeleted, isPublished, js, title, desc } = await QuestionModal.findOne({ userId, _id })

  const question = await createQuestionData({ userId, componentList, css, isStar, isDeleted, isPublished, js, title, desc })

  return res.json(new SuccessModel({ id: question._id.toString() }))
}

module.exports = {
  getQuestionList,
  createQuestion,
  updateQuestion,
  delQuestion,
  getQuestionDetail,
  duplicateQuestion
}