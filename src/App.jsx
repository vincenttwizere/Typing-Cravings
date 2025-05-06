import React from 'react'
import './App.css'
import TypingGame from './components/TypingGame'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Dashboard />
      <div className="main-content">
        <div className="header">
          <h1 className="title">Typing Cravings</h1>
          <p className="subtitle">Test your typing speed in 1 minute</p>
        </div>
        <TypingGame />
      </div>
    </div>
  )
}

export default App
