import React from 'react';
import { useTyping } from '../context/TypingContext';

const Dashboard = () => {
  const { loadContent } = useTyping();

  const handleNavigation = (mode) => {
    loadContent(mode, mode === 'practice' ? 'beginner' : mode);
  };

  return (
    <div className="dashboard">
      <ul className="dashboard-menu">
        <li className="dashboard-item">
          <a href="#" className="dashboard-link active" onClick={() => handleNavigation('practice')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Typing Practice
          </a>
        </li>
        <li className="dashboard-item">
          <a href="#" className="dashboard-link" onClick={() => handleNavigation('beginner')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            Beginner Test
          </a>
        </li>
        <li className="dashboard-item">
          <a href="#" className="dashboard-link" onClick={() => handleNavigation('intermediate')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Intermediate
          </a>
        </li>
        <li className="dashboard-item">
          <a href="#" className="dashboard-link" onClick={() => handleNavigation('advanced')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
              <path d="M2 7l10 5 10-5"/>
            </svg>
            Advanced
          </a>
        </li>
        <li className="dashboard-item">
          <a href="#" className="dashboard-link" onClick={() => handleNavigation('competition')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Typing Competition
          </a>
        </li>
        <li className="dashboard-item">
          <a href="#" className="dashboard-link" onClick={() => handleNavigation('history')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
            </svg>
            History
          </a>
        </li>
        <li className="dashboard-item">
          <a href="#" className="dashboard-link" onClick={() => {/* Add logout logic */}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard; 