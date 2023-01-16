import React, { useMemo, forwardRef } from 'react';
import { InView } from 'react-intersection-observer';
import { useActive } from '../../hooks/use-active';
import classnames from 'classnames';
import { Modal } from '../modal/modal';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Ingredient, IngredientTypes } from '../../types/ingredient';
import { IngredientsMap } from '../../consts';
import { getIngredientTypes } from '../../utils/utils';
import styles from './burger-ingredient-list.module.css';

type BurgerIngredientListProps = {
  ingredients: Ingredient[];
  currentTab: string;
  onScroll: (value: IngredientTypes) => void;
};

export const BurgerIngredientList = forwardRef<HTMLHeadingElement | null, BurgerIngredientListProps>((
  {
    ingredients,
    currentTab,
    onScroll
  },
  ref
) => {
  const [selectedIngredient, setSelectedIngredient] = useActive<Ingredient | null>(null);

  const handleCloseModal = () => {
    setSelectedIngredient(null);
  };

  const handleScrollChange = (inView: boolean, type: IngredientTypes) => {
    if (inView) {
      onScroll(type);
    }
  };

  const ingredientTypes = useMemo(() => getIngredientTypes(ingredients), [ingredients]);

  return (
    <div className={classnames(styles.ingredientList)}>
      {
        ingredientTypes.map((type, i) => (
          <InView
            key={i}
            threshold={0.6}
            className={classnames(styles.ingredientTypesWrapper, 'mb-10')}
            onChange={(inView) => handleScrollChange(inView, type)}>
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
          </InView>
        ))
      }
      <Modal isOpened={!!selectedIngredient} onClose={handleCloseModal}>
        <IngredientDetails ingredient={selectedIngredient as Ingredient} />
      </Modal>
    </div>
  );
});
