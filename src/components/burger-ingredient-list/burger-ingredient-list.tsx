import React, { useMemo, forwardRef } from 'react';
import { useActive } from '../../hooks/use-active';
import classnames from 'classnames';
import { Modal } from '../modal/modal';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Ingredient } from '../../types/ingredient';
import { IngredientsMap } from '../../consts';
import { getIngredientTypes } from '../../utils/utils';
import styles from './burger-ingredient-list.module.css';

type BurgerIngredientListProps = {
  ingredients: Ingredient[];
  currentTab: string;
};

export const BurgerIngredientList = forwardRef<HTMLHeadingElement | null, BurgerIngredientListProps>(({ ingredients, currentTab }, ref) => {
  const [selectedIngredient, setSelectedIngredient] = useActive<Ingredient | null>(null);

  const handleCloseModal = () => {
    setSelectedIngredient(null);
  };

  const ingredientTypes = useMemo(() => getIngredientTypes(ingredients), [ingredients]);

  return (
    <div className={classnames(styles.ingredientList)}>
      {
        ingredientTypes.map((type, i) => (
          <div
            key={i}
            className={classnames(styles.ingredientTypesWrapper, 'mb-10')}
          >
            <h3
              className={classnames('text text_type_main-medium mb-6')}
              id={type}
              ref={currentTab === type ? ref : null}
            >
              { IngredientsMap[type] }
            </h3>
            <div className={classnames(styles.ingredients, 'pl-4 pr-4 mb-10')}>
              {
                ingredients.map((ingredient) => {
                  return ingredient.type === type
                    ? <IngredientCard key={ingredient._id} ingredient={ingredient} onClick={setSelectedIngredient} />
                    : null;
                })
              }
            </div>
          </div>
        ))
      }
      <Modal isOpened={!!selectedIngredient} onClose={handleCloseModal}>
        <IngredientDetails ingredient={selectedIngredient as Ingredient} />
      </Modal>
    </div>
  );
});
