'use client'
import { useBalance } from '@/lib/use-balance';

const BalancePage = () => {
  const { balance, updateBalance } = useBalance();
  
  const handleAddFunds = async () => {
    try {
      const str = prompt('Enter the amount to add:');
      const amount = str ? parseFloat(str) : null;

      if (amount !== null) {
        await updateBalance(amount);
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  return (
    <div>
      <h1>Balance Page</h1>
      {balance === null ? (
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