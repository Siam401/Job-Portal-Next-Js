import { callApi } from '@/services/Axios';

// applicant/user

export const getUserDetail = async (token?: string) => {
  let response = await callApi(`applicant/user`, 'get', {}, false, token);

  return response;
};
