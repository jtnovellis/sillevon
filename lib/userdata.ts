import { api } from './axiosCreate';

export async function fetchUserData(options = {}) {
  const res = await api.get(`/api/users/datauser`, options);
  return res.data;
}

export async function thirdPartAuth(
  email: string | undefined,
  name: string | undefined
) {
  const data = { email, name };
  const res = await api.post(`/api/users/auth0`, data);
  return res.data;
}
