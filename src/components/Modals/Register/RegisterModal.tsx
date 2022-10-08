import React, { useState } from 'react';
import InputWithIcon from "../InputWithIcon";
import ModalRWD from "../ModalRWD";
import { AuthFunction } from "../../../types";
import { Link } from 'react-router-dom';
import { FiMail, FiUser } from 'react-icons/fi';
import { RiLock2Line, RiFacebookBoxFill, RiTwitterFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import styles from '../Modals.module.scss';

interface RegisterModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  registerError?: string;
  onRegisterRequested: AuthFunction;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  isModalVisible,
  registerError,
  onRegisterRequested
}) => {

  const [user, setLogin] = useState('')
  const [mail, setMail] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [auth_token, setPassword] = useState('');
  const [localRegisterError, setLocalRegisterError] = useState<string | undefined>()

  const onRegisterTrigger = (e:React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (validate(passwordRepeat, auth_token)) {
      onRegisterRequested({ e, auth_token, user })
    } else {
      setLocalRegisterError("Password entries must match")
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRegisterTrigger(e)
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
      header="Novo Usuário"
      message="Crie sua conta"
    >
      <>
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={user}
          onChange={e => setLogin(e.target.value)}
          type="text"
          placeholder='Nome Completo'
          icon={<FiUser size={24} />}
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={mail}
          onChange={e => setMail(e.target.value)}
          type="mail"
          placeholder='Digite seu Email'
          icon={<FiMail size={24} />}
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={auth_token}
          onChange={e => setPassword(e.target.value)}
          type="password"
          pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ ]).{6,20}$'
          title='A senha deve conter de 6 a 20 caracteres, deve conter ao menos uma letra maiúscula, uma letra minúscula e um número'
          placeholder='Digite sua senha'
          icon={<RiLock2Line size={24} />}
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
          type="password"
          pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ ]).{6,20}$'
          title='A senha deve conter de 6 a 20 caracteres, deve conter ao menos uma letra maiúscula, uma letra minúscula e um número'
          placeholder='Digite sua senha novamente'
          icon={<RiLock2Line size={24} />}
        />
        <button className={styles.Button} onClick={onRegisterTrigger}>Iniciar Cadastro</button>
        {registerError && <p>{registerError}</p>}
        {localRegisterError && <p>{localRegisterError}</p>}

        <div className={styles.OrLine2}>ou</div>
        <p className={styles.SocialLoginTitle}>Cadastre-se usando as redes sociais:</p>
        <div className={styles.SocialLoginContainer}>
          <a className={styles.SocialLoginBox} href='#'>
            <FcGoogle />
          </a>
          <a className={styles.SocialLoginBox} href='#'>
            <RiFacebookBoxFill color='blue' />
          </a>
          <a className={styles.SocialLoginBox} href='#'>
            <RiTwitterFill color='#1DA1F2' />
          </a>
        </div>

        <div className={styles.ModalLinks}>
          <div>
            Já possui conta?
            <Link to="/login">Fazer Login</Link>
          </div>
        </div>
      </>
    </ModalRWD>
  )
}

export default RegisterModal;