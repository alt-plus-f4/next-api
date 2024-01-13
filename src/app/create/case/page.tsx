'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import Image from 'next/image';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from '@/components/ui/use-toast';
  
function CreateCase() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [allItems, setAllItems] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [odds, setOdds] = useState<{ [key: string]: number }>({});
    const [price, setPrice] = useState(0);

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    const currentItems = allItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const { toast } = useToast();

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
                    setAllItems(data.items);
                } else {
                    console.error('Data.items is not an array:', data.items);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(fetchItems, []);
    useEffect(() => {
        let newPrice = 0;
        selectedItems.forEach(itemId => {
            const item = allItems.find(item => item.id === itemId);
            if (item) {
                const itemOdds = odds[itemId] || 0;
                newPrice += item.price * (itemOdds / 100);
            }
        });
        setPrice(newPrice);
    }, [selectedItems, odds, allItems]);

    const handleItemClick = (item: any) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item.id));
            setOdds((prevOdds) => {
                const newOdds = { ...prevOdds };
                delete newOdds[item.id];
                return newOdds;
            });
        } else {
            setSelectedItems((prevItems) => [...prevItems, item.id]);
            setOdds((prevOdds) => ({ ...prevOdds, [item.id]: 0 }));
        }
    };
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        if (selectedItems.length < 2) {
            toast({
                variant: 'destructive',
                title: "Invalid selection",
                description: "You must select at least two items.",
            });
            return;
        }
    
        if (!image) {
            toast({
                variant: 'destructive',
                title: "Invalid image",
                description: "You must select an image for the case.",
            });
            return;
        }
    
        const totalOdds = Object.values(odds).reduce((total, odds) => total + odds, 0);
        if (totalOdds !== 100) {
            toast({
                variant: 'destructive',
                title: "Invalid odds",
                description: "The odds must add up to 100%.",
            });
            return;
        }
    
        const caseData = {
            name,
            image,
            price,
            itemIds: selectedItems,
            odds: Object.values(odds),
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

            toast ({
                variant: 'success',
                title: "Case " + name + " created",
                description: "Case with price " + price + " has been created.",
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='case-create overflow-hidden justify-between'>
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
                <div className='flex flex-col width-35 justify-between overflow-hidden h-full'>
                    <div className='flex flex-wrap justify-center'>
                    {currentItems.map((item, index) => (
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
                    <Pagination style={{ listStyleType: 'none' } } className='cursor-pointer'>
                        <PaginationPrevious  onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))} />
                        {Array.from({length: totalPages}, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>{i + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationNext onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))} />
                    </Pagination>
                </div>
            </div>
            <div className='flex flex-col flex-wrap justify-center items-center my-7'>
                <h1 className='total-price'>Total Price: ${price.toFixed(2)}</h1>
                <h1 className='text-lg'>Input the odds</h1>
                <p className='text-sm'>The odds must add up to 100%.</p>
            </div>
            <div className='flex flex-row flex-wrap justify-center'>
                {selectedItems.map(itemId => {
                    const item = allItems.find(item => item.id === itemId);
                    if (item) {
                        const itemOdds = odds[itemId] || 0;
                        const cost = item.price * itemOdds / 100;
                        return (
                            <div className='flex flex-col flex-wrap justify-center case-odds' key={itemId}>
                                <p>{`${item.name}`}</p>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={itemOdds}
                                    onChange={(e) => setOdds((prevOdds) => ({ ...prevOdds, [itemId]: parseFloat(e.target.value)}))}
                                />
                                <p className='price'>${cost.toFixed(2)}</p>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </>
    );
}

export default CreateCase;