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
import { IngredientsContext } from '../../services/ingredients-context';
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
      <IngredientsContext.Provider value={ingredients}>
        <AppHeader />
        <main>
          <div className={classnames(styles.mainWrapper, 'pl-5 pr-5')}>
            {
              ingredients.length &&
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            }
          </div>
        </main>
        <ToastContainer />
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
