import TimeLeftBox from "../../components/TimeLeftBox";
import ImageGallery from 'react-image-gallery';
import { BsTruck, BsHeart, BsHeartFill } from 'react-icons/bs';
import './AuctionPage.scss';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import BidModal from "../../components/Modals/Bid/BidModal";
import auctionService from "../../services/auctionService";
import { AuctionType, BidType, ImageCarouselType } from "../../types";
import { userContext } from "../../context/user";
import ReactLoading from 'react-loading';
import LoadingModal from "../../components/Modals/LoadingModal";
import bidService from "../../services/bidService";

export default function AuctionPage() {
    const { id } = useParams();
    const [auction, setAuction] = useState<AuctionType>({} as AuctionType);
    const [lancesDisponiveis, setLancesDisponiveis] = useState<number[]>([]);
    const [isBidModalVisible, setIsBidModalVisible] = useState(false);
    const [isShipmentModalVisible, setIsShipmentModalVisible] = useState(false);
    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);
    const [bidValue, setBidValue] = useState(0);
    const [imagens, setImagens] = useState<ImageCarouselType[]>([]);
    const [carregado, setCarregado] = useState(false);
    const [favorito, setFavorito] = useState(false);
    const context = useContext(userContext);
    let userRating = 5;
    let percentRating = '100%';

    useEffect(() => {
        async function teste() {
            if (id) {
                const response = await auctionService.getByID(id)
                let jsonLeilao = JSON.stringify(response.data, null, '  ')
                setAuction(JSON.parse(jsonLeilao));
                setCarregado(true)
            }
        }
        teste();
    }, []);

    useEffect(() => {
        console.log("useEffect auction")
        console.log(auction)
        console.log(`inicio lances ${lancesDisponiveis}`)
        if (auction !== undefined && auction.leiloeiro !== undefined) {
            let selectComponente = document.querySelector('.selecionarLance__select');
            setBidValue(auction.price + auction.increment)
            let lista: number[] = []
            for (let i = 0; i <= 4; i++) {
                lista[i] = auction.price + (auction.increment * (i+1));
            }
            setLancesDisponiveis(lista)
            let pics: Array<ImageCarouselType> = [];
            auction.images?.map(imagem => {
                let novaImagem = {
                    original: typeof imagem.original === 'string' ? imagem.original : "undefined",
                    originalWidth: 480,
                    originalHeight: 480,
                    thumbnail: typeof imagem.original === 'string' ? imagem.original : "undefined",
                    thumbnailWidth: 80,
                    thumbnailHeight: 80
                }
                pics.push(novaImagem);
            });
            setImagens(pics);
            userRating = auction.leiloeiro.rating;
            percentRating = ((auction.leiloeiro.rating / 5.0) * 100) + '%;';
            document.querySelector('.fillRatings')?.setAttribute('style', `${'width: ' + percentRating}`)
            if (context.logado) {
                if (context.user.favoritos?.find(item => item === Number(auction.idJogo))) {
                    setFavorito(true);
                }
            }
            console.log(`fim lances ${lancesDisponiveis}`)

        }
    }, [auction])

    function handleFavorito() {
        if (context.logado && context.user.favoritos) {
            setFavorito(wasFavorito => !wasFavorito)
            !favorito ? context.user.favoritos.push(Number(auction.idJogo)) : context.user.favoritos = context.user.favoritos.filter(jogo => jogo !== Number(auction.idJogo));
        } else {
            alert("Para selecionar um jogo como favorito é preciso estar logado, efetue o login.")
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsBidModalVisible(false);
        let lance: BidType = {
            idUser: context.user.id!,
            idLeilao: auction.id!,
            value: bidValue,
            dateTime: new Date().toLocaleString('pt-BR')
            //dateTime: new Date().toString()
        }
        bidService.create(lance).then((response) => {
            lance = response.data;
            auction.bids?.push(lance.id!);
            auction.actualBid = lance.id;
            auction.price = lance.value;
            console.log(auction)
            console.log(lance)
            console.log(`create ${bidValue}`)
            setBidValue(auction.price + auction.increment)
            let lista: number[] = []
            for (let i = 0; i <= 4; i++) {
                lista[i] = auction.price + (auction.increment * (i+1));
            }
            setLancesDisponiveis(lista)
        })
    }

    function handleDarLance() {
        if (context.logado) {
            setIsBidModalVisible(true);
        } else {
            setIsLoadingModalVisible(true);
        }
    }

    if (!auction) {
        return (
            <div>404 Not Found</div>
        )
    }
    return (
        <>
            <div className='dadosLeilao'>
                <div className='dadosLeilao__galeria'>
                    <ImageGallery thumbnailPosition="left" items={imagens} />
                </div>
                <div className="dadosLeilao__dados">
                    <div className="dados__tituloBox">
                        {favorito && <BsHeartFill id="iconFav2" fill="#EF3651" onClick={handleFavorito} size={22} />}
                        {!favorito && <BsHeart id="iconFav" onClick={handleFavorito} size={22} />}
                        <h3 className="dados__titulo">{auction.name}</h3>
                    </div>
                    <span className="dados__subtitulo">{auction.subtitle}</span>
                    <div className="dados__flexContainer">
                        <div className="flexContainer__selecionarLance">
                            <h4 className="selecionarLance__title">Selecione o seu lance</h4>
                            {carregado &&
                                <select className="selecionarLance__select" onChange={e => setBidValue(+e.target.value)} >
                                    {lancesDisponiveis.map((lance, index) => {
                                        return (
                                            <option key={index} id={String(index)} value={lancesDisponiveis[index]}>R$ {lancesDisponiveis[index]},00</option>
                                        )
                                    })}
                                </select>
                            }
                            <button className="selecionarLance__button">Ver lances anteriores</button>
                        </div>
                        <div className="flexContainer__valorAtualeTempoRestante">
                            <h4 className="flexContainer__valorAtualeTempoRestante--lanceAtual">Lance atual R$ {auction.price},00</h4>
                            <h4 className="flexContainer__valorAtualeTempoRestante--tempoRestante">Tempo Restante:</h4>
                            {carregado && <TimeLeftBox endDateTime={new Date(auction.endDateTime)} onFinish={() => { }} />}
                            {!carregado && <ReactLoading className='loadingComp' type={"spinningBubbles"} color="#FAFAFA" height={"15%"} width={"15%"} />}
                        </div>
                    </div>
                    <div className="dados__flexContainer">
                        <button className="dados__botaoDarLance" onClick={handleDarLance}>Dar Lance!</button>
                        <div className="flexContainer__leiloeiro">
                            <div className="leiloeiro__box">
                                {carregado &&
                                    <img className="leiloeiro__image" src={auction.leiloeiro.profilePic} alt="" />
                                }
                                <span className="leiloeiro_link">Ver Perfil</span>
                            </div>
                            <div className="leiloeiro__textos">
                                {carregado &&
                                    <span>Leiloeiro(a): {auction.leiloeiro.name}</span>
                                }
                                <span className="leiloeiro__rating">
                                    <div className="leiloeiro__starsRatings">
                                        <div className="fillRatings" style={{ 'width': percentRating }} >
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
                <h4 className="Perguntas__qtd">{auction.questions?.length} Perguntas</h4>
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
            {isLoadingModalVisible && <LoadingModal title="Atenção!" message="Você não está logado, para dar um lance é preciso fazer login" isModalVisible={isLoadingModalVisible} customFunction={() => setIsLoadingModalVisible(false)} customFunctionTitle={"retornar para a página anterior"} />}
            {isBidModalVisible && <BidModal value={bidValue} isModalVisible={isBidModalVisible} setIsModalVisible={setIsBidModalVisible} handleSubmit={handleSubmit} />}
        </>
    )
}