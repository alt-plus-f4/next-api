'use client'

import { useEffect } from 'react';
import Link from "next/link";
import useStore from '@/lib/global-store';

const Balance = () => {
    const balance = useStore((state: unknown) => (state as { balance: number }).balance);
    const fetchBalance = useStore((state: unknown) => (state as { fetchBalance: () => void }).fetchBalance);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return (
        <>
            {balance === null ? (
                <p className="profile-balance-link">Loading...</p>
            ) : (
                <Link href="/balance" className="profile-balance-link">${balance.toFixed(2)} +</Link>
            )}
        </>
    );
}
 
export default Balance;