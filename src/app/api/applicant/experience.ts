import { callApi } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

export const saveProfileInfo = async (formData: any) => {
  let response = await callApi(
    'applicant/information/save',
    'post',
    jsonToFormData(formData),
    true,
  );

  return response;
};

export const getProfileInfo = async (category: any, token?: string) => {
  let response = await callApi(
    'applicant/information/get',
    'get',
    { category },
    false,
    token,
  );

  return response;
};

export const removeProfileInfo = async (category: string, id: number) => {
  let response = await callApi(
    `applicant/information/remove/${category}/${id}`,
    'delete',
  );

  return response;
};
