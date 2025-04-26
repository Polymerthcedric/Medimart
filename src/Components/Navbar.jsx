import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from './ThemeContext';

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <section className="row">
      <div className="col-md-12">
        <nav className={`navbar navbar-expand-md ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} nav`}>
          <Link to={"/"} className="navbar-brand">
            <b className='brand-name'>Medimart</b>
          </Link>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarcollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarcollapse">
            <div className="navbar-nav">
              <Link to={"/addproduct"} className="nav-link">addproduct</Link>
              <Link to={"/signin"} className="nav-link active">signin</Link>
              <Link to={"/signup"} className="nav-link">signup</Link>
            </div>
          </div>
          
          <ThemeToggle />
        </nav>
      </div>
    </section>
  );
};

export default Navbar;