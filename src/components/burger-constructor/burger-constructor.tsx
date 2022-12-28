import React from 'react';
import classnames from 'classnames';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types/ingredient';
import { calcPropValues, getElementType } from '../../utils/utils';
import styles from './burger-constructor.module.css';

type BurgerConstructorProps = {
  ingredients: Ingredient[];
};

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => (
  <section className={classnames(styles.burgerConstructor, 'pl-4 pr-4 pt-25')}>
    <h2 className={styles.burgerConstructorTitle}>Конструктор</h2>
    <div className={classnames(styles.ingredientsList, 'mb-10')}>
      {
        ingredients.map((ingredient, i) => (
          <div
            key={ingredient._id}
            className={classnames(styles.ingredientItemWrapper)}
          >
            <span className={classnames(styles.ingredientDragIcon, 'mr-2')}>
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              isLocked={true}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              extraClass={classnames({ 'mb-4': i !== ingredients.length - 1 })}
            />
          </div>
        ))
      }
    </div>
    <div className={styles.ingredientsListFooter}>
      <p className={classnames(styles.ingredientsListPrice, 'text text_type_digits-medium')}>
        <span className={classnames('text text_type_digits-medium mr-2')}>
          { calcPropValues(ingredients, 'price') }
        </span>
        <CurrencyIcon type="primary" />
      </p>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass={classnames('ml-10')}
      >
        Оформить заказ
      </Button>
    </div>
  </section>
);
