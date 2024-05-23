import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './Interface'


const { Title } = Typography

const Component: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {

  const { text = '', isCenter = false, level = 1 } = { ...QuestionTitleDefaultProps, ...props }

  const genFontSize = (level: number) => {
    if (level === 1) return '24x'
    if (level === 2) return '20x'
    if (level === 3) return '16x'
    return '16x'
  }

  return (
    <Title level={level} style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0', fontSize: genFontSize(level) }}>
      {text}
    </Title>
  )
}

export default Component