import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.container}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: 'right', marginTop: '0px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
