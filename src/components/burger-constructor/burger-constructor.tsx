import React from 'react';
import classnames from 'classnames';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types/ingredient';
import { calcPropValues } from '../../utils/utils';
import styles from './burger-constructor.module.css';

type BurgerConstructorProps = {
  ingredients: Ingredient[];
};

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => {
  const buns: Ingredient[] = [];

  const onlyIngredients = ingredients.filter((ingredient) => {
    if (ingredient.type === 'bun') {
      buns.push(ingredient);
      return false;
    }

    return true;
  });

  const [topBun, bottomBun] = buns;

  return (
    <section className={ classnames(styles.burgerConstructor, 'pl-4 pr-4 pt-25') }>
      <h2 className={ styles.burgerConstructorTitle }>Конструктор</h2>
      <div className={ classnames(styles.ingredientsListWrapper, 'mb-10') }>
        {
          topBun &&
          <div
            className={ classnames(styles.ingredientItemWrapper) }
          >
            <div className={ classnames(styles.ingredientLeftPart, 'mr-2') }/>
            <ConstructorElement
              type="top"
              isLocked={ false }
              text={ buns[0].name }
              price={ buns[0].price }
              thumbnail={ buns[0].image }
              extraClass={ classnames('mb-4') }
            />
          </div>
        }
        <div className={ classnames(styles.ingredientsList) }>
          {
            onlyIngredients.map((ingredient, i) => (
              <div
                key={ ingredient._id }
                className={ classnames(styles.ingredientItemWrapper) }
              >
                <div className={ classnames(styles.ingredientLeftPart, 'mr-2') }>
                  <DragIcon type="primary"/>
                </div>
                <ConstructorElement
                  isLocked={ true }
                  text={ ingredient.name }
                  price={ ingredient.price }
                  thumbnail={ ingredient.image }
                  extraClass={ classnames({ 'mb-4': i !== ingredients.length - 1 }) }
                />
              </div>
            ))
          }
        </div>
        {
          bottomBun &&
          <div
            className={ classnames(styles.ingredientItemWrapper) }
          >
            <div className={ classnames(styles.ingredientLeftPart, 'mr-2') }/>
            <ConstructorElement
              type="bottom"
              isLocked={ false }
              text={ buns[1].name }
              price={ buns[1].price }
              thumbnail={ buns[1].image }
              extraClass={ classnames('mb-4') }
            />
          </div>
        }
        <div className={ styles.ingredientsListFooter }>
          <p className={ classnames(styles.ingredientsListPrice, 'text text_type_digits-medium') }>
        <span className={ classnames('text text_type_digits-medium mr-2') }>
          { calcPropValues(ingredients, 'price') }
        </span>
            <CurrencyIcon type="primary"/>
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={ classnames('ml-10') }
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};
