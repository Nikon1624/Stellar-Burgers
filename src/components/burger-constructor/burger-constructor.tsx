import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useActive } from '../../hooks/use-active';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorEmptyList } from './burger-constructor-empty-list/burger-constructor-empty-list';
import { BurgerConstructorList } from './burger-constructor-list/burger-constructor-list';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { calcPropValues } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getOrder, getSelectedIngredients } from '../../store/ingredients-slice/selectors';
import { sendOrder } from '../../store/ingredients-slice/actions';
import { toast } from 'react-toastify';
import { useDrop } from 'react-dnd';
import { DnDTypes } from '../../consts';
import { addSelectedIngredient } from '../../store/ingredients-slice/ingredients-slice';
import { Ingredient } from '../../types/ingredient';
import styles from './burger-constructor.module.css';

export const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getSelectedIngredients);
  const order = useAppSelector(getOrder);
  const [showModal, setShowModal] = useActive<boolean>(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleOrderClick = () => {
    if (ingredients.length && bun) {
      const ids = ingredients.map((ingredient) => ingredient._id);
      dispatch(sendOrder(ids));
      setShowModal(true);
    } else {
      toast.info('Выберите ингредиенты и булки', {
        theme: 'dark',
      });
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

  const [, dropRef] = useDrop<Ingredient>({
    accept: DnDTypes.Ingredients,
    drop(ingredient) {
      dispatch(addSelectedIngredient(ingredient));
    },
  });

  return (
    <section className={ classnames(styles.burgerConstructor, 'pl-4 pr-4 pt-25') }>
      <h2 className={ styles.burgerConstructorTitle }>Конструктор</h2>
      <div ref={dropRef} className={ classnames(styles.ingredientsListWrapper, 'mb-10') }>
        {
          ingredients.length
            ? <BurgerConstructorList bun={bun} ingredients={onlyIngredients} />
            : <BurgerConstructorEmptyList />
        }
        <div className={ styles.ingredientsListFooter }>
          <p className={ classnames(styles.ingredientsListPrice, 'text text_type_digits-medium') }>
        <span className={ classnames('text text_type_digits-medium mr-2') }>
          { totalPrice }
        </span>
            <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="ml-10"
            onClick={ handleOrderClick }
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {
        order && showModal && (
          <Modal onClose={ handleModalClose }>
            <OrderDetails orderNumber={ order.order.number } />
          </Modal>
        )
      }
    </section>
  );
};
