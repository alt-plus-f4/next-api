"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface Item {
  name: string;
  image: string;
}

interface CaseProps {
  caseName: string;
  items: Item[];
}

const Case: React.FC<CaseProps> = ({ caseName, items }) => {
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
    <div className={"case"}>
      <h2>{caseName}</h2>
      {openedItems.length > 0 ? (
        <div>
          <p>Congratulations! You got:</p>
          {openedItems.map((item, index) => (
            <div key={index}>
              <Image src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <button className={"openButton"} onClick={openCase}>
          Open Case
        </button>
      )}
    </div>
  );
};

export default Case;
