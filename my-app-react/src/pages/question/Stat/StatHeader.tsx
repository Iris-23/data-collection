import React, { FC, useRef } from 'react'
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd'
import styles from './StatHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import QRCode from 'qrcode.react'
import { CLIENT_URL } from '../../../constant/index'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()

  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()


  const urlInputRef = useRef<InputRef>(null)

  // 拷贝链接
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy')
    message.success('拷贝成功')
  }

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null

    // 拼接url, 需要参考c端规则
    const url = `${CLIENT_URL}/question/${id}`


    const QRCodeElem = <div style={{ textAlign: 'center' }}>
      <QRCode value={url} size={150}></QRCode>
    </div>


    return <Space>
      <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
      <Tooltip title="拷贝链接">
        <Button icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Popover content={QRCodeElem}>
        <Button icon={<QrcodeOutlined />} onClick={copy}></Button>
      </Popover>
    </Space>
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type='link' icon={<LeftOutlined></LeftOutlined>} onClick={() => { nav(-1) }}>返回</Button>
            <Title> {title} </Title>
          </Space>
        </div>
        <div className={styles.main}>
          {genLinkAndQRCodeElem()}
        </div>
        <div className={styles.right}>
          <Button  type="primary" onClick={() => { nav(`/question/edit/${id}`) }}>编辑问卷</Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader

