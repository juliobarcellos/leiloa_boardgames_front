import styles from './TopBarMenu.module.scss';
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { MdHome, MdShoppingBasket, MdShoppingCart, MdFavorite, MdAccountCircle } from 'react-icons/md';
import SearchField from '../SearchField';
import { useState } from 'react';
import LoginModalWrapper from '../Modals/Login/LoginModalWrapper';
import PersonalDataWrapper from '../Modals/Register/PersonalData/PersonalDataWrapper';
import AddressWrapper from '../Modals/Register/Address/AddressWrapper';
import NotificationsDropdown from '../NotificationsDropdown';

interface TopBarMenuProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function TopBarMenu(props: TopBarMenuProps) {

    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    return (
        <nav className={styles.menu}>
            <IconContext.Provider
                value={{ size: '28' }}>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/'>
                    <MdHome />
                    Home
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='leilao/novo'>
                    <MdShoppingBasket />
                    Vender
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to={'_blank'}>
                    <MdShoppingCart onClick={toggleModal} />
                    Carrinho
                    <NotificationsDropdown isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} to='/register'>
                    <MdFavorite />
                    Favoritos
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles['menu__link--Ativo']}` : `${styles.menu__link}`} onClick={toggleModal} to='/login'>
                    <MdAccountCircle />
                    Login
                </NavLink>
            </IconContext.Provider>
            <SearchField search={props.search} setSearch={props.setSearch} />

        </nav>
    )
}