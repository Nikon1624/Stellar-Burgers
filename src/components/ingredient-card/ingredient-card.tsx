import React from 'react';
import { useDrag } from 'react-dnd';
import { DnDTypes } from '../../consts';
import classnames from 'classnames';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types/ingredient';
import { useAppSelector } from '../../hooks/state';
import { getIngredientCount } from '../../store/ingredients-slice/selectors';
import styles from './ingredient-card.module.css';

type IngredientCardProps = {
  ingredient: Ingredient;
  onClick: (ingredient: Ingredient) => void;
};

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onClick }) => {
  const countInConstructor = useAppSelector(getIngredientCount(ingredient));

  const [{ isDrag }, dragRef] = useDrag({
    type: DnDTypes.Ingredients,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <div
      ref={ dragRef }
      className={ classnames({ [styles.ingredientHidden]: isDrag }, styles.ingredient, 'mb-8') }
      onClick={ () => onClick(ingredient) }
    >
      <img src={ ingredient.image } alt={ ingredient.name } />
      <p className={ classnames(styles.ingredientPriceWrapper, 'mb-1') }>
        <span className={ classnames('text text_type_digits-default mr-2') }>
          { ingredient.price }
        </span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={ classnames(styles.ingredientName, 'text text_type_main-default') }>
        { ingredient.name }
      </p>
      {
        !!countInConstructor &&
        <div className={ styles.ingredientCount }>
          <Counter count={ countInConstructor } size="default" extraClass="m-1" />
        </div>
      }
    </div>
  );
};
