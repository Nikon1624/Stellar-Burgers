import React from 'react';
import classnames from 'classnames';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IconLink } from '../common/icon-link/icon-link';
import styles from './app-header.module.css';

export const AppHeader: React.FC = () => (
  <header className={ classnames('pt-4 pb-4', styles.header) }>
    <div className={ styles.wrapper }>
      <nav>
        <ul className={ styles.list }>
          <li className={ styles.listItem }>
            <IconLink url="" text="Конструктор" type="secondary">
              <BurgerIcon type="secondary" />
            </IconLink>
          </li>
          <li className={ styles.listItem }>
            <IconLink url="" text="Лента заказов" type="secondary">
              <ListIcon type="secondary" />
            </IconLink>
          </li>
        </ul>
      </nav>
      <a href="/">
        <Logo />
      </a>
      <IconLink url="" text="Личный кабинет" type="secondary">
        <ProfileIcon type="secondary" />
      </IconLink>
    </div>
  </header>
);
