import React, { FC, useEffect } from 'react'
import { QuestionRadioPropsType, OptionType } from './interface'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {

  const { title, disabled, options = [], value, isVertical = false, onChange } = props

  const [form] = Form.useForm()

  function handleValuesChange() {
    if (onChange == null) return

    const newValues = form.getFieldsValue() as QuestionRadioPropsType

    if (newValues.options) {
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }

    const { options = [] } = newValues

    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5) // 补齐opt value
    })

    onChange(newValues)

  }

  useEffect(() => {
    form.setFieldsValue({ title, disabled, value, options })
  }, [title, disabled, value, options])


  return (
    <Form
      initialValues={{ title, options, value, isVertical }}
      layout='vertical'
      disabled={disabled}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label='默认选中' name='value'>
        <Select value={value} options={options.map(({ text, value }) => ({ value, label: text }))}></Select>
      </Form.Item>

      <Form.Item label='选项' >
        <Form.List name='options'>
          {(fields, { add, remove }) => (<>
            {/* 遍历所有选项可删除 */}
            {fields.map(({ key, name }, index) => {
              return (
                <Space key={key} align='baseline'>
                  <Form.Item name={[name, 'text']} rules={[
                    {
                      required: true, message: '请输入选项文字'
                    },
                    {
                      validator: (_, text) => {
                        const { options = [] } = form.getFieldsValue()
                        let num = 0
                        options.forEach((opt: OptionType) => {
                          if (opt.text === text) num++
                        })
                        if (num === 1) return Promise.resolve()

                        return Promise.reject(new Error('和其他选项重复'))
                      }
                    }
                  ]}>
                    <Input placeholder='请输入选项文字'></Input>
                  </Form.Item>
                  {/* 当前选项 删除按钮 */}

                  {index > 1 && <MinusCircleOutlined onClick={() => remove(name)}></MinusCircleOutlined>}

                </Space>
              )
            })}

            {/* 添加选项 */}
            <Form.Item>
              <Button type='link' icon={<PlusOutlined />} onClick={() => add({ text: '', value: '' })}>添加选项</Button>
            </Form.Item>
          </>)

          }
        </Form.List>

      </Form.Item>

      <Form.Item name='isVertical' valuePropName='checked'>
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent