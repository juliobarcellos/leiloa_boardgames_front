import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './OrderDetails.module.scss';
import { FaStar } from 'react-icons/fa';
import auctionService from '../../services/auctionService';
import { AuctionType, UserType } from '../../types';
import { userContext } from '../../context/user';

export default function OrderDetails() {

    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState('created');
    const [starCValue, setStarCValue] = useState(0);
    const [starCHoverValue, setStarCHoverValue] = useState<number | undefined>(undefined);
    const [starVValue, setStarVValue] = useState(0);
    const [starVHoverValue, setStarVHoverValue] = useState<number | undefined>(undefined);
    const customerStars = Array(5).fill(0);
    const vendorStars = Array(5).fill(0);
    const [auction, setAuction] = useState<AuctionType>();
    const [user, setUser] = useState<UserType>();
    const contexto = useContext(userContext);
    const listaMotivos = ["payment", "shipment", "reception", "evaluation"]
    const [indice, setIndice] = useState(0)

    useLayoutEffect(() => {
        let divElement = undefined;
        divElement = document.querySelector(`.${styles['orderDetails__step--order']}`)
        divElement?.classList.add(`${styles.orderDetails__stepCompleted}`);
        async function carregaLeilao() {
            if (id) {
                const response = await auctionService.getByID(id)
                let jsonLeilao = JSON.stringify(response.data, null, '  ')
                setAuction(JSON.parse(jsonLeilao));
            }
        }
        setUser(contexto.user);
        carregaLeilao();
    }, [])

    function limpar() {
        setOrderStatus('created')
        let divElement = undefined;
        divElement = document.querySelector(`.${styles['orderDetails__step--order']}`)
        divElement?.classList.add(`${styles.orderDetails__stepCompleted}`);
    }

    function mudarStatus(){
        setIndice(indice + 1)
        setOrderStatus(listaMotivos[indice-1])
    }

    useEffect(() => {
        let divElement = undefined;
        switch (orderStatus) {
            case 'created':
                divElement = document.querySelector(`.${styles['orderDetails__step--order']}`)
                divElement?.classList.add(`${styles.orderDetails__stepCompleted}`)
                break;
            case 'payment':
                divElement = document.querySelector(`.${styles['orderDetails__step--pagamento']}`)
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
                <span className={styles.orderDetails__orderNumber} onClick={mudarStatus}>Pedido: 00001 (Referente ao Leilão: <Link to={`/leilao/${id}`}>0000{id}</Link>)</span>
                <section className={styles.orderDetails__statusBar}>
                    <div className={styles['orderDetails__step--order']}>
                        <div className={styles['orderDetails__step--dot']}></div>
                        <div className={styles['orderDetails__step--bar']}></div>
                        <div className={styles['orderDetails__step--text']}>
                            <span>Pedido Realizado</span>
                            <span>21/09/2021</span>
                        </div>
                    </div>
                    <div className={styles['orderDetails__step--pagamento']}>
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
                        <p className={styles['dataGroup__details']}>Matilda Brown</p>
                        <h4 className={styles['dataGroup__title']}>Comprador</h4>
                        <p className={styles['dataGroup__details']}>{user?.nome!}</p>
                        <h4 className={styles['dataGroup__title']}>CPF</h4>
                        <p className={styles['dataGroup__details']}>{user?.cpf}</p>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Lance Vencedor</h4>
                        <p className={styles['dataGroup__details']}>R$ {auction?.price}</p>
                        <h4 className={styles['dataGroup__title']}>Custo Frete</h4>
                        <p className={styles['dataGroup__details']}>R$ {auction?.shipmentValue}</p>
                        <h4 className={styles['dataGroup__title']}>Total</h4>
                        <p className={styles['dataGroup__details']}>R$ {auction?.price && auction.price + auction.shipmentValue!}</p>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Forma de pagamento</h4>
                        <p className={styles['dataGroup__details']}>Cartão de Crédito</p>
                        <h4 className={styles['dataGroup__title']}>Número do Cartão</h4>
                        <p className={styles['dataGroup__details']}>{auction?.cardNumber}</p>
                        <h4 className={styles['dataGroup__title']}>Parcelamento</h4>
                        <p className={styles['dataGroup__details']}>{auction?.parcelas}</p>
                    </div>
                    <div className={styles['orderDetails__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Endereço de entrega</h4>
                        <p className={styles['dataGroup__details']}>
                            {user?.enderecos![0].logradouro}, {user?.enderecos![0].numero}<br />
                            {user?.enderecos![0].complemento}<br />
                            {user?.enderecos![0].bairro}, {user?.enderecos![0].cidade} - {user?.enderecos![0].estado}<br />
                            {user?.enderecos![0].cep}
                        </p>
                        <h4 className={styles['dataGroup__title']}>Rastreio</h4>
                        <p className={styles['dataGroup__details']}>{orderStatus === 'reception' && 'UG12341234BR'}-</p>
                    </div>
                </section>

            </section>

            {orderStatus === 'evaluation' &&
            <section className={styles.evaluation}>
                <span className={styles.evaluation__title} onClick={limpar}>Avaliações</span>
                <section className={styles.evaluation__data}>
                    <div className={styles['evaluation__data--group']}>
                        <h4 className={styles['dataGroup__title']}>Avaliação do Vendedor</h4>
                        <div className={styles['dataGroup__stars']}>
                            {vendorStars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        onClick={() => user?.id === auction?.idUsuario && handleStarClick(index + 1, 'vendor')}
                                        onMouseOver={() => user?.id === auction?.idUsuario && handleStarMouseHover(index + 1, 'vendor')}
                                        onMouseLeave={() => user?.id === auction?.idUsuario && handleStarMouseLeave('vendor')}
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
                                        
                                        onClick={() =>  user?.id !== auction?.idUsuario && handleStarClick(index + 1, 'customer')}
                                        onMouseOver={() => user?.id !== auction?.idUsuario && handleStarMouseHover(index + 1, 'customer')}
                                        onMouseLeave={() => user?.id !== auction?.idUsuario && handleStarMouseLeave('customer')}
                                        
                                        color={(starCHoverValue || starCValue) > index ? 'yellow' : 'gray'}
                                    />
                                )
                            })}
                        </div>
                        <textarea placeholder='Opcional: conte-nos como foi a transação com o comprador' />
                    </div>
                </section>
            
            </section>
}
        </main>
    )
}