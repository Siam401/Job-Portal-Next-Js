import * as Yup from 'yup';

export const SpecializationSchema = Yup.object().shape({
  skill_description: Yup.string()
    .typeError('Must be a string')
    .required('Skill Description is required'),

  skills: Yup.array()
    .min(1, 'Must have at least one skill')
    .required('Must have skills'),

  skill: Yup.string(),
  learn_by: Yup.string(),
});

export const SkillSchema = Yup.object().shape({
  skill: Yup.string()
    .required('Skill name is required')
    .typeError('Must be a string'),
  learn_by: Yup.string()
    .typeError('Must be a string')
    .required('Learning method is required'),
});

export const LanguageSchema = Yup.object().shape({
  language: Yup.string()
    .required('Language name is required')
    .typeError('Must be a string'),
  reading: Yup.string()
    .typeError('Must be a string')
    .required('Reading level is required'),
  writing: Yup.string()
    .typeError('Must be a string')
    .required('Writing level is required'),
  speaking: Yup.string()
    .typeError('Must be a string')
    .required('Speaking level is required'),
});

export const ReferenceSchema = Yup.object().shape({
  name: Yup.string().typeError('Must be a string').required('Name is required'),
  organization: Yup.string()
    .typeError('Must be a string')
    .required('Organization is required'),
  designation: Yup.string()
    .typeError('Must be a string')
    .required('Designation is required'),
  mobile: Yup.string()
    .typeError('Must be a string')
    .matches(/^01[3-9]\d{8}$/, 'Must be a valid Bangladeshi mobile number')
    .required('Mobile number is required'),
  email: Yup.string()
    .typeError('Must be a string')
    .email('Must be a valid email address')
    .required('Email is required'),
  address: Yup.string().typeError('Must be a string'),
  phone_office: Yup.string().typeError('Must be a string'),
  phone_home: Yup.string().typeError('Must be a string'),
  relation: Yup.string().typeError('Must be a string'),
});
