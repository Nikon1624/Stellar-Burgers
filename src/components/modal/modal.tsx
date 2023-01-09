import React from 'react';
import classnames from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type ModalProps = {
  children: React.ReactNode;
  title?: string;
  isOpened: boolean;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, title, isOpened, onClose }) => {
  return (
    <ModalOverlay isOpened={isOpened} onClose={onClose}>
      <div className={classnames(styles.modal, 'pt-10 pr-10 pb-10 pl-10')}>
        <div className={classnames(title ? styles.modalHeader : styles.modalHeaderWithoutTitle)}>
          { title && <h2 className={classnames('text text_type_main-large')}>{ title }</h2> }
          <button type="button" className={classnames(styles.modalCloseBtn)}>
            <CloseIcon type="primary" onClick={onClose} />
          </button>
        </div>
        { children }
      </div>
    </ModalOverlay>
  );
}
