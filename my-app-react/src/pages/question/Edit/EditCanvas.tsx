import React, { FC, MouseEvent } from 'react'
import styles from './Edit.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, changeSelectedId, moveComponent } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return

  const { Component } = componentConf
  return <Component {...props} />
}

const EidtCanvas: FC<PropsType> = ({ loading }) => {

  const { componentList, selectedId } = useGetComponentInfo()

  const dispatch = useDispatch()

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <Spin></Spin>
    </div>
  }

  return <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
    <div className={styles.canvas}>
      {
        componentList.filter(c => !c.isHidden).map(c => {
          const { fe_id, isLocked } = c

          // 拼接 classNames
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedIdClassName = styles['selected']
          const lockedClassName = styles['locked']
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedIdClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked
          })

          return <SortableItem key={fe_id} id={fe_id}>
            <div key={fe_id} className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
              <div className={styles.component}>
                {genComponent(c)}
              </div>
            </div>
          </SortableItem>
        })
      }

    </div>
  </SortableContainer>
}


export default EidtCanvas