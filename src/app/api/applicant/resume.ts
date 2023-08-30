import { callApi } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

export const getResume = async (token?: string) => {
  let response = await callApi('applicant/get-resume', 'get', {}, false, token);

  return response;
};

export const saveResume = async (formData: any) => {
  let response = await callApi(
    'applicant/save-resume',
    'post',
    jsonToFormData(formData),
    true,
  );

  return response;
};

export const getResumeStatus = async () => {
  let { data, message, success } = await callApi(
    'applicant/resume-status',
    'get',
  );

  return [data, message, success];
};

export const deleteResume = async () => {
  let response = await callApi('applicant/remove-resume', 'delete');

  return response;
};

// applicant/view-resume
export const viewResume = async (token?: string) => {
  let response = await callApi(
    'applicant/view-resume',
    'get',
    {},
    false,
    token,
  );

  return response;
};
