import React, { FC } from 'react'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
const { Title, Paragraph } = Typography


const Home: FC = () => {

  const nav = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.info}>
      <Title style={{fontSize:60}}>数据采集系统</Title>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home