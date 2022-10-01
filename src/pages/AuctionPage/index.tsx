import TimeLeftBox from "../../components/TimeLeftBox";
import ImageGallery from 'react-image-gallery';
import { BsTruck } from 'react-icons/bs';
import auctions from '../../data/auctions.json'
import './AuctionPage.scss';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BidModal from "../../components/Modals/Bid/BidModal";

export default function AuctionPage() {
    const { id } = useParams();
    const auction = auctions.find(item => item.id === Number(id));
    const [lancesDisponiveis, setLancesDisponiveis] = useState<number[]>([]);
    const [isBidModalVisible, setIsBidModalVisible] = useState(false);
    const [isShipmentModalVisible, setIsShipmentModalVisible] = useState(false);
    const [bidValue, setBidValue] = useState(0);
    let userRating = 5;
    let percentRating = '100%';

    useEffect(() => {
        if (auction) {
            setBidValue(auction.price + auction.increment)
            for (let i = 1; i <= 5; i++) {
                lancesDisponiveis[i] = auction.price + (auction.increment * i);
            }
            userRating = auction.leiloeiro.rating;
            document.querySelector('.fillRatings')?.setAttribute('style', `${'width: '+percentRating}` )
            percentRating = ((auction.leiloeiro.rating/5.0)*100)+'%;';
        }

    }, []);

    if (!auction) {
        return (
            <div>404 Not Found</div>
        )
    }
    return (
        <>
            <div className='dadosLeilao'>
                <div className='dadosLeilao__galeria'>
                    <ImageGallery thumbnailPosition="left" items={auction.images} />
                </div>
                <div className="dadosLeilao__dados">
                    <h3 className="dados__titulo">{auction.name}</h3>
                    <span className="dados__subtitulo">{auction.subtitle}</span>
                    <div className="dados__flexContainer">
                        <div className="flexContainer__selecionarLance">
                            <h4 className="selecionarLance__title">Selecione o seu lance</h4>
                            <select className="selecionarLance__select" onChange={e => setBidValue(+e.target.value)} >
                                {lancesDisponiveis.map((lance, index) => {
                                    return (
                                        <option key={index} value={lance}>R$ {lance},00</option>
                                    )
                                })}
                            </select>
                            <button className="selecionarLance__button">Ver lances anteriores</button>
                        </div>
                        <div className="flexContainer__valorAtualeTempoRestante">
                            <h4 className="flexContainer__valorAtualeTempoRestante--lanceAtual">Lance atual R$ {auction.price},00</h4>
                            <h4 className="flexContainer__valorAtualeTempoRestante--tempoRestante">Tempo Restante:</h4>
                            <TimeLeftBox endDateTime={new Date(auction.endDateTime)} onFinish={() => console.log()} />
                        </div>
                    </div>
                    <div className="dados__flexContainer">
                        <button className="dados__botaoDarLance" onClick={() => setIsBidModalVisible(true)}>Dar Lance!</button>
                        <div className="flexContainer__leiloeiro">
                            <div className="leiloeiro__box">
                                <img className="leiloeiro__image" src={auction.leiloeiro.profilePic} alt="" />
                                <span className="leiloeiro_link">Ver Perfil</span>
                            </div>
                            <div className="leiloeiro__textos">
                                <span>Leiloeiro(a): {auction.leiloeiro.name}</span>
                                <span className="leiloeiro__rating">
                                    <div className="leiloeiro__starsRatings">
                                        <div className="fillRatings" style={{'width': percentRating}} >
                                            <span>★★★★★</span>
                                        </div>
                                        <div className="emptyRatings">
                                            <span>★★★★★</span>
                                        </div>
                                    </div>
                                    (10 avaliações)</span>
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
                <span className="DetalhesProduto__text">{auction.productDetails}</span>
            </div>
            <div className="FichaTecnica">
                <span className="FichaTecnica__title">Ficha Técnica</span>
                <span className="FichaTecnica__text">{auction.fichaTecnica}</span>
            </div>
            <div className="Perguntas">
                <h3 className="Perguntas__title">Tem uma pergunta?</h3>
                <textarea className="Perguntas__text" placeholder='Escreva aqui a sua pergunta e tecle "Enter" para enviar' />
                <h4 className="Perguntas__qtd">12 Perguntas</h4>
                {auction.questions?.map((question, index) => {
                    return (
                        <div key={index} className="Perguntas__pergunta">
                            <div className="pergunta__imgBox">
                                <img className="pergunta__img" src={question.user.profilePic} alt="" />
                                <span className="pergunta__button">Responder</span>
                            </div>
                            <div className="pergunta__box">
                                <span className="pergunta__user">{question.user.name}</span>
                                <span className="pergunta__text">{question.question}</span>
                            </div>
                            <time className="pergunta__date">{question.questionDate}</time>
                        </div>
                    )
                })}
            </div>
            {isBidModalVisible && <BidModal value={bidValue} isModalVisible={isBidModalVisible} setIsModalVisible={setIsBidModalVisible} />}
        </>
    )
}