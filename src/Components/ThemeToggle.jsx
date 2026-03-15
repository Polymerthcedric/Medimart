import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleDarkMode} 
      className={`relative w-16 h-8 rounded-full p-1 transition-all duration-500 flex items-center shadow-inner ${
        darkMode ? 'bg-slate-800' : 'bg-primary-100'
      }`}
      aria-label="Toggle theme"
    >
      <div 
        className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center text-xs ${
          darkMode 
          ? 'translate-x-8 bg-slate-700 text-yellow-400' 
          : 'translate-x-0 bg-white text-slate-700'
        }`}
      >
        {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </div>
      <span className={`absolute text-[8px] font-black uppercase tracking-widest transition-opacity duration-300 ${
        darkMode ? 'left-2 opacity-100 text-slate-400' : 'right-2 opacity-100 text-primary-600'
      }`}>
        {darkMode ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeToggle;
