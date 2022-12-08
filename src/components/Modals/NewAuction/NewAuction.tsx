import ModalRWD from "../ModalRWD";
import styles from '../Modals.module.scss';

interface NewAuctionProps {
    value: number;
    gameName: string;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onRegisterTrigger: (e: React.FormEvent<HTMLFormElement>) => void;
}

const NewAuctionModal: React.FC<NewAuctionProps> = ({
    value,
    gameName,
    isModalVisible,
    setIsModalVisible,
    onRegisterTrigger
}) => {

    const onClose = () => {
        setIsModalVisible(false)
    }

    return (
        <ModalRWD
            onBackdropClick={onClose}
            isModalVisible={isModalVisible}
            header="Importante!"
            message="Detalhe o máximo possível o estado do jogo e dos componentes, lembre-se de conferir se a condição do jogo escolhida confere com versão que está colocando em leilão."
        >
            <>
                <form className={styles.bidModal} onSubmit={(e) => onRegisterTrigger(e)} >
                    <div className={styles.bidModal__checkTerms}>
                        <input type='checkbox' id='termsAgreement' className={styles['bidModal__checkTerms--checkbox']} required />
                        <label htmlFor='termsAgreement'>Estou de acordo com os <strong>termos e condições de uso</strong></label>
                    </div>
                    <span className={styles.bidModal__confirmText}>Confirma o cadastro de leilão com valor inicial de <strong>R$ {value},00</strong> para o jogo {gameName}?</span>
                    <span className={styles.bidModal__obs}>* Concordando com os termos você confirma que está de acordo com a cobrança da taxa de 10% do valor final do leilão para o site Leiloa Boardgames</span>
                    <div className={styles.bidModal__buttons}>
                        <button className={styles.cancelButton} onClick={onClose} >Cancelar</button>
                        <button className={styles.Button} type='submit' >Registrar Leilão</button>
                    </div>
                </form>
            </>
        </ModalRWD>
    )
}

export default NewAuctionModal;