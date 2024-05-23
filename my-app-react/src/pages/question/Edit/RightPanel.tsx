import React, { FC } from 'react'
import { Tabs } from 'antd'
import { FileTextFilled, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {

  const tabsItmes = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextFilled />
          属性
        </span>
      ),
      children: <div>
        <ComponentProp></ComponentProp>
      </div>
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined></SettingOutlined>
          页面设置
        </span>
      ),
      children: <PageSetting></PageSetting>

    }
  ]

  return (
    <Tabs items={tabsItmes} defaultActiveKey={TAB_KEYS.PROP_KEY}></Tabs>
  )
}

export default RightPanel