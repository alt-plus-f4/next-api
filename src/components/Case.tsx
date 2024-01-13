"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface Item {
  name: string;
  image: string;
  price: number;
}

interface CaseProps {
  id: number;
  caseName: string;
  items: Item[];
  price: number;
  image: string;
}

const Case: React.FC<CaseProps> = ({ id, caseName, items, price, image }) => {
  const [openedItems, setOpenedItems] = useState<Item[]>([]);

  const openCase = async () => {
    try {
      const response = await fetch('/api/open', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send API request');
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const newItem = items[randomIndex];
        setOpenedItems((prevItems) => [...prevItems, newItem]);
      } else {
        console.error('Failed to open case:', data.error);
      }
    } catch (error) {
      console.error('Error sending API request', (error as Error).message);
    }
  };

  return (
    <Link href={`/case/${id}`} className='m-15 flex-basis-25'>
      <div className={"flex flex-col items-center case"}>
        <Image alt="CasePic" src={image} width={300} height={200} />
        <h2>{caseName}</h2>
        <p>${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default Case;
