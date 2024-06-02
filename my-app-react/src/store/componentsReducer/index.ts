import { ComponentPropsType } from './../../components/QuestionComponents'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {produce} from 'immer'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'


export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>

  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },

    // 修改 selectedId
    changeSelectedId: (draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    },

    // 添加新组建
    addComponent: ( draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      insertNewComponent(draft, newComponent)
    },

    //  修改组件属性
    changeComponentProps: 
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)

        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ,

    // 删除选中的组件
    removeSelectedComponent: (draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    },

    // 隐藏/显示 选中的组件

    changeComponentHidden: 
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft

        const { fe_id, isHidden } = action.payload

        // 重新计算 selectedId

        let newSelectedId = ''

        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          newSelectedId = fe_id
        }

        draft.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)

        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ,

    // 锁定/解锁 组件

    toggleComponentLocked: 
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)

        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ,

    // 拷贝 组件

    copySelectedComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
    },

    //粘贴
    pasteCopiedComponent: (draft: ComponentsStateType) => {
      const { copiedComponent } = draft

      if (copiedComponent == null) return

      // 需要修改fe_id
      copiedComponent.fe_id = nanoid()

      insertNewComponent(draft, copiedComponent)
    },

    // 选中上一个

    selectPrevComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      if (index < 0) return

      if (index <= 0) return

      draft.selectedId = componentList[index - 1].fe_id
    },

    // 选中下一个

    selectNextComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      if (index < 0) return

      if (index >= componentList.length - 1) return

      draft.selectedId = componentList[index + 1].fe_id
    },

    // 修改组件标题
    changeComponentTitle: 
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { fe_id, title } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ,
    
    // 移动组件位置
    moveComponent: 
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload

        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
      }
    ,
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentSlice.actions

export default componentSlice.reducer
