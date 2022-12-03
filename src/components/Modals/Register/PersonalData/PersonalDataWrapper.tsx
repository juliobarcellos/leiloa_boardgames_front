import { useContext, useState } from 'react'
import PersonalDataModal from './PersonalDataModal';
import { registerUser } from '../../../../services/fakeAuthService';
import { AuthFunction } from '../../../../types';
import { initialUser, userContext } from '../../../../context/user';

interface Props {
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
}

const PersonalDataWrapper = (props: Props) => {

  const [registerError, setRegisterError] = useState<string | undefined>();
  const context = useContext(userContext);

  const onClose = () => {
    props.states.setIsLoginModalVisible(false)
    props.states.setIsPasswordModalVisible(false)
    props.states.setIsRegisterModalVisible(false)
    props.states.setIsPDataModalVisible(false)
    props.states.setIsAddressModalVisible(false)
    context.user = initialUser;
    context.logado = false;
  }

  const onRegisterRequested: AuthFunction = async (registerData) => {
    try {
      await registerUser(registerData)
    } catch (e) {
      setRegisterError(e as string)
    }
  }

  return (
    <PersonalDataModal
      onClose={onClose}
      registerError={registerError}
      onRegisterRequested={onRegisterRequested}
      states={props.states} />
  )
}

export default PersonalDataWrapper;