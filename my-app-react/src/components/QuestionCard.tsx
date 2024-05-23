import React, { FC, useState } from 'react'
import { Button, Space, Divider, Tag, message, Popconfirm } from 'antd'
import styles from './Question.module.scss'
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useSearchParams } from 'react-router-dom'


type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  isDeleted: boolean
  answerCount: number
  createdAt: string
  refresh?: () => void
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar, isDeleted, refresh } = props

  const [searchParams] = useSearchParams()
  const nav = useNavigate()

  // 修改
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      async onSuccess() {
        refresh && refresh()
        setIsStarState(!isStarState) // 更新 state
        message.success('已更新')
      },
    }
  )


  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`) // 跳转到问卷编辑页
      },
    }
  )

  // 删除

  const [isDeletedState, setIsDeletedState] = useState(isDeleted)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
        refresh && refresh()
      },
    }
  )

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button type='text' size='small' icon={<EditOutlined />} onClick={() => nav(`/question/edit/${_id}`)}>
              编辑问卷
            </Button>
            <Button type='text' size='small' icon={<LineChartOutlined />} onClick={() => nav(`/question/stat/${_id}`)} disabled={!isPublished} >
              问卷统计
            </Button>
          </Space>

        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type='text'
              size='small'
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            > {isStarState ? '取消标星' : '标星'}  </Button>

            <Popconfirm title="是否要复制该问卷?" okText="是" cancelText="否" onConfirm={duplicate}>
              <Button type='text' size='small' icon={<CopyOutlined />} disabled={duplicateLoading} >复制</Button>
            </Popconfirm>

            <Popconfirm title="是否要删除该问卷?" okText="是" cancelText="否" onConfirm={deleteQuestion}>
              <Button type='text' size='small' icon={<DeleteOutlined />} disabled={deleteLoading}>删除</Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  )

}

export default QuestionCard