import React from 'react'
import { Chatbot } from '../components/chatbot'

const about = () => {
  
  
  
  
 

  return (
    <div className='min-h-screen bg-radial from-slate-950 to-indigo-950 relative'>

      <h1 className=' pt-10 text-4xl font-bold text-white text-center '>About Us</h1>
     
      <div className='flex justify-center items-center pt-10 text-white'>
        <div className='w-1/2 h-1/2 bg-blue-950 rounded-lg'>
          <h2 className='text-2xl font-bold'>Our Mission</h2>
          <p className='text-xl'>We are a team of students who are passionate about helping students find scholarships.</p>
        </div>
      </div>
     





      <Chatbot />
    </div>
  )
}

export default about 