import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { TypingProvider, useTyping } from './context/TypingContext';

const TypingApp = () => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);
  const { currentContent, currentMode, isTestActive, completeTest } = useTyping();

  useEffect(() => {
    if (isActive && !startTime) {
      setStartTime(Date.now());
    }
  }, [isActive, startTime]);

  useEffect(() => {
    if (isTestActive && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      if (timeElapsed >= 60) {
        handleTestComplete();
      }
    }
  }, [isTestActive, startTime]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }
  };

  const handleTestComplete = () => {
    if (!currentContent) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const words = input.trim().split(/\s+/).length;
    const wpm = Math.round((words / timeElapsed) * 60);
    const accuracy = calculateAccuracy(input, currentContent.content);
    
    const testResults = {
      wpm,
      accuracy,
      timeElapsed,
      wordsTyped: words
    };
    
    setResults(testResults);
    completeTest(testResults);
    setIsActive(false);
    setStartTime(null);
  };

  const calculateAccuracy = (typed, target) => {
    if (!typed || !target) return 0;
    
    const typedWords = typed.trim().split(/\s+/);
    const targetWords = target.trim().split(/\s+/);
    let correctChars = 0;
    let totalChars = 0;

    typedWords.forEach((word, i) => {
      if (i < targetWords.length) {
        const targetWord = targetWords[i];
        totalChars += targetWord.length;
        for (let j = 0; j < Math.min(word.length, targetWord.length); j++) {
          if (word[j] === targetWord[j]) {
            correctChars++;
          }
        }
      }
    });

    return Math.round((correctChars / totalChars) * 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isTestActive) {
      handleTestComplete();
    }
  };

  const resetTest = () => {
    setInput('');
    setStartTime(null);
    setIsActive(false);
    setResults(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderContent = () => {
    if (currentMode === 'history') {
      return (
        <div className="history-container">
          <h2>Typing History</h2>
          {/* Add history display logic here */}
        </div>
      );
    }

    if (!currentContent) {
      return (
        <div className="loading-container">
          <p>Loading content...</p>
        </div>
      );
    }

    return (
      <div className="typing-game">
        <div className="stats">
          <p>WPM: {results?.wpm || 0}</p>
          <p>Accuracy: {results?.accuracy || 0}%</p>
          <p>Time: {results ? Math.round(results.timeElapsed) : 60}s</p>
        </div>
        <div className="typing-area-header">
          <div className="typing-controls">
            <div className="controls-right">
              <div className="timer">60s</div>
              <button onClick={resetTest} className="refresh-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-display">
          <div className="word-line">
            {currentContent.content.split(' ').map((word, index) => (
              <span key={index} className="word">
                {word}
              </span>
            ))}
          </div>
        </div>
        <div className="input-display">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Start typing..."
            disabled={results !== null}
            className="typed-text"
          />
          {!input && <span className="cursor">|</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <Navbar />
      <Dashboard />
      <div className="main-content">
        <div className="header">
          <h1 className="title">Typing Cravings</h1>
          <p className="subtitle">Test your typing speed in 1 minute</p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TypingProvider>
      <TypingApp />
    </TypingProvider>
  );
};

export default App;
