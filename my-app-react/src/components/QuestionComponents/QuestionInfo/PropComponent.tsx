import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './Interface'

const { TextArea } = Input

const PropsComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {

  const { desc, onChange, disabled, title } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])


  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }



  return (
    <Form
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: ' 请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label='描述' name='desc'>
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent