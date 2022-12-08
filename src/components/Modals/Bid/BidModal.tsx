import ModalRWD from "../ModalRWD";
import styles from '../Modals.module.scss';

interface BidModalProps {
    value: number;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
}

const BidModal: React.FC<BidModalProps> = ({
    value,
    isModalVisible,
    setIsModalVisible,
    handleSubmit
}) => {

    const onClose = () => {
        setIsModalVisible(false)
    }

    return (
        <ModalRWD
            onBackdropClick={onClose}
            isModalVisible={isModalVisible}
            header="Importante!"
            message="Sempre preste atenção às condições do jogo e o valor de frete estimado, caso possua dúvidas utilize a área de perguntas para se comunicar com o vendedor. Após seu lance ser realizado ele não poderá ser cancelado."
        >
            <>
                <form className={styles.bidModal} onSubmit={(e) => handleSubmit(e)} >
                    <div className={styles.bidModal__checkTerms}>
                        <input type='checkbox' id='termsAgreement' className={styles['bidModal__checkTerms--checkbox']} required />
                        <label htmlFor='termsAgreement'>Estou de acordo com os <strong>termos e condições de uso</strong></label>
                    </div>
                    <span className={styles.bidModal__confirmText}>Confirma o lance no valor de <strong>R$ {value},00</strong> para este item?</span>
                    <span className={styles.bidModal__obs}>* Valores acima do valor mínimo de lance entrarão como valor de reserva para lances automáticos</span>
                    <div className={styles.bidModal__buttons}>
                        <button className={styles.cancelButton} onClick={onClose} >Cancelar</button>
                        <button className={styles.Button} type='submit' >Confirmar Lance</button>
                    </div>
                </form>
            </>
        </ModalRWD>
    )
}

export default BidModal;