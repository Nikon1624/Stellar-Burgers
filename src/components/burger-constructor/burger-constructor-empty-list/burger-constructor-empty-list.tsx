import React from 'react';
import classnames from 'classnames';
import styles from './burger-constructor-empty-list.module.css';

export const BurgerConstructorEmptyList: React.FC = () => {
  return (
    <div className={ classnames(styles.burgerConstructorEmpty, 'mb-5') }>
      <p>Выберите булки и ингредиенты</p>
    </div>
  );
};
