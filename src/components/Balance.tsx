'use client'
import { useFetchBalance } from "@/lib/fetch-balance";
import Link from "next/link";

const Balance = () => {
    const { balance, loading } = useFetchBalance();

    return (
        <>
        {loading ? (<p className="profile-balance-link">Loading...</p>) : 
        (<Link href="/balance" className="profile-balance-link">${balance.toFixed(2)}</Link>)}
        </>
    );
}
 
export default Balance;