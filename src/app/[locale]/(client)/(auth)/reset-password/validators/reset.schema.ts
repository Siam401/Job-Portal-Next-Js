import { object, string, ref } from 'yup';

let submitLogic = {
  token: string(),
  password: string().required('Password is required'),
  confirm_password: string()
    .oneOf([ref('password')], 'Passwords must match')
};

export const resetFormSchema = object().shape(submitLogic);

