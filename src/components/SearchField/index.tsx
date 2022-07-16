import styles from './SearchField.module.scss';
import { MdSearch } from 'react-icons/md'

interface SearchFieldProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchField({ search, setSearch }: SearchFieldProps) {
    return(
        <div className={styles.campoBusca}>
            <MdSearch size={30} color='#EF3651'/>
            <input 
                value={search} 
                onChange={evento => setSearch(evento.target.value)} 
                placeholder="Procurar Leilões" 
            />
        </div>
    )
}