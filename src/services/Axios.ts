import axios from 'axios';
import { API_URL } from '@/config/constants';
import { getSession } from 'next-auth/react';
import { getUserToken } from '@/app/api/auth/auth';

export interface ResponseInterface {
  data: object | null;
  resultCode: number;
  message: string | null;
  success: boolean;
}

/**
 * Call backend API with appropriate method & request params
 *
 * @param route API endpoint route
 * @param method Request method, default is GET
 * @param data Request form data, default is empty object
 * @param hasFile Flag to indicate request has file, default is false
 * @param authToken Auth token, default is null
 * @param cache Flag to force cache, default is false
 * @returns
 */
export const callApi: any = async (
  route: string,
  method: string = 'get',
  data: object = {},
  hasFile: boolean = false,
  authToken?: string | null,
  cache: boolean = false,
) => {
  const session: any = await getSession();

  method = method.toLowerCase();

  // console.log('api: ', route, ' | method: ', method, ' | cache: ', cache);

  if (method === 'get') {
    return await fetchApi(route, session, data, authToken, cache);
  } else {
    return await axiosApi(route, method, data, hasFile, session, authToken);
  }
};

/**
 * Handle GET request with fetch API
 *
 * @param route API endpoint route
 * @param session NextAuth session
 * @param data Request URI params
 * @param authToken Auth token
 * @param cache Flag to force cache
 * @returns
 */
const fetchApi = async (
  route: string,
  session: any,
  data: any,
  authToken?: string | null,
  cache: boolean = false,
): Promise<ResponseInterface> => {
  let apiFullUrl = API_URL + route.replace(/^\/+/g, ''); // remove leading slash if any

  if (data && data instanceof Object && Object.keys(data).length > 0) {
    // add query params to url
    const params = new URLSearchParams(data);
    apiFullUrl += (apiFullUrl.includes('?') ? '&' : '?') + params.toString();
  }

  let response = null,
    options: any = {
      method: 'GET',
      headers: {
        // Set the Authorization header with bearer token [if any]
        Authorization: `Bearer ${
          authToken ?? session?.token ?? getUserToken()
        }`,

        // Set the Accept header to accept JSON
        Accept: 'application/json',

        // Set the Content-Type header to JSON
        'Content-Type': 'application/json',

        // Set revalidation to purge the Data Cache and re-fetching the latest data
        next: { revalidate: cache ? 3600 : 60 },
      },
    };

  if (cache) {
    // Set cache header to force cache
    options.headers.cache = 'force-cache';
  }

  // Make the HTTP request to the API
  response = await fetch(apiFullUrl, options);

  if (response.ok) {
    let res: any = await response.json();

    return axiosData(res);
  } else {
    // Return default error response
    return axiosData(null);
  }
};

/**
 * Handle POST, PUT, DELETE request with axios API
 *
 * @param route API endpoint route
 * @param method Request method [GET not allowed]
 * @param data Request form data
 * @param hasFile Flag to indicate request has file
 * @param authToken Auth token
 * @param session NextAuth session
 * @returns
 */
const axiosApi = async (
  route: string,
  method: string,
  data: object,
  hasFile: boolean,
  session: any,
  authToken?: string | null,
): Promise<ResponseInterface> => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${authToken ?? session?.token ?? getUserToken()}`,
      Accept: 'application/json',
      'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
    },
  });

  let response = null;
  try {
    if (method.toLowerCase() === 'put') {
      response = await api.put(route, data);
    } else if (method.toLowerCase() === 'delete') {
      response = await api.delete(route, data);
    } else {
      response = await api.post(route, data);
    }
  } catch (error: any) {
    return axiosData(error.response);
  }

  return axiosData(response);
};

/**
 * Process & format API response
 *
 * @param response API response
 * @returns
 */
export const axiosData = (response: any): ResponseInterface => {
  let resData = response && response?.data?.success ? response.data : response;

  if (resData) {
    if (resData.success) {
      resData.resultCode = resData.result_code;
      delete resData.result_code;
      return resData;
    } else {
      return {
        data: null,
        message: resData.message ?? 'Response error',
        resultCode: resData.result_code ?? 1,
        success: false,
      };
    }
  } else {
    return {
      data: null,
      message: 'Response error',
      resultCode: 1,
      success: false,
    };
  }
};
