import Modal from './Modal';
import styles from './Modals.module.scss';

export interface BaseModalWrapperProps {
  children?: React.ReactNode
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({ children, isModalVisible, onBackdropClick, header, message }) => {

  if (!isModalVisible) {
    return null
  }

  return (<Modal onBackdropClick={onBackdropClick}>
    <div className={styles.DesktopModalContainer}>
      <div className={styles.CloseButtonContainer} onClick={onBackdropClick}>
        <div className={styles.CloseButton} />
      </div>
      <h3 className={styles.Header}>{header}</h3>
      {message && <p className={styles.Message}>{message}</p>}
      {children}
    </div>
  </Modal>);
}

export default BaseModalWrapper