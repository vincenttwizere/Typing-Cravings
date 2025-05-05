import './App.css'
import TypingGame from './components/TypingGame'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="header">
        <h1 className="title">Typing Cravings</h1>
        <p className="subtitle">Test your typing speed in 1 minute</p>
      </div>
      <TypingGame />
    </div>
  )
}

export default App
