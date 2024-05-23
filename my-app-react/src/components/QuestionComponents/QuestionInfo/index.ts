/**
 * @description 问卷 info 组件
 */

import PropComponent from './PropComponent'
import Component from './Component'
import { QuestionInfoDefaultProps } from './Interface'

export * from './Interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
