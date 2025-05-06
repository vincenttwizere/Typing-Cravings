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
    setHistory(prev => [...prev, {
      id: Date.now(),
      mode: currentMode,
      level: currentLevel,
      results,
      date: new Date().toISOString()
    }]);
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