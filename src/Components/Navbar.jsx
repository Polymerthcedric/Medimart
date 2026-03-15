import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from './ThemeContext';
import { Pill, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 group-hover:scale-110 transition-transform">
                <Pill className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Medimart
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className={`transition-colors duration-200 hover:text-primary-500 font-medium ${isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/addproduct" className={`transition-colors duration-200 hover:text-primary-500 font-medium ${isActive('/addproduct') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="/signin" className={`transition-colors duration-200 hover:text-primary-500 font-medium ${isActive('/signin') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className={`transition-colors duration-200 hover:text-primary-500 font-medium ${isActive('/signup') ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  Sign Up
                </Link>
              </li>
            </ul>
            
            <div className="flex items-center pl-4 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 ${isActive('/') ? 'text-primary-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/addproduct" 
                  className={`block py-2 ${isActive('/addproduct') ? 'text-primary-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link 
                  to="/signin" 
                  className={`block py-2 ${isActive('/signin') ? 'text-primary-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className={`block py-2 ${isActive('/signup') ? 'text-primary-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Dark Mode</span>
                  <ThemeToggle />
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
