import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {

  const { isCenter = false, text = '' } = { ...QuestionParagraphDefaultProps, ...props }

  // 尽量不使用 dangerouslySetInnerHTML 不安全

  const textList = text.split('\n')


  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {
        textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))
      }
    </Paragraph>
  )
}

export default Component