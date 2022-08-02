import React from 'react'
import styles from './Modals.module.scss';

type InputWithIconProps = {icon?: JSX.Element} & JSX.IntrinsicElements['input'] 

const InputWithIcon: React.FC<InputWithIconProps> = ({icon, ref, ...props}) => {
    return (<div className={styles.InputContainer}>
    {icon && <div className={styles.IconContainer}>{icon}</div>}
    <input className={styles.ModalInput} {...props} />
    </div>);
}

export default InputWithIcon