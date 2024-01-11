'use client'

import { Button } from '@/components/Button';
import React, { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';

function CreateItem() {
	const [name, setName] = useState('');
	const [rarity, setRarity] = useState(1);
	const [price, setPrice] = useState('');
	const [imageURL, setImageURL] = useState('');
	const { toast } = useToast();

	const handleRarityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRarity(Number(event.target.value));
	};

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		const itemData = {
			name,
			rarity,
			price: parseFloat(price),
			imageURL,
		};

		try {
			const response = await fetch('/api/item', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(itemData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			toast({
				variant: 'success',
				title: "Successfull Item Creation",
				description: "You have successfully created " + name + " with rarity " + rarity + " that costs " + price + "!",
			}) 

			setName('');
			setRarity(Number(1));
			setPrice('');
			setImageURL('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='case-create'>
			<form onSubmit={handleSubmit}>
				<label>
					Name
				</label>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
				<label>
					Rarity
				</label>
				<div className='flex flex-row'>
					<input type="radio" name="rarity" value="1" checked={rarity === 1} onChange={handleRarityChange} /> Blue
					<input type="radio" name="rarity" value="2" checked={rarity === 2} onChange={handleRarityChange} /> Red
					<input type="radio" name="rarity" value="3" checked={rarity === 3} onChange={handleRarityChange} /> Gold
				</div>
				<label>
					Price
				</label>
					<input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
				<label>
					Image
				</label> 
				<div className='flex flex-row case-create-items-images'>
				{rarity === 1 && (
					<>
							<button className='item-create-image' onClick={() => setImageURL('/blue-item.webp')}>
							<Image src={'/blue-item.webp'} alt='Blue Item 1' width={imageURL === '/blue-item.webp' ? 500 : 300} height={300}/>
							</button>
							<button className='item-create-image' onClick={() => setImageURL('/blue-item-2.webp')}>
							<Image src={'/blue-item-2.webp'} alt="Blue Item 2" width={imageURL === '/blue-item-2.webp' ? 500 : 300} height={300}/>
							</button>
						</>
						)}
						{rarity === 2 && (
						<>
							<button className='item-create-image' onClick={() => setImageURL('/dlore.webp')}>
							<Image src={'/dlore.webp'} alt="Image 3" width={imageURL === '/dlore.webp' ? 500 : 300} height={300}/>
							</button>
							<button className='item-create-image' onClick={() => setImageURL('/wildlotus.webp')}>
							<Image src={'/wildlotus.webp'} alt="Image 4" width={imageURL === '/wildlotus.webp' ? 500 : 300} height={300}/>
							</button>
						</>
						)}
						{rarity === 3 && (
						<>
							<button className='item-create-image' onClick={() => setImageURL('/bfklore.webp')}>
							<Image src={'/bfklore.webp'} alt="BFK lore" width={imageURL === '/bfklore.webp' ? 500 : 300} height={300} />
							</button>
							<button className='item-create-image' onClick={() => setImageURL('/karalore.webp')}>
							<Image src={'/karalore.webp'} alt="KARA lore" width={imageURL === '/karalore.webp' ? 500 : 300} height={300} />
							</button>
						</>
						)}
				</div>
				<Button variant={'default'} type="submit">Create Item</Button>
			</form>
		</div>
	);
}

export default CreateItem;