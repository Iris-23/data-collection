import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'
import { message } from 'antd'
import { removeToken } from '../utils/user-token'
import styles from './UserInfo.module.scss' // 导入样式文件

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
      <span className={styles.userInfoText}>
        <UserOutlined />
        {username}
      </span>
      <Button type="primary" onClick={logout}>退出</Button>
    </>
  )

  const Login = (
    <Button type="primary" onClick={() => nav(LOGIN_PATHNAME)}>登录</Button>
  )

  return <div className={styles.userInfoContainer}>{username ? UserInfo : Login}</div>
}

export default UserInfo
