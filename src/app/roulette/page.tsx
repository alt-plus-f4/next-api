'use client'

import { Button } from '@/components/Button';
import { useState, useEffect, useRef } from 'react';

const Roulette = () => {
    const [outcome, setOutcome] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const wheelRef = useRef<HTMLDivElement | null>(null);
    const h1Ref = useRef<HTMLHeadingElement | null>(null);


    const initWheel = () => {
        let row = "";
        row += "<div class='row'>";
        row += "  <div class='card red'>1<\/div>";
        row += "  <div class='card black'>14<\/div>";
        row += "  <div class='card red'>2<\/div>";
        row += "  <div class='card black'>13<\/div>";
        row += "  <div class='card red'>3<\/div>";
        row += "  <div class='card black'>12<\/div>";
        row += "  <div class='card red'>4<\/div>";
        row += "  <div class='card green'>0<\/div>";
        row += "  <div class='card black'>11<\/div>";
        row += "  <div class='card red'>5<\/div>";
        row += "  <div class='card black'>10<\/div>";
        row += "  <div class='card red'>6<\/div>";
        row += "  <div class='card black'>9<\/div>";
        row += "  <div class='card red'>7<\/div>";
        row += "  <div class='card black'>8<\/div>";
        row += "<\/div>";
        
        if(wheelRef.current){
            for(let x = 0; x < 29; x++){
                wheelRef.current.innerHTML += row;
            }
        }
    };

    const spinWheel = () => {
        const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
        const position = 0;
    
        const rows = 12;
        const card = 75 + 3 * 2;
        let landingPosition = (rows * 15 * card) + (position * card);
    
        const randomize = Math.floor(Math.random() * 75) - (75/2);
    
        landingPosition = landingPosition + randomize;
    
        const object = {
          x: Math.floor(Math.random() * 50) / 100,
          y: Math.floor(Math.random() * 20) / 100
        };
    
        if (wheelRef.current) {
          wheelRef.current.style.transitionTimingFunction = `cubic-bezier(0,${object.x},${object.y},1)`;
          wheelRef.current.style.transitionDuration = '6s';
          wheelRef.current.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`;
    
          setTimeout(() => {
            if(wheelRef.current){
                wheelRef.current.style.transitionTimingFunction = '';
                wheelRef.current.style.transitionDuration = '';
                const resetTo = -(position * card + randomize);
                wheelRef.current.style.transform = `translate3d(${resetTo}px, 0px, 0px)`;
    
                // Calculate the index of the card that the wheel lands on
                const landingIndex = Math.round(landingPosition / card) % order.length;
    
                // Get the number from the order array
                const landingNumber = order[landingIndex]; 
    
                // Update the h1Ref with the landing number
                if (h1Ref.current) {
                    h1Ref.current.innerHTML = `Outcome: ${landingNumber}`;
                }
                setIsSpinning(false);
            }
          }, 6 * 1000);
        }
    };

    useEffect(() => {
        initWheel();
    }, []);

    const handleClick = () => {
        setIsSpinning(true);
        spinWheel();
    };

    return (
        <div className='roulette-div'>
            <h1 ref={h1Ref}>ROULETTE</h1>
            <div className='roulette-wrapper'>
                <div className='selector'></div>
                <div className='wheel' ref={wheelRef}></div>
            </div>

            <div>
                <Button isLoading={isSpinning} variant={'poligon'} onClick={handleClick}>
                    Spin Wheel
                </Button>
            </div>
        </div>
    );
};

export default Roulette;




