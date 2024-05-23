
import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './Interface'
import { useEffect } from 'react'

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {

  const { title, placeholder, onChange, disabled } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])


  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]} >
        <Input />
      </Form.Item>

      <Form.Item label='placeholder' name='placeholder'>
        <Input />
      </Form.Item>

    </Form >
  )
}

export default PropComponent