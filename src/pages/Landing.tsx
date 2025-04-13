import '../App.css'
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import stars from '../assets/stars.png';

const Landing = () => {
    return (
        <div className="bg-radial from-slate-950 to-indigo-950 h-screen flex items-center text-3xl text-stone-50 justify-center w-full relative">
          <div
                className="absolute inset-0 animate-twinkle  h-full"
                style={{
                    backgroundImage: `url(${stars})`, // Use your stars image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.5, // Adjust transparency of the stars
                }}
            ></div>

          <div className="font-serif">
                    <Typewriter
                        words={['Welcome To Stellarship']}
                        loop={0}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000} />
          </div>
        </div>
    )
}

export default Landing;