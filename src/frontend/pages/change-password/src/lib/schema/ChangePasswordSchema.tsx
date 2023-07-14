import * as yup from 'yup';

export const ChangePasswordSchema = yup.object({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: yup.string().required('New Password is required'),
  password_confirmation: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null as any], 'Passwords do not match'),
});
