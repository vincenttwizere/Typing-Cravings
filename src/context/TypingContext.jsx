import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  beginnerLessons, 
  beginnerTests, 
  intermediateTests, 
  advancedTests, 
  typingCompetitions 
} from '../data/typingContent';

const TypingContext = createContext();

export const useTyping = () => useContext(TypingContext);

export const TypingProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('practice');
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentContent, setCurrentContent] = useState(beginnerLessons[0]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [history, setHistory] = useState([]);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testResults, setTestResults] = useState(null);

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('typingHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const loadContent = (mode, level) => {
    setCurrentMode(mode);
    setCurrentLevel(level);
    
    switch (mode) {
      case 'practice':
        setCurrentContent(beginnerLessons[currentLesson]);
        break;
      case 'beginner':
        setCurrentContent(beginnerTests[0]);
        break;
      case 'intermediate':
        setCurrentContent(intermediateTests[0]);
        break;
      case 'advanced':
        setCurrentContent(advancedTests[0]);
        break;
      case 'competition':
        setCurrentContent(typingCompetitions[0]);
        break;
      case 'history':
        setCurrentContent(null);
        break;
      default:
        setCurrentContent(beginnerLessons[0]);
    }
  };

  const startTest = (testId) => {
    const test = currentContent.find(t => t.id === testId);
    if (test) {
      setCurrentContent(test);
      setIsTestActive(true);
    }
  };

  const completeTest = (results) => {
    setTestResults(results);
    
    // Create a new history entry with the correct format
    const newHistoryEntry = {
      wpm: results.wpm,
      accuracy: results.accuracy,
      timeElapsed: results.timeElapsed,
      wordsTyped: results.wordsTyped,
      timestamp: new Date().toISOString()
    };
    
    // Update both state and localStorage
    const updatedHistory = [...history, newHistoryEntry];
    setHistory(updatedHistory);
    localStorage.setItem('typingHistory', JSON.stringify(updatedHistory));
    
    setIsTestActive(false);
  };

  const nextLesson = () => {
    if (currentMode === 'practice' && currentLesson < beginnerLessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setCurrentContent(beginnerLessons[currentLesson + 1]);
    }
  };

  const previousLesson = () => {
    if (currentMode === 'practice' && currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
      setCurrentContent(beginnerLessons[currentLesson - 1]);
    }
  };

  useEffect(() => {
    // Load initial content
    loadContent('practice', 'beginner');
  }, []);

  const value = {
    currentMode,
    currentLevel,
    currentContent,
    currentLesson,
    history,
    isTestActive,
    testResults,
    loadContent,
    startTest,
    completeTest,
    nextLesson,
    previousLesson
  };

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  );
}; 