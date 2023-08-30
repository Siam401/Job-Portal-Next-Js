import { callApi, ResponseInterface } from '@/services/Axios';

const PageApi = {
  // Get section pages data
  getHome: async function () {
    let { success, message, data }: ResponseInterface = await callApi(
      '/frontend/home',
      'get'
    );

    return { success, message, data };
  },
  // Get section pages data
  getSection: async function (sectionName: string) {
    let { message, data }: ResponseInterface = await callApi(
      '/frontend/section/' + sectionName,
      'get',
      {},
      false,
      null,
      true
    );

    return data;
  },
  //get jon wings section data
  getJobWingSection: async function () {
    let { message, data }: ResponseInterface = await callApi(
      '/frontend/job-wings',
      'get'
    );

    return data;
  },
  //get jon cities section data
  getJobCitySection: async function () {
    let { message, data }: ResponseInterface = await callApi(
      '/frontend/job-cities',
      'get'
    );

    return data;
  },
};

export default PageApi;
