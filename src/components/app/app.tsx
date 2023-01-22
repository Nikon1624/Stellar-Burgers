import React, { useEffect } from 'react';
import classnames from 'classnames';
import { ToastContainer } from 'react-toastify';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import 'react-toastify/dist/ReactToastify.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { fetchIngredients } from '../../store/ingredients-slice/actions';
import { getIngredients } from '../../store/ingredients-slice/selectors';
import styles from './app.module.css';

function App() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [ingredients, dispatch]);

  return (
    <>
      <AppHeader />
      <main className={ classnames(styles.mainWrapper, 'pl-5 pr-5') }>
        <DndProvider backend={HTML5Backend}>
          {
            ingredients.length &&
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          }
        </DndProvider>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
