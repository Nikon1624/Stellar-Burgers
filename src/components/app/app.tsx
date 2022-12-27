import React from 'react';
import classnames from 'classnames';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import styles from './app.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <div className={classnames(styles.mainWrapper, 'pl-5 pr-5')}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </div>
      </main>
    </>
  );
}

export default App;
