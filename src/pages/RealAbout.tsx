import { Chatbot } from '../components/chatbot'
import stars from '../assets/stars.png'
const about = () => {

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
     





      <Chatbot />
    </div>
  )
}

export default about 