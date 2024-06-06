import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'
import { message } from 'antd'
import { removeToken } from '../utils/user-token'
import { MANAGE_INDEX_PATHNAME } from '../router'

const UserInfo: FC = () => {

  const nav = useNavigate()

  const dispatch = useDispatch()

  const { username, nickname } = useGetUserInfo()

  function logout() {
    dispatch(logoutReducer())
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {username}
      </span>
      {/* <Button type='link' onClick={logout}>
        退出
      </Button> */}
      <Button type="primary" onClick={logout}>退出</Button>
    </>
  )

  const Login = (
    <Button type="primary" onClick={() => nav(LOGIN_PATHNAME)}>登录</Button>
    //<Link to={LOGIN_PATHNAME}>登录</Link>
  )

  return <div> {username ? UserInfo : ' '} </div>
}

export default UserInfo