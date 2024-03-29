import { useContext, useState } from 'react';
import InputWithIcon from "../../InputWithIcon";
import { AuthFunction } from "../../../../types";
import { FiMail, FiUser, FiCalendar, FiPhone } from 'react-icons/fi';
import { RiLock2Line } from 'react-icons/ri';
import { HiOutlineIdentification } from 'react-icons/hi';
import styles from '../../Modals.module.scss';
import DoubleColumnModalRWD from '../../DoubleColumnModalRWD';
import { userContext } from '../../../../context/user';
import InputFoto from '../../InputFoto';

interface PersonalDataModalProps {
    onClose: () => void;
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
    registerError?: string;
    onRegisterRequested: AuthFunction;
}

const PersonalDataModal: React.FC<PersonalDataModalProps> = ({
    onClose,
    states,
    registerError,
    onRegisterRequested
}) => {
    const context = useContext(userContext)

    const [nome, setNome] = useState(context.user.nome)
    const [mail, setMail] = useState(context.user.email)
    const [password, setPassword] = useState(context.user.senha);
    const [passwordRepeat, setPasswordRepeat] = useState(context.user.senha);
    const [cpf, setCpf] = useState('');
    const [docType, setDocType] = useState('');
    const [documento, setDocumento] = useState('');
    const [expdOrg, setExpdOrg] = useState('');
    const [uf, setUf] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [expeditionDate, setExpeditionDate] = useState('');
    const [phone, setPhone] = useState('');
    const [foto, setFoto] = useState('');
    const [localRegisterError, setLocalRegisterError] = useState<string | undefined>();

    const onRegisterTrigger = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (validate(passwordRepeat, password)) {
            let login = nome;
            onRegisterRequested({ password, login })
            context.user.cpf=cpf;
            context.user.tipoDocumento=docType;
            context.user.numDocumento=documento;
            context.user.orgaoExpeditor=expdOrg;
            context.user.estadoExpeditor=uf;
            context.user.dataNascimento=birthDate;
            context.user.dataEmissao=expeditionDate;
            context.user.telefone=phone;
            states.setIsPDataModalVisible(false)
            states.setIsAddressModalVisible(true)
        } else {
            setLocalRegisterError("Password entries must match")
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
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
        <DoubleColumnModalRWD
            onBackdropClick={onClose}
            isModalVisible={states.isPDataModalVisible}
            header="Dados Pessoais"
            message="Todos os campos são obrigatórios"
        >
            <form className={styles.DoubleColumnInputs} onSubmit={e => onRegisterTrigger(e)}>
                <label htmlFor='nomeInput' className={styles.FormLabel}>Nome</label>
                <InputWithIcon
                    id='nomeInput'
                    onKeyDown={onKeyDown}
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    type="text"
                    placeholder='Nome Completo'
                    icon={<FiUser size={24} />}
                    required
                />
                <label htmlFor='emailInput' className={styles.FormLabel}>Email</label>
                <InputWithIcon
                    id='emailInput'
                    onKeyDown={onKeyDown}
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                    type="mail"
                    placeholder='Digite seu Email'
                    icon={<FiMail size={24} />}
                    required
                />
                <label htmlFor='passwordInput' className={styles.FormLabel}>Senha</label>
                <InputWithIcon
                    id='passwordInput'
                    onKeyDown={onKeyDown}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder='Digite sua senha'
                    icon={<RiLock2Line size={24} />}
                    required
                />
                <label htmlFor='passwordRepeatInput' className={styles.FormLabel}>Repita a senha</label>
                <InputWithIcon
                    id='passwordRepeatInput'
                    onKeyDown={onKeyDown}
                    value={passwordRepeat}
                    onChange={e => setPasswordRepeat(e.target.value)}
                    type="password"
                    placeholder='Digite sua senha novamente'
                    icon={<RiLock2Line size={24} />}
                    required
                />
                <label htmlFor='dataNascInput' className={styles.FormLabel}>Data de Nascimento</label>
                <InputWithIcon
                    id='dataNascInput'
                    onKeyDown={onKeyDown}
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    type="date"
                    placeholder='Digite a data de nascimento'
                    icon={<FiCalendar size={24} />}
                    required
                />
                <label htmlFor='cpfInput' className={styles.FormLabel}>CPF</label>
                <InputWithIcon
                    id='cpfInput'
                    onKeyDown={onKeyDown}
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    type="number"
                    placeholder='Digite seu CPF'
                    icon={<HiOutlineIdentification size={24} />}
                    required
                />
                <label htmlFor='typeDocInput' className={styles.FormLabel}>Tipo de Documento</label>
                <InputWithIcon
                    id='typeDocInput'
                    onKeyDown={onKeyDown}
                    value={docType}
                    onChange={e => setDocType(e.target.value)}
                    type="text"
                    placeholder='Selecione o tipo de Documento'
                    required
                />
                <label htmlFor='docNumberInput' className={styles.FormLabel}>Número Documento</label>
                <InputWithIcon
                    id='docNumberInput'
                    onKeyDown={onKeyDown}
                    value={documento}
                    onChange={e => setDocumento(e.target.value)}
                    type="text"
                    placeholder='Digite o número do documento'
                    icon={<HiOutlineIdentification size={24} />}
                    required
                />
                <label htmlFor='expOrgInput' className={styles.FormLabel}>Órgão Expeditor</label>
                <InputWithIcon
                    id='expOrgInput'
                    onKeyDown={onKeyDown}
                    value={expdOrg}
                    onChange={e => setExpdOrg(e.target.value)}
                    type="text"
                    placeholder='Digite o órgão de expedição'
                    required
                />
                <label htmlFor='ufExpInput' className={styles.FormLabel}>Estado Expeditor</label>
                <InputWithIcon
                    id='ufExpInput'
                    onKeyDown={onKeyDown}
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    type="text"
                    placeholder='Selecione o estado de expedição'
                    required
                />
                <label htmlFor='expDateInput' className={styles.FormLabel}>Data de Expedição</label>
                <InputWithIcon
                    id='expDateInput'
                    onKeyDown={onKeyDown}
                    value={expeditionDate}
                    onChange={e => setExpeditionDate(e.target.value)}
                    type="date"
                    placeholder='Digite a data de expedição'
                    icon={<FiCalendar size={24} />}
                    required
                />
                <label htmlFor='phoneInput' className={styles.FormLabel}>Celular</label>
                <InputWithIcon
                    id='phoneInput'
                    onKeyDown={onKeyDown}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type="number"
                    placeholder='Digite o número do celular'
                    icon={<FiPhone size={24} />}
                    required
                />
                <label htmlFor='profilePic' className={styles.FormLabel}>Avatar</label>
                <input type="file" id='inputPhotos' className={styles.inputPhotos} name='inputPhotos' accept="image/png, image/jpeg, image/jpg" multiple />
                <InputFoto
                    id='profilePic'
                    onKeyDown={onKeyDown}
                    value={foto}
                    onChange={e => setFoto(e.target.value)}
                    type="text"
                    placeholder='Procure uma foto ou digite a URL'
                    required
                />
                <button className={styles.Button} id="submitButton" type='submit'>Próximo</button>
            </form>
            {registerError && <p>{registerError}</p>}
            {localRegisterError && <p>{localRegisterError}</p>}
        </DoubleColumnModalRWD>
    )
}

export default PersonalDataModal;