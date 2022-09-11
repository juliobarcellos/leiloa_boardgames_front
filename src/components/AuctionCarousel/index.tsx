import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import TimeLeftBox from '../TimeLeftBox';
import styles from './AuctionCarousel.module.scss';

const SliderData = [
    {
        image: 'https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v1760478459733722920/products/RSU001_3D.jpg',
        name: 'Rising Sun',
        subtitle: 'Leilão acontecendo agora!',
        endDateTime: 'Sep 31, 2022 10:00:00'
    },
    {
        image: 'https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v8328468370973062307/products/TWI001_3D.jpg',
        name: 'Twilight Imperium 4',
        subtitle: 'Leilão finaliza hoje',
        endDateTime: 'Sep 31, 2022 22:00:00'
    },
    {
        image: 'https://cf.shopee.com.br/file/b3097753814b45040cd2ec44184ea81e',
        name: 'Gloomhaven',
        subtitle: 'Recém cadastrado',
        endDateTime: 'Sep 31, 2022 10:00:00'
    },
    {
        image: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/163/751/products/7-wonders1-56ea6ab62cd996f3e916276579801644-640-0.jpg',
        name: '7 wonders segunda edição',
        subtitle: 'Leilão acontecendo agora!',
        endDateTime: 'Sep 30, 2022 10:00:00'
    },
    {
        image: 'https://deviramericas.com/wp-content/uploads/2014/10/Ubongo-caja-600x600-1.jpg',
        name: 'Ubongo',
        subtitle: 'Raridade!!',
        endDateTime: 'Sep 22, 2022 10:00:00'
    },
]

const AuctionCarousel = () => {
    const [current, setCurrent] = useState(0);
    const length = SliderData.length;
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            nextSlide()
          }, 5000)
    }, [current]);

    function defineBackground(index: number) {
        return ({
            'backgroundImage': `linear-gradient(180deg, rgba(0, 0, 0, 0.61) 0%, rgba(0, 0, 0, 0.1) 100%), url(${SliderData[index].image})`,
            'backgroundPosition': 'center',
            'backgroundSize': 'cover',
            'backgroundRepeat': 'no-repeat'
    })
    }
    
    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }

    return (
        <>
            <section className={styles.slider}>
                <BsChevronCompactLeft className={styles.leftArrow} onClick={prevSlide} />
                <BsChevronCompactRight className={styles.rightArrow} onClick={nextSlide} />
                {SliderData.map((slide, index) => {
                    return (
                        <div
                            className={index === current ? `${styles.slideActive}` : `${styles.slide}`}
                            key={index}
                            style={defineBackground(index)}
                            onClick={index === current ? () => navigate(`/leilao/${index + 1}`): undefined}
                        >
                            <h2 className={styles.titulo}>{slide.name}</h2>
                            <p className={styles.subtitulo}>{slide.subtitle}</p>
                            <div className={styles.timeLeft}>
                                <TimeLeftBox endDateTime={new Date(slide.endDateTime)} onFinish={() => console.log('finalizado')} />
                            </div>
                        </div>
                    );
                })}

            </section>
            <div className={styles.dotsContainer}>
                {Array.from({ length: SliderData.length }).map((item, index) => (
                    <div
                        className={index === current ? `${styles.dotActive}` : `${styles.dot}`}
                        onClick={() => setCurrent(index)}
                        key={index}
                    />
                ))}
            </div>
        </>
    );
};

export default AuctionCarousel;