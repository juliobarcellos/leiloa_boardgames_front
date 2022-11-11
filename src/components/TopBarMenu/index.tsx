import styles from './TopBarMenu.module.scss';
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { MdHome, MdShoppingBasket, MdFavorite, MdAccountCircle } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri'
import SearchField from '../SearchField';
import { useState } from 'react';
import LoginModalWrapper from '../Modals/Login/LoginModalWrapper';
import ForgotPasswordWrapper from '../Modals/ForgotPassword/ForgotPasswordWrapper';
import NotificationsDropdown from '../NotificationsDropdown';
import RegisterModalWrapper from '../Modals/Register/RegisterModalWrapper';
import PersonalDataWrapper from '../Modals/Register/PersonalData/PersonalDataWrapper';
import AddressWrapper from '../Modals/Register/Address/AddressWrapper';

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

    return (
        <nav className={styles.menu}>
            <IconContext.Provider
                value={{ size: '28' }}>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/'>
                    <MdHome />
                    <span>Home</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='leilao/novo'>
                    <MdShoppingBasket />
                    <span>Vender</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to={'meusLeiloes'}>
                    <RiAuctionFill />
                    <span>Meus<br />Leilões</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/favoritos'>
                    <MdFavorite />
                    <span>Favoritos</span>
                </NavLink>
                <div className={styles.menu__link} onClick={toggleLoginModal}>
                    <MdAccountCircle />
                    <span>Login</span>
                    <NotificationsDropdown isOpen={isNotificationsVisible} setIsOpen={setIsNotificationsVisible} />
                </div>
            </IconContext.Provider>
            <SearchField search={props.search} setSearch={props.setSearch} />
            <LoginModalWrapper states={modalProps} />
            <ForgotPasswordWrapper states={modalProps} />
            {isRegisterModalVisible && <RegisterModalWrapper states={modalProps} />}
            {isPDataModalVisible && <PersonalDataWrapper states={modalProps} />}
            {isAddressModalVisible && <AddressWrapper states={modalProps} />}
        </nav>

    )
}