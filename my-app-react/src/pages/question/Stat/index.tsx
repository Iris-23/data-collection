import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin, Result, Button } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()


  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  // 修改
  useTitle(`问卷统计 - ${title}`)

  // loading 效果
  const LoadingElm = (
    <div style={{ textAlign: 'center' }}>
      <Spin></Spin>
    </div>
  )

  // Content Elem

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return <Result
        status="warning"
        title="该页面尚未发布"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>返回</Button>
        }
      >
      </Result>
    }

    return <>
      <div className={styles.left}>
        <ComponentList
          selectedComponentId={selectedComponentId}
          setSelectedComponentId={setSelectedComponentId}
          setSelectedComponentType={setSelectedComponentType}
        ></ComponentList>
      </div>
      <div className={styles.main}>

        <PageStat
          selectedComponentId={selectedComponentId}
          setSelectedComponentId={setSelectedComponentId}
          setSelectedComponentType={setSelectedComponentType}
        ></PageStat>

      </div>
      <div className={styles.right}>
        <ChartStat
          selectedComponentId={selectedComponentId}
          selectedComponentType={selectedComponentType}
        ></ChartStat>
      </div>
    </>

  }


  return (
    <div className={styles.container}>
      <StatHeader></StatHeader>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElm}
        {!loading && <div className={styles.content}> {genContentElem()} </div>}

      </div>
    </div>
  )
}

export default Stat


