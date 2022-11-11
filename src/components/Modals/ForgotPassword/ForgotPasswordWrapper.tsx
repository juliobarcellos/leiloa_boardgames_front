import { forgotPassword } from "../../../services/fakeAuthService";
import { ResetPasswordFunction } from "../../../types";
import ForgotPasswordModal from "./ForgotPasswordModal";

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

const ForgotPassword = (props: StateProps) => {

  const onClose = () => {
    props.states.setIsLoginModalVisible(false)
    props.states.setIsPasswordModalVisible(false)
    props.states.setIsRegisterModalVisible(false)    
  }

  const onResetPasswordRequested: ResetPasswordFunction = async (login) => {
    await forgotPassword(login)
  }

  return (
    <ForgotPasswordModal
      states={props.states}
      onClose={onClose}
      onResetPasswordRequested={onResetPasswordRequested}
    />
  )
}

export default ForgotPassword;