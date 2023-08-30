import { callApi, ResponseInterface } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

const CommonApi = {
  // fetch job function data
  getJobFunction: async function () {
    let { message, data, success }: ResponseInterface = await callApi(
      '/frontend/job-functions',
      'get'
    );

    return { data, message, success };
  },

  // fetch special skill job
  getSpecialSkill: async function () {
    const { data, message, success }: ResponseInterface = await callApi(
      'frontend/special-skills',
      'get'
    );

    return { data, message, success };
  },

  // fetch level of educations 
  getEducationLevel: async function () {
    const { data, message, success }: ResponseInterface = await callApi(
      'frontend/educations',
      'get'
    );

    return { data, message, success };
  },

  // fetch level of educations 
  getCountriesOption: async function () {
    const { data, message, success }: ResponseInterface = await callApi(
      '/location/get-countries/option',
      'get'
    );

    return { data, message, success };
  },
};

export default CommonApi;
