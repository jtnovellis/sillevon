import { api } from './axiosCreate';

export async function fetchUserData(options = {}) {
  const res = await api.get(`/api/users/datauser`, options);
  return res.data;
}
