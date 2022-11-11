import React from 'react'
import DoubleColumnModalWrapper, { DoubleColumnModalWrapperProps } from './DoubleColumnModalWrapper'
type DoubleColumnModalRWDProps = DoubleColumnModalWrapperProps;

const DoubleColumnModalRWD: React.FC<DoubleColumnModalRWDProps> = (props) => {
    return (
          <DoubleColumnModalWrapper 
            {...props}
          />
   );
}

export default DoubleColumnModalRWD