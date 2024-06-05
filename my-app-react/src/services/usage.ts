// services/api.ts

import axiosInstance from './ajax'; // 引入已经配置好的axios实例

export const getAnswerByUsername = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/answer/${username}`);
    return response;
  } catch (error) {
    console.error('Error fetching answers by username:', error);
    throw error; // 可以选择处理错误或者进一步抛出
  }
};
