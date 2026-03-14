import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from './ThemeContext';

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className={`navbar navbar-expand-lg sticky-top nav py-3`}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="me-2">💊</span>
          <b>Medimart</b>
        </Link>
        
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarcollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarcollapse">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link px-3 ${isActive('/') ? 'text-primary fw-bold' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addproduct" className={`nav-link px-3 ${isActive('/addproduct') ? 'text-primary fw-bold' : ''}`}>
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className={`nav-link px-3 ${isActive('/signin') ? 'text-primary fw-bold' : ''}`}>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className={`nav-link px-3 ${isActive('/signup') ? 'text-primary fw-bold' : ''}`}>
                Sign Up
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
