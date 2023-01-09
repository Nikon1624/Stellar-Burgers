import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useActive } from '../../hooks/use-active';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { Ingredient } from '../../types/ingredient';
import { calcPropValues } from '../../utils/utils';
import styles from './burger-constructor.module.css';

type BurgerConstructorProps = {
  ingredients: Ingredient[];
};

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => {
  const [showModal, setShowModal] = useActive<boolean>(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose= () => {
    setShowModal(false);
  };

  const bun = useMemo(() => (
    ingredients.find((ingredient) => ingredient.type === 'bun')
  ), [ingredients]);

  const onlyIngredients = useMemo(() => (
    ingredients.filter((ingredient) => ingredient.type !== 'bun')
  ), [ingredients]);

  return (
    <section className={ classnames(styles.burgerConstructor, 'pl-4 pr-4 pt-25') }>
      <h2 className={ styles.burgerConstructorTitle }>Конструктор</h2>
      <div className={ classnames(styles.ingredientsListWrapper, 'mb-10') }>
        {
          bun &&
          <div
            className={ classnames(styles.ingredientItemWrapper) }
          >
            <div className={ classnames(styles.ingredientLeftPart, 'mr-2') }/>
            <ConstructorElement
              type="top"
              isLocked={ false }
              text={ bun.name }
              price={ bun.price }
              thumbnail={ bun.image }
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
                  extraClass={ classnames({ 'mb-4': i !== onlyIngredients.length - 1 }) }
                />
              </div>
            ))
          }
        </div>
        {
          bun &&
          <div
            className={ classnames(styles.ingredientItemWrapper) }
          >
            <div className={ classnames(styles.ingredientLeftPart, 'mr-2') }/>
            <ConstructorElement
              type="bottom"
              isLocked={ false }
              text={ bun.name }
              price={ bun.price }
              thumbnail={ bun.image }
              extraClass={ classnames('mb-4 mt-4') }
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
            onClick={handleModalShow}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal isOpened={showModal} onClose={handleModalClose}>
        <OrderDetails />
      </Modal>
    </section>
  );
};
