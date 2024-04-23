'use client'

import React from 'react';
import Case from '../components/Case';
import { Button } from '@/components/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
interface CaseType {
	id: number;
	name: string;
	image: string;
	items: {
		name: string;
		image: string;
		price: number;
	}[];
	price: number;
}

const Home: React.FC = () => {
	const [recommendedCases, setRecommendedCases] = useState<CaseType[]>([]);
    const [christmasCases, setChristmasCases] = useState<CaseType[]>([]);

	useEffect(() => {
		fetch('/api/case')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				const cases = data.cases;

				if (!Array.isArray(cases)) {
					throw new Error('Data is not iterable');
				}
				let casesArray = [...cases];
				if (cases.length > 0) {
					while (casesArray.length < 10) {
						casesArray = [...casesArray, ...cases];
					}
				}
				setRecommendedCases(casesArray.slice(0, 5));
				setChristmasCases(casesArray.slice(5, 10));
			})
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
	}, []);

	return (
	<>
		<div className='banner'>
			<div className='banner-content'>
				<Link href='/case/1'><Button variant={'poligon'}>Random Case</Button></Link>
				<Link href='/coinflip'><Button variant={'poligon'}>Coin Flip</Button></Link>
			</div>
		</div>

		<div className='container case-menus mx-auto h-full pt-12 flex flex-col items-center mw-90'>
			<Accordion className='accordion' type="multiple" defaultValue={['item-1', 'item-2']}>
				<AccordionItem value="item-1">
					<AccordionTrigger className='accordion-title'>Recommended cases</AccordionTrigger>
					<AccordionContent>
						<div className={"flex justify-around flex-wrap lg:flex-nowrap"}>
						{recommendedCases.length > 0 ? (recommendedCases.map((c, index) => (
							<Case key={index} caseName={c.name} items={c.items} image={c.image} price={c.price} id={c.id} />))
						) : 
							<>
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							</>
						}
						</div>  
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className='accordion-title'>Christmas cases</AccordionTrigger>
					<AccordionContent>
						<div className={"flex justify-around flex-wrap lg:flex-nowrap"}>
						{christmasCases.length > 0 ? 
							christmasCases.map((c, index) => <Case key={index} image={c.image} caseName={c.name} items={c.items} price={c.price} id={c.id} />) 
						: 
							<>
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							<Skeleton className="skeleton-image" />
							</>
						}
						</div> 
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>

	</>);
};

export default Home;
