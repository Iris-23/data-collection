import React, { FC } from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'

const NotFound: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={<Button type="primary"> <Link to={MANAGE_INDEX_PATHNAME}>返回首页</Link>  </Button>}
    />
  )
}

export default NotFound