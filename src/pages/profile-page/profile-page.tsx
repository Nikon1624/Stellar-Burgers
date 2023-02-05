import React from 'react';
import classnames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch } from '../../hooks/state';
import { logout } from '../../store/user-slice/actions';
import styles from './profile-page.module.css';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };
  return (
    <div className={ classnames(styles.mainWrapper, 'pt-30') }>
      <aside className={ classnames(styles.aside, 'mr-15') }>
        <nav className="mb-20">
          <ul className={ styles.navigationList }>
            <li className="text text_type_main-medium">
              <NavLink
                to={ AppRoute.ProfilePage }
                className={({ isActive }) => (
                  isActive
                    ? classnames(styles.navigationItem, styles.navigationItemActive)
                    : styles.navigationItem
                ) }
                end
              >
                Профиль
              </NavLink>
            </li>
            <li className="text text_type_main-medium">
              <NavLink
                to={ AppRoute.ProfileOrders }
                className={({ isActive }) => (
                  isActive
                    ? classnames(styles.navigationItem, styles.navigationItemActive)
                    : styles.navigationItem
                ) }
              >
                История заказов
              </NavLink>
            </li>
            <li className="text text_type_main-medium">
              <button
                type="button"
                className={ classnames(styles.navigationItem, styles.navigationItemButton, 'text text_type_main-medium') }
                onClick={ handleLogoutClick }
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>
        <p className={ styles.navigationItemDescription }>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
