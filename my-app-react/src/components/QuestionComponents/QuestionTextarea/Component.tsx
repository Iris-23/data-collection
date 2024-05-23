import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface'


const { Paragraph } = Typography

const { TextArea } = Input

const Component: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {

  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong> {title} </Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default Component