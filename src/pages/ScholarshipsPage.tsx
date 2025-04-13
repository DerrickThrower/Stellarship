

import ScholarshipCard from '../components/scholarshipcard'
import stars from '../assets/stars.png'
import alien from '../assets/alien.png'
 
  //loop through the mongo db and for each scholarship make a card and display it on the page
  //make the cards clickable and when clicked it should redirect to the scholarship page
  
const Scholarships = () => {
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