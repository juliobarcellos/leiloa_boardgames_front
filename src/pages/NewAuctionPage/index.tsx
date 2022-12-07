import styles from './NewAuction.module.scss';
import './Teste.css';
import CurrencyInput from 'react-currency-input-field';
import { useContext, useEffect, useState } from 'react';
import GameSearchDropdown from '../../components/GameSearchDropdown';
import auctionService from '../../services/auctionService';
import { AuctionType, GameType, initialAuction, PhotoType } from '../../types';
import { userContext } from '../../context/user';
import gameService from '../../services/gameService';
import { useNavigate } from 'react-router-dom';

export default function NewAuctionPage() {

    const [termino, setTermino] = useState('');
    const [initialValue, setInitialValue] = useState('');
    const [increment, setIncrement] = useState('');
    const [condition, setCondition] = useState('');
    const [edition, setEdition] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [altura, setAltura] = useState('');
    const [largura, setLargura] = useState('');
    const [comprimento, setComprimento] = useState('');
    const [peso, setPeso] = useState('');
    const [search, setSearch] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<Array<PhotoType>>([]);
    const [files, setFiles] = useState<FileList | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [jogo, setJogo] = useState<GameType>({} as GameType);
    const [categorias, setCategorias] = useState<number[]>([]);
    const context = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(async () => {
            setDisabled(true);
            if (files != null) {
            const vetor:Array<PhotoType> = [];
            for (const file of files) {
                const base64 = await convertToBase64(file);
                let photo: PhotoType = {
                    original: base64
                }
                vetor.push(photo)
            }
            setPhotos(vetor);
            setDisabled(false);
            gameService.getByNome(search).then(function (response){
                let jsonJogo = JSON.stringify(response.data[0], null, '  ')
                setJogo(JSON.parse(jsonJogo));
            })
        }
          }, 100)

    },[files])

    const onRegisterTrigger = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const leilao: AuctionType = initialAuction;
        let now = new Date();
        leilao.startDateTime = now.toString();
        let dataFim = new Date(termino).toString();
        leilao.endDateTime = dataFim;
        leilao.initialValue = +initialValue;
        leilao.price = +initialValue;
        leilao.increment = +increment;
        leilao.gameCondition = condition;
        leilao.edition = edition;
        leilao.subtitle = subtitle;
        leilao.height = +altura;
        leilao.width = +largura;
        leilao.lenght = +comprimento;
        leilao.weight = +peso;
        leilao.name = search;
        leilao.productDetails = description;
        leilao.images = photos;
        if(context.user.id){
        leilao.idUsuario = context.user.id};
        if(jogo){
            leilao.idJogo = jogo.id;
            leilao.image = jogo.cover;
            jogo.categorias.map(category => setCategorias(oldCategorias => [...oldCategorias, Number(category)]));
            leilao.tags = categorias;
            leilao.fichaTecnica = jogo.fichaTecnica;}
        leilao.leiloeiro.name = context.user.nome;
        if(context.user.rating){
        leilao.leiloeiro.rating = context.user.rating}
        leilao.leiloeiro.profilePic = context.user.image;
        auctionService.create(leilao).then((response) =>{
            let leilaoId = response.data.id;
            navigate(`/leilao/${leilaoId}`)
        })
    }

    function measurementsOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        switch (event.target.id) {
            case 'inputAltura':
                if (event.target.validity.valid) { setAltura(event.target.value) }
                break;
            case 'inputLargura':
                if (event.target.validity.valid) { setLargura(event.target.value) }
                break;
            case 'inputComprimento':
                if (event.target.validity.valid) { setComprimento(event.target.value) }
                break;
            case 'inputPeso':
                if (event.target.validity.valid) { setPeso(event.target.value) }
                break;
        }

    }

    const fileTypes = [
        "image/apng",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
    ];

    function validFileType(file: File) {
        return fileTypes.includes(file.type);
    }

    const convertToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };



    function photosOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const curFiles = event.target.files;
        setFiles(curFiles);
        const list = document.querySelector(`.${styles.GameData__Photos}`)
        while (list?.firstChild) {
            list.removeChild(list.firstChild);
        }
        if (!curFiles) {
            alert("Selecione fotos para cadastrar o leilão")
        } else {
            for (const file of curFiles) {
                if (validFileType(file)) {
                    const listItem = document.createElement('li');
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(file);
                    listItem.appendChild(image);
                    list?.appendChild(listItem);
                } else {
                    alert('Ao menos um dos arquivos selecionados não pertence aos tipos de imagem aceitos e não será enviado, favor selecionar apenas arquivos nos formatos .jpg .jpeg ou .png')
                }
            }
        }
    }

    return (
        <section>
            <form onSubmit={(e) => onRegisterTrigger(e)}>
                <section className={styles.AuctionData}>
                    <span className={styles.AuctionData__Title}>Dados do Leilão</span>
                    <section className={styles.AuctionData__Fields}>
                        <label>Término</label>
                        <input type='datetime-local' value={termino} onChange={(e) => setTermino(e.target.value)} />
                        <label>Lance mínimo</label>
                        <CurrencyInput
                            placeholder="R$ 250,00"
                            allowNegativeValue={false}
                            allowDecimals={false}
                            prefix="R$ "
                            defaultValue={0}
                            value={initialValue}
                            onValueChange={(value) => value && setInitialValue(value || '0')}
                        />

                        <label>Incremento de lance</label>
                        <CurrencyInput
                            placeholder="R$ 5,00"
                            allowNegativeValue={false}
                            allowDecimals={false}
                            prefix="R$ "
                            defaultValue={0}
                            value={increment}
                            onValueChange={(value) => value && setIncrement(value || '0')}
                        />
                    </section>
                </section>
                <section className={styles.GameData}>
                    <span className={styles.GameData__Title}>Dados do Jogo</span>
                    <section className={styles.GameData__Fields}>
                        <label>Nome</label>
                        <GameSearchDropdown search={search} setSearch={setSearch} />
                        <label>Estado do jogo</label>
                        <select onChange={(e) => setCondition(e.target.value)}>
                            <option value={"Usado"}>Usado</option>
                            <option value={"Novo"}>Novo</option>
                            <option value={"Semi novo"}>Semi novo</option>
                            <option value={"Danificado"}>Danificado</option>
                            <option value={"Faltam peças"}>Faltam peças</option>
                        </select>
                        <label>Edição</label>
                        <input value={edition} onChange={(e) => setEdition(e.target.value)} />
                        <label>Subtítulo (Breve descrição ou estado do jogo)</label>
                        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                    </section>
                    <section className={styles.GameData__Measurements}>
                        <label htmlFor='inputAltura' >Altura (cm)</label>
                        <input id='inputAltura' type='tel' maxLength={2} value={altura} pattern='[0-9]{1,2}' onChange={measurementsOnChange} />
                        <label htmlFor='inputLargura'>Largura (cm)</label>
                        <input id='inputLargura' type='tel' maxLength={2} value={largura} pattern='[0-9]{1,2}' onChange={measurementsOnChange} />
                        <label htmlFor='inputComprimento'>Comprimento (cm)</label>
                        <input id='inputComprimento' type='tel' maxLength={2} value={comprimento} pattern='[0-9]{1,2}' onChange={measurementsOnChange} />
                        <label htmlFor='inputPeso'>Peso em Kgs</label>
                        <input id='inputPeso' type='tel' max={99.9} value={peso} pattern='[0-9]{1,2},?[0-9]?' onChange={measurementsOnChange} />
                    </section>
                    <label>Descrição do jogo</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <section className={styles.GameData__PhotoInput}>
                        <label htmlFor='inputPhotos'>Fotos</label>
                        <input type="file" id='inputPhotos' name='inputPhotos' onChange={photosOnChange} accept="image/png, image/jpeg, image/jpg" multiple />
                    </section>
                    <ul className={styles.GameData__Photos} />
                </section>
                <section className={styles.ShipOnHands}>
                    <span>Opção de entrega em mãos</span>
                    <div>
                        <input type='checkbox' id='entregaCheck' />
                        <label htmlFor='entregaCheck'>Aceito realizar entrega em mãos</label>
                    </div>
                </section>
                <section className={styles.Register}>
                    <button className={disabled? `${styles.dButton}` : `${styles.rButton}`} type='submit' disabled={disabled}>Registrar Leilão</button>
                </section>
            </form>
        </section>
    )
}