import styles from './TopBarMenu.module.scss';
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { MdHome, MdShoppingBasket, MdFavorite, MdAccountCircle, MdNotifications } from 'react-icons/md';
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
    const context = useContext(userContext);

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

    const toggleLoginModal = () => {
        setIsLoginModalVisible(wasModalVisible => !wasModalVisible)
    }

    const toggleNotifications = () => {
        setIsNotificationsVisible(false);
        context.setIsNotificationsVisible(false);
        console.log(context.isNotificationsVisible)
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
                        <RiAuctionFill />
                        <span>Meus<br />Leilões</span>
                    </NavLink>
                }




                <SearchField search={props.search} setSearch={props.setSearch} />

                {context.logado &&
                    <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/favoritos'>
                        <MdFavorite />
                        <span>Favoritos</span>
                    </NavLink>
                }
                {context.logado &&
                    <div className={styles.menu__link} onClick={() => { setIsNotificationsVisible(true); console.log(`aberto ${isNotificationsVisible}`) }}>
                        <MdNotifications />
                        <span>Notificações</span>

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
                    <div className={styles.menu__link}>
                        <MdAccountCircle />
                        <span>Perfil</span>
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