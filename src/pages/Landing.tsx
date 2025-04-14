import '../App.css';
import { Typewriter } from 'react-simple-typewriter';
import stars from '../assets/stars.png';
import ufo from '../assets/ufo.png';
import constellation from '../assets/constellation.png';
import { Chatbot } from '../components/chatbot';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-radial from-slate-950 to-indigo-950 h-screen flex items-center text-3xl text-stone-50 justify-center w-full relative">
      {/* Background stars */}
      <div
        className="absolute inset-0 animate-twinkle h-full"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      ></div>

      {/* Welcome text */}
      <div className="font-serif bg-gradient-to-r bg-clip-text text-6xl box-content font-extrabold text-center select-none">
        <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-stone-50 bg-clip-text text-6xl box-content font-extrabold text-center select-none">
          <Typewriter
            words={['Welcome To Stellarship!']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
        <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-stone-50 bg-clip-text text-6xl font-extrabold text-center select-auto">
          <Typewriter
            words={['Welcome To Stellarship!']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <h1 className='text-xl'>
          Exploring College Finances
        </h1>
      </div>

      {/* UFO Image */}
      <img
        src={ufo}
        alt="UFO"
        className="absolute animate-ufo w-40"
        style={{ top: '10%', left: '0%' }}
      />

      {/* Constellation and buttons */}
      <div>
        <img
          src={constellation}
          alt="Constellation"
          className="absolute h-100 w-300"
          style={{ top: '40%', left: '8%' }}
        />
        {/* Buttons on the constellation */}
        <button
          className="font-serif absolute bg-transparent text-white border-yellow px-4 py-2 rounded hover:bg-white hover:text-black transition"
          style={{ top: '70%', left: '10%' }}
          onClick={() => navigate('/')}
        >
        Landing Page
        </button>
        <button
          className="font-serif absolute bg-transparent text-white border-yellow px-4 py-2 rounded hover:bg-white hover:text-black transition"
          style={{ top: '90%', left: '35%' }}
          onClick={() => navigate('/scholarships')}
        >
        Explore Scholarships
        </button>
        <button
          className="font-serif absolute bg-transparent text-white border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          style={{ top: '67%', left: '78%' }}
          onClick={() => navigate('/about')}
        >
        About Us
        </button>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Landing;