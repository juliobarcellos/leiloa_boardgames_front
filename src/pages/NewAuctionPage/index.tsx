import styles from './NewAuction.module.scss';
import './Teste.css';
import CurrencyInput from 'react-currency-input-field';
import { useState } from 'react';
import GameSearchDropdown from '../../components/GameSearchDropdown';

export default function NewAuctionPage() {

    const [altura, setAltura] = useState('');
    const [largura, setLargura] = useState('');
    const [comprimento, setComprimento] = useState('');
    const [peso, setPeso] = useState('');
    const [search, setSearch] = useState('');

    const options = [
        { label: 'Guerra do Anel', value: 'sv', id: 1 , text: 'Guerra' },
        { label: 'Galaxy Trucker', value: 'en', id: 2 , text: 'Galaxy T' },
        { label: 'Galaxy Showdown', value: 'gs', id: 3 , text: 'Galaxy S' },
        { label: 'Going Crazy', value: 'gc', id: 4 , text: 'Going' },
        { label: 'Going Crazy', value: 'ga', id: 5 , text: 'Going' },
        { label: 'Going Crazy', value: 'gd', id: 6 , text: 'Going' },
        { label: 'Going Crazy', value: 'gr', id: 7 , text: 'Going' },
        { label: 'Galactic Imperium', value: 'gi', id: 8 , text: ' Gala Im' }
    ];

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

    function photosOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const curFiles = event.target.files;
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
            <form>
                <section className={styles.AuctionData}>
                    <span className={styles.AuctionData__Title}>Dados do Leilão</span>
                    <section className={styles.AuctionData__Fields}>
                        <label>Término</label>
                        <input type='datetime-local'></input>
                        <label>Lance mínimo</label>
                        <CurrencyInput
                            placeholder="R$ 250,00"
                            allowNegativeValue={false}
                            allowDecimals={false}
                            prefix="R$ "
                        />

                        <label>Incremento de lance</label>
                        <CurrencyInput
                            placeholder="R$ 5,00"
                            allowNegativeValue={false}
                            allowDecimals={false}
                            prefix="R$ "
                        />
                    </section>
                </section>
                <section className={styles.GameData}>
                    <span className={styles.GameData__Title}>Dados do Jogo</span>
                    <section className={styles.GameData__Fields}>
                        <label>Nome</label>
                        <GameSearchDropdown search={search} setSearch={setSearch} />
                        <label>Estado do jogo</label>
                        <select></select>
                        <label>Edição</label>
                        <input></input>
                        <label>Subtítulo (Breve descrição ou estado do jogo)</label>
                        <input></input>
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
                    <textarea />
                    <section className={styles.GameData__PhotoInput}>
                        <label htmlFor='inputPhotos'>Fotos</label>
                        <input type="file" id='inputPhotos' name='inputPhotos' onChange={photosOnChange} accept="image/png, image/jpeg, image/jpg" multiple />
                    </section>
                    <ul className={styles.GameData__Photos}>

                    </ul>
                </section>
                <section>
                    <span>Opção de entrega em mãos</span>
                </section>
            </form>
        </section>
    )
}