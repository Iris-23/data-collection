
/**
 * 描述: 通用验证模块
 * 作者: ymj
 * 日期: 2023-07-19
*/

const { validationResult } = require('express-validator')
const { ErrorModel } = require('../utils/resModel')

const formErrorCode = 400

const validatorFn = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(formErrorCode).json(new ErrorModel(errors.array()[0].msg))
  next()
}

module.exports = validatorFn