import { useState } from 'react';
import InputWithIcon from "../../InputWithIcon";
import { AuthFunction } from "../../../../types";
import { FiMail, FiUser, FiCalendar, FiPhone } from 'react-icons/fi';
import { RiLock2Line } from 'react-icons/ri';
import { HiOutlineIdentification } from 'react-icons/hi';
import styles from '../../Modals.module.scss';

interface PersonalDataModalProps {
    registerError?: string;
    onRegisterRequested: AuthFunction;
}

const PersonalDataModal: React.FC<PersonalDataModalProps> = ({
    registerError,
    onRegisterRequested
}) => {

    const [login, setLogin] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [cpf, setCpf] = useState('');
    const [docType, setDocType] = useState('');
    const [document, setDocument] = useState('');
    const [expdOrg, setExpdOrg] = useState('');
    const [uf, setUf] = useState('');
    const [birthDate, setBirthDate] = useState('2022-05-12');
    const [phone, setPhone] = useState('1198887777');
    const [localRegisterError, setLocalRegisterError] = useState<string | undefined>()

    const onRegisterTrigger = () => {
        if (validate(passwordRepeat, password)) {
            onRegisterRequested({ password, login })
        } else {
            setLocalRegisterError("Password entries must match")
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onRegisterTrigger()
        }
    }

    const validate = (passwordRepeat: string, password: string) => {
        if (passwordRepeat !== password) {
            return false
        } else {
            return true;
        }
    }

    return (
        <div className={styles.DoubleColumnInputs}>
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={login}
                onChange={e => setLogin(e.target.value)}
                type="text"
                placeholder='Nome Completo'
                icon={<FiUser size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={mail}
                onChange={e => setMail(e.target.value)}
                type="mail"
                placeholder='Digite seu Email'
                icon={<FiMail size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder='Digite sua senha'
                icon={<RiLock2Line size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={passwordRepeat}
                onChange={e => setPasswordRepeat(e.target.value)}
                type="password"
                placeholder='Digite sua senha novamente'
                icon={<RiLock2Line size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                type="date"
                placeholder='Digite a data de nascimento'
                icon={<FiCalendar size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                type="number"
                placeholder='Digite seu CPF'
                icon={<HiOutlineIdentification size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={docType}
                onChange={e => setDocType(e.target.value)}
                type="text"
                placeholder='RG'
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={document}
                onChange={e => setDocument(e.target.value)}
                type="text"
                placeholder='Digite o número do documento'
                icon={<HiOutlineIdentification size={24} />}
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={expdOrg}
                onChange={e => setExpdOrg(e.target.value)}
                type="text"
                placeholder='Digite o órgão de expedição'
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={uf}
                onChange={e => setUf(e.target.value)}
                type="text"
                placeholder='SP'
            />
            <InputWithIcon
                onKeyDown={onKeyDown}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="number"
                placeholder='Digite o número do celular'
                icon={<FiPhone size={24} />}
            />
            <button className={styles.Button} onClick={onRegisterTrigger}>Próximo</button>
            {registerError && <p>{registerError}</p>}
            {localRegisterError && <p>{localRegisterError}</p>}

        </div>
    )
}

export default PersonalDataModal;