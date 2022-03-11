import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='header-wrapper'>
        <img className='brand_logo' src="/images/fundall_logo.png" alt="brand logo" />
        
        <div>
            <NavLink to='/login' className='login-btn'>LOG IN</NavLink>
            <NavLink to='/register' className='signup-btn'>SIGN UP</NavLink>
        </div>
    </div>
  )
}

export default Header