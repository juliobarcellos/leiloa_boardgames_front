import styles from './Auctions.module.scss';
import AuctionCard from '../../components/AuctionCard';
import auctions from '../../data/auctions.json'
import { useEffect, useState } from 'react';
import { AuctionType } from '../../types';

interface AuctionsProps {
	search: string,
	category: number | null,
	orderOption: string
}

export default function Auctions(props: AuctionsProps) {
	const [list, setList] = useState<AuctionType[]>(auctions);
	const { search, category, orderOption } = props;

	function testSearch(title: string) {
		const regex = new RegExp(search, 'i');
		return regex.test(title);
	}

	function testCategory(tags: number[]) {
		if(category !== null) return tags.includes(category);
		return true;
	}

	function order(newList: AuctionType[]) {
		switch (orderOption) {
			case 'porcao':
				return ordenarPropriedadeCrescente(newList, 'name');
			case 'qtd_pessoas':
				return ordenarPropriedadeCrescente(newList, 'endDateTime');
			case 'preco':
				return ordenarPropriedadeCrescente(newList, 'price');
			default:
				return newList;
		}
	}

	function ordenarPropriedadeCrescente(
		list: AuctionType[],
		properties: 'name' | 'endDateTime' | 'price'
	) {
		return list.sort((a, b) => (a[properties] > b[properties] ? 1 : -1));
	}

	useEffect(() => {
		const newList = auctions.filter(auction => testSearch(auction.name) && testCategory(auction.tags));
		setList(order(newList));
	}, [search, category, orderOption]);

	return (
		<div className={styles.leiloes}>
			{list.map(auction => (
				<AuctionCard
					key={auction.id}
					id={auction.id!} //usar ! quando quiser ignorar a checagem de tipo do typescript
					imgSrc={auction.image}
					name={auction.name}
					price={auction.price}
					timeLeft={new Date(auction.endDateTime)}
				/>
			))}
		</div>
	)
}