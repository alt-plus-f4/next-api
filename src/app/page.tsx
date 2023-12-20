import React from 'react';
import Case from '../components/Case';
import { Button } from '@/components/Button';
import ToastComponent from '@/components/Toast';

interface CaseType {
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
    name: 'Case 1',
    items: [
      { name: 'Item 1', image: '/item1.png', price: 1 },
      { name: 'Item 2', image: '/item2.png', price: 5 },
    ],
    price: 2
  },
  {
    name: 'Case 2',
    items: [
      { name: 'Item 1', image: '/item1.png' , price: 5 },
      { name: 'Item 2', image: '/item2.png' , price: 10 },
    ],
    price: 7 
  },
  {
    name: 'Case 2',
    items: [
      { name: 'Item 1', image: '/item1.png' , price: 5 },
      { name: 'Item 2', image: '/item2.png' , price: 10 },
    ],
    price: 5 
  },
];

const Home: React.FC = () => {
  return (
  <>
    <h1>Open CS cases</h1>
    <div className={"container flex justify-around"}>
      {cases.map((c, index) => (
        <Case key={index} caseName={c.name} items={c.items} price={c.price} />
      ))}
    </div>

    {/* <div>
      <ToastComponent type="success" title="Success" content="This is a successful message." />
    </div> */}
  </>);
};

export default Home;
