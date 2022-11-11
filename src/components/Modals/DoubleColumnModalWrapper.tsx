import Modal from './Modal';
import styles from './Modals.module.scss';

export interface DoubleColumnModalWrapperProps {
  children?: React.ReactNode
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
}

const DoubleColumnModalWrapper: React.FC<DoubleColumnModalWrapperProps> = ({ children, isModalVisible, onBackdropClick, header, message }) => {

  if (!isModalVisible) {
    return null
  }

  return (<Modal onBackdropClick={onBackdropClick}>
    <div className={styles.DoubleColumnModalContainer}>
      <div className={styles.CloseButtonContainer} onClick={onBackdropClick}>
        <div className={styles.CloseButton} />
      </div>
      <h3 className={styles.Header}>{header}</h3>
      {message && <p className={styles.Message}>{message}</p>}
      {children}
    </div>
  </Modal>);
}

export default DoubleColumnModalWrapper