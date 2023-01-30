import React, { useEffect } from 'react';
import { Portal } from '../portal/portal';
import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscDown);

    return () => {
      document.removeEventListener('keydown', handleEscDown);
    };
  });

  return (
    <Portal wrapperId="modals">
      <div className={ styles.container }>
        <div className={ styles.overlay } onClick={ onClose } />
        { children }
      </div>
    </Portal>
  );
};
