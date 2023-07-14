import * as yup from 'yup';

export const LoginSchema = yup.object({
  usernameOrEmail:
    yup.string().required('Username is required') ||
    yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
