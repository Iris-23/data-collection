// QuestionCard.tsx

import React from 'react';
import { Card } from 'antd';

interface QuestionCardProps {
  questionId: string;
  // 其他需要展示的问卷信息字段
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId }) => {
  return (
    <Card>
      <p>Question ID: {questionId}</p>
      {/* 其他问卷信息展示 */}
    </Card>
  );
};

export default QuestionCard;
