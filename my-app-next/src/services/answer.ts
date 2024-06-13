import { get, post } from './ajax'

// 提交答卷
export async function postAnswer(answerInfo: any) {
  const url = '/api/answer'
  const data = await post(url, answerInfo)
  return data
}

//回显答案
export const showAnswer = async (username: string) => {
  try {
    const url = `/api/answer/${username}`
    const response = await get(url)
    console.log('response:',response)
    return response
  } catch (error) {
    console.error('Error fetching answer data:', error)
    throw error
  }
}

export const showTitle = async (questionId: string) => {
  try {
    const url = `/api/answer/${questionId}`
    const response = await get(url)
    console.log('response:',response)
    return response
  } catch (error) {
    console.error('Error fetching title data:', error)
    throw error
  }
}