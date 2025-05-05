import { useState, useEffect, useRef } from 'react'

const randomWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
]

const TypingGame = () => {
  const [words, setWords] = useState([])
  const [currentWord, setCurrentWord] = useState('')
  const [input, setInput] = useState('')
  const [time, setTime] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const [totalWords, setTotalWords] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const inputRef = useRef(null)

  const generateWords = () => {
    const newWords = []
    for (let i = 0; i < 200; i++) {
      const randomIndex = Math.floor(Math.random() * randomWords.length)
      newWords.push(randomWords[randomIndex])
    }
    return newWords
  }

  useEffect(() => {
    const initialWords = generateWords()
    setWords(initialWords)
    setCurrentWord(initialWords[0])
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    let interval
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      setIsRunning(false)
      setShowResults(true)
      const finalWpm = correctWords
      const finalAccuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0
      setWpm(finalWpm)
      setAccuracy(finalAccuracy)
    }
    return () => clearInterval(interval)
  }, [isRunning, time, correctWords, totalWords])

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      setInput(prev => prev.slice(0, -1))
    } else if (e.key === ' ' && input.length > 0) {
      setTotalWords(prev => prev + 1)
      
      if (input.trim() === currentWord) {
        setCorrectWords(prev => prev + 1)
      }

      setInput('')
      setWords(prevWords => {
        const newWords = [...prevWords]
        newWords.shift()
        setCurrentWord(newWords[0])
        return newWords
      })
    }
  }

  const handleKeyPress = (e) => {
    if (!gameStarted) {
      setGameStarted(true)
      setIsRunning(true)
    }
    
    if (isRunning && e.key !== ' ' && e.key !== 'Backspace') {
      setInput(prev => prev + e.key)
    }
  }

  const handleRestart = () => {
    const newWords = generateWords()
    setWords(newWords)
    setCurrentWord(newWords[0])
    setInput('')
    setTime(60)
    setIsRunning(false)
    setShowResults(false)
    setWpm(0)
    setAccuracy(0)
    setCorrectWords(0)
    setTotalWords(0)
    setGameStarted(false)
  }

  return (
    <div className="typing-game">
      <div className="text-display">
        <div className="word-line">
          {words.slice(0, 20).map((word, index) => (
            <span
              key={index}
              className={`word ${index === 0 ? 'current' : ''} ${
                index === 0 && input ? (
                  input === word ? 'correct' : 
                  word.startsWith(input) ? '' : 'incorrect'
                ) : ''
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <div className="typing-controls">
        <div 
          className="input-display"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        >
          <span className="typed-text">{input}</span>
          <span className="cursor">|</span>
        </div>
        <div className="controls-right">
          <div className="timer">{formatTime(time)}</div>
          <button className="refresh-btn" onClick={handleRestart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
        </div>
      </div>
      {showResults && (
        <div className="results">
          <h2>Result Screenshot</h2>
          <p className="wpm-display">{wpm} WPM</p>
          <p>Keystrokes ({totalWords} | {totalWords - correctWords}) {totalWords}</p>
          <p>Accuracy {accuracy}%</p>
          <p>Correct words {correctWords}</p>
          <p>Wrong words {totalWords - correctWords}</p>
        </div>
      )}
    </div>
  )
}

export default TypingGame 