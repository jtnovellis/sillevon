import { api } from './axiosCreate';

export const featchPosts = async (page = 1, options = {}) => {
  const res = await api.get(`/api/posts/all?page=${page}&limit=12`, options);
  return res.data;
};
