import React from 'react'
import { IoMdRestaurant } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <>
          <nav className='navbar'>
              <div className="logo">
                  <Link to="/" className='logo-text'>
                      <IoMdRestaurant className='logo-image' />
                      TRUST FOOD
                  </Link>
              </div>
          </nav>
        </>
    )
}
export default Navbar
