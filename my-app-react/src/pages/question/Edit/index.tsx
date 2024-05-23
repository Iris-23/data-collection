import React, { FC } from 'react'
import styles from './index.module.scss'
import EidtCanvas from './EditCanvas'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import { useTitle } from 'ahooks'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const Edit: FC = () => {

  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfo()

  useTitle(`问卷编辑 - ${title}`)


  const dispatch = useDispatch()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EidtCanvas loading={loading}></EidtCanvas>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Edit