import { useState } from "react";
import TimeLeftBox from "../../components/TimeLeftBox";
import TopBarMenu from "../../components/TopBarMenu";
import ImageGallery from 'react-image-gallery';
import { BsTruck } from 'react-icons/bs';
import './AuctionPage.scss';


export default function AuctionPage() {
    const [search, setSearch] = useState('');
    const images = [
        {
            original:
                'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg',
            originalWidth: 480,
            originalHeight: 480,
            thumbnail:
                'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__original/img/pKJ1XyLN4hvHim5eRj2VJHijv1E=/0x0/filters:format(jpeg)/pic3880340.jpg',
            thumbnailWidth: 80,
            thumbnailHeight: 80,
        },
        {
            original:
                'https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v2254333255858590756/products/RSU001_03.jpg',
            originalWidth: 480,
            originalHeight: 480,
            thumbnail:
                'https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v2254333255858590756/products/RSU001_03.jpg',
            thumbnailWidth: 80,
            thumbnailHeight: 80,
        },

        {
            original:
                'https://cdn.awsli.com.br/300x300/177/177316/produto/59982522/f6951ec8ff.jpg',
            originalWidth: 480,
            originalHeight: 480,
            thumbnail:
                'https://cdn.awsli.com.br/300x300/177/177316/produto/59982522/f6951ec8ff.jpg',
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
                            <h4 className="selecionarLance__title">Selecione o seu lance</h4>
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
                        <button className="dados__botaoDarLance">Dar Lance!</button>
                        <div className="flexContainer__leiloeiro">
                            <div className="leiloeiro__box">
                                <img className="leiloeiro__image" src="https://static-cse.canva.com/blob/892615/1600w-EW4cggXkgbc.jpg" alt="" />
                                <span className="leiloeiro_link">Ver Perfil</span>
                            </div>
                            <div className="leiloeiro__textos">
                                <span>Leiloeiro(a): Matilda Brown</span>
                                <span>٭٭٭٭٭(10 avaliações)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flexContainer__SimularFrete">
                            <span>Simular Frete:</span>
                            <div className="simularFrete__inputButton">
                                <input placeholder="12345-678" />
                                <button>
                                    <BsTruck size={20} />
                                </button>
                            </div>
                        </div>
                </div>

            </div>
            <div className="DetalhesProduto">
                <span className="DetalhesProduto__title">Detalhes do produto</span>
                <span className="DetalhesProduto__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis mi ac consectetur mollis. Aliquam faucibus venenatis ornare. Curabitur feugiat facilisis lorem. Nullam tincidunt felis sit amet tincidunt dictum. Ut at risus ullamcorper, ornare augue laoreet, congue ligula. Mauris id ornare sem, et imperdiet tortor. Suspendisse rutrum et magna non vestibulum. Aenean posuere, erat vel posuere imperdiet, urna orci pretium sem, eu eleifend risus augue ac ligula. Mauris enim ligula, tempus sit amet velit nec, aliquet pharetra neque. Nam venenatis nunc scelerisque, feugiat orci at, bibendum eros. Suspendisse venenatis purus id dui lacinia sodales. Nam ligula eros, faucibus et viverra in, ultricies vel nulla. Sed nec velit nunc. Praesent in dignissim mauris. Proin semper quam ut dolor placerat condimentum.</span>
            </div>
            <div className="FichaTecnica">
                <span className="FichaTecnica__title">Ficha Técnica</span>
                <span className="FichaTecnica__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis mi ac consectetur mollis. Aliquam faucibus venenatis ornare. Curabitur feugiat facilisis lorem. Nullam tincidunt felis sit amet tincidunt dictum. Ut at risus ullamcorper, ornare augue laoreet, congue ligula. Mauris id ornare sem, et imperdiet tortor. Suspendisse rutrum et magna non vestibulum. Aenean posuere, erat vel posuere imperdiet, urna orci pretium sem, eu eleifend risus augue ac ligula. Mauris enim ligula, tempus sit amet velit nec, aliquet pharetra neque. Nam venenatis nunc scelerisque, feugiat orci at, bibendum eros. Suspendisse venenatis purus id dui lacinia sodales. Nam ligula eros, faucibus et viverra in, ultricies vel nulla. Sed nec velit nunc. Praesent in dignissim mauris. Proin semper quam ut dolor placerat condimentum.</span>
            </div>
            <div className="Perguntas">
                <h3 className="Perguntas__title">Tem uma pergunta?</h3>
                <textarea className="Perguntas__text" placeholder='Escreva aqui a sua pergunta e tecle "Enter" para enviar' />
                <h4 className="Perguntas__qtd">12 Perguntas</h4>
                <div className="Perguntas__pergunta">
                    <div className="pergunta__imgBox">
                        <img className="pergunta__img" src="https://static-cse.canva.com/blob/892615/1600w-EW4cggXkgbc.jpg" alt="" />
                        <span className="pergunta__button">Responder</span>
                    </div>
                    <div className="pergunta__box">
                        <span className="pergunta__user">Helene Moore</span>
                        <span className="pergunta__text">The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.</span>
                    </div>
                    <span className="pergunta__date">5 de set. de 2022</span>
                </div>
            </div>
        </>
    )
}