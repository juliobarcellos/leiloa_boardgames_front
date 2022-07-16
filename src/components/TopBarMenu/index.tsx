import styles from './TopBarMenu.module.scss';
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { MdHome, MdShoppingBasket, MdShoppingCart, MdFavorite, MdAccountCircle } from 'react-icons/md';
import SearchField from '../SearchField';

interface TopBarMenuProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function TopBarMenu(props: TopBarMenuProps) {
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
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} to='/cart'>
                    <MdShoppingCart />
                    Home
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} to='/favorites'>
                    <MdFavorite />
                    Favoritos
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.menu__linkAtivo}` : `${styles.menu__link}`} to='/home'>
                    <MdAccountCircle />
                    Login
                </NavLink>
            </IconContext.Provider>
            <SearchField search={props.search} setSearch={props.setSearch} />
        </nav>
    )
}