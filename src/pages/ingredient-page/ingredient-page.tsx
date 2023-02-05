import React from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { useAppSelector } from '../../hooks/state';
import { getIngredientById } from '../../store/ingredients-slice/selectors';
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  const ingredient = useAppSelector(getIngredientById(id as string));

  return (
    <div className={ classnames(styles.mainWrapper, 'pt-30') }>
      { ingredient && <IngredientDetails ingredient={ ingredient } /> }
    </div>
  );
};
