import React from 'react';
import Case from '../components/Case';

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
  </>);
};

export default Home;
