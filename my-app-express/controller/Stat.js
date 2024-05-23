
const { SuccessModel } = require('../utils/resModel')
const { getAnswerData, Answer: AnswerModel } = require('../db/models/Answer')
const { Question: QuestionModel } = require('../db/models/Question')


const getStatList = async (req, res, next) => {

  const { id } = req.params

  const { page, pageSize } = req.query

  const { list, total } = await getAnswerData({ questionId: id, page, pageSize })

  const { componentList } = await QuestionModel.findOne({ _id: id })

  const handleList = list.map(item => {

    const { answerList, _id } = item

    const obj = {}

    answerList.forEach(a => {

      const { value, componentId } = a

      const { type, props } = componentList.find(item => item.fe_id === componentId)

      switch (type) {
        case 'questionRadio':
          obj[componentId] = props.options.find(p => p.value === value).text

          break
        case 'questionCheckbox':
          const valueArr = value.split(',')
          const checkedArr = []
          valueArr.forEach(v => {
            const checked = props.list.find(p => p.value === v)
            if (checked) {
              checkedArr.push(checked.text)
            }
          })
          obj[componentId] = checkedArr.join(',')
          break
        default:
          obj[componentId] = value
      }
    })

    return {
      ...obj,
      _id
    }
  })

  return res.json(new SuccessModel({ list: handleList, total }))
}

const getComponentIdData = async (req, res, next) => {

  const { id, componentId } = req.params

  const answer = await AnswerModel.find({ questionId: id })

  const { componentList } = await QuestionModel.findOne({ _id: id })

  const { type, props } = componentList.find(item => item.fe_id === componentId)

  const resultData = []

  if (type === 'questionRadio' || type === 'questionCheckbox') {

    answer.forEach(a => {
      const { answerList } = a
      const answerInfo = answerList.find(answer => answer.componentId === componentId)

      if (answerInfo) {
        const { value } = answerInfo

        const joinValue = value.split(',')

        joinValue.forEach(v => {
          resultData.push(v)
        })
      }



    })

    const classify = (arr) => {

      const classifiedArr = {}

      arr.forEach(item => {
        if (!classifiedArr[item]) {
          classifiedArr[item] = 1;
        } else {
          classifiedArr[item]++
        }
      })

      return classifiedArr

    }

    const classifiedArr = classify(resultData)

    let options = type === 'questionRadio' ? props.options : props.list

    const stat = []

    for (let key in classifiedArr) {

      const { text } = options.find(o => o.value === key)

      const name = text

      stat.push({
        name,
        count: classifiedArr[key]
      })
    }

    return res.json(new SuccessModel({ stat }))
  }

  return res.json(new SuccessModel('暂无数据'))

}


module.exports = {
  getStatList,
  getComponentIdData
}
