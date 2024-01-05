import create from 'zustand';

const useStore = create((set) => ({
    balance: 0,
    setBalance: (balance: number) => set({ balance }),
    fetchBalance: async () => {
        try {
            const response = await fetch('/api/balance');
            const data = await response.json();
            set({ balance: data.balance });
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        }
    },
    updateBalance: async (amount: number) => {
        try {
            const response = await fetch('/api/balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ balance: amount }),
            });

            const data = await response.json();
            set({ balance: data.balance });
        } catch (error) {
            console.error('Failed to update balance:', error);
        }
    },
}));

export default useStore;