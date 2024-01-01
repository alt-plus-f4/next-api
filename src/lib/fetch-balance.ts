import { useState, useEffect } from 'react';

export const useFetchBalance = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
  
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/balance', {
          method: 'GET',
        });
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchBalance();
    }, []);
  
    return { balance, loading};
};