import React, { useState } from 'react';
import ModalRWD from '../ModalRWD';
import InputWithIcon from '../InputWithIcon';
import { Link } from 'react-router-dom';
import styles from '../Modals.module.scss';
import { FiMail } from 'react-icons/fi';
import { RiLock2Line, RiFacebookBoxFill, RiTwitterFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { useAuth0 } from "@auth0/auth0-react";

export interface LoginArgs {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>;
  auth_token: string;
  user: string;
}

export type LoginFunction = (args: LoginArgs) => Promise<void>;

interface LoginModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  loginError?: string;
  onLoginRequested: LoginFunction;
}

const LoginModal: React.FC<LoginModalProps> = ({
  loginError,
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
  const { loginWithRedirect } = useAuth0();

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={true}
      header="Login"
      message="Faça login para continuar"
    >

      <>
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={user}
          onChange={e => setLogin(e.target.value)}
          type="text"
          placeholder='Digite seu Email'
          icon={<FiMail size={24} />}
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          onChange={e => setPassword(e.target.value)}
          value={auth_token}
          type="password"
          placeholder='Digite sua senha'
          icon={<RiLock2Line size={24} />}
        />
        <button className={styles.Button} onClick={() => loginWithRedirect()}>Login</button>
        {loginError && <div className={styles.Error}>{loginError}</div>}
        <div className={styles.OrLine}>ou</div>
        <p className={styles.SocialLoginTitle}>Faça login usando as redes sociais:</p>
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
          <Link to="/forgot_password">Esqueceu a senha?</Link>
          <div>
            Não tem conta? 
            <Link to="/register">Registrar</Link>
          </div>
        </div>
      </>
    </ModalRWD >
  );
};

export default LoginModal;