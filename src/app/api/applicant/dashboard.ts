import { callApi } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

export const getDashboardData = async (token?: string) => {
  let response = await callApi(`applicant/dashboard`, 'get', {}, false, token);

  return response;
};

export const getApplications = async (
  params: {
    page: number;
    paginate_count: number;
  } = {
    page: 1,
    paginate_count: 5,
  },
  type: string = 'all',
  token?: string,
) => {
  let response = await callApi(
    `applicant/job-applications/${type}`,
    'get',
    params,
    false,
    token,
  );

  return response;
};

export const deleteApplication = async (id: number) => {
  let response = await callApi(`applicant/job-application/${id}`, 'delete');

  return response;
};

export const changePassword = async (data: any) => {
  let response = await callApi(
    `user/change-password`,
    'post',
    jsonToFormData(data),
    true,
  );

  return response;
};
