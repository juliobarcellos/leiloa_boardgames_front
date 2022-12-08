import styles from './Footer.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function Footer() {
    return (
    
        <footer className={styles.footer}>
            <div className={styles.footer__Container}>          
                <span className={styles.footer__Logo}><Logo/></span>
                <span>LEILOA BOARDGAMES</span>
            </div>
            <div className={styles.footer__Container}>
                <span>Sobre nós</span>
                <p>
                    Somos uma empresa que visa fornecer um serviço de compra e venda de jogos de tabuleiro por meio de leilões online. Nosso site conta com toda a segurança necessária para sua transação, e damos todo o suporte para que as duas partes possam acertar os detalhes.
                </p>
            </div>
            <div className={styles.footer__Container}>
                <span>Politicas</span>
                <ul>
                    <a href='#'>Termos de Uso</a>
                    <a href='#'>Politica de Privacidade</a>
                    <a href='#'>Devolução e Reembolso</a>
                </ul>

            </div>
            <div className={styles.footer__Container}>
                <span>FALE CONOSCO</span>

                <p>Telefone: (11)1234-5678</p>
                <p>E-mail: contato@leiloabordgames.com.br</p>
            </div>
            <span className={styles.footer__CopyRights}>Copyright © 2022 Leiloa BoardGames. All rights reserved.</span>

        </footer>
    
    
    );
}