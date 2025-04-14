import { Link } from 'react-router-dom'
import '../App.css'

export const Navbar = () => {
  return (
    <nav className="bg-slate-800" style={{ padding: '2rem' }}>
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'white' ,}}>
        <li>
          <Link to="/" style={{ padding: '0.5rem 1rem', color: 'white', textDecoration: 'none' }}>Landing</Link>
        </li>
        <li>
          <Link to="/scholarships" style={{ padding: '0.5rem 1rem', color: 'white', textDecoration: 'none' }}>Scholarships</Link>
        </li>
        <li>
          <Link to="/about" style={{ padding: '0.5rem 1rem', color: 'white', textDecoration: 'none' }}>About</Link>
        </li>
      </ul>
    </nav>
  )
}
