'use client'
import { useFetchBalance } from '@/lib/fetch-balance';

const BalancePage = () => {
  const { balance, loading } = useFetchBalance();
  
  const handleAddFunds = async () => {
    try {
      const str = prompt('Enter the amount to add:');
      const amount = str ? parseFloat(str) : null;

      if (amount !== null) {
        await fetch('/api/balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ balance: amount }),
        });
      }
      window.location.reload();
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  return (
    <div>
      <h1>Balance Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Current Balance: ${balance}</p>
          <button onClick={handleAddFunds}>Add $$$</button>
        </>
      )}
    </div>
  );
};

export default BalancePage;