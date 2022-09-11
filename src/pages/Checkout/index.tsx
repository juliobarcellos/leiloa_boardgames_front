import { useState } from 'react';
import styles from './Checkout.module.scss';

export default function Checkout() {
const [ frete, setFrete ] = useState(0);
const correios = 35;
const vendedor = 0;

    return (
        <main className={styles.checkout}>
            <section className={styles.checkout__shipment}>
                <div className={styles.shipment__address}>
                    <h4>Endereço</h4>
                    <div className={styles['shipment__address--details']}>
                        <div className={styles.address__group}>
                            <span className={styles['address__group--address']}>
                                <span className={styles.address__title}>Trabalho</span>
                                <span>Julio Cesar da Silva Barcellos - (11) 98888-7777</span>
                                <span>Avenida Governador Janio Quadros, 111</span>
                                <span>Prédio 22, bloco B, apto 22</span>
                                <span>Parque Dourado, Ferraz de Vasconcelos, SP</span>
                                <span>08000-000</span>
                            </span>
                            <span className={styles['address__group--button']}>Editar ou escolher outro</span>
                        </div>
                    </div>
                </div>
                <fieldset className={styles.shipment__options}>
                    <div className={styles.option}>
                        <h4>Entrega</h4>
                        <div className={styles.option__group}>
                            <input type='radio' name='options' value={correios} onChange={e => setFrete(+e.target.value)}></input>
                            <div className={styles['option__group--details']}>
                                <span className={styles.option__title}>Correios</span>
                                <span>Prazo de entrega:</span>
                                <span>De 10/10/2022 a 20/10/2022</span>
                            </div>
                            <span className={styles['option__group--price']}>R$ {correios},00</span>
                        </div>
                    </div>
                    <div className={styles.option}>
                        <h4>Retirar com o Vendedor</h4>
                        <div className={styles.option__group}>
                            <input type='radio' name='options' value={vendedor} onChange={e => setFrete(+e.target.value)}></input>
                            <div className={styles['option__group--details']}>
                                <span className={styles.option__title}>Estação Artur Alvim</span>
                                <span>Prazo de entrega:</span>
                                <span>Combinar com o vendedor</span>
                            </div>
                            <span className={styles['option__group--price']}>R$ {vendedor},00</span>
                        </div>
                    </div>
                </fieldset>
            </section>
            <section className={styles.checkout__orderDetails}>
                <img className={styles.orderDetails__img} src='https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v1760478459733722920/products/RSU001_3D.jpg' />
                <span className={styles.orderDetails__game}>Rising Sun</span>
                <div className={styles.orderDetails__values}>
                    <div className={styles.orderDetails__group}>
                        <span className={styles.orderDetails__value}>Valor do Produto:</span>
                        <span className={styles.orderDetails__value}>Frete:</span>
                        <span className={styles.orderDetails__value}>Total:</span>
                    </div>
                    <div className={styles.orderDetails__group}>
                        <span className={styles.orderDetails__value}>R$ 450,00</span>
                        <span className={styles.orderDetails__value}>R$ {frete},00</span>
                        <span className={styles.orderDetails__value}>R$ 485,00</span>
                    </div>
                </div>
            </section>
            <button className={styles.checkout__button}>Ir para Pagamento</button>
        </main>
    )
}