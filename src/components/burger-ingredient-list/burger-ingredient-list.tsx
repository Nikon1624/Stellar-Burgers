import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import { Ingredient } from '../../types/ingredient';
import { IngredientsMap } from '../../consts';
import { getIngredientTypes } from '../../utils/utils';
import styles from './burger-ingredient-list.module.css';

type BurgerIngredientListProps = {
  ingredients: Ingredient[];
};

export const BurgerIngredientList: React.FC<BurgerIngredientListProps> = ({ ingredients }) => {
  const ingredientTypes = getIngredientTypes(ingredients);

  return (
    <div className={classnames(styles.ingredientList)}>
      {
        ingredientTypes.map((type, i) => (
          <div
            key={i}
            className={classnames(styles.ingredientTypesWrapper, 'mb-10')}
          >
            <h3 className={classnames('text text_type_main-medium mb-6')}>
              { IngredientsMap[type] }
            </h3>
            <div className={classnames(styles.ingredients, 'pl-4 pr-4 mb-10')}>
              {
                ingredients.map((ingredient) => {
                  return ingredient.type === type
                    ? <div
                      key={ingredient._id}
                      className={classnames(styles.ingredient, 'mb-8')}
                    >
                      <img src={ingredient.image} alt={ingredient.name}/>
                      <p className={classnames(styles.ingredientPriceWrapper, 'mb-1')}>
                        <span className={classnames('text text_type_digits-default mr-2')}>
                          { ingredient.price }
                        </span>
                        <CurrencyIcon type="primary" />
                      </p>
                      <p className={classnames(styles.ingredientName, 'text text_type_main-default')}>
                        { ingredient.name }
                      </p>
                      <div className={classnames(styles.ingredientCount)}>
                        <Counter count={1} size="default" extraClass="m-1" />
                      </div>
                    </div>
                    : null;
                })
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};
