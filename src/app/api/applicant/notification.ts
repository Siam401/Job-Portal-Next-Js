import { callApi } from '@/services/Axios';

export const getNotificationList = async (
  token?: string,
  params: {
    page: number;
    paginate_count: number;
  } = {
    page: 1,
    paginate_count: 10,
  },
) => {
  let response = await callApi(
    'applicant/notifications',
    'get',
    params,
    false,
    token,
  );

  return response;

  // if (success) {
  //   return data as any;
  // } else {
  //   return message;
  // }
};

export const getNotificationDetail = async (id: number) => {
  let response = await callApi(`applicant/notifications/${id}`, 'get');

  return response;
};

export const deleteNotification = async (id: number) => {
  let { message, success } = await callApi(
    `applicant/notifications/${id}`,
    'delete',
  );

  if (success) {
    return message;
  } else {
    return false;
  }
};
