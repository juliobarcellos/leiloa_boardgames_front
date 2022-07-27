import React from 'react'
import BaseModalWrapper, { BaseModalWrapperProps } from './BaseModalWrapper'
type ModalRWDProps = BaseModalWrapperProps;

const ModalRWD: React.FC<ModalRWDProps> = (props) => {
    return (
          <BaseModalWrapper 
            {...props}
          />
   );
}

export default ModalRWD