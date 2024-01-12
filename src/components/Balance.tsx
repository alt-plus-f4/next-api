'use client'

import { useEffect } from 'react';
import Link from "next/link";
import useStore from '@/lib/global-store';
import { Skeleton } from "@/components/ui/skeleton"

const Balance = () => {
    const balance = useStore((state: unknown) => (state as { balance: number }).balance);
    const fetchBalance = useStore((state: unknown) => (state as { fetchBalance: () => void }).fetchBalance);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return (
        <>
            {!balance ? (
                <Skeleton className="skeleton-balance" />
            ) : (
                <Link href="/balance" className="profile-balance-link">${balance.toFixed(2)} +</Link>
            )}
        </>
    );
}
 
export default Balance;