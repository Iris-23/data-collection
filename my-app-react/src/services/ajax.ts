import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { getToken, removeToken } from '../utils/user-token'
import { NO_LOGIN_CODE } from '../constant'
import { LOGIN_PATHNAME } from '../router'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10 * 1000,
})

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType

    const { errno, data, msg } = resData

    if (errno !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg)
      }

      throw new Error(msg)
    }

    return data as any
  },

  error => {
    const { response } = error

    if (response.status === NO_LOGIN_CODE && location.pathname !== LOGIN_PATHNAME) {
      removeToken()
      window.location.replace(LOGIN_PATHNAME)
      return
    }

    if (response.status === 400) {
      message.error(response.data.msg)
    }

    return response.data
  }
)

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}

export default instance
