import * as Yup from 'yup';

export const expertiseSchema = Yup.object().shape({
  name: Yup.string()
    .typeError('Name must be a string')
    .required('Name is required'),
  month: Yup.number()
    .typeError('Month must be a number')
    .min(0, 'Month must be greater than or equal to 0')
    .lessThan(12, 'Month must be less than 12')
    .test(
      'month-year',
      'Month or year one of them is required',
      function (value) {
        const year = this.parent.year;
        return value !== 0 || year !== 0;
      },
    ),
  year: Yup.number()
    .typeError('Year must be a number')
    .min(0, 'Year must be greater than or equal to 0')
    .test(
      'month-year',
      'Year or month one of them is required',
      function (value) {
        const month = this.parent.month;
        return value !== 0 || month !== 0;
      },
    ),
});

const today = new Date();

export const experienceFormSchema = Yup.object().shape({
  category: Yup.string().typeError('Category must be a string'),
  is_fresher: Yup.boolean()
    .typeError('Employment Status must be a boolean')
    .default(false)
    .required('Employment Status is required'),

  id: Yup.number().typeError('ID must be a number').nullable(),

  company_name: Yup.string().when('is_fresher', {
    is: (is_fresher: boolean) => is_fresher === false,
    then: (schema) =>
      schema
        .typeError('Company name must be a string')
        .required('Company name is required'),
  }),

  designation: Yup.string().when('is_fresher', {
    is: (is_fresher: boolean) => is_fresher === false,
    then: (schema) =>
      schema
        .typeError('Designation must be a string')
        .required('Designation is required'),
  }),

  company_business: Yup.string(),

  department: Yup.string(),

  start_date: Yup.string().when(['is_fresher', 'is_current'], {
    is: (is_fresher: boolean, is_current: number) => !is_fresher,
    then: (schema) =>
      schema
        .typeError('Start date must be a string')
        .required('Start date is required')
        .test(
          'start_date',
          'Start date must be less than or equal to today',
          function (value) {
            const endDate = new Date(value);
            return endDate <= today;
          },
        ),
  }),

  end_date: Yup.string().when(['is_fresher', 'is_current'], {
    is: (is_fresher: boolean, is_current: number) => !is_fresher && !is_current,
    then: (schema) =>
      schema
        .typeError('End date must be a string')
        .required('End date is required')
        .nullable()
        .test(
          'end-date',
          'End date must be less than or equal to today',
          function (value) {
            const endDate = new Date(value as string | number | Date);
            return endDate <= today;
          },
        )

        .test(
          'end-date',
          'End date must be greater than or equal to start date',
          function (value) {
            const startDate = new Date(this.parent.start_date);
            const endDate = new Date(value as string | number | Date);
            return endDate >= startDate;
          },
        ),
  }),

  location: Yup.string().typeError('Location must be a string'),

  is_current: Yup.boolean()
    .typeError('Is current must be a boolean')
    .default(false)
    .required(),

  responsibility: Yup.string().typeError('Responsibility must be a string'),

  expertise: Yup.array(),

  expertise_name: Yup.string().nullable(),
  expertise_month: Yup.number().nullable(),
  expertise_year: Yup.number().nullable(),
});
