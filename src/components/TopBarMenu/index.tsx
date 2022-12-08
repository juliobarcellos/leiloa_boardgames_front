import styles from './TopBarMenu.module.scss';
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { MdHome, MdShoppingBasket, MdFavorite, MdAccountCircle, MdNotifications } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';
import { RiAuctionFill } from 'react-icons/ri'
import SearchField from '../SearchField';
import { useContext, useState } from 'react';
import LoginModalWrapper from '../Modals/Login/LoginModalWrapper';
import ForgotPasswordWrapper from '../Modals/ForgotPassword/ForgotPasswordWrapper';
import NotificationsDropdown from '../NotificationsDropdown';
import RegisterModalWrapper from '../Modals/Register/RegisterModalWrapper';
import PersonalDataWrapper from '../Modals/Register/PersonalData/PersonalDataWrapper';
import AddressWrapper from '../Modals/Register/Address/AddressWrapper';
import { userContext } from '../../context/user';
import NotificationsWrapper from '../NotificationsDropdown/NotificationsWrapper';
import { NotificationType } from '../../types';
import notificationService from '../../services/notificationService';

interface TopBarMenuProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function TopBarMenu(props: TopBarMenuProps) {

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isPDataModalVisible, setIsPDataModalVisible] = useState(false);
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
    const [notify, setNotify] = useState(false);
    const context = useContext(userContext);
    const notificacao1: NotificationType =     {
        "image": "https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v1760478459733722920/products/RSU001_3D.jpg",
        "name": "Rising Sun",
        "text": "Você venceu o leilão! Prossiga para o pagamento.",
        "notificationDateTime": "Sep 31, 2022 10:00:00",
        "idJogo": 1
      };
      const notificacao2: NotificationType = {
        "image": "https://www.mundogalapagos.com.br/ccstore/v1/images/?source=/file/v8328468370973062307/products/TWI001_3D.jpg",
        "name": "Rising Sun",
        "text": "Seu lance no leilão foi superado!",
        "notificationDateTime": "Dec 05, 2022 22:00:00",
        "idJogo": 1
      };

    const modalProps = {
        isLoginModalVisible: isLoginModalVisible,
        setIsLoginModalVisible: setIsLoginModalVisible,
        isRegisterModalVisible: isRegisterModalVisible,
        setIsRegisterModalVisible: setIsRegisterModalVisible,
        isPDataModalVisible: isPDataModalVisible,
        setIsPDataModalVisible: setIsPDataModalVisible,
        isAddressModalVisible: isAddressModalVisible,
        setIsAddressModalVisible: setIsAddressModalVisible,
        isPasswordModalVisible: isPasswordModalVisible,
        setIsPasswordModalVisible: setIsPasswordModalVisible
    }

    function handleNotifications(){
        notificationService.create(notificacao2).then(
            () => {
                setNotify(true)
            }
        )
    }

    function handleNotifications2(){
        notificationService.create(notificacao1).then(
            () => {
                setNotify(true)
            }
        )
    }

    const toggleLoginModal = () => {
        setIsLoginModalVisible(wasModalVisible => !wasModalVisible)
    }

    return (
        <nav className={styles.menu}>
            <IconContext.Provider
                value={{ size: '28' }}>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/'>
                    <MdHome />
                    <span>Home</span>
                </NavLink>
                {context.logado &&
                    <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='leilao/novo'>
                        <MdShoppingBasket />
                        <span>Vender</span>
                    </NavLink>
                }
                {context.logado &&
                    <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to={'meusLeiloes'}>
                        <RiAuctionFill onMouseEnter={handleNotifications} />
                        <span>Meus<br />Leilões</span>
                    </NavLink>
                }

                <SearchField search={props.search} setSearch={props.setSearch} />

                {context.logado &&
                    <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/favoritos'>
                        <MdFavorite onMouseEnter={handleNotifications2} />
                        <span>Favoritos</span>
                    </NavLink>
                }
                {context.logado &&
                    <div className={styles.menu__link} onClick={() => { setIsNotificationsVisible(true); setNotify(false) }}>
                        <MdNotifications />
                        <span>Notificações</span>
                        {notify && <BsDot size={60} className={styles.menu__link__dot} />}
                    </div>
                }
                <NotificationsWrapper isNotificationsVisible={isNotificationsVisible} onBackdropClick={() => setIsNotificationsVisible(false)} />
                {!context.logado &&
                    <div className={styles.menu__link} onClick={toggleLoginModal}>
                        <MdAccountCircle />
                        <span>Login</span>
                    </div>
                }
                {context.logado &&
                    <div className={styles.menu__link} onClick={() => setNotify(true)}>
                        <MdAccountCircle />
                        <span>{context.user.nome.substring(0, context.user.nome.indexOf(" "))}</span>
                    </div>
                }
            </IconContext.Provider>
            <LoginModalWrapper states={modalProps} />
            <ForgotPasswordWrapper states={modalProps} />
            {isRegisterModalVisible && <RegisterModalWrapper states={modalProps} />}
            {isPDataModalVisible && <PersonalDataWrapper states={modalProps} />}
            {isAddressModalVisible && <AddressWrapper states={modalProps} />}
        </nav>

    )
}