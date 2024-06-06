/**
 * 描述: 用户验证模块
 * 作者: ymj
 * 日期: 2023-07-19
*/

const { body, validationResult } = require('express-validator')
const { existsUser } = require('../db/models/User')
const validatorFn = require('./index')

/* 注册验证 */
const registerValidator = [

  body('username')
    .exists({ checkFalsy: true }).withMessage('用户名不能为空').bail()
    .isLength({ min: 3, max: 20 }).withMessage('用户名长度为3-20位')
    .custom(async (value) => {
      if (await existsUser({username: value}) != null) {
        throw new Error('用户名已经存在,请登录')
      }

      return true
    }),

  body('password')
    .exists({ checkFalsy: true }).withMessage('密码不能为空').bail().
    isLength({ min: 6, max: 20 }).withMessage('密码长度为6-20位'),

  validatorFn
]

const loginValidator = [

  body('username')
    .exists({ checkFalsy: true }).withMessage('用户名不能为空').bail(),

  body('password')
    .exists({ checkFalsy: true }).withMessage('密码不能为空').bail(),

  validatorFn
]


module.exports = {
  registerValidator,
  loginValidator
}