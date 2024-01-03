'use client'

import { useState } from 'react';
import { Button } from '@/components/Button';

const CoinFlip = () => {
    const [result, setResult] = useState<string | null>(null);
    const [flipping, setFlipping] = useState(false);

    const flipCoin = () => {
        setFlipping(true);
        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
            setResult(outcome);
            setFlipping(false);
        }, 1000);
    };

    return (
        <div className='coinflip-page'>
            <div className='coinflip'>
                <div className={`coin ${flipping ? 'flip' : 'Heads'} ${result}`} />
                <Button variant={'poligon'} isLoading={flipping} onClick={flipCoin}>Bet $5</Button>
                <h1>The result is: 
                {result && <> {result}</>}
                </h1>
            </div>
        </div>
    );
};

export default CoinFlip;