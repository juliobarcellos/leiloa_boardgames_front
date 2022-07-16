import { useState } from 'react';
import TimeLeftBox from '../TimeLeftBox';
import styles from './AuctionCard.module.scss'

interface AuctionCardProps {
    imgSrc: string;
    name: string;
    price: string;
    timeLeft: Date;
}

export default function AuctionCard({imgSrc, name, price, timeLeft}:AuctionCardProps) {

    const [cardEnabled, setCardEnabled] = useState(true);

    return(
        <div className={styles.auctionCard}>
            <img src={imgSrc} className={styles.auctionCard__img} />
            <p className={styles.auctionCard__title}>{name}</p>
            <span className={styles.auctionCard__price}>{price}</span>
            <p className={styles.auctionCard__timeLeft}>Tempo restante:</p>
            <TimeLeftBox endDateTime={timeLeft} onFinish={() => {setCardEnabled(false)}} />
            <button className={styles.auctionCard__link}>Acessar Leilão</button>
        </div>
    )
}