import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .required('Old password is required')
    .typeError('Must be a string'),
  new_password: Yup.string()
    .required('New password is required')
    .typeError('Must be a string')
    .matches(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(/^(?=.*\d)/, 'Password must contain at least one number')
    .matches(
      /^(?=.*[@$!%*?&])/,
      'Password must contain at least one special symbol',
    )
    .min(8, 'Password must be at least 8 characters')
    .max(25, 'Password can be at most 25 characters'),
  confirm_password: Yup.string()
    .required('Confirm password is required')
    .typeError('Must be a string')
    .oneOf([Yup.ref('new_password')], 'Passwords must match'),
});
