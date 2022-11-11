import { useState } from 'react';
import styles from './Payment.module.scss';
import { FcSimCardChip } from 'react-icons/fc'
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import NewCardModal from '../../../components/Modals/NewCard/NewCardModal';
import auctions from '../../../data/auctions.json';
import { useParams } from 'react-router-dom';

export default function Payment() {
    const [selected, setSelected] = useState<HTMLDivElement>();
    const [isModalVisible, setIsModalVisible ] = useState(false);
    const { id } = useParams();
    const auction = auctions.find(item => item.id === Number(id));

    function handleCardSelected(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.currentTarget === selected) {
            selected?.classList.remove(`${styles.active}`)
            setSelected(undefined)
        } else {
            selected?.classList.remove(`${styles.active}`)
            setSelected(e.currentTarget)
            e.currentTarget.classList.add(`${styles.active}`)
        }
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    return (
        <main className={styles.payment}>
            <section className={styles.payment__options}>
                <fieldset className={styles.options__cards}>
                    <div className={styles['options__cards--card']} onClick={e => handleCardSelected(e)}>
                        <span className={styles.card__number}><strong>**** **** ****</strong> 3947</span>
                        <FcSimCardChip size={40} />
                        <div className={styles.card__group}>
                            <span className={styles.card__customerName}>Augusto L. Moraes</span>
                            <div className={styles.card__expDate}>
                                <span>Validade</span>
                                <span>05/23</span>
                            </div>
                            <FaCcMastercard size={35} />
                            <svg className={styles.card__back} width="288" height="107" viewBox="0 0 288 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M219.5 21.5C199.204 18.5018 175.838 20.6794 157.418 23.6422C136.515 27.0046 114.696 24.3796 96.4927 13.5671C72.4884 -0.691114 43.2911 -3.22061 17.1923 6.69692L8.5 10L0 107H288L286.425 95.028C285.81 90.3569 284.712 85.7856 282.764 81.496C275.629 65.785 254.541 26.6766 219.5 21.5Z" fill="url(#paint0_linear_508_41)" fillOpacity="0.05" />
                                <defs>
                                    <linearGradient id="paint0_linear_508_41" x1="111.5" y1="97.5" x2="303" y2="-23.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" />
                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                    </div>
                    <div className={styles['options__cards--card']} onClick={e => handleCardSelected(e)}>
                        <span className={styles.card__number}><strong>**** **** ****</strong> 4546</span>
                        <FcSimCardChip size={40} />
                        <div className={styles.card__group}>
                            <span>Augusto L. Moraes</span>
                            <div className={styles.card__expDate}>
                                <span>Validade</span>
                                <span>11/22</span>
                            </div>
                            <FaCcVisa size={35} />
                            <svg className={styles.card__back} width="288" height="107" viewBox="0 0 288 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M219.5 21.5C199.204 18.5018 175.838 20.6794 157.418 23.6422C136.515 27.0046 114.696 24.3796 96.4927 13.5671C72.4884 -0.691114 43.2911 -3.22061 17.1923 6.69692L8.5 10L0 107H288L286.425 95.028C285.81 90.3569 284.712 85.7856 282.764 81.496C275.629 65.785 254.541 26.6766 219.5 21.5Z" fill="url(#paint0_linear_508_41)" fillOpacity="0.05" />
                                <defs>
                                    <linearGradient id="paint0_linear_508_41" x1="111.5" y1="97.5" x2="303" y2="-23.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" />
                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                    <button className={styles.card__button} onClick={toggleModal}>+</button>
                </fieldset>
            </section>
            <section className={styles.payment__installments}>

                <fieldset className={styles['payment__installments--group']}>
                    <span className={styles['payment__installments--title']}>Parcelamento</span>
                    <div className={styles.payment__installment}>
                        <input type='radio' name='installments'></input>
                        <span>1x</span>
                        <span>R$ 485,00</span>
                    </div>
                    <div className={styles.payment__installment}>
                        <input type='radio' name='installments'></input>
                        <span>2x</span>
                        <span>R$ 242,50</span>
                    </div>
                    <div className={styles.payment__installment}>
                        <input type='radio' name='installments'></input>
                        <span>3x</span>
                        <span>R$ 161,67</span>
                    </div>
                    <div className={styles.payment__installment}>
                        <input type='radio' name='installments'></input>
                        <span>4x</span>
                        <span>R$ 121,25</span>
                    </div>
                    <div className={styles.payment__installment}>
                        <input type='radio' name='installments'></input>
                        <span>5x</span>
                        <span>R$ 97,00</span>
                    </div>
                    <div className={styles.payment__installment}>
                        <input type='radio' name='installments'></input>
                        <span>6x</span>
                        <span>R$ 80,84</span>
                    </div>
                </fieldset>
            </section>
            <section className={styles.payment__orderDetails}>
                <img className={styles.orderDetails__img} src={auction?.image} />
                <span className={styles.orderDetails__game}>{auction?.name}</span>
                <div className={styles.orderDetails__values}>
                    <div className={styles.orderDetails__group}>
                        <span className={styles.orderDetails__value}>Valor do Produto:</span>
                        <span className={styles.orderDetails__value}>Frete:</span>
                        <span className={styles.orderDetails__value}>Total:</span>
                    </div>
                    <div className={styles.orderDetails__group}>
                        <span className={styles.orderDetails__value}>R$ {auction?.price}</span>
                        <span className={styles.orderDetails__value}>R$ {auction?.shipmentValue}</span>
                        <span className={styles.orderDetails__value}>R$ {auction?.price && auction?.price + auction?.shipmentValue}</span>
                    </div>
                </div>
            </section>
            <button className={styles.payment__button}>Finalizar Compra</button>
            <NewCardModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} onClose={toggleModal} />
        </main>
    )
}