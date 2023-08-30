import { callApi, ResponseInterface } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

const PhotoApi = {
  // save User photo
  saveUserPhoto: async function (formData: any) {
    const { data, message, success }: ResponseInterface = await callApi(
      '/user/photo',
      'post',
      jsonToFormData(formData),
      true
    );

    return { data, message, success };
  },

  // delete user photo
  deleteUserPhoto: async function () {
    const { data, message, success }: ResponseInterface = await callApi(
      '/user/photo',
      'delete'
    );

    return { data, message, success };
  },
};

export default PhotoApi;
