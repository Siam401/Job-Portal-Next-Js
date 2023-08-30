import { array, object, string, number, boolean } from 'yup';

const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/i

let submitLogic = {
  category: string().optional(),
  first_name: string()
    .required('First name is required'),
  last_name: string().optional(),
  father_name: string()
    .required('Father name is required'),
  mother_name: string().optional(),
  dob: string()
    .required('Date of birth is required'),
  gender: string()
    .required('Gender is required'),
  religion: string()
    .required('Religion is required'),
  marital_status: string()
    .required('Marital status is required'),
  nationality: string()
    .required('Nationality is required'),
  nid: string().optional(),
  primary_mobile: string()
    .required('Primary mobile is required')
    .matches(
      phoneRegExp,
      'Primary number is not valid'
    )
    .max(12),
  secondary_mobile: string()
    .matches(
      phoneRegExp,
      {
        message: 'Secondary number is not valid',
        excludeEmptyString: true
      }
    )
    .max(12)
    .optional(),
  primary_email: string()
    .required('Primary email is required'),
  alternate_email: string().optional(),
  height: number().max(10).optional(),
  weight: number().max(200).optional(),
  present_address: string()
    .required('Present address is required'),
  permanent_address: string().when('is_same_address', {
    is: false,
    then: (schema: any) => {
      return schema.required('Permanent address is required')
    }
  }),
  is_same_address: boolean().required(),
  present_salary: string().optional(),
  expected_salary: string().optional(),
  job_level: string()
    .required('Job level is required'),
  job_type: string()
    .required('Job type is required'),
  special_skills: array().of(string()).max(3).optional(),
  preferred_functions: array().of(number()).min(1).max(3).required(),
  career_objective: string()
    .required('Career objective is required'),
  career_summary: string().optional(),
  special_qualification: string().optional(),

  has_disability: number().required(),
  disability_id: string().optional()
};

export const personalFormSchema = object().shape(submitLogic);

