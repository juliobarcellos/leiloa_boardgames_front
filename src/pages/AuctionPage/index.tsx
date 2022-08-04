import { useState } from "react";
import TimeLeftBox from "../../components/TimeLeftBox";
import TopBarMenu from "../../components/TopBarMenu";
import ImageGallery from 'react-image-gallery';
import './AuctionPage.scss';


export default function AuctionPage() {
    const [search, setSearch] = useState('');
    const images = [
        {
            original:
                'https://www.residentevildatabase.com/wp-content/uploads/2017/09/re2-board-game-0.jpg',
            originalWidth: 480,
            originalHeight: 480,
            thumbnail:
                'https://www.residentevildatabase.com/wp-content/uploads/2017/09/re2-board-game-0.jpg',
            thumbnailWidth: 80,
            thumbnailHeight: 80,
        },
        {
            original:
                'https://i.pinimg.com/originals/7f/22/1e/7f221e2f7074c5b1050c78ea4bfdb8b8.jpg',
            originalWidth: 480,
            originalHeight: 480,
            thumbnail:
                'https://i.pinimg.com/originals/7f/22/1e/7f221e2f7074c5b1050c78ea4bfdb8b8.jpg',
            thumbnailWidth: 80,
            thumbnailHeight: 80,
        },
    ];

    return (
        <>
            <TopBarMenu search={search} setSearch={setSearch} />
            <div className='dadosLeilao'>
                <div className='dadosLeilao__galeria'>
                    <ImageGallery thumbnailPosition="left" items={images} />
                </div>
                <div className="dadosLeilao__dados">
                    <h3 className="dados__titulo">Rising Sun</h3>
                    <span className="dados__subtitulo">Detalhes do jogo que o vendedor acredita necessitar de destaque</span>
                    <div className="dados__flexContainer">
                        <div className="flexContainer__selecionarLance">
                            <h4>Selecione o seu lance</h4>
                            <select className="selecionarLance__select">
                                <option>R$500,00</option>
                                <option>R$510,00</option>
                                <option>R$520,00</option>
                                <option>R$530,00</option>
                                <option>R$540,00</option>
                                <option>R$550,00</option>
                            </select>
                            <button className="selecionarLance__button">Ver lances anteriores</button>
                        </div>
                        <div className="flexContainer__valorAtualeTempoRestante">
                            <h4>Lance atual R$ 490,00</h4>
                            <h4>Tempo Restante:</h4>
                            <TimeLeftBox endDateTime={new Date("Sep 30, 2022 10:00:00")} onFinish={() => console.log()} />
                        </div>
                    </div>
                    <div className="dados__flexContainer">
                        <div className="flexContainer__SimularFrete">
                            <span>Simular Frete:</span>
                            <input placeholder="12345-678" />
                            <button>C</button>
                        </div>
                        <div className="flexContainer__leiloeiro">
                            <img src="" alt="" />
                            <div className="leiloeiro__textos">
                                <span>Leiloeiro(a): Matilda Brown</span>
                                <span>٭٭٭٭٭(10 avaliações)</span>
                            </div>
                            <span>Ver Perfil</span>
                        </div>
                    </div>
                    <button>Dar Lance!</button>
                </div>

            </div>
            <div className="DetalhesProduto">
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis mi ac consectetur mollis. Aliquam faucibus venenatis ornare. Curabitur feugiat facilisis lorem. Nullam tincidunt felis sit amet tincidunt dictum. Ut at risus ullamcorper, ornare augue laoreet, congue ligula. Mauris id ornare sem, et imperdiet tortor. Suspendisse rutrum et magna non vestibulum. Aenean posuere, erat vel posuere imperdiet, urna orci pretium sem, eu eleifend risus augue ac ligula. Mauris enim ligula, tempus sit amet velit nec, aliquet pharetra neque. Nam venenatis nunc scelerisque, feugiat orci at, bibendum eros. Suspendisse venenatis purus id dui lacinia sodales. Nam ligula eros, faucibus et viverra in, ultricies vel nulla. Sed nec velit nunc. Praesent in dignissim mauris. Proin semper quam ut dolor placerat condimentum.</span>
            </div>
            <div className="FichaTecnica">
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis mi ac consectetur mollis. Aliquam faucibus venenatis ornare. Curabitur feugiat facilisis lorem. Nullam tincidunt felis sit amet tincidunt dictum. Ut at risus ullamcorper, ornare augue laoreet, congue ligula. Mauris id ornare sem, et imperdiet tortor. Suspendisse rutrum et magna non vestibulum. Aenean posuere, erat vel posuere imperdiet, urna orci pretium sem, eu eleifend risus augue ac ligula. Mauris enim ligula, tempus sit amet velit nec, aliquet pharetra neque. Nam venenatis nunc scelerisque, feugiat orci at, bibendum eros. Suspendisse venenatis purus id dui lacinia sodales. Nam ligula eros, faucibus et viverra in, ultricies vel nulla. Sed nec velit nunc. Praesent in dignissim mauris. Proin semper quam ut dolor placerat condimentum.</span>
            </div>
            <div className="Perguntas">
                <h3>Tem uma pergunta?</h3>
                <textarea />
                <h4>12 Perguntas</h4>
                <div className="pergunta">
                    <div>
                        <img src="" alt="" />
                        <span>Responder</span>
                    </div>
                    <div>
                        <span>Helene Moore</span>
                        <span>The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.</span>
                    </div>
                    <span>5 de set. de 2022</span>
                </div>
            </div>
        </>
    )
}