import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './icon-list.module.css';

type IconLinkProps = {
  url: string;
  text: string;
  children: React.ReactNode;
};

export const IconLink: React.FC<IconLinkProps> = ({ children, url, text }) => (
  <NavLink
    to={ url }
    className={({ isActive }) => (
      isActive
        ? classnames('pt-4 pb-4 pl-5 pr-5', styles.link, styles.linkPrimary)
        : classnames('pt-4 pb-4 pl-5 pr-5', styles.link, styles.linkSecondary)
    ) }
  >
    <div className={ classnames('mr-2', styles.icon) }>
      { children }
    </div>
    <span className={ classnames('text text_type_main-small', styles.text) }>
      { text }
    </span>
  </NavLink>
);
