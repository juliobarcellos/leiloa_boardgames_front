import { useState } from 'react'
import { loginUser } from "../../../services/fakeAuthService";
import { AuthFunction } from '../../../types';
import LoginModal from "./LoginModal"

interface StateProps {
  states: {
    isLoginModalVisible: boolean,
    setIsLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isRegisterModalVisible: boolean,
    setIsRegisterModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isPasswordModalVisible: boolean,
    setIsPasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const LoginModalWrapper = (props: StateProps) => {

  const [loginError, setLoginError] = useState<string | undefined>()

  const onClose = () => {
    props.states.setIsLoginModalVisible(false)
    props.states.setIsPasswordModalVisible(false)
    props.states.setIsRegisterModalVisible(false)
  }

  const onLoginRequested: AuthFunction = async (loginData) => {
    try {
      await loginUser(loginData)
    } catch (e) {
      setLoginError(e as string);
    }
  }

  return (
    <LoginModal loginError={loginError} states={props.states} onClose={onClose} onLoginRequested={onLoginRequested} />
  )
}

export default LoginModalWrapper;