
const mongoose = require('../db')
const Schema = mongoose.Schema
const dayjs = require('dayjs')

const questionSchema = Schema({
  userId: {
    type: String,
    required: true,
  },
  componentList: {
    type: Array,
    default: []
  },
  css: {
    type: String,
    default: '',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isStar: {
    type: Boolean,
    default: false,
  },
  js: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  createdAt: {
    type: String,
    //node.js解决MongoDB有时差的问题8小时
    default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
  updatedAt: {
    type: String,
    //node.js解决MongoDB有时差的问题8小时
    default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
}, {
  versionKey: false,
  timestamps: true  // 启用时间戳选项

})

const Question = mongoose.model('question', questionSchema)


const createQuestionData = async (questionInfo) => {
  const newQuestion = new Question(questionInfo)
  const res = await newQuestion.save()
  return res
}


const getQuestionData = async ({ userId, page, pageSize, keyword, isStar, isDeleted }) => {

  let params = { userId, isDeleted, title: { $regex: keyword, $options: 'i' } }
  if (isStar) {
    params.isStar = isStar
  }


  let list = await Question.find(params, { 'userId': 0, 'componentList': 0 }).skip((page - 1) * pageSize).limit(pageSize)
  const total = await Question.find(params).countDocuments().exec()
  return { total, list }
}

const updateQuestionData = async (questionInfo) => {
  const { _id, userId, componentList, css, isStar, isDeleted, isPublished, js, title, desc } = questionInfo
  const res = Question.updateOne({ _id, userId }, { $set: { componentList, css, isDeleted, isStar, isPublished, js, title, desc } })
  return res
}

const delQuestionData = async ({ userId, ids }) => {
  const res = await Question.deleteMany({ userId, _id: { $in: ids } })
  return res
}

const getQuestionDetailData = async ({ _id }) => {
  const data = await Question.findOne({ _id }, { 'userId': 0 })
  return data
}

module.exports = {
  createQuestionData,
  getQuestionData,
  updateQuestionData,
  Question,
  delQuestionData,
  getQuestionDetailData
}