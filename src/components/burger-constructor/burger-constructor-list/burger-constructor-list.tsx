import React from 'react';
import classnames from 'classnames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorIngredientItem } from '../constructor-ingredient-item/constructor-ingredient-item';
import { Ingredient, IngredientWithUniqId } from '../../../types/ingredient';
import {
  changeSelectedIngredients,
  removeSelectedIngredient
} from '../../../store/ingredients-slice/ingredients-slice';
import { moveItem } from '../../../utils/utils';
import { useAppDispatch } from '../../../hooks/state';
import styles from './burger-constructor-list.module.css';

type BurgerConstructorListProps = {
  bun: Ingredient | undefined;
  ingredients: IngredientWithUniqId[];
};

export const BurgerConstructorList: React.FC<BurgerConstructorListProps> = ({ bun, ingredients }) => {
  const dispatch = useAppDispatch();

  const handleIgredientDrag = (itemIndex: number, index: number) => {
    const changedIngredientList = moveItem<IngredientWithUniqId>(ingredients, itemIndex, index);
    dispatch(changeSelectedIngredients(changedIngredientList));
  };

  const handleIgredientRemove = (ingredient: IngredientWithUniqId) => {
    dispatch(removeSelectedIngredient(ingredient));
  };

  return (
    <>
      {
        bun &&
        <div
          className={ classnames(styles.ingredientItemWrapper) }
        >
          <div className={ classnames(styles.ingredientLeftPart, 'mr-2') } />
          <ConstructorElement
            type="top"
            isLocked
            text={ `${ bun.name } (верх)` }
            price={ bun.price }
            thumbnail={ bun.image }
            extraClass="mb-4"
          />
        </div>
      }
      <div className={ classnames(styles.ingredientsList, { 'mb-4': !bun }) }>
        {
          ingredients.map((ingredient, i) => (
            <ConstructorIngredientItem
              key={ ingredient.uniqId }
              ingredient={ ingredient }
              index={ i }
              extraClass={ i !== ingredients.length - 1 ? 'mb-4' : '' }
              onDrag={ handleIgredientDrag }
              onRemove={ handleIgredientRemove }
            />
          ))
        }
      </div>
      {
        bun &&
        <div
          className={ styles.ingredientItemWrapper }
        >
          <div className={ classnames(styles.ingredientLeftPart, 'mr-2') } />
          <ConstructorElement
            type="bottom"
            isLocked
            text={ `${ bun.name } (низ)` }
            price={ bun.price }
            thumbnail={ bun.image }
            extraClass="mb-4 mt-4"
          />
        </div>
      }
    </>
  );
};
