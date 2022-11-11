import { useState } from 'react';
import InputWithIcon from "../InputWithIcon";
import ModalRWD from "../ModalRWD";
import { ResetPasswordFunction } from "../../../types";
import { FiMail } from 'react-icons/fi';
import styles from '../Modals.module.scss';

interface RegisterModalProps {
  onClose: () => void;
  states: {
    isLoginModalVisible: boolean,
    setIsLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isRegisterModalVisible: boolean,
    setIsRegisterModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isPasswordModalVisible: boolean,
    setIsPasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  };
  onResetPasswordRequested: ResetPasswordFunction;
}

const ForgotPasswordModal: React.FC<RegisterModalProps> = ({
  onClose,
  states,
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
      isModalVisible={states.isPasswordModalVisible}
      header="Esqueceu a senha?"
      message="Digite seu e-mail que enviaremos o link para alterar a senha"
    >
      <>
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={login}
          onChange={e => setLogin(e.target.value)}
          type="text"
          placeholder='Digite seu Email'
          icon={<FiMail size={24} />}
        />
        <button className={styles.Button} onClick={() => onResetPasswordRequested(login)}>Enviar Email</button>
      </>
    </ModalRWD>
  )
}

export default ForgotPasswordModal;