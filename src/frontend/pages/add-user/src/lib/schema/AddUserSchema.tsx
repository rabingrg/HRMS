import * as yup from 'yup';

export const AddUserSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});
