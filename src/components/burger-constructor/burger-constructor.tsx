import React, { useContext, useMemo, useState } from 'react';
import classnames from 'classnames';
import { useActive } from '../../hooks/use-active';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { calcPropValues } from '../../utils/utils';
import { IngredientsContext } from '../../services/ingredients-context';
import { OrdersService } from '../../services/orders-service';
import styles from './burger-constructor.module.css';

export const BurgerConstructor: React.FC = () => {
  const ingredients = useContext(IngredientsContext);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [showModal, setShowModal] = useActive<boolean>(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose= () => {
    setShowModal(false);
  };

  const handleOrderClick = async () => {
    const ids = ingredients.map((ingredient) => ingredient._id);
    const res = await OrdersService.sendRequest({ ingredients: ids });

    if (res) {
      setOrderNumber(res.order.number);
      handleModalShow();
    }
  };

  const bun = useMemo(() => (
    ingredients.find((ingredient) => ingredient.type === 'bun')
  ), [ingredients]);

  const onlyIngredients = useMemo(() => (
    ingredients.filter((ingredient) => ingredient.type !== 'bun')
  ), [ingredients]);

  const totalPrice = useMemo(() => {
    const ingredientsTotal = calcPropValues(onlyIngredients, 'price');

    if (bun) {
      const bunsTotal = bun.price * 2;
      return ingredientsTotal + bunsTotal;
    }

    return ingredientsTotal;
  }, [bun, onlyIngredients]);

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
          { totalPrice }
        </span>
            <CurrencyIcon type="primary"/>
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={ classnames('ml-10') }
            onClick={handleOrderClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {
        orderNumber &&
        <Modal isOpened={showModal} onClose={handleModalClose}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      }
    </section>
  );
};
