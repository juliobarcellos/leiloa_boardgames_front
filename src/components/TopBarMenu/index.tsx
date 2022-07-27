import styles from './TopBarMenu.module.scss';
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { MdHome, MdShoppingBasket, MdShoppingCart, MdFavorite, MdAccountCircle } from 'react-icons/md';
import SearchField from '../SearchField';
import { useState } from 'react';
import BaseModalWrapper from '../Modals/BaseModalWrapper';

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
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} to='/sell'>
                    <MdShoppingBasket />
                    Vender
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} to='/forgot_password'>
                    <MdShoppingCart />
                    Home
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} to='/register'>
                    <MdFavorite />
                    Favoritos
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} onClick={toggleModal} to='/login'>
                    <MdAccountCircle />
                    Login
                </NavLink>
            </IconContext.Provider>
            <SearchField search={props.search} setSearch={props.setSearch} />
            <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} header="Login" message='Modal de Login' children={<MdAccountCircle />} />
        </nav>
    )
}