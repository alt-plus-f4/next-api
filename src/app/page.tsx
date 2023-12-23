import React from 'react';
import Case from '../components/Case';
import { Button } from '@/components/Button';

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
];

const Home: React.FC = () => {
  return (
  <>
    <h1>Open CS cases</h1>
    <div className={"container flex justify-around"}>
      {cases.map((c, index) => (
        <Case key={index} caseName={c.name} items={c.items} price={c.price} id={c.id} />
      ))}
    </div>
  </>);
};

export default Home;
