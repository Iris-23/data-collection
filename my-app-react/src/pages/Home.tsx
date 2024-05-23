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
        <Title>学科|专业事项数据采集平台</Title>
        {/* <Paragraph>已累计创建问卷 100 份, 发布问卷 90份, 收到答复 980份</Paragraph> */}
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home