

import ScholarshipCard from '../components/scholarshipcard'
import stars from '../assets/stars.png'
import alien from '../assets/alien.png'
import constellation from '../assets/constellation.png'
import { useNavigate } from 'react-router-dom';

  //loop through the mongo db and for each scholarship make a card and display it on the page
  //make the cards clickable and when clicked it should redirect to the scholarship page
  
const Scholarships = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-radial from-slate-950 to-indigo-950 relative">
      
      <div
        className="absolute inset-0 animate-twinkle h-full"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      ></div>
      
      
      <div className="relative z-10 p-8">
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
          style={{ top: '7%', left: '60%' }}
          onClick={() => navigate('/')}
        >
        Landing Page
        </button>
        <button
          className="font-serif absolute bg-transparent text-white border-yellow px-4 py-2 rounded hover:bg-white hover:text-black transition"
          style={{ top: '8%', left: '73%' }}
          onClick={() => navigate('/scholarships')}
        >
        Explore Scholarships
        </button>
        <button
          className="font-serif absolute bg-transparent text-white border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          style={{ top: '7%', left: '90%' }}
          onClick={() => navigate('/about')}
        >
        About Us
        </button>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
          <ScholarshipCard />
        
        </div>
      </div>

     
        <img
        src={alien}
          alt="alien"
          className="absolute"
          style={{ top: '0%', left: '60%' }}
        />
      
    </div>
      )
}

export default Scholarships 