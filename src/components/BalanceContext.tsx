'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface BalanceContextProps {
  balance: number | null;
  updateBalance: (newBalance: number) => void;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    // You can fetch the initial balance here if needed.
    // Example: fetchBalance().then((initialBalance) => setBalance(initialBalance));
  }, []);

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
    // You may also want to update the balance on the server here.
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};
