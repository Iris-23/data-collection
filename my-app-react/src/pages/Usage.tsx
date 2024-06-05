
import React, { FC, useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import styles from './Usage.module.scss';
import ListSearch from '../components/ListSearch';
import useLoadQuestionListData from '../hooks/useLoadQuestionListData';
import { Typography, Empty, Spin, Pagination, Input, Button } from 'antd';
import ListPage from '../components/ListPage';
import { useTitle } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { getAnswerByUsername } from '../services/usage';

const { Title } = Typography;

const Usage: FC = () => {
  useTitle('我的问卷');
  const username = "当前用户名"; // 这里替换为实际获取的用户名
  const { data = {}, loading, refresh } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState('');
  const [userAnswers, setUserAnswers] = useState<any[]>([]); // 存储用户答案数据的状态

  useEffect(() => {
    fetchUserAnswers();
  }, []);

  const fetchUserAnswers = async () => {
    try {
      const response = await getAnswerByUsername(username);
      setUserAnswers(response.data.list); // 假设后端返回的数据结构中包含一个名为list的字段
    } catch (error) {
      console.error('Failed to fetch user answers:', error);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim() !== '') {
      window.open(urlInput.trim(), '_blank');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
          <Input
            placeholder="输入要跳转的URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            style={{ marginLeft: '10px', width: '300px' }}
          />
          <Button type="primary" onClick={handleUrlSubmit} style={{ marginLeft: '10px' }}>
            跳转
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && userAnswers.length === 0 && <Empty description="暂无数据" />}
        {userAnswers.length > 0 &&
          userAnswers.map((answer: any) => {
            const { _id } = answer;
            return <QuestionCard key={_id} {...answer} refresh={refresh} list={list} />;
          })}
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Usage;
