import React from 'react';
import classnames from 'classnames';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types/ingredient';
import styles from './ingredient-card.module.css';

type IngredientCardProps = {
  ingredient: Ingredient;
  onClick: (ingredient: Ingredient) => void;
};

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onClick }) => {
  return (
    <div
      className={classnames(styles.ingredient, 'mb-8')}
      onClick={() => onClick(ingredient)}
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
  );
};
