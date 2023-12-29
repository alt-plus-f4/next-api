'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PrismaClient, Case as CaseType } from '@prisma/client';

const prisma = new PrismaClient();

interface SkinType {
  id: number;
  name: string;
  rarity: string;
  imageURL: string;
}

interface CaseOpenerProps {
  cases: {
    id: number;
    name: string;
    image: string;
    skins: SkinType[];
  }[];
}

const CaseOpener: React.FC<CaseOpenerProps> = ({ cases }) => {
  const [openedCase, setOpenedCase] = useState<{
    name: string;
    image: string;
    skins: SkinType[];
  } | null>(null);

  const openCase = () => {
    // Ensure there are cases to open
    if (cases.length === 0) {
      console.error('No cases available.');
      return;
    }

    // Choose a random case
    const randomCase = cases[Math.floor(Math.random() * cases.length)];

    // Ensure the case has skins
    if (!randomCase.skins || randomCase.skins.length === 0) {
      console.error('The selected case has no skins.');
      return;
    }

    // Choose a random skin from the selected case
    const randomSkin = randomCase.skins[Math.floor(Math.random() * randomCase.skins.length)];

    setOpenedCase({
      name: randomSkin.name,
      image: randomCase.image,
      skins: randomCase.skins,
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const casesData = await prisma.case.findMany({
          include: {
            skins: true,
          },
        });

        // Set the cases state
        // (This assumes you have a way to get initial data into the component)
        // You might want to handle loading states, errors, etc.
        // based on your application needs.
        // Example:
        setOpenedCase({
          name: casesData[0].name,
          image: casesData[0].image,
          skins: casesData[0].skins,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>CS:GO Case Opener</h1>
      <button onClick={openCase}>Open Case</button>

      {openedCase && (
        <div>
          <h2>You received:</h2>
          {/* Use <Image /> component for optimized images */}
          <Image src={openedCase.image} alt={openedCase.name} width={300} height={200} />
          <p>{openedCase.name}</p>
          <p>Skin Name: {openedCase.skins[0].name}</p>
          <p>Skin Rarity: {openedCase.skins[0].rarity}</p>
        </div>
      )}
    </div>
  );
};

export default CaseOpener;
