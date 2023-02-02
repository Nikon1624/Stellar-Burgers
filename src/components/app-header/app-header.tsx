import React from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IconLink } from '../common/icon-link/icon-link';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/state';
import { getUser } from '../../store/user-slice/selectors';
import styles from './app-header.module.css';

export const AppHeader: React.FC = () => {
  const user = useAppSelector(getUser);
  const location = useLocation();

  return (
    <header className={ classnames('pt-4 pb-4', styles.header) }>
      <div className={ styles.wrapper }>
        <nav>
          <ul className={ styles.list }>
            <li className={ styles.listItem }>
              <IconLink url={ AppRoute.MainPage } text="Конструктор">
                <BurgerIcon type={ location.pathname !== AppRoute.MainPage ? 'secondary' : 'primary' } />
              </IconLink>
            </li>
            <li className={ styles.listItem }>
              <IconLink url={ AppRoute.OrderFeed } text="Лента заказов">
                <ListIcon type={ location.pathname !== AppRoute.OrderFeed ? 'secondary' : 'primary' } />
              </IconLink>
            </li>
          </ul>
        </nav>
        <Link to={ AppRoute.MainPage } className="mr-30 pr-6">
          <Logo />
        </Link>
        <IconLink
          url={ AppRoute.ProfilePage }
          text={ user ? user.name : 'Личный кабинет' }
        >
          <ProfileIcon type={ location.pathname !== AppRoute.ProfilePage ? 'secondary' : 'primary' } />
        </IconLink>
      </div>
    </header>
  );
};
