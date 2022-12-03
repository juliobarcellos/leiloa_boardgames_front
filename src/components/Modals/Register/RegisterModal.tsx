import { useContext, useState } from 'react';
import InputWithIcon from "../InputWithIcon";
import ModalRWD from "../ModalRWD";
import { AuthFunction } from "../../../types";
import { FiMail, FiUser } from 'react-icons/fi';
import { RiLock2Line, RiFacebookBoxFill, RiTwitterFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import styles from '../Modals.module.scss';
import { userContext } from '../../../context/user';

interface RegisterModalProps {
  onClose: () => void;
  states: {
    isLoginModalVisible: boolean,
    setIsLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isRegisterModalVisible: boolean,
    setIsRegisterModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isPDataModalVisible: boolean,
    setIsPDataModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isAddressModalVisible: boolean,
    setIsAddressModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isPasswordModalVisible: boolean,
    setIsPasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  };
  registerError?: string;
  onRegisterRequested: AuthFunction;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  states,
  registerError,
  onRegisterRequested
}) => {

  const [nome, setNome] = useState('')
  const [mail, setMail] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [password, setPassword] = useState('');
  const [localRegisterError, setLocalRegisterError] = useState<string | undefined>()
  const context = useContext(userContext)

  const onRegisterTrigger = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (validate(passwordRepeat, password)) {
      const login = mail;
      onRegisterRequested({ password, login })
      context.user.nome = nome;
      context.user.email = mail;
      context.user.senha = password;
      setNome('');
      setMail('');
      setPassword('');
      setPasswordRepeat('');
      setLocalRegisterError('');
      states.setIsRegisterModalVisible(false);
      states.setIsPDataModalVisible(true);
    } else {
      setLocalRegisterError("As senhas não conferem")
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRegisterTrigger(e)
    }
  }

  const validate = (passwordRepeat: string, password: string) => {
    if (passwordRepeat !== password || password == '' || passwordRepeat == '') {
      return false
    } else {
      return true;
    }
  }

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={states.isRegisterModalVisible}
      header="Novo Usuário"
      message="Crie sua conta"
    >
      <>
      <form className={styles.formData} onSubmit={e => onRegisterTrigger(e)}>
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={nome}
          onChange={e => setNome(e.target.value)}
          type="text"
          placeholder='Nome Completo'
          icon={<FiUser size={24} />}
          required
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={mail}
          onChange={e => setMail(e.target.value)}
          type="mail"
          placeholder='Digite seu Email'
          icon={<FiMail size={24} />}
          required
        />
        <InputWithIcon
          onKeyDown={onKeyDown}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ ]).{6,20}$'
          title='A senha deve conter de 6 a 20 caracteres, deve conter ao menos uma letra maiúscula, uma letra minúscula e um número'
          placeholder='Digite sua senha'
          icon={<RiLock2Line size={24} />}
          required
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
          required
        />
        <button className={styles.Button} type="submit">Iniciar Cadastro</button>
        </form>
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
            <span onClick={() => {states.setIsRegisterModalVisible(false); states.setIsLoginModalVisible(true)}}>Fazer Login</span>
          </div>
        </div>
      </>
    </ModalRWD>
  )
}

export default RegisterModal;