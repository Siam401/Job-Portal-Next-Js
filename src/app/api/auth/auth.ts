import { ResponseInterface, callApi } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';
import { getSession } from 'next-auth/react';

export const checkAuthentication = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken') ? true : false;
  } else {
    return false;
  }
};

export const clearSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userToken');
  }
};

export const getUserToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken');
  }

  return null;
};

export const saveUserToken = (token: string): boolean => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userToken', token);
    return true;
  }

  return false;
};

export const AuthApi = {
  // Request for user login
  login: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/login',
      'post',
      form,
    );

    // console.log('calling Login API');

    return { data, message, success };
  },

  // Request for user registration
  registration: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/register',
      'post',
      jsonToFormData(form),
      true,
    );

    // console.log('calling Registration API');

    return { data, message, success };
  },

  // Request for social registration
  socialLogin: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/social-login',
      'post',
      form
    );

    return { data, message, success };
  },

  // OTP verification
  otpVerify: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/verify-otp',
      'post', 
      form
    );

    // console.log('calling Registration API');

    return { data, message, success };
  },

  // Forget password
  forgetPassword: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/forget-password',
      'post',
      form
    );

    // console.log('calling Registration API');

    return { data, message, success };
  },

  // Resend password
  resendPassword: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/resend-otp',
      'post', form
    );

    // console.log('calling Registration API');

    return { data, message, success };
  },

  // Reset password
  resetPassword: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/reset-password',
      'post', form
    );

    // console.log('calling Registration API');

    return { data, message, success };
  },

  // Process user logout
  logout: async function () {

    let result: ResponseInterface = await callApi(
      'auth/logout',
      'get'
    );

    // console.log('calling Items API');

    if (!result.success) {
      console.log('Error occurred: ' + result.message);
    }
    return result;
  },

  loginAuto: async function (form: any) {
    let { data, message, success }: ResponseInterface = await callApi(
      'auth/login',
      'post',
      form,
    );

    // console.log('calling Login API');

    return { data, message, success };
  },
};
