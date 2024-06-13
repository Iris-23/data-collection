import React, { FC } from 'react';
import { Card } from 'antd';

interface UsageCardProps {
  questionId: string;
  title: string; // 可选的标题字段
}

const UsageCard: FC<UsageCardProps> = ({ questionId, title }) => {
  return (
    <Card title={title || questionId} style={{ marginBottom: '20px' }}>
      <p>Question ID: {questionId}</p>
      {title && <p>Title: {title}</p>}
    </Card>
  );
};

export default UsageCard;
