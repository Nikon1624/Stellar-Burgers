import React, { useState } from 'react';
import classnames from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientList } from '../burger-ingredient-list/burger-ingredient-list';
import { Ingredient } from '../../types/ingredient';
import styles from './burger-ingredients.module.css';

type BurgerIngredientsProps = {
  ingredients: Ingredient[];
};

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState('0');

  return (
    <section className={classnames(styles.burgerIngredients, 'pt-10')}>
      <h2 className={classnames('text text_type_main-large mb-5')}>
        Соберите бургер
      </h2>
      <div className={classnames(styles.tabs, 'mb-10')}>
        <Tab value="0" active={currentTab === '0'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="1" active={currentTab === '1'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="2" active={currentTab === '2'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <BurgerIngredientList ingredients={ingredients} />
    </section>
  );
}
