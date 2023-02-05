import React from 'react';
import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
  return (
    <div className={ styles.mainWrapper }>
      <div className={ styles.background } />
      <div className={ styles.content }>
        <h1 className="text text_type_main-large mb-4">404 страница не найдена</h1>
      </div>
    </div>
  );
};
