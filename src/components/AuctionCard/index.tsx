import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeLeftBox from '../TimeLeftBox';
import styles from './AuctionCard.module.scss'

interface AuctionCardProps {
    id: number;
    imgSrc: string;
    name: string;
    price: number;
    timeLeft: Date;
}

export default function AuctionCard({id, imgSrc, name, price, timeLeft}:AuctionCardProps) {

    const [cardEnabled, setCardEnabled] = useState(true);
    const navigate = useNavigate();

    return(
        <div className={styles.auctionCard}>
            <img src={imgSrc} className={styles.auctionCard__img} onClick={() => navigate(`/leilao/${id}`)} />
            <p className={styles.auctionCard__title}>{name}</p>
            <span className={styles.auctionCard__price}>R$ {price},00</span>
            <p className={styles.auctionCard__timeLeft}>Tempo restante:</p>
            <TimeLeftBox endDateTime={timeLeft} onFinish={() => {setCardEnabled(false)}} />
            <button className={styles.auctionCard__link} onClick={() => navigate(`/leilao/${id}`)}>Acessar Leilão</button>
        </div>
    )
}