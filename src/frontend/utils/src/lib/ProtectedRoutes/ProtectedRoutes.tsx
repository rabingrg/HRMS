import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '@hrms-workspace/frontend/store';
import { StoreType } from '@hrms-workspace/frontend/types';

export const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const logInUserData = Store((state: StoreType) => state.logInUserData);

  return (
    <div>
      {logInUserData.accessToken ? (
        children
      ) : (
        <Navigate
          to={{
            pathname: '/login',
          }}
          replace
        />
      )}
    </div>
  );
};

export default ProtectedRoutes;
