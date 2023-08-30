import { callApi, ResponseInterface } from '@/services/Axios';

const ProfileApi = {
  // save profile info
  saveProfileInfo: async function (formData: any) {
    const { data, message, success }: ResponseInterface = await callApi(
      'applicant/information/save',
      'post',
      formData
    );

    return { data, message, success };
  },

  // get profile info
  getProfileInfo: async function (category: any) {
    const { data, message, success }: ResponseInterface = await callApi(
      '/applicant/information/get',
      'get',
      { 'category': category }
    );

    return { data, message, success };
  },

  // get profile info
  deleteProfileInfo: async function (category: string, id: number) {
    const { data, message, success }: ResponseInterface = await callApi(
      '/applicant/information/remove/' + category + '/' + id,
      'delete'
    );

    return { data, message, success };
  },
};

export default ProfileApi;
