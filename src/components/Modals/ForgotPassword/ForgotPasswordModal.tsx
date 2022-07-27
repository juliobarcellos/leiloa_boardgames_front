import { useState } from 'react';
import InputWithIcon from "../InputWithIcon";
import ModalRWD from "../ModalRWD";
import { AuthFunction, ResetPasswordFunction } from "../../../types";
import { ReactComponent as LoginIcon } from '../../../assets/user.svg';
import { ReactComponent as PasswordIcon } from '../../../assets/padlock.svg';
import { Link } from 'react-router-dom';

interface RegisterModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  onResetPasswordRequested: ResetPasswordFunction;
}

const ForgotPasswordModal: React.FC<RegisterModalProps> = ({
  onClose,
  isModalVisible,
  onResetPasswordRequested
}) => {

  const [login, setLogin] = useState('')


  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onResetPasswordRequested(login)
    }
  }

  const validate = (passwordRepeat: string, password: string) => {
    if (passwordRepeat !== password) {
      return false
    } else {
      return true;
    }
  }

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      header="Forgot password"
      message="You can reset password here"
    >
      <>
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={login}
          onChange={e => setLogin(e.target.value)}
          type="text"
          icon={<LoginIcon width="24px" height="24px" fill="white" />}
        />
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onResetPasswordRequested(login)}>Reset password</button>
        </div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </>
    </ModalRWD>
  )
}

export default ForgotPasswordModal;