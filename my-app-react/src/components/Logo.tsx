import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

const { Title } = Typography

const Logo: FC = () => {

  const { username } = useGetUserInfo()

  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])


  return (

    <div>
      <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          {/* logo显示
          <Title level={1}>
            <FormOutlined />
          </Title> */}
          <Title>软工课设</Title>
        </Space>
      </Link>
      </div>
    </div>
  )
}

export default Logo