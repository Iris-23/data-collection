
import axios, { ResDataType } from './ajax'

export async function getQuestionByUsername(username: string): Promise<ResDataType> {
  const url = `/api/usage/${username}`
  const data = (await axios.get(url)) as ResDataType
  // console.log(data.list)
  const list = data.list
  return list
}