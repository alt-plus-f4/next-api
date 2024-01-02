import { useState, useEffect } from 'react';

export const useBalance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await fetch('/api/balance');
            const data = await response.json();
            setBalance(data.balance);
        };

        fetchBalance();
    }, []);

    const updateBalance = async (amount: number) => {
        const response = await fetch('/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balance: amount }),
        });

        const data = await response.json();
        setBalance(data.balance);
    };

    return { balance, updateBalance };
};