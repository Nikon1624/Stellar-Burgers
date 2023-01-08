import React from 'react';
import classnames from 'classnames';
import { Ingredient } from '../../types/ingredient';
import styles from './ingredient-details.module.css';

type IngredientDetailsProps = {
  ingredient: Ingredient;
};

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
  return (
    <div className={classnames(styles.ingredientDetails, 'pl-15 pr-15 pb-5')}>
      <img src={ingredient.image_large} alt={ingredient.name} className={classnames('mb-4')}/>
      <h3 className={classnames('text text_type_main-medium mb-8')}>{ ingredient.name }</h3>
      <div className={classnames(styles.ingredientsNutritions)}>
        <div className={classnames(styles.ingredientsNutrition, 'mr-5')}>
          <span className={classnames('mb-1')}>Калории,ккал</span>
          <span className={classnames('text text_type_digits-default')}>
            { ingredient.calories }
          </span>
        </div>
        <div className={classnames(styles.ingredientsNutrition, 'mr-5')}>
          <span className={classnames('mb-1')}>Белки, г</span>
          <span className={classnames('text text_type_digits-default')}>
            { ingredient.proteins }
          </span>
        </div>
        <div className={classnames(styles.ingredientsNutrition, 'mr-5')}>
          <span className={classnames('mb-1')}>Жиры, г</span>
          <span className={classnames('text text_type_digits-default')}>
            { ingredient.fat }
          </span>
        </div>
        <div className={classnames(styles.ingredientsNutrition)}>
          <span className={classnames('mb-1')}>Углеводы, г</span>
          <span className={classnames('text text_type_digits-default')}>
            { ingredient.carbohydrates }
          </span>
        </div>
      </div>
    </div>
  );
};
