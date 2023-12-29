'use client'
import { useState, useEffect } from 'react';

const BalancePage = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/balance', {
        method: 'GET',
      });
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleAddFunds = async () => {
    try {
      const amount = prompt('Enter the amount to add:');
      if (amount !== null) {
        const response = await fetch('/api/balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });
        const data = await response.json();
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  return (
    <div>
      <h1>Balance Page</h1>
      <p>Current Balance: ${balance}</p>
      <button onClick={handleAddFunds}>Add Funds</button>
    </div>
  );
};

export default BalancePage;
