import { object, string, number, } from 'yup';

let submitLogicAcademic = {
  category: string().optional(),
  id: number().optional(),
  education_id: number()
    .min(1, 'Education Level is required')
    .required('Education Level is required'),
  degree: string()
    .required('Degree is required'),
  major: string()
    .required('Major is required'),
  duration: string()
    .required('Duration is required'),
  institute: string()
    .required('Institute is required'),
  passing_year: string().optional(),
  achievement: string().optional(),
  board: string().optional(),
  result: string().optional(),
  mark: string().optional(),
  scale: string().optional(),
};

export const academicFormSchema = object().shape(submitLogicAcademic);

let submitLogicTraining = {
  category: string().optional(),
  id: number().optional(),
  title: string()
    .required('Title is required'),
  country_id: number()
    .min(1, 'Country Level is required')
    .required('Country is required'),
  training_year: string().optional(),
  duration: string()
    .required('Duration is required'),
  institute: string()
    .required('Institute is required'),
  location: string()
    .required('Location is required'),
  topic: string().optional()
};

export const trainingFormSchema = object().shape(submitLogicTraining);

let submitLogicCertification = {
  category: string().optional(),
  id: number().optional(),
  certification: string()
    .required('Title is required'),
  institute: string()
    .required('Institute is required'),
  location: string()
    .required('Location is required'),
  start_date: string()
    .required('Start date is required'),
  end_date: string().optional()
};

export const certificationFormSchema = object().shape(submitLogicCertification);

