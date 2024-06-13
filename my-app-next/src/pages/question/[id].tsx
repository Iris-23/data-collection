import PageWrapper from '@/components/PageWrapper';
import { getQuestionById } from '@/services/question';
import { getComponent } from '@/components/QuestionComponents';
import styles from '@/styles/Question.module.scss';
import UsernameInput from '@/components/QuestionComponents/UsernameInput';
import { useState } from 'react';
import { showAnswer, showTitle } from '@/services/answer';

type PropsType = {
  errno: number;
  data?: {
    _id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

type AnswerType = {
  _id: string;
  questionId: string;
  username: string;
  answerList: Array<{ componentId: string; value: string }>;
};

type AnswerDataType = {
  data: {
    answers: Array<AnswerType>;
  };
};

type TitleDataType = any; // 根据 showTitle 函数的返回数据类型定义

export default function Question(props: PropsType) {
  const { errno, data, msg = '' } = props;
  const [username, setUsername] = useState('');
  const [answerData, setAnswerData] = useState<AnswerDataType | null>(null);
  const [titleData, setTitleData] = useState<TitleDataType | null>(null); // 添加 state 来存储 title 数据

  const fetchAnswerData = async () => {
    try {
      const response: AnswerDataType = await showAnswer(username);
      console.log('Answer data:', response); 
      setAnswerData(response); 

      // 提取 questionId 并调用 showTitle
      const answers = response?.data?.answers;
      if (answers && Array.isArray(answers)) {
        const questionIds = answers.map(answer => answer.questionId);
        for (const questionId of questionIds) {
          console.log('Question ID:', questionId); 
          const titleResponse: TitleDataType = await showTitle(questionId);
          console.log('Title data:', titleResponse); 
          setTitleData(titleResponse); 
        }
      }
    } catch (error) {
      console.error('Error fetching answer data:', error);
    }
  };

  // 数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  const { _id, title = '', desc = '', isDeleted, isPublished, componentList = [] } = data || {};

  // 已经被删除的，提示错误
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }
  // 尚未发布的，提示错误
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map(c => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={_id} />

        <UsernameInput
          username={username}
          onUsernameChange={(newUsername) => setUsername(newUsername)}
          onFetchData={fetchAnswerData}
        />
        
        {ComponentListElem}

        {answerData && (
          <div className={styles.answerData}>
            <h2>Answer Data:</h2>
            {answerData.data.answers.map((answer: AnswerType) => (
              <div key={answer._id}>
                <h3>Question ID: {answer.questionId}</h3>
                {answer.answerList.map((ans: { componentId: string; value: string }) => (
                  <p key={ans.componentId}>{ans.value}</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {titleData && (
          <div className={styles.titleData}>
            <h2>Title Data:</h2>
            <pre>{JSON.stringify(titleData, null, 2)}</pre>
          </div>
        )}

        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = '' } = context.params;

  // 根据 id 获取问卷数据
  const data = await getQuestionById(id);

  return {
    props: data,
  };
}
