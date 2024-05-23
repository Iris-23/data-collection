import React, { FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c

  const dispatch = useDispatch()

  function handleClick() {
    dispatch(addComponent({
      fe_id: nanoid(),
      title,
      type,
      props: defaultProps,
    }))
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return <div key={groupId} >
          <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
            {groupName}
          </Title>
          <div>{components.map(c => genComponent(c))}</div>
        </div>
      })}
    </>
  )
}


export default Lib