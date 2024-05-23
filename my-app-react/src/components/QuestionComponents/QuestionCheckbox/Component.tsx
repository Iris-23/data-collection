import React, { FC } from 'react'
import { Typography, Space, Checkbox } from 'antd'
import { QuestionCheckboxDefaultProps, QuestionCheckboxType } from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionCheckboxType> = (props: QuestionCheckboxType) => {

  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong> {title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { value, checked, text } = opt
          return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
        })}
      </Space>
    </div>
  )
}

export default Component