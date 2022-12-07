import React from 'react'
import styles from './Modals.module.scss';

type InputFotoProps = {icon?: JSX.Element} & JSX.IntrinsicElements['input'] 

const InputFoto: React.FC<InputFotoProps> = ({icon, ref, ...props}) => {
    return (<div className={styles.InputFotoContainer}>
    {icon && <div className={styles.IconContainer}>{icon}</div>}
    <input className={styles.ModalInput} {...props} />
    </div>);
}

export default InputFoto