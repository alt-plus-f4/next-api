'use client'

import { useEffect, useState } from 'react'; 
import { fetchCase } from '@/lib/fetch-case';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"
import useStore from '@/lib/global-store';

interface PageProps {
	params: {
	  slug: string
	}
}

interface Case {
	id: number;
	name: string;
	image: string;
	items: any[];
	history: any[];
	price: number;
	odds: Odds[];
}

interface Odds {
	id: number;
	caseId: number;
	itemId: number;
	Odds: number;
}

const CaseOpener = ({ params }: PageProps) => {
	const { slug } = params;

	const [caseData, setCaseData] = useState<Case[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isButtonClicked, setIsButtonClicked] = useState(false);
	const [itemsWithOdds, setItemsWithOdds] = useState<any[]>([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [animationStarted, setAnimationStarted] = useState(false);
	const balance = useStore((state: { balance: number } | unknown) => (state as { balance: number }).balance);
	const updateBalance = useStore((state: unknown) => (state as { updateBalance: (amount: number) => Promise<void> }).updateBalance);

	useEffect(() => {
		fetchCase(slug).then(caseData => {
			if ('error' in caseData) {
				setError(caseData.error);
			} else {
				setCaseData(caseData);
				if (caseData && caseData.length > 0) {
					const items = caseData[0].items;
					const odds = caseData[0].odds;
					const itemsWithOdds = items && odds ? items.map((item: { id: any; }) => {
						const oddsItem = odds?.find((odds: { itemId: any; }) => odds.itemId === item.id);
						return { ...item, odds: oddsItem ? oddsItem.Odds : null };
					}) : [];
					setItemsWithOdds(itemsWithOdds);
				}
			}
		});
	}, [slug]);

	let name: string | undefined, price: number | undefined, image: string | undefined;

	if (caseData && caseData.length > 0) {
		name = caseData[0].name;
		price = caseData[0].price;
		image = caseData[0].image;
	}

	if (error) {
		window.location.href = '/404';
	}

	const openCase = async () => {
		if(!price) return;
		if (balance < price) {
			alert('Not enough balance');
			return;
		}

		const response = await fetch('/api/open', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ caseId: Number(slug) }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error:', errorData.error);
			return;
		}

		const data = await response.json();
		const updatedBalance = data.leftBalance;
		const receivedItem = data.item;

		await updateBalance(updatedBalance);

		console.log(`You received: ${receivedItem.id}`);

		setSelectedItem(receivedItem);
	};

	const generateAnimationItems = () => {
		if (!itemsWithOdds) return <></>;
		return Array(30).fill(null).map((_, index) => {
			const item = itemsWithOdds[Math.floor(Math.random() * itemsWithOdds.length)];
			return (
				<div key={index} data-id={item.id} className={`case-item-opening ${item.rarity === 1 ? 'blue' : item.rarity === 2 ? 'red' : 'gold'}-rarity-box-shadow`}>
					<Image alt="ItemPic" src={item.imageURL} width={180} height={150} />
				</div>
			);
		});
	};

	return (
		<>
			<div className='case-page-container'>
				{name ? <h1>{name}</h1> : <Skeleton className="w-[150px] h-[35px] my-3 skeleton-color" />}
				<div className={`case-page-items ${isButtonClicked ? 'rotating' : ''}`}>
					{image ?
						<Image alt="CasePic" src={image} className={`image-transition ${isButtonClicked ? 'hide' : ''}`} width={250} height={150} />
						: <Skeleton className="skeleton-case-image" />}

					{isButtonClicked ?
						<div className={`case-page-items-animation ${animationStarted ? 'spin-case' : ''}`}>
							{generateAnimationItems()}
						</div> : <></>}

				</div>
				<Button disabled={balance < (price ?? 0) || isButtonClicked} isLoading={isButtonClicked} onClick={() => {
					setIsButtonClicked(true);
					openCase();
					setTimeout(() => {
						setAnimationStarted(true);
					}, 500);
					setTimeout(() => {
						setIsButtonClicked(false);
						setAnimationStarted(false);
					}, 6000);
				}} className='case-open-button' variant={'poligon'}>Open ${price?.toFixed(2)}</Button>
				<h1 className='items-heading'>Items in case:</h1>
			</div>
			<div className='items-in-case flex-wrap'>
				{itemsWithOdds.length > 0 ? itemsWithOdds.map((item, index) => (
					<div key={index} className={`item flex flex-col items-center case ${item.rarity === 1 ? 'blue' : item.rarity === 2 ? 'red' : 'gold'}-rarity`}>
						{item.odds && <h1 className='percentage'>{item.odds.toFixed(2)}%</h1>}
						<Image alt="ItemPic" src={item.imageURL} width={120} height={170} />
						<a>{item.name}</a>
						<p>${item.price.toFixed(2)}</p>
					</div>
				)) :
					<>
						<Skeleton className="skeleton-image" />
						<Skeleton className="skeleton-image" />
						<Skeleton className="skeleton-image" />
						<Skeleton className="skeleton-image" />
						<Skeleton className="skeleton-image" />

					</>}
			</div>
		</>
	);
};

export default CaseOpener;
