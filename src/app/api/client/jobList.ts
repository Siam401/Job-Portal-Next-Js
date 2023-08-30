import { callApi } from '@/services/Axios';

export const getJobCategories = async () => {
  let response = await callApi('job/get-categories', 'get', {}, false, false, true);

  return response;
};

export const getWingList = async () => {
  let response = await callApi('company/get-wings', 'get');

  return response;
};

export const getLocations = async () => {
  let response = await callApi('location/get-divisions', 'get', {}, false, false, true);

  return response;
};

export const getJobList = async (
  params: {
    company: string;
    category: string;
    location: string;
    sort: string;
    page: number;
  } = {
    company: '',
    category: '',
    location: '',
    sort: '',
    page: 1,
  },
) => {
  let { data, message, success } = await callApi('job/list', 'get', params);

  if (success) {
    return data;
  } else {
    return false;
  }
};
