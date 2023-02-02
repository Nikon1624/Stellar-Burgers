import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/state';
import { getUser } from '../../store/user-slice/selectors';
import styles from './credentials-forms-page.module.css';

export const CredentialsFormsPage = () => {
  const user = useAppSelector(getUser);
  const location = useLocation();

  if (user) {
    const path = location.state ? location.state.from.pathname : AppRoute.MainPage;
    return <Navigate to={ path } replace />;
  }

  return (
    <div className={ styles.mainWrapper }>
      <div className={ styles.contentWrapper }>
        <Outlet />
      </div>
    </div>
  );
};
