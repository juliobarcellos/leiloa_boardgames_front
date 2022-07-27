import React, { useState } from 'react';
import { ReactComponent as LoginIcon } from '../assets/user.svg';
import { ReactComponent as PasswordIcon } from '../assets/padlock.svg';
import InputWithIcon from './InputWithIcon';
import { AuthFunction } from '../../types';
import ModalRWD from './ModalRWD';


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

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onLoginRequested({ login, password })
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
          value={login}
          onChange={e => setLogin(e.target.value)}
          type="text"
          icon={<LoginIcon width="24px" height="24px" fill="white" />}
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          onChange={e => setPassword(e.target.value)}
          type="password"
          icon={<PasswordIcon width="24px" height="24px" fill="white" />}
        />
        {loginError && <p>{loginError}</p>}
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onLoginRequested({ password, login })}>Login</button>
        </div>
      </>
    </ModalRWD>
  );
};

export default LoginModal;