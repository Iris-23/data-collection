import type { NextApiRequest, NextApiResponse } from 'next';
import { postAnswer, showAnswer, showTitle } from '@/services/answer';

function genAnswerInfo(reqBody: any) {
  const answerList: any[] = [];

  Object.keys(reqBody).forEach(key => {
    if (key === 'questionId' || key === 'username') return; // 排除掉 questionId 和 username 字段
    answerList.push({
      componentId: key,
      value: reqBody[key]
    });
  });

  return {
    questionId: reqBody.questionId || '',
    username: reqBody.username || '', // 将 username 包含在返回的对象中
    answerList
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
      // 提交到服务端
      const resData = await postAnswer(answerInfo);

      console.log('resData', resData);

      if (resData.errno === 0) {
        // 如果提交成功了
        res.redirect('/success');
      } else {
        // 提交失败了
        res.redirect('/fail');
      }
    } catch (err) {
      res.redirect('/fail');
    }

  } else if (req.method === 'GET') {
    // 处理 GET 请求
    const { username, questionId } = req.query;
    console.log('questionid:', questionId)
    console.log('username:', username)
    if (questionId && typeof questionId === 'string') {
      try {
        const data = await showTitle(questionId);
        res.status(200).json(data);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ errno: -1, msg: '获取标题失败', error: error.message });
        } else {
          res.status(500).json({ errno: -1, msg: '获取标题失败', error: String(error) });
        }
      }
    } else if (username && typeof username === 'string') {
      try {
        const data = await showAnswer(username);
        res.status(200).json(data);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ errno: -1, msg: '获取答案失败', error: error.message });
        } else {
          res.status(500).json({ errno: -1, msg: '获取答案失败', error: String(error) });
        }
      }
    }else {
      res.status(400).json({ errno: -1, msg: '缺少参数' });
    }
  } else {
    // 不是 GET 或 POST 请求，返回错误
    res.status(405).json({ errno: -1, msg: 'Method 错误' });
  }
}
