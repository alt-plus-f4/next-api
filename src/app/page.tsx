import React from 'react';
import Case from '../components/Case';
import { Button } from '@/components/Button';
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion"
import Link from 'next/link';
interface CaseType {
	id: number;
	name: string;
	items: {
		name: string;
		image: string;
		price: number;
	}[];
	price: number;
}

const cases: CaseType[] = [
	{
		id: 1,
		name: 'One Case',
		items: [
			{ name: 'Item 1', image: '/onecase.webp', price: 1.00 },
			{ name: 'Item 2', image: '/onecase.webp', price: 5.00 },
		],
		price: 2.00
	},
	{
		id: 2,
		name: 'Two Case',
		items: [
			{ name: 'Item 1', image: '/item1.png' , price: 5.00 },
			{ name: 'Item 2', image: '/item2.png' , price: 10.00 },
		],
		price: 7.00
	},
	{
		id: 3,
		name: 'Three Case',
		items: [
			{ name: 'Item 1', image: '/item1.png' , price: 5.00 },
			{ name: 'Item 2', image: '/item2.png' , price: 10.00 },
		],
		price: 5.00
	},
	{
		id: 4,
		name: 'Four Case',
		items: [
			{ name: 'Item 1', image: '/item1.png' , price: 5.00 },
			{ name: 'Item 2', image: '/item2.png' , price: 10.00 },
		],
		price: 5.00
	},
	{
		id: 4,
		name: 'Four Case',
		items: [
			{ name: 'Item 1', image: '/item1.png' , price: 5.00 },
			{ name: 'Item 2', image: '/item2.png' , price: 10.00 },
		],
		price: 5.00
	},
	{
		id: 4,
		name: 'Four Case',
		items: [
			{ name: 'Item 1', image: '/item1.png' , price: 5.00 },
			{ name: 'Item 2', image: '/item2.png' , price: 10.00 },
		],
		price: 5.00
	},
];

const Home: React.FC = () => {
	return (
	<>
		<div className='banner'>
			<div className='banner-content'>
				<Link href='/roulette'><Button variant={'poligon'}>Go to roulette</Button></Link>
				<Link href='/event'><Button variant={'poligon'}>Check Out</Button></Link>
				<Link href='/coinflip'><Button variant={'poligon'}>Coin Flip</Button></Link>
			</div>
		</div>

		<div className='container mx-auto h-full pt-12 flex flex-col items-center mw-90'>
			<Accordion className='accordion' type="multiple" defaultValue={['item-1', 'item-2']}>
				<AccordionItem value="item-1">
					<AccordionTrigger className='accordion-title'>Recommended cases</AccordionTrigger>
					<AccordionContent>
						<div className={"flex justify-around flex-wrap lg:flex-nowrap"}>
							{cases.map((c, index) => (
								<Case key={index} caseName={c.name} items={c.items} price={c.price} id={c.id} />
							))}
						</div>  
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className='accordion-title'>Christmas cases</AccordionTrigger>
					<AccordionContent>
						<div className={"flex justify-around flex-wrap lg:flex-nowrap"}>
								{cases.map((c, index) => (
									<Case key={index} caseName={c.name} items={c.items} price={c.price} id={c.id} />
								))}
						</div> 
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>

	</>);
};

export default Home;
