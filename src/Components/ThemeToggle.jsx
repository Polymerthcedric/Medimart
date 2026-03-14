import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <button 
        onClick={toggleDarkMode} 
        className={`btn rounded-pill px-4 ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
        style={{
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '600'
        }}
      >
        <span>{darkMode ? '☀️' : '🌙'}</span>
        <span>{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
