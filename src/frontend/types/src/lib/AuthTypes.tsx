export type LogInUserType = {
  userId?: number;
  prefLang?:string;
  empId?: number;
  mtId?: number | null;
  username: string;
  fullname?: string;
  email?: string;
  accessToken?: string;
  accessTokenExpiry?: string;
  refreshToken?: string;
  refreshTokenExpiry?: string;
  userStatusId?: number;
  userStatus?: string;
  empStatusId?: number;
  empStatus?: string;
  licValidTill?: string;
};

export type ResetPasswordType = {
  userId: number;
  oldPassword: string;
  newPassword: string;
};

export type AuthTypes = LogInUserType;
