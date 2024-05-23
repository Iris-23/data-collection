/**
 * @description 问卷 输入框
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './Interface'

export * from './Interface'

export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent, 
  defaultProps: QuestionInputDefaultProps,
}
