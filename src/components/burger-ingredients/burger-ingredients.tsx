import React, { useState, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientList } from '../burger-ingredient-list/burger-ingredient-list';
import { getIngredientTypes } from '../../utils/utils';
import { IngredientsMap } from '../../consts';
import { useAppSelector } from '../../hooks/state';
import { getIngredients } from '../../store/ingredients-slice/selectors';
import styles from './burger-ingredients.module.css';

export const BurgerIngredients: React.FC = () => {
  const ingredients = useAppSelector(getIngredients);
  const ingredientTypes = useMemo(() => getIngredientTypes(ingredients), [ingredients]);
  const [currentTab, setCurrentTab] = useState<string>(ingredientTypes[0]);
  const currentTabHeaderRef = useRef<HTMLHeadingElement | null>(null);
  const isChangeTab = useRef(true);

  useEffect(() => {
    if (currentTabHeaderRef.current && isChangeTab.current) {
      currentTabHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTab]);

  const handleTabChange = (value: string) => {
    isChangeTab.current = true;
    setCurrentTab(value);
  };

  const handleListScroll = (value: string) => {
    if (!isChangeTab.current) {
      setCurrentTab(value);
    }

    isChangeTab.current = false;
  };

  return (
    <section className={ classnames(styles.burgerIngredients, 'pt-10') }>
      <h2 className="text text_type_main-large mb-5">
        Соберите бургер
      </h2>
      <div className={ classnames(styles.tabs, 'mb-10') }>
        {
          ingredientTypes.map((type) => (
            <Tab
              key={ type }
              value={ type }
              active={ currentTab === type }
              onClick={ handleTabChange }
            >
              { IngredientsMap[type] }
            </Tab>
          ))
        }
      </div>
      <BurgerIngredientList ingredients={ ingredients } currentTab={ currentTab } ref={ currentTabHeaderRef }
                            onScroll={ handleListScroll } />
    </section>
  );
}
