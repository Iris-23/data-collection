import React, { FC, useEffect } from 'react'
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../utils/user-token'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFormStorage(username: string, password: string) {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {

  const [form] = Form.useForm()
  const nav = useNavigate()

  useEffect(() => {
    const { username, password } = getUserInfoFormStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setToken(token) // 存储 token

        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME) // 导航到“我的问卷”
      },
    }
  )


  const onFinish = (values: any) => {

    const { username, password, remember } = values

    run(username, password)

    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFormStorage(username, password)
    }

  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}> <UserOutlined /></Title>
          <Title level={2}> 登录</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >

          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox >记住我</Checkbox>
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type='primary' htmlType='submit'>登录</Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default Login