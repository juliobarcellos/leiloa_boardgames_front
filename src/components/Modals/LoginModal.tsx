import React, { useState } from 'react';
import { ReactComponent as LoginIcon } from '../assets/user.svg';
import { ReactComponent as PasswordIcon } from '../assets/padlock.svg';
import InputWithIcon from './InputWithIcon';
import { AuthFunction } from '../../types';
import ModalRWD from './ModalRWD';
import styles from './Modals.module.scss';


interface LoginModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  loginError?: string;
  onLoginRequested: AuthFunction;
}

const LoginModal: React.FC<LoginModalProps> = ({
  loginError,
  isModalVisible,
  onClose,
  onLoginRequested,
}) => {

  const [user, setLogin] = useState('')
  const [auth_token, setPassword] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onLoginRequested({ e, user, auth_token })
    }
  }

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      header="Login"
      message="Please log in"
    >
      <>
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={user}
          onChange={e => setLogin(e.target.value)}
          type="text"
          icon={<LoginIcon width="24px" height="24px" fill="white" />}
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          onChange={e => setPassword(e.target.value)}
          value={auth_token}
          type="password"
          icon={<PasswordIcon width="24px" height="24px" fill="white" />}
        />
        {loginError && <div className={styles.Error}>{loginError}</div>}
        <div className={styles.ButtonContainer}>
          <button className={styles.Button} onClick={onClose}>Cancel</button>
          <button className={styles.Button} onClick={(e) => onLoginRequested({ e, auth_token, user })}>Login</button>
        </div>
      </>
    </ModalRWD>
  );
};

export default LoginModal;