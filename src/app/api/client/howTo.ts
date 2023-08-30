import { callApi } from '@/services/Axios';

export const getHowToApplyData = async () => {
  let response = await callApi('frontend/section/how-to-apply', 'get', {}, false, false, true);

  return response;
};
