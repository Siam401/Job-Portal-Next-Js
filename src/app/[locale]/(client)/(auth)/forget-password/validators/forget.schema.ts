import { object, string } from 'yup';

const phoneRegExp = new RegExp(
  '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$',
); //
// const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/i

let submitLogic = {
  username: string()
    .required('Email or Phone is required')
    .matches(phoneRegExp, 'Email or Phone is not valid'),
};

export const forgetFormSchema = object().shape(submitLogic);
