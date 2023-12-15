import React from 'react';
import Case from '../components/Case';

interface CaseType {
  name: string;
  items: {
    name: string;
    image: string;
  }[];
}

const cases: CaseType[] = [
  {
    name: 'Basic Case',
    items: [
      { name: 'Item 1', image: '/item1.png' },
      { name: 'Item 2', image: '/item2.png' },
      // Add more items as needed
    ],
  },
  // Add more cases as needed
];

const Home: React.FC = () => {
  return (
    <div>
      <nav className={"navbar"}>
        <h1>CS:GO Case Opening Simulator</h1>
      </nav>
      <div className={"container"}>
        {cases.map((c, index) => (
          <Case key={index} caseName={c.name} items={c.items} />
        ))}
      </div>
    </div>
  );
};

export default Home;
