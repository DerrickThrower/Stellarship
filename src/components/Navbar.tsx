import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: '20px' }}>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="/scholarships">Scholarships</Link>
        </li>
        <li>
          <Link to="/unknown">Unknown</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar 