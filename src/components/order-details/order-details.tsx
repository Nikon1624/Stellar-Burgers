import React from 'react';
import classnames from 'classnames';
import styles from './order-details.module.css';

type OrderDetailsProps = {
  orderNumber: number;
};

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div className={classnames(styles.orderDetails, 'pb-20')}>
      <h3 className={classnames(styles.orderNumber, 'text text_type_digits-large mb-8')}>{ orderNumber }</h3>
      <p className={classnames('text text_type_main-medium mb-15')}>идентификатор заказа</p>
      <div className={classnames(styles.orderDoneIcon, 'mb-15')} />
      <p className={classnames('text text_type_main-default mb-1')}>Ваш заказ начали готовить</p>
      <p className={classnames('text text_type_main-default dark-grey-text')}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
