import { useContext, useState } from 'react';
import { userContext } from '../../../../context/user';
import userService from '../../../../services/userService';
import { AuthFunction, AddressType } from "../../../../types";
import DoubleColumnModalRWD from '../../DoubleColumnModalRWD';
import styles from '../../Modals.module.scss';

interface AddressModalProps {
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

const AddressModal: React.FC<AddressModalProps> = ({
    onClose,
    states,
    registerError,
    onRegisterRequested
}) => {

    const [addressId, setAddressId] = useState('')
    const [cep, setCep] = useState('')
    const [streetAddress, setStreetAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [compl, setCompl] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [localRegisterError, setLocalRegisterError] = useState<string | undefined>();
    const context = useContext(userContext)


    const onRegisterTrigger = () => {
        let endereco: AddressType[] =[{
            identificacao: addressId,
            cep: cep,
            logradouro: streetAddress,
            numero: addressNumber,
            complemento: compl,
            bairro: bairro,
            cidade: cidade,
            estado: uf,
            preferencial: true
        }];
        context.user.enderecos = endereco;
        let retornoUser = userService.create(context.user);
        retornoUser.then(() => {
            context.logado = true;
            states.setIsAddressModalVisible(false)
        }).catch((e) => {
            console.error(e)
            setLocalRegisterError(e)
        })
        console.log(retornoUser);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onRegisterTrigger()
        }
    }

    return (
        <DoubleColumnModalRWD
            onBackdropClick={onClose}
            isModalVisible={states.isAddressModalVisible}
            header="Endereço"
            message="Todos os campos são obrigatórios"
        >
            <div className={styles.AddressContainer}>
                <label htmlFor='addressId'>Identificação</label>
                <input
                    className={styles.AddressInput}
                    id='addressId'
                    onKeyDown={onKeyDown}
                    value={addressId}
                    onChange={e => setAddressId(e.target.value)}
                    type="text"
                    placeholder='Ex: "Principal", "Trabalho", "Casa"'
                />
                <label htmlFor='addressCep'>CEP</label>
                <input
                    className={styles.AddressInput}
                    id='addressCep'
                    onKeyDown={onKeyDown}
                    value={cep}
                    onChange={e => setCep(e.target.value)}
                    pattern='[\d]{5}-?[\d]{3}'
                    title='O campo CEP deve possuir 8 dígitos numéricos'
                    type="number"
                    placeholder='00000-000'
                />
                <label htmlFor='addressStreet'>Endereço</label>
                <input
                    className={styles.AddressInput}
                    id='addressStreet'
                    onKeyDown={onKeyDown}
                    value={streetAddress}
                    onChange={e => setStreetAddress(e.target.value)}
                    type="text"
                    placeholder='Rua dos Tabuleiros'
                />
                <label htmlFor='addressNum'>Número</label>
                <input
                    className={styles.AddressInput}
                    id='addressNum'
                    onKeyDown={onKeyDown}
                    value={addressNumber}
                    onChange={e => setAddressNumber(e.target.value)}
                    type="number"
                    placeholder='1234'
                />
                <label htmlFor='addressCompl'>Complemento</label>
                <input
                    className={styles.AddressInput}
                    id='addressCompl'
                    onKeyDown={onKeyDown}
                    value={compl}
                    onChange={e => setCompl(e.target.value)}
                    type="text"
                    placeholder='Bloco X Apto 12'
                />
                <label htmlFor='addressBairro'>Bairro</label>
                <input
                    className={styles.AddressInput}
                    id='addressBairro'
                    onKeyDown={onKeyDown}
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                    type="text"
                    placeholder='Vila dos Meeples'
                />
                <label htmlFor='addressCidade'>Cidade</label>
                <input
                    className={styles.AddressInput}
                    id='addressCidade'
                    onKeyDown={onKeyDown}
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    type="text"
                    placeholder='Gloomhaven'
                />
                <label htmlFor='addressUf'>Estado</label>
                <input
                    className={styles.AddressInput}
                    id='addressUf'
                    onKeyDown={onKeyDown}
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    type="text"
                    placeholder='SP'
                />
                <button className={styles.Button} onClick={onRegisterTrigger}>Finalizar Cadastro</button>
            </div>
            {registerError && <p>{registerError}</p>}
            {localRegisterError && <p>{localRegisterError}</p>}


        </DoubleColumnModalRWD>
    )
}

export default AddressModal;