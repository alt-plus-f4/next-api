'use client'

import { Button } from '@/components/Button';
import React, { useState } from 'react';
import Image from 'next/image';

function CreateItem() {
	const [name, setName] = useState('');
	const [rarity, setRarity] = useState(1);
	const [price, setPrice] = useState('');
	const [imageURL, setImageURL] = useState('');

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

			const data = await response.json();
			console.log(data);
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
							<div className='item-create-image'>
								<Image src={'/blue-item.webp'} alt='Blue Item 1' width={300} height={300}/>
							</div>
							<div className='item-create-image'>
								<Image src={'/blue-item-2.webp'} alt="Blue Item 2" width={300} height={300}/>
							</div>
						</>
					)}
					{rarity === 2 && (
						<>
							<Image src={'/dlore.webp'} alt="Image 3" width={300} height={300}/>
							<Image src={'/wildlotus.webp'} alt="Image 4" width={300} height={300}/>
						</>
					)}
					{rarity === 3 && (
						<>
							<Image src={'/bfklore.webp'} alt="BFK lore" width={300} height={300} />
							<Image src={'/karalore.webp'} alt="KARA lore" width={300} height={300} />
						</>
					)}
				</div>
				<Button variant={'default'} type="submit">Create Item</Button>
			</form>
		</div>
	);
}

export default CreateItem;