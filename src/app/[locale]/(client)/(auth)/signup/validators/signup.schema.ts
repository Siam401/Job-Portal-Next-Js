import { mixed, object, string, ref } from 'yup';

const MAX_FILE_SIZE = 2000000;
const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/i

const validFileExtensions: any = { image: ['jpg', 'png', 'jpeg'], doc: ['doc', 'docx', 'pdf'] };

function isValidFileType(fileName: any, fileType: any) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

let submitLogic = {
  first_name: string()
    .required('First name is required'),
  last_name: string()
    .required('First name is required'),
  email: string().email()
    .required('Email is required'),
  country_code: string()
    .required('Country Code is required'),
  mobile: string()
    .required('Mobile number is required')
    .matches(
      phoneRegExp,
      'Phone number is not valid'
    )
    .max(12),
  gender: string()
    .required('Select a gender'),
  photo: mixed<FileList>().required('Photo is required')
    .test("is-valid-type", "Photo Allowed: jpg, jpeg, png",
      (value: any) => isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test("is-valid-size", "Photo allowed file size max: 2048KB",
      (value: any) => value && value.size <= MAX_FILE_SIZE)
  ,
  resume: mixed<FileList>().required('CV is required')
    .test("is-valid-type", "CV Allowed: pdf, Doc, Docx",
      (value: any) => isValidFileType(value && value.name.toLowerCase(), "doc")
    )
    .test("is-valid-size", "CV allowed file size max: 2048KB",
      (value: any) => value && value.size <= MAX_FILE_SIZE),
  password: string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .test("isValidPass", "Password is not strong", (value, context) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbole = /[!@#%&]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 3;
      const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
      conditions.forEach((condition) =>
        condition ? validConditions++ : null
      );
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    }),
  confirm_password: string()
    .oneOf([ref('password')], 'Passwords must match')
};



export const signUpFormSchema = object().shape(submitLogic);

