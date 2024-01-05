'use client'

import useStore from '@/lib/global-store';

const BalancePage = () => {
  const balance = useStore((state: { balance: number } | unknown) => (state as { balance: number }).balance);
  const updateBalance = useStore((state: unknown) => (state as { updateBalance: (amount: number) => Promise<void> }).updateBalance);

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