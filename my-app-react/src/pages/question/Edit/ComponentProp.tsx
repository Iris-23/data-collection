import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {

  const { selectedComponent } = useGetComponentInfo()

  const dispatch = useDispatch()

  if (selectedComponent == null) return <NoProp></NoProp>

  const { type, props, isLocked, isHidden } = selectedComponent

  const componentConf = getComponentConfByType(type)

  if (componentConf == null) return <NoProp />


  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent

    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropComponent } = componentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />

}


export default ComponentProp