'use client'

import { Button } from '@/components/Button';
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
    <div className='balance-page'>
      <h1 className='my-5 text-3xl font-bold'>Balance Page</h1>
      {balance === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button variant={'outline'} onClick={handleAddFunds}>Add $$$</Button>
        </>
      )}
    </div>
  );
};

export default BalancePage;