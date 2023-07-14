import { LogInUserType } from '@hrms-workspace/frontend/types';
import { request } from '@hrms-workspace/frontend/utils';

export const signInUserFn = async (body: LogInUserType) => {
  const response = await request.auth.login(body);
  return response.data;
};
