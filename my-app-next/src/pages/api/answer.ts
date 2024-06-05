import type { NextApiRequest, NextApiResponse } from 'next'
import { postAnswer } from '@/services/answer'

function genAnswerInfo(reqBody: any) {
  const answerList: any[] = []

  Object.keys(reqBody).forEach(key => {
    if (key === 'questionId' || key === 'username') return // 排除掉 questionId 和 username 字段
    answerList.push({
      componentId: key,
      value: reqBody[key]
    })
  })

  return {
    questionId: reqBody.questionId || '',
    username: reqBody.username || '', // 将 username 包含在返回的对象中
    answerList
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // 不是 post 则返回错误
    res.status(200).json({ errno: -1, msg: 'Method 错误' })
  }

  // 获取并格式化表单数据
  const { questionId, username, ...rest } = req.body;
  const answerInfo = {
    questionId: questionId || '',
    username: username || '', // 将 username 包含在 answerInfo 中
    answerList: Object.keys(rest).map(key => ({
      componentId: key,
      value: rest[key]
    }))
  };

  try {
    // 提交到服务端 Mock
    const resData = await postAnswer(answerInfo)

    console.log('resData', resData)

    if (resData.errno === 0) {
      // 如果提交成功了
      res.redirect('/success')
    } else {
      // 提交失败了
      res.redirect('/fail')
    }
  } catch (err) {
    res.redirect('/fail')
  }

  // res.status(200).json({ errno: 0 })
}