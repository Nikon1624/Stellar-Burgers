import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { useAppSelector } from '../../hooks/state';
import { getIngredients } from '../../store/ingredients-slice/selectors';

export const MainPage = () => {
  const ingredients = useAppSelector(getIngredients);

  return (
    <DndProvider backend={ HTML5Backend }>
      {
        !!ingredients.length &&
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      }
    </DndProvider>
  );
};
