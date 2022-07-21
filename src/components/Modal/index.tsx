import React from "react";
import styles from './BaseModal.module.scss';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode
}


 const BaseModal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }: ModalProps) => {
    const outsideRef = React.useRef(null);

    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    }

    return isOpen ? (
        <div className={styles.modal}>
            <div
                ref={outsideRef}
                className={styles.modal__overlay}
                onClick={handleCloseOnOverlay}
            />
            <div className={styles.modal__box}>
                <button
                    className={styles.modal__close}
                    onClick={onClose}
                >
                    X
                </button>
                <div className={styles.modal__title}>
                    {title}
                </div>
                <div className={styles.modal__content}>
                    {children}
                </div>
            </div>
        </div>
    ): null;
}

export default BaseModal;