import AuctionCarousel from '../../components/AuctionCarousel';
import CategoriesBar from '../../components/CategoriesBar';
import styles from './Home.module.scss';
import Auctions from '../../components/Auctions';
import { useRef, useState } from 'react';

interface HomeProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function Home({ search, setSearch }: HomeProps) {
    const [category, setCategory] = useState<number | null>(null);
    const [orderOption, setOrderOption] = useState<string>('');
    const myRef = useRef<null | HTMLDivElement>(null);
    const executeScroll = () => {
        if (!search) {
            myRef.current && myRef.current.scrollIntoView();
        }
    };

    return (
        <div className={styles.home}>
            {!search && <AuctionCarousel />}
            <div ref={myRef} onClick={executeScroll}>
                <CategoriesBar category={category} setCategory={setCategory} />
            </div>
            <Auctions search={search} category={category} orderOption={orderOption} />
        </div>
    )
}