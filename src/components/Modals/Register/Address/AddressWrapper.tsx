import { useState } from 'react'
import { useNavigate } from 'react-router';
import { registerUser } from '../../../../services/fakeAuthService';
import { AuthFunction } from '../../../../types';
import Modal from '../../Modal';
import styles from '../../Modals.module.scss';
import AddressModal from '.';

const AddressWrapper = () => {

  const [registerError, setRegisterError] = useState<string | undefined>();

  const navigate = useNavigate();

  const onClose = () => {
    navigate("/")
  }

  const onRegisterRequested: AuthFunction = async (registerData) => {
    try {
      await registerUser(registerData)
    } catch (e) {
      setRegisterError(e as string)
    }
  }

  return (
    <Modal onBackdropClick={onClose}>
      <div className={styles.AddressModalContainer}>
        <div className={styles.CloseButtonContainer} onClick={onClose}>
          <div className={styles.CloseButton} />
        </div>
        <h3 className={styles.Header}>Endereço</h3>
        <AddressModal
          registerError={registerError}
          onRegisterRequested={onRegisterRequested} />
      </div>
    </Modal>
  )
}

export default AddressWrapper;