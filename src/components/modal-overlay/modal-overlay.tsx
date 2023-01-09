import React, { useEffect } from 'react';
import classnames from 'classnames';
import { Portal } from '../portal/portal';
import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, isOpened, onClose }) => {
  const handleEscDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('keydown', handleEscDown);

      return () => {
        document.removeEventListener('keydown', handleEscDown);
      };
    }
  });

  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={classnames(styles.container)}>
        <div className={classnames(styles.overlay)} onClick={onClose} />
        { children }
      </div>
    </Portal>
  );
};
