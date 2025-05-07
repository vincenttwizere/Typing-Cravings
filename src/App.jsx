import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import TypingEffect from './components/TypingEffect';
import { TypingProvider, useTyping } from './context/TypingContext';

const TypingApp = () => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef(null);
  const { currentContent, currentMode, isTestActive, completeTest } = useTyping();

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTestComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive && !startTime) {
      setStartTime(Date.now());
    }
  }, [isActive, startTime]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const words = currentContent.content.split(' ');
    const currentWordIndex = input.trim().split(/\s+/).length;
    const currentWord = words[currentWordIndex];

    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    // Update input immediately
    setInput(value);

    // If we've completed a word (space was pressed)
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      // If the word is correct, clear the input
      if (typedWord === currentWord) {
        setInput('');
      }
    }
  };

  const handleTestComplete = () => {
    if (!currentContent) return;
    
    const timeElapsed = 60 - timeLeft;
    const words = input.trim().split(/\s+/).length;
    const wpm = Math.round((words / timeElapsed) * 60);
    const accuracy = calculateAccuracy(input, currentContent.content);
    
    const testResults = {
      wpm,
      accuracy,
      timeElapsed,
      wordsTyped: words,
      timestamp: new Date().toISOString()
    };
    
    // Store results in localStorage
    const existingHistory = JSON.parse(localStorage.getItem('typingHistory')) || [];
    const updatedHistory = [...existingHistory, testResults];
    localStorage.setItem('typingHistory', JSON.stringify(updatedHistory));
    
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
    setTimeLeft(60);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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

    const words = currentContent.content.split(' ');
    const currentWordIndex = input.trim().split(/\s+/).length;

    return (
      <div className="typing-game">
        <TypingEffect 
          words={words}
          currentWordIndex={currentWordIndex}
          input={input}
        />
        <div className="typing-controls">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={results !== null}
            placeholder={isActive ? "Keep typing..." : "Start typing to begin..."}
            autoFocus
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
          />
          <div className="timer">{formatTime(timeLeft)}</div>
          <button 
            className="refresh-btn" 
            onClick={resetTest}
            title={isActive ? "Reset test" : "Change text"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
              <path d="M16 21h5v-5"></path>
            </svg>
          </button>
        </div>
        {results && (
          <div className="results">
            <h2>Test Results</h2>
            <p className="wpm-display">{results.wpm} WPM</p>
            <p>Accuracy: {results.accuracy}%</p>
            <p>Words Typed: {results.wordsTyped}</p>
            <p>Time: {results.timeElapsed} seconds</p>
          </div>
        )}
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
