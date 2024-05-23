
import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './Interface'


const { Paragraph } = Typography

const Component: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {

  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong> {title} </Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default Component