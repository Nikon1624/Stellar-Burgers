import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/state';
import { getUser, getUserLoadingStatus } from '../../store/user-slice/selectors';

type ProtectedRouteProps = {
  element: React.ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  const user = useAppSelector(getUser);
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);

  if (userLoadingStatus) {
    return null;
  }

  if (!user) {
    return <Navigate to={ AppRoute.LoginPage } state={{ from: location }} />;
  }

  return element;
};
