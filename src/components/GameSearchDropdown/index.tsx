import styles from './GameSearchDropdown.module.scss';
import { MdSearch } from 'react-icons/md';
import games from '../../data/auctions.json';
import { MouseEventHandler, useEffect, useState } from 'react';

interface GameSearchDropdownProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function GameSearchDropdown({ search, setSearch }: GameSearchDropdownProps) {
    const [list, setList] = useState(games);
    const [isOpen, setIsOpen] = useState(false);

    function testSearch(title: string) {
        const regex = new RegExp(search, 'i');
        return regex.test(title);
    }

    function selectGame(game: string) {
        setIsOpen(false);
        setSearch(game);
    }

    function onSearchClick(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.FocusEvent<HTMLDivElement, Element>) {
        setIsOpen(true);
        e.stopPropagation();
    }

    function onBackdropClick() {
        setIsOpen(false)
    }

    const stopPropagation: MouseEventHandler<HTMLUListElement | HTMLDivElement> = e => {
        e.persist();
        e.stopPropagation();
    };

    useEffect(() => {
        const newList = games.filter(game => testSearch(game.name));
        setList(newList);

    }, [search]);

    return (
        <section className={styles.Dropdown} onClick={stopPropagation}>
            <div className={styles.Dropdown__input} onFocus={e => onSearchClick(e)} onClick={e => onSearchClick(e)} >
                <input
                    value={search}
                    onChange={evento => setSearch(evento.target.value)}
                    placeholder="Buscar Jogo"
                />
                <MdSearch size={20} />
            </div>
            {isOpen && (
                <>
                    <div className={styles.Dropdown__overlay} onClick={onBackdropClick}></div>
                    <ul className={styles.Dropdown__list} onClick={stopPropagation}>
                        {list.map(game => (
                            <li key={game.id} className={styles['Dropdown__list--game']} onClick={e => selectGame(game.name)}>
                                <img src={game.image} />
                                <span>{game.name}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    )
}