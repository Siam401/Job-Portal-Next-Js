import { callApi, ResponseInterface } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

const ApplyApi = {
  // Get section pages data
  getJobDetail: async function (code: string) {
    let { message, data }: ResponseInterface = await callApi(
      '/job/detail/' + code,
      'get'
    );

    return data;
  },
  // Apply job
  create: async function (apply: any) {
    const { success, data, message }: ResponseInterface = await callApi(
      'job/apply',
      'post',
      jsonToFormData(apply),
      true
    );

    return [data, message, success];
  },
};

export default ApplyApi;
