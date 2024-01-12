'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import Image from 'next/image';

function CreateCase() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [allItems, setAllItems] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    const fetchItems = () => {
        fetch('/api/item')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data.items)) {
                    setAllItems((prevItems) => [...prevItems, ...data.items]);
                } else {
                    console.error('Data.items is not an array:', data.items);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(fetchItems, []);

    const handleItemClick = (item: any) => {
        console.log(item);
        console.log(item.id);
        if (selectedItems.includes(item.id)) 
            setSelectedItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item.id));
        else setSelectedItems((prevItems) => [...prevItems, item.id]);
        
        console.log(selectedItems);
    };
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        let price = 0;
        selectedItems.forEach(itemId => {
            const item = allItems.find(item => item.id === itemId);
            if (item) {
                const odds = item.rarity === 1 ? 0.65 : item.rarity === 2 ? 0.30 : 0.05;
                price += item.price / odds;
            }
        });
    
        const caseData = {
            name,
            image,
            price,
            itemIds: selectedItems,
        };

        try {
            const response = await fetch('/api/case', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(caseData),
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
        <>
            <div className='case-create overflow-y-auto justify-between'>
                <div className='width-60'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name
                        </label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label>
                            Image
                        </label>
                        <div className='flex flex-row case-create-items-images mb-7'>
                            <button type="button" className={`item-create-image ${selectedImage === '/jjk.webp' ? 'selected' : ''}`} onClick={() => {setImage('/jjk.webp'); setSelectedImage('/jjk.webp');}}>
                                <Image src={'/jjk.webp'} alt='JJK image' width={image === '/jjk.webp' ? 400 : 300} height={300}/>
                            </button>
                            <button type="button" className={`item-create-image ${selectedImage === '/frost.webp' ? 'selected' : ''}`} onClick={() => {setImage('/frost.webp'); setSelectedImage('/frost.webp');}}>
                                <Image src={'/frost.webp'} alt="Frost Case Image" width={image === '/frost.webp' ? 400 : 300} height={300}/>
                            </button>
                            <button type="button" className={`item-create-image ${selectedImage === '/onecase.webp' ? 'selected' : ''}`} onClick={() => {setImage('/onecase.webp'); setSelectedImage('/onecase.webp');}}>
                                <Image src={'/onecase.webp'} alt="Onecase image" width={image === '/onecase.webp' ? 400 : 300} height={300}/>
                            </button>
                        </div>
                        <Button variant={'default'} type="submit">Create Case</Button>
                    </form>
                </div>

                <div className='overflow-y-auto flex flex-wrap w-4/12 mx-8'>
                {allItems.map((item, index) => (
                    <div
                        key={index}
                        className={`item flex flex-col items-center case ${item.rarity === 1 ? 'blue' : item.rarity === 2 ? 'red' : 'gold'}-rarity case-create-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                        onClick={() => handleItemClick(item)}
                    >
                        <Image alt={item.name} src={item.imageURL} width={300} height={200} />
                        <h2>{item.name}</h2>
                        <p>${item.price.toFixed(2)}</p>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
}

export default CreateCase;