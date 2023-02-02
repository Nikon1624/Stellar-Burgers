import React from 'react';
import classnames from 'classnames';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import styles from './default-layout.module.css';

type DefaultLayoutProps = {
  extraClass?: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ extraClass }) => {
  return (
    <>
      <AppHeader />
      <main className={ classnames(styles.mainWrapper, extraClass) }>
        <Outlet />
      </main>
    </>
  );
};
