import styles from './footer.module.scss';
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed felis erat. Ut et congue augue. Sed ut enim ac felis scelerisque malesuada. Etiam sed sem a libero porta finibus. 
                </p>
            </div>
            <div className={styles.footer__Container}>
                <span>MAPA DO SITE</span>

                <ul>
                    <li><a>Home</a></li>
                    <li><a>link2</a></li>
                    <li><a>link3</a></li>
                    <li><a>link4</a></li>
                    
                </ul>
            </div>
            <div className={styles.footer__Container}>
                <span>Politicas</span>
                <ul>
                    <li>Termos de Uso</li>
                    <li>Politica de Privacidade</li>
                    <li>Devolução e Reembolso</li>
                </ul>

            </div>
            <div className={styles.footer__Container}>
                <span>FALE CONOSCO</span>

                <p>Telefone: 000-000-000</p>
                <p>E-mail: contato@leiloabordgames.com.br</p>
            </div>
            <span className={styles.footer__CopyRights}>Copyright © 2022 Leiloa BoardGames. All rights reserved.</span>

        </footer>
    
    
    );
}