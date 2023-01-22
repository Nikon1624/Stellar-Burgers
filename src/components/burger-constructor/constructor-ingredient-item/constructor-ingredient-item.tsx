import React, { useRef } from 'react';
import classnames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientWithUniqId } from '../../../types/ingredient';
import { DnDTypes } from '../../../consts';
import styles from './constructor-ingredient-item.module.css';

type ConstructorIngredientItemProps = {
  ingredient: IngredientWithUniqId;
  index: number;
  extraClass?: string;
  onDrag: (itemIndex: number, index: number) => void,
  onRemove: (ingredient: IngredientWithUniqId) => void,
};

export const ConstructorIngredientItem: React.FC<ConstructorIngredientItemProps> = ({
  ingredient,
  index,
  extraClass = '',
  onDrag,
  onRemove,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleIngredientsCloce = () => {
    onRemove(ingredient);
  };

  const [, dropRef] = useDrop<{ index: number, ingredient: IngredientWithUniqId }, void>({
    accept: DnDTypes.ConstructorIngredients,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onDrag(item.index, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: DnDTypes.ConstructorIngredients,
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={ classnames(styles.ingredientItemWrapper, extraClass, { [styles.drag]: isDragging }) }
    >
      <div className={ classnames(styles.ingredientLeftPart, 'mr-2') }>
        <DragIcon type="primary" />
      </div>
      <div
        className={ styles.ingredientRightPart }
        draggable
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ConstructorElement
          text={ ingredient.name }
          price={ ingredient.price }
          thumbnail={ ingredient.image }
          handleClose={ handleIngredientsCloce }
        />
      </div>
    </div>
  );
};
