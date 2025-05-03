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

  useEffect(() => {
    let interval
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      setIsRunning(false)
      setShowResults(true)
      const minutes = 1
      const finalWpm = Math.round(correctWords / minutes)
      const finalAccuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0
      setWpm(finalWpm)
      setAccuracy(finalAccuracy)
    }
    return () => clearInterval(interval)
  }, [isRunning, time, correctWords, totalWords])

  const handleKeyDown = (e) => {
    if (e.key === ' ' && input.length > 0) {
      setTotalWords(prev => prev + 1)
      
      if (input === currentWord) {
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
    
    if (e.key !== ' ') {
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
      <div className="stats">
        <p>Time: {time}s</p>
        <p>WPM: {showResults ? wpm : '--'}</p>
        <p>Accuracy: {showResults ? `${accuracy}%` : '--'}</p>
      </div>
      {showResults && (
        <div className="results">
          <h2>Results</h2>
          <p>Your typing speed: {wpm} WPM</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Correct words: {correctWords}</p>
          <p>Total words: {totalWords}</p>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      )}
      <div className="text-display">
        <div className="word-line">
          {words.slice(0, 20).map((word, index) => (
            <span
              key={index}
              className={`word ${index === 0 ? 'current' : ''} ${
                index === 0 && input ? (input === word ? 'correct' : 'incorrect') : ''
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
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
    </div>
  )
}

export default TypingGame 