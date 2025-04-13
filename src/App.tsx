import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Scholarships from './pages/ScholarshipsPage'
import Unknown from './pages/uknown'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/unknown" element={<Unknown />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
