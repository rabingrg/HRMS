export type GetAllUsersParams = {
  pn: number;
  ps: number;
};

export type UsersType = {
  userId: number;
  empId: number;
  mtId: number;
  mtName: string;
  username: string;
  fullname: string;
  email: string;
  userStatusId: number;
  userStatus: string;
  empStatusId: number;
  empStatus: string;
  postedOn: string;
};

export type GetAllUsersType = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: UsersType[];
};

export type CreateUserType = {
  username: string;
  password: string;
};

export type UpdateUserType = {
  userId: number;
  mtId: number;
  roleId: number;
  username: string;
  statusId: number;
};
