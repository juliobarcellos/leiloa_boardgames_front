import ModalRWD from "../ModalRWD";
import styles from '../Modals.module.scss';

interface NewCardModalProps {
    onClose: () => void;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewCardModal: React.FC<NewCardModalProps> = ({
    onClose,
    isModalVisible,
    setIsModalVisible,
}) => {

    return (
        <ModalRWD
            onBackdropClick={onClose}
            isModalVisible={isModalVisible}
            header="Adicionar Novo Cartão"
        >
            <>
                <form className={styles.newCardModal} >
                    <div className={styles.newCardModal__inputGroup}>
                        <label htmlFor="nomeTitular">Nome do Titular</label>
                        <input type='text' placeholder="Digite o nome como está no cartão" className={styles['newCardModal__inputGroup--nomeTitular']} required />
                    </div>
                    <div className={styles.newCardModal__inputGroup}>
                        <label htmlFor="numCartao">Número do Cartão</label>
                        <input type='tel' placeholder="Ex: 1234 5678 9123 4567" className={styles['newCardModal__inputGroup--numCartao']} required />
                    </div>
                    <div className={styles.newCardModal__inputGroup}>
                        <label htmlFor="nomeTitular">Validade</label>
                        <input type='month' placeholder="Mês/Ano de validade Ex: 05/25" min='10-2022' className={styles['newCardModal__inputGroup--validade']} required />
                    </div>
                    <div className={styles.newCardModal__inputGroup}>
                        <label htmlFor="nomeTitular">CVV</label>
                        <input type='tel' placeholder="Código de segurança do cartão" className={styles['newCardModal__inputGroup--cvv']} required />
                    </div>
                    <button className={styles.Button} type='submit'>Adicionar Cartão</button>
                </form>
            </>
        </ModalRWD>
    )
}

export default NewCardModal;