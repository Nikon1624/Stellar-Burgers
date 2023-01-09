import React, { useState, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientList } from '../burger-ingredient-list/burger-ingredient-list';
import { Ingredient } from '../../types/ingredient';
import { getIngredientTypes } from '../../utils/utils';
import { IngredientsMap } from '../../consts';
import styles from './burger-ingredients.module.css';

type BurgerIngredientsProps = {
  ingredients: Ingredient[];
};

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const ingredientTypes = useMemo(() => getIngredientTypes(ingredients), [ingredients]);
  const [currentTab, setCurrentTab] = useState<string>(ingredientTypes[0]);
  const currentTabHeaderRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (currentTabHeaderRef.current) {
      currentTabHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTab]);

  return (
    <section className={classnames(styles.burgerIngredients, 'pt-10')}>
      <h2 className={classnames('text text_type_main-large mb-5')}>
        Соберите бургер
      </h2>
      <div className={classnames(styles.tabs, 'mb-10')}>
        {
          ingredientTypes.map((type) => (
            <Tab
              key={type}
              value={type}
              active={currentTab === type}
              onClick={setCurrentTab}
            >
              { IngredientsMap[type] }
            </Tab>
          ))
        }
      </div>
      <BurgerIngredientList ingredients={ingredients} currentTab={currentTab} ref={currentTabHeaderRef} />
    </section>
  );
}
