import { useContext, useLayoutEffect, useState } from 'react';
import styles from './Checkout.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import auctionService from '../../services/auctionService';
import { AddressType, AuctionType, UserType } from '../../types';
import { userContext } from '../../context/user';

interface CheckoutProps {
    usuario: UserType
}

export default function Checkout({usuario}: CheckoutProps) {
    const { id } = useParams();
    const [auction, setAuction] = useState<AuctionType>();
    const [user, setUser] = useState<UserType>(usuario);
    const contexto = useContext(userContext);
    const [ userAddress, setUserAddress ] = useState<AddressType>()
    const [frete, setFrete] = useState(0);
    const correios = 27;
    const vendedor = 0;
    const navigate = useNavigate();

    useLayoutEffect(() => {
        async function carregaLeilao() {
            if (id) {
                const response = await auctionService.getByID(id)
                let jsonLeilao = JSON.stringify(response.data, null, '  ')
                setAuction(JSON.parse(jsonLeilao));
            }
        }
        setUser(contexto.user);
        if(user && user.enderecos){
            console.log(user.enderecos)
            setUserAddress(user.enderecos[0])
        }
        carregaLeilao();
    },[])

    function handleNext() {
        auctionService.atualizarFrete(auction?.id!, frete, "correios").then(
            
        )
        navigate(`/leilao/${id}/payment`)
    }

    return (
        <main className={styles.checkout}>
            <section className={styles.checkout__shipment}>
                <div className={styles.shipment__address}>
                    <h4>Endereço</h4>
                    <div className={styles['shipment__address--details']}>
                        <div className={styles.address__group}>
                            <span className={styles['address__group--address']}>
                                <span className={styles.address__title}>{userAddress?.identificacao}</span>
                                <span>{`${user?.nome} - (${user?.telefone.substring(0,2)}) ${user?.telefone.substring(2)}`}</span>
                                <span>{`${userAddress?.logradouro}, ${userAddress?.numero}`}</span>
                                <span>{userAddress?.complemento}</span>
                                <span>{`${userAddress?.bairro}, ${userAddress?.cidade} - ${userAddress?.estado}`}</span>
                                <span>{userAddress?.cep}</span>
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
                <img className={styles.orderDetails__img} src={auction?.image} />
                <span className={styles.orderDetails__game}>{auction?.name}</span>
                <div className={styles.orderDetails__values}>
                    <div className={styles.orderDetails__group}>
                        <span className={styles.orderDetails__value}>Valor do Produto:</span>
                        <span className={styles.orderDetails__value}>Frete:</span>
                        <span className={styles.orderDetails__value}>Total:</span>
                    </div>
                    <div className={styles.orderDetails__group}>
                        <span className={styles.orderDetails__value}>R$ {auction?.price},00</span>
                        <span className={styles.orderDetails__value}>R$ {frete},00</span>
                        <span className={styles.orderDetails__value}>R$ {auction?.price && auction?.price + frete},00</span>
                    </div>
                </div>
            </section>
            <button className={styles.checkout__button} onClick={handleNext}>Ir para Pagamento</button>
        </main>
    )
}