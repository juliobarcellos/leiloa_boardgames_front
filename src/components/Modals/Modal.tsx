import React, { MouseEventHandler } from 'react'
import ReactDOM from 'react-dom';
import styles from './Modals.module.scss';

interface ModalProps {
  onBackdropClick: () => void;
  children?: React.ReactNode
}

const stopPropagation: MouseEventHandler<HTMLDivElement> = e => {
  e.persist();
  e.stopPropagation();
};

const Modal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.Overlay} onClick={onBackdropClick}>
      <div onClick={stopPropagation}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Modal