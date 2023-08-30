import * as yup from 'yup';

const FilterFormSchema = yup.object().shape({
  company: yup.array().of(yup.string()),
  // job category will be array of string
  jobCategory: yup.array().of(yup.number()),
  // jobCategory:yup.string(),
  location: yup.array().of(yup.number()),
  sorting: yup.string(),
  // .oneOf(['asc', 'desc'], 'Invalid sorting option')
  search: yup.string(),
});

export { FilterFormSchema };
