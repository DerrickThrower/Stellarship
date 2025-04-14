import { Chatbot } from '../components/chatbot'
import stars from '../assets/stars.png'
import constellation from '../assets/constellation.png'
import { useNavigate } from 'react-router-dom';

const about = () => {
  const navigate = useNavigate();

  return (
    
    <div className='font-serif min-h-screen bg-radial from-slate-950 to-indigo-950 relative'>
      
      <div
        className="absolute inset-0 animate-twinkle h-full"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      ></div>
      <h1 className=' pt-10 text-4xl font-bold text-white text-center '>About Us</h1>
      
      <div className='text-white'>
        <div>
          <h2 className='text-2xl mt-10 font-bold text-center'>Our Mission</h2>
          <p className='text-xl mt-auto m-50'>Stellarship is a user-friendly platform designed 
            to centralize scholarship resources specifically for first-generation college students. 
            It helps users easily find and keep track of available scholarships by providing key 
            details such as award amounts, deadlines, eligibility requirements, and application tips. 
            Stellarship empowers students with the information and tools they need to confidently pursue
            financial aid opportunities and achieve their academic goals.</p>
        </div>

        <div className='w-1/2 h-1/2  rounded-lg'>
        </div>
      </div>
     
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




      <Chatbot />
    </div>
  )
}

export default about 