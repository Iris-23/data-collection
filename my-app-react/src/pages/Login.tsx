import React, { FC, useEffect } from 'react'
import { Space, Typography, Form, Input, Button, Checkbox, Select, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME, USAGE_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../utils/user-token'

const { Title } = Typography
const { Option } = Select

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'
const ROLE_KEY = 'ROLE'

function rememberUser(username: string, password: string, role: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
  localStorage.setItem(ROLE_KEY,role)
}

function deleteUserFormStorage(username: string, password: string, role: string) {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
  localStorage.removeItem(ROLE_KEY)
}

function getUserInfoFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
    role: localStorage.getItem(ROLE_KEY)
  }
}

const Login: FC = () => {

  const [form] = Form.useForm()
  const nav = useNavigate()

  useEffect(() => {
    const { username, password, role } = getUserInfoFormStorage()
    form.setFieldsValue({ username, password, role })
  }, [])

  const { run } = useRequest(
    async (username: string, password: string, role: string) => {
      const data = await loginService(username, password, role)
      return data
    },
    {
      manual: true,
      onSuccess(result, params) {
        const { token = '' } = result
        setToken(token) // 存储 token

        message.success('登录成功')
        const role = params[2]
        if (role === 'admin') {
          nav(MANAGE_INDEX_PATHNAME) // 导航到编辑问卷界面
        } else {
          nav(USAGE_PATHNAME) // 导航到“我的问卷”界面
        }
      },
    }
  )


  const onFinish = (values: any) => {

    const { username, password, role, remember } = values

    run(username, password, role)

    if (remember) {
      rememberUser(username, password, role)
    } else {
      deleteUserFormStorage(username, password, role)
    }

  }

  return (
    <div className={styles.container}>
      <div style={{
        border: '2px solid white',  
        padding:'25px',
        borderTopLeftRadius:'50px',
        borderTopRightRadius:'50px',
        borderBottomLeftRadius:'50px',
        borderBottomRightRadius:'50px',
        backgroundColor: "#f0f0f0"}}>
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

          <Form.Item
            label="身份"
            name="role"
            rules={[{ required: true, message: '请选择身份!' }]}
          >
            <Select>
              <Option value="student">student</Option>
              <Option value="teacher">teacher</Option>
              <Option value="admin">admin</Option>
            </Select>
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
    </div>
  )
}

export default Login