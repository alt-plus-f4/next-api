'use client'

import { useEffect, useState } from 'react'; 
import { fetchCase } from '@/lib/fetch-case';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"

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
}

const CaseOpener = ({params} : PageProps) => {
	const { slug } = params;

	const [caseData, setCaseData] = useState<Case[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isButtonClicked, setIsButtonClicked] = useState(false);

	useEffect(() => {
		if (slug && (isNaN(Number(slug)) || slug === "open")) {
			window.location.href = '/404';
		} else {
			fetchCase(slug).then(caseData => {
				if ('error' in caseData) {
					setError(caseData.error);
				} else {
					setCaseData(caseData);
				}
			});
		}
	}, [slug]);

	let name, items, price, image, history = [];

	if(caseData && caseData.length > 0){
		name = caseData[0].name;
		items = caseData[0].items;
		price = caseData[0].price;
		image = caseData[0].image;
		history = caseData[0].history;
	}

	if (error) {
		window.location.href = '/404';
	}

	return (
		<>
		<div className='case-page-container'>
			{name ? <h1>{name}</h1> : <Skeleton className="w-[150px] h-[35px] bg-zinc-50 my-3" />}
			<div className='case-page-items'>
				<Image alt="CasePic" src={image || '/onecase.webp'} className={`image-transition ${isButtonClicked ? 'hide' : ''}`} width={250} height={150} />	
				{/* {isButtonClicked ? 
				<div className='case-page-items-animation'>
					{items ? items.map((item, index) => (
						<div key={index} className='flex flex-col items-center case'>
							<Image alt="ItemPic" src={item.image} width={300} height={200} />
							<h2>{item.name}</h2>
							<p>${item.price.toFixed(2)}</p>
						</div>
					)) : <></>}
				</div> : <></>} */}
			</div>
			<Button isLoading={isButtonClicked} onClick={() => {
				setIsButtonClicked(true);
				setTimeout(() => {
					setIsButtonClicked(false);
				}, 2000);
			}} className='case-open-button' variant={'poligon'}>Open ${price?.toFixed(2)}</Button>
			<h1 className='items-heading'>Items in case:</h1>
		</div>
		<div className='items-in-case'>
			{/* TEST ITEM */}
			<div className='item flex flex-col items-center case red-rarity'>
				<Image alt="ItemPic" src='/onecase.webp' width={300} height={200} />
				<h2>RED ITEM</h2>
				<p>$50.00</p>
			</div>
			<div className='item flex flex-col items-center case blue-rarity'>
				<Image alt="ItemPic" src='/onecase.webp' width={300} height={200} />
				<h2>BLUE ITEM</h2>
				<p>$5.00</p>
			</div>

			{items ? items.map((item, index) => (
				<div key={index} className='flex flex-col items-center case'>
					<Image alt="ItemPic" src={item.image} width={300} height={200} />
					<h2>{item.name}</h2>
					<p>${item.price.toFixed(2)}</p>
				</div>
			)) : <></>}
		</div>
		</>
	);
};

export default CaseOpener;
