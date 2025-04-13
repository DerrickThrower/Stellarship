import '../App.css'
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import stars from '../assets/stars.png';
import ufo from '../assets/ufo.png';
import { Chatbot } from '../components/chatbot'


const Landing = () => {
    return (
        <div>
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

                <div className="font-serif bg-gradient-to-r  bg-clip-text text-6xl box-content font-extrabold   text-center select-none">
                  <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-stone-50 bg-clip-text text-6xl box-content font-extrabold text-center select-none">
                      <Typewriter
                        words={['Welcome To Stellarship!']}
                        loop={0}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000} />
                      </span>
                      <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-stone-50 bg-clip-text text-6xl font-extrabold text-center select-auto">
                      <Typewriter
                        words={['Welcome To Stellarship!']}
                        loop={0}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000} />
                      </h1>
                    
                </div>

                    {/* UFO Image */}
                    <img 
            src={ufo} 
            alt="UFO" 
            className="absolute animate-ufo w-40" 
            style={{ top: '10%', left: '0%' }} 
          />
                </div>
            <Chatbot />
        </div>
    )
}

export default Landing;