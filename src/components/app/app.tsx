import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsService } from '../../services/ingredients-service';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Ingredient } from '../../types/ingredient';
import styles from './app.module.css';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (!ingredients.length) {
      const getIngredients = async () => {
        const data = await IngredientsService.getList();
        setIngredients(data);
      };

      getIngredients();
    }
  }, [ingredients]);

  return (
    <>
      <AppHeader />
      <main>
        <div className={classnames(styles.mainWrapper, 'pl-5 pr-5')}>
          {
            ingredients.length &&
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor ingredients={ingredients} />
            </>
          }
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
