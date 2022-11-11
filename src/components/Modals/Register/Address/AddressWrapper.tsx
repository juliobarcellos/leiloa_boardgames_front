import { useState } from 'react'
import { registerUser } from '../../../../services/fakeAuthService';
import { AuthFunction } from '../../../../types';
import AddressModal from './AddressModal';

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

const AddressWrapper = (props: Props) => {

  const [registerError, setRegisterError] = useState<string | undefined>();

  const onClose = () => {
    props.states.setIsLoginModalVisible(false)
    props.states.setIsPasswordModalVisible(false)
    props.states.setIsRegisterModalVisible(false)
    props.states.setIsPDataModalVisible(false)
    props.states.setIsAddressModalVisible(false)
  }

  const onRegisterRequested: AuthFunction = async (registerData) => {
    try {
      await registerUser(registerData)
    } catch (e) {
      setRegisterError(e as string)
    }
  }

  return (
    <AddressModal
      states={props.states}
      onClose={onClose}
      registerError={registerError}
      onRegisterRequested={onRegisterRequested}
    />
  )
}

export default AddressWrapper;