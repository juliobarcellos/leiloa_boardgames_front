import { useState } from 'react';
import { AuthFunction } from "../../../../types";
import styles from '../../Modals.module.scss';

interface AddressModalProps {
    registerError?: string;
    onRegisterRequested: AuthFunction;
}

const AddressModal: React.FC<AddressModalProps> = ({
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
    const [localRegisterError, setLocalRegisterError] = useState<string | undefined>()

    const onRegisterTrigger = () => {

    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onRegisterTrigger()
        }
    }

    return (
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
            {registerError && <p>{registerError}</p>}
            {localRegisterError && <p>{localRegisterError}</p>}

        </div>
    )
}

export default AddressModal;