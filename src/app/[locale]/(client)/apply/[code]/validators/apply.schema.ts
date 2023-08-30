import { checkEmpty } from '@/services/Utility';
import { array, mixed, object, string, boolean, bool, number } from 'yup';

const MAX_FILE_SIZE = 2000000;
const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/i

const validFileExtensions: any = { image: ['jpg', 'png', 'jpeg'], doc: ['doc', 'docx', 'pdf'] };

function isValidFileType(fileName: any, fileType: any) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const questionSchema: any = object().shape({
  question: string().required(),
  answer: string().when('is_required', {
    is: true,
    then: (schema: any) => {
      return schema.required('Answer is required')
    }
  }),
  is_required: boolean()
});

let submitLogicWithoutSession = {
  job_code: string().required(),
  first_name: string()
    .required('First name is required'),
  last_name: string()
    .required('Last name is required'),
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
  show_photo: boolean().required(),
  photo: mixed<FileList>().when('show_photo', {
    is: true,
    then: (schema: any) => {
      return schema.required('Photo is required')
        .test("is-valid-type", "Photo Allowed: jpg, jpeg, png",
          (value: any) => isValidFileType(value && value.name.toLowerCase(), "image")
        )
        .test("is-valid-size", "Photo allowed file size max: 2048KB",
          (value: any) => value && value.size <= MAX_FILE_SIZE)
    }
  }),
  resume: mixed<FileList>().required('CV is required')
    .test("is-valid-type", "CV Allowed: pdf, Doc, Docx",
      (value: any) => isValidFileType(value && value.name.toLowerCase(), "doc")
    )
    .test("is-valid-size", "CV allowed file size max: 2048KB",
      (value: any) => value && value.size <= MAX_FILE_SIZE),
  show_cover_letter: boolean().required(),
  cover_letter: string().when('show_cover_letter', {
    is: true,
    then: (schema: any) => {
      return schema.required('Cover letter is required')
    }
  }),
  questions: array().of(questionSchema)
};


let submitLogicWithSession = {
  resume: mixed<FileList>().optional()
    .test("is-valid-type", "CV Allowed: pdf, Doc, Docx",
      (value: any) => {
        if (value != undefined) {
          isValidFileType(value && value.name.toLowerCase(), "doc")
        } else {
          return true
        }
      }
    )
    .test("is-valid-size", "CV allowed file size max: 2048KB",
      (value: any) => {
        if (value != undefined) {
          value.size <= MAX_FILE_SIZE
        } else {
          return true
        }
      }),
  show_cover_letter: boolean().required(),
  cover_letter: string().when('show_cover_letter', {
    is: true,
    then: (schema: any) => {
      return schema.required('Cover letter is required')
    }
  }),
  questions: array().of(questionSchema)
};



export const applyFormSchemaWithoutSession = object().shape(submitLogicWithoutSession);
export const applyFormSchemaWithSession = object().shape(submitLogicWithSession);

