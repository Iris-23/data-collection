import React, { useState } from 'react';
import { showAnswer } from '@/services/answer';
import styles from './UsernameInput.module.scss';

interface UsernameInputProps {
  username: string;
  onUsernameChange: (username: string) => void;
  onFetchData: () => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ username, onUsernameChange, onFetchData }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(e.currentTarget.value);
  };

  const fetchAnswerData = async  () => {
    if (username) {
      try {
        const response = await showAnswer(username);
        console.log('Answer data:', response); // 显示在控制台方便调试
        setError(null);
      } catch (error) {
        console.error('Error fetching answer data:', error);
        setError('获取答案失败，请稍后重试');
      }
    } else {
      setError('请输入用户名');
    }
  };

  return (
    <div className={styles.usernameInputContainer}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <button type="button" onClick={onFetchData}>Fetch Data</button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UsernameInput;
