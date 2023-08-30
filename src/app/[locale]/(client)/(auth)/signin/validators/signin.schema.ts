import { object, string } from 'yup';

let submitLogic = {
  username: string()
    .required('Email or Mobile number is required'),
  password: string().required('Password is required'),
};

export const signInFormSchema = object().shape(submitLogic);

