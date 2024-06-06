import React, { FC, useState, useEffect } from 'react';
import UsageCard from '../components/UsageCard';
import styles from './Usage.module.scss';
import ListSearch from '../components/ListSearch';
import { Typography, Empty, Spin, Input, Button } from 'antd';
import ListPage from '../components/ListPage';
import { useTitle } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { getQuestionByUsername } from '../services/usage';
import { ResDataType } from '../services/ajax';
import { getQuestionService } from '../services/question';
import { jwtDecode } from 'jwt-decode'; // 确保导入正确
import { getToken } from '../utils/user-token';

const { Title } = Typography;

interface DecodedToken {
  username?: string;
}

//获取用户名
const getUsernameFromJWT = (): string | null => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      // console.log(decodedToken.username)
      return decodedToken.username || null;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }
  return null; 
};

const Usage: FC = () => {
  useTitle('我的问卷');
  const username = getUsernameFromJWT(); 
  const [loading, setLoading] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<ResDataType>({ total: 0, list: [] }); // 使用ResDataType类型
  const [questions, setQuestions] = useState<any[]>([]); 
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    if (username) {
      fetchUserAnswers(username);
    } else {
      console.error('用户名未找到');
    }
  }, [username]);

  const fetchUserAnswers = async (username: string) => {
    setLoading(true);
    try {
      const list = await getQuestionByUsername(username);
      console.log(list)
      setUserAnswers(list);

      const questionPromises = list.map((answer: any) => 
        getQuestionService(answer.questionId)
      );
      console.log(questionPromises)
      const questionResponses = await Promise.all(questionPromises);
      const fetchedQuestions = questionResponses.map(response => response.data);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Failed to fetch user answers and questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim() !== '') {
      const questionId = urlInput.trim();
      const url = `http://localhost:3000/question/${questionId}`;  
      window.open(url, '_blank');
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
            placeholder="输入要跳转的问卷ID"
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
        {userAnswers.length > 0 && userAnswers.map((answer: any) => {
          const { _id } = answer;
          return <UsageCard key={_id} {...answer} />;
        })}
      </div>

      <div className={styles.footer}>
        <ListPage total={userAnswers.length} />
      </div>
    </>
  );
};

export default Usage;