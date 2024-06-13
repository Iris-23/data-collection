//引入依赖
const express = require('express')
const router = require('./routes')
const { SECRET } = require('./utils/token')
const { expressjwt: jwt } = require('express-jwt')
const UnAuthException = require('./exception/UnAuthException')
const cors = require('cors')

//创建express应用
const app = express()

//使用cors中间件
app.use(cors())

//配置jwt认证中间件
app.use(jwt({
  secret: SECRET, // 签名的密钥
  algorithms: ['HS256']
}).unless({
  custom: (req) => {
    const publicPaths = [
      '/api/answer',
      '/api/user/register',
      '/api/user/login',
    ];

    const reg = /^\/api\/question\/(\w+)$/
    if (reg.test(req.url) && req.method === 'GET') {
      return true;
    }

    // 检查 /api/answer/:username 动态路径
    const answerReg = /^\/api\/answer\/(\w+)$/
    if (answerReg.test(req.url) && req.method === 'GET') {
      return true;
    }

    // 检查是否在公共路径数组中
    if (publicPaths.includes(req.url) && req.method === 'POST') {
      return true;
    }

    return false;
  }
}))

//解析请求体
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 使用路由中间件
app.use(router)

//未授权异常处理
app.use((err, req, res, next) => UnAuthException(err, req, res, next))

//导出应用
module.exports = app
