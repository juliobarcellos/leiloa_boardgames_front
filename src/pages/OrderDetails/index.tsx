import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './OrderDetails.module.scss';
import { FaStar } from 'react-icons/fa';
import auctions from '../../data/auctions.json';

export default function OrderDetails() {

    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState('created');
    const [starCValue, setStarCValue] = useState(0);
    const [starCHoverValue, setStarCHoverValue] = useState<number | undefined>(undefined);
    const [starVValue, setStarVValue] = useState(0);
    const [starVHoverValue, setStarVHoverValue] = useState<number | undefined>(undefined);
    const customerStars = Array(5).fill(0);
    const vendorStars = Array(5).fill(0);
    const auction = auctions.find(item => item.id === Number(id));

    useLayoutEffect(() => {
        let divElement = undefined;
        divElement = document.querySelector(`.${styles['orderDetails__step--order']}`)
        divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
    }, [])

    useEffect(() => {
        let divElement = undefined;
        switch (orderStatus) {
            case 'created':
                divElement = document.querySelector(`.${styles['orderDetails__step--order']}`)
                divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
                break;
            case 'payment':
                divElement = document.querySelector(`.${styles['orderDetails__step--payment']}`)
                divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
                break;
            case 'shipment':
                divElement = document.querySelector(`.${styles['orderDetails__step--shipment']}`)
                divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
                break;
            case 'reception':
                divElement = document.querySelector(`.${styles['orderDetails__step--reception']}`)
                divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
                break;
            case 'evaluation':
                divElement = document.querySelector(`.${styles['orderDetails__step--evaluation']}`)
                divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
                break;

        }
    }, [orderStatus])


    function handleStarClick(value: number, target: string){
        target === 'customer' ? setStarCValue(value) : setStarVValue(value)
        console.log(target, 'MouseClick', starCValue, starVValue)
    }

    function handleStarMouseHover(value: number, target: string){
        target === 'customer' ? setStarCHoverValue(value) : setStarVHoverValue(value)
        console.log(target, 'MouseHover', starCHoverValue, starVHoverValue)
    }

    function handleStarMouseLeave(target: string){
        target === 'customer' ? setStarCHoverValue(undefined) : setStarVHoverValue(undefined)
        console.log(target, 'MouseLeave', starCHoverValue, starVHoverValue)
    }

    return (
        <main>
            <section className={styles.orderDetails}>
                <span className={styles.orderDetails__orderNumber}>Pedido: 00001 (Referente ao Leilão: <Link to={`/leilao/${id}`}>0000{id}</Link>)</span>
                <section className={styles.orderDetails__statusBar}>
                    <div className={styles['orderDetails__step--order']}>
                        <div className={styles['orderDetails__step--dot']}></div>
                        <div className={styles['orderDetails__step--bar']}></div>
                        <div className={styles['orderDetails__step--text']}>
                            <span>Pedido Realizado</span>
                            <span>21/09/2021</span>
                        </div>
                    </div>
                    <div className={styles['orderDetails__step--payment']}>
                        <div className={styles['orderDetails__step--dot']}></div>
                        <div className={styles['orderDetails__step--bar']}></div>
                        <div className={styles['orderDetails__step--text']}>
                            <span>Aguardando Pagamento</span>
                            <span>data</span>
                        </div>
                    </div>
                    <div className={styles['orderDetails__step--shipment']}>
                        <div className={styles['orderDetails__step--dot']}></div>
                        <div className={styles['orderDetails__step--bar']}></div>
                        <div className={styles['orderDetails__step--text']}>
                            <span>Aguardando Envio</span>
                            <span>data</span>
                        </div>
                    </div>
                    <div className={styles['orderDetails__step--reception']}>
                        <div className={styles['orderDetails__step--dot']}></div>
                        <div className={styles['orderDetails__step--bar']}></div>
                        <div className={styles['orderDetails__step--text']}>
                            <span>Aguardando Entrega</span>
                            <span>data</span>
                        </div>
                    </div>
                    <div className={styles['orderDetails__step--evaluation']}>
                        <div className={styles['orderDetails__step--dot']}></div>
                        <div className={styles['orderDetails__step--text']}>
                            <span>Aguardando Avaliação</span>
                            <span>data</span>
                        </div>
                    </div>
                </section>
                <section className={styles.orderDetails__data}>
                    <div className={styles['orderDetails__data--imgGroup']}>
                        <img className={styles['orderDetails__img']} src={auction?.image} alt='' />
                        <h4 className={styles['dataGroup__title']}>{auction?.name}</h4>
                        <span>10/09/2022</span>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Vendedor</h4>
                        <p className={styles['dataGroup__details']}>William Villela</p>
                        <h4 className={styles['dataGroup__title']}>Comprador</h4>
                        <p className={styles['dataGroup__details']}>Julio Cesar da Silva Barcellos</p>
                        <h4 className={styles['dataGroup__title']}>CPF</h4>
                        <p className={styles['dataGroup__details']}>123.456.789-11</p>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Lance Vencedor</h4>
                        <p className={styles['dataGroup__details']}>R$ {auction?.price}</p>
                        <h4 className={styles['dataGroup__title']}>Custo Frete</h4>
                        <p className={styles['dataGroup__details']}>R$ {auction?.shipmentValue}</p>
                        <h4 className={styles['dataGroup__title']}>Total</h4>
                        <p className={styles['dataGroup__details']}>R$ {auction?.price && auction.price + auction.shipmentValue}</p>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Forma de pagamento</h4>
                        <p className={styles['dataGroup__details']}>Cartão de Crédito</p>
                        <h4 className={styles['dataGroup__title']}>Número do Cartão</h4>
                        <p className={styles['dataGroup__details']}>XXXX XXXX XXXX 4321</p>
                        <h4 className={styles['dataGroup__title']}>Parcelamento</h4>
                        <p className={styles['dataGroup__details']}>3x R$ 132,00</p>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Endereço de entrega</h4>
                        <p className={styles['dataGroup__details']}>
                            Avenida Paulista, 1234<br />
                            Bloco B, 2º andar, Sala 22<br />
                            Bela Vista, São Paulo - SP<br />
                            08000-000
                        </p>
                        <h4 className={styles['dataGroup__title']}>Rastreio</h4>
                        <p className={styles['dataGroup__details']}>-</p>
                    </div>
                </section>

            </section>
            <section className={styles.evaluation}>
                <span className={styles.evaluation__title}>Avaliações</span>
                <section className={styles.evaluation__data}>
                    <div className={styles['evaluation__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Avaliação do Vendedor</h4>
                        <div className={styles['dataGroup__stars']}>
                            {vendorStars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        onClick={() => handleStarClick(index + 1, 'vendor')}
                                        onMouseOver={() => handleStarMouseHover(index + 1, 'vendor')}
                                        onMouseLeave={() => handleStarMouseLeave('vendor')}
                                        color={(starVHoverValue || starVValue) > index ? 'yellow' : 'gray'}
                                    />
                                )
                            })}
                        </div>
                        <textarea placeholder='Opcional: conte-nos como foi a transação com o vendedor' />

                    </div>
                    <div className={styles['evaluation__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Avaliação do Comprador</h4>
                        <div className={styles['dataGroup__stars']}>
                            {customerStars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        onClick={() => handleStarClick(index + 1, 'customer')}
                                        onMouseOver={() => handleStarMouseHover(index + 1, 'customer')}
                                        onMouseLeave={() => handleStarMouseLeave('customer')}
                                        color={(starCHoverValue || starCValue) > index ? 'yellow' : 'gray'}
                                    />
                                )
                            })}
                        </div>
                        <textarea placeholder='Opcional: conte-nos como foi a transação com o comprador' />
                    </div>
                </section>
            </section>
        </main>
    )
}