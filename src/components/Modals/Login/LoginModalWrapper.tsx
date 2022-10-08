import { useState } from 'react'
import { useNavigate } from "react-router";
import { loginUser, useAuthState, useAuthDispatch } from '../../../context';
import { loginUser as lu } from "../../../services/fakeAuthService";
import { AuthFunction } from '../../../types';
import LoginModal from "./LoginModal";

const LoginModalWrapper = () => {

  const [loginError, setLoginError] = useState<string | undefined>()

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/")
  }

  const onLoginRequested: AuthFunction = async (loginData) => {
    try {
      await lu(loginData)
    } catch (e) {
      setLoginError(e as string);
    }
  }
  
  const dispatch = useAuthDispatch();

  const handleLogin: AuthFunction = async ({e, auth_token, user}) => {
    e.preventDefault()
    let payload = {auth_token, user}
    try {
      let response = await loginUser(dispatch, payload)
      if(!response.user) return
      console.log("props.history.push('/dashboard') //navigate to dashboard on success")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginModal loginError={loginError} isModalVisible={true} onClose={onClose} onLoginRequested={handleLogin} />
  )
}

export default LoginModalWrapper;