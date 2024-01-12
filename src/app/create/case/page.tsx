'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';

function CreateCase() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [allItems, setAllItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

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
                    if (data.items.length === 0) {
                        setHasMore(false);
                    } else {
                        setAllItems((prevItems) => [...prevItems, ...data.items]);
                    }
                } else {
                    console.error('Data.items is not an array:', data.items);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(fetchItems, []);

    const handleItemClick = (item: any) => {
        setItems((prevItems) => [...prevItems, item.id]);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const caseData = {
            name,
            image,
            price: parseFloat(price),
            items,
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
            <div className='case-create'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                    </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label>
                        Image
                    </label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                    <label>
                        Price
                    </label>
                        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <label>
                        Items
                    </label>
                    <InfiniteScroll
                        dataLength={allItems.length}
                        next={fetchItems}
                        hasMore={hasMore}
                        loader={<Skeleton count={3} />}
                    >
                        {allItems.map((item) => (
                            <div key={item.id} className={`item flex flex-col items-center case ${item.rarity === 1 ? 'blue' : item.rarity === 2 ? 'red' : 'gold'}-rarity`} onClick={() => handleItemClick(item)}>
                                <Image alt={item.name} src={item.imageURL} width={300} height={200} />
                                <h2>{item.name}</h2>
                                <p>${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </InfiniteScroll>
                    <Button variant={'default'} type="submit">Create Case</Button>
                </form>
            </div>
        </>
    );
}

export default CreateCase;