'use client'

import { useState } from 'react';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/Button';
import { useToast } from '@/components/ui/use-toast';
import useStore from '@/lib/global-store';

export default function CoinFlip() {
    const balance = useStore((state: { balance: number } | unknown) => (state as { balance: number }).balance);
    const updateBalance = useStore((state: unknown) => (state as { updateBalance: (amount: number) => Promise<void> }).updateBalance);

    const [heads, setHeads] = useState(0);
    const [tails, setTails] = useState(0);
    const [coinStyle, setCoinStyle] = useState({});
    const [bet, setBet] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [coinClass, setCoinClass] = useState('coin-heads');
    const { toast } = useToast()

    const flipCoin = async (betOnHeads : boolean) => {
        if(bet < 1 || bet > 1000 || !Number.isInteger(bet) || bet === null || bet === undefined) {
            toast({
                variant: 'destructive',
                title: "Invalid bet",
                description: "You must bet at least 1$ and at most 1000$.",
            }) 
            return;
        }
        if(bet > balance) {
            toast({
                variant: 'destructive',
                title: "Invalid bet",
                description: "You don't have enough money to bet that much.",
            }) 
            return;
        }
        await updateBalance(balance - bet);

        toast({
            variant: 'success',
            title: "Successfull Bet",
            description: "You bet " + bet + "$ on " + (betOnHeads ? "heads" : "tails") + ".",
        }) 
        setIsFlipping(true);

        const i = Math.floor(Math.random() * 2);
    
        if (i) setCoinStyle({ animation: 'spin-heads 3s forwards' });
        else setCoinStyle({ animation: 'spin-tails 3s forwards' });
        
        setTimeout( async () => {
            if (i) {
                setHeads(heads + 1);
                if (betOnHeads) await updateBalance(balance + bet);
                else await updateBalance(balance - bet);
                setHistory(prevHistory => ['Heads', ...prevHistory]);
                setCoinClass('coin-heads');
              } else {
                setTails(tails + 1);
                if (!betOnHeads) await updateBalance(balance + bet);
                else await updateBalance(balance - bet);
                setHistory(prevHistory => ['Tails', ...prevHistory]);
                setCoinClass('coin-tails');
              }

            setCoinStyle({});
            setIsFlipping(false);
        }, 3000);
    };

    return (
        <div className="coin-container">
            <div className={`coin ${coinClass}`} style={coinStyle}>
                <div className="heads">
                    <Icons.heads />
                </div>
                <div className="tails">
                    <Icons.tails />
                </div>
            </div>
            <input placeholder='Type your bet here' type="number" onChange={(e) => setBet(Number(e.target.value))} />
            <div className="buttons">
                <Button className='mx-2 my-3' variant={'poligon'} onClick={() => flipCoin(true)} isLoading={isFlipping}>Bet Heads</Button>
                <Button className='mx-2 my-3' variant={'poligon'} onClick={() => flipCoin(false)} isLoading={isFlipping}>Bet Tails</Button>
            </div>
            <h2 className='text-lg'>History: </h2>
            <div className="coin-history">
                {history.map((result, index) => (
                <a key={index}>{result} </a>
                ))}
            </div>
        </div>
    );
}