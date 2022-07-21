import AuctionCarousel from '../../components/AuctionCarousel';
import CategoriesBar from '../../components/CategoriesBar';
import TopBarMenu from '../../components/TopBarMenu';
import styles from './Home.module.scss';
import Auctions from '../../components/Auctions';
import { useState } from 'react';
import LoginModal from '../../components/Modals/LoginModal';

export default function Home() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<number | null>(null);
    const [orderOption, setOrderOption] = useState<string>('');
    const [isModalOpen, setModalState] = useState(false);

    const toggleModal = () => setModalState(!isModalOpen);

    return (
        <div className={styles.home}>
            <TopBarMenu search={search} setSearch={setSearch} />
            <AuctionCarousel />
            <CategoriesBar category={category} setCategory={setCategory} />
            <Auctions search={search} category={category} orderOption={orderOption} />
            <button onClick={toggleModal}>abre Modal</button>
            <LoginModal
                isOpen={isModalOpen}
                onClose={toggleModal}
            />
        </div>
    )
}