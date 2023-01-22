import React from 'react';
import classnames from 'classnames';
import { ColorType } from '../../../consts';
import styles from './icon-list.module.css';

type IconLinkProps = {
  url: string;
  text: string;
  children: React.ReactNode;
  type: Exclude<ColorType, 'error' | 'success'>;
};

export const IconLink: React.FC<IconLinkProps> = ({ children, url, text, type }) => (
  <a
    href={ url }
    className={ classnames('pt-4 pb-4 pl-5 pr-5', styles.link, type === 'primary' ? styles.linkPrimary : styles.linkSecondary) }
  >
    <div className={ classnames('mr-2', styles.icon) }>
      { children }
    </div>
    <span className={ classnames('text text_type_main-small', styles.text) }>
      { text }
    </span>
  </a>
);
