import AuctionCarousel from '../../components/AuctionCarousel';
import CategoriesBar from '../../components/CategoriesBar';
import styles from './Home.module.scss';
import Auctions from '../../components/Auctions';
import { useState } from 'react';

export default function Home() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<number | null>(null);
    const [orderOption, setOrderOption] = useState<string>('');

    return (
        <div className={styles.home}>
            <AuctionCarousel />
            <CategoriesBar category={category} setCategory={setCategory} />
            <Auctions search={search} category={category} orderOption={orderOption} />
        </div>
    )
}