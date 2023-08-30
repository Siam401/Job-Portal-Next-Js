import { callApi } from '@/services/Axios';

export const getClientLayoutData = async () => {
  let response = await callApi('frontend/get-layouts', 'get', {}, false, false, true);

  return response;
};
