/**
 * @description 问卷Radio
 */

import Component from './Component'
import StatComponent from './StatComponent'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent
}
