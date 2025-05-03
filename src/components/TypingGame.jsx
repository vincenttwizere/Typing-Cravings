import { useState, useEffect, useRef } from 'react'

const TypingGame = () => {
  const [text, setText] = useState('Loading text...')
  const [input, setInput] = useState('')
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const inputRef = useRef(null)

  const fetchRandomText = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://api.quotable.io/random?minLength=100&maxLength=200')
      const data = await response.json()
      setText(data.content)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching text:', error)
      setText('Error loading text. Please try again.')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomText()
  }, [])

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (input.length === 1 && !isRunning && gameStarted) {
      setIsRunning(true)
    }

    if (input === text) {
      setIsRunning(false)
      const words = text.split(' ').length
      const minutes = time / 60
      setWpm(Math.round(words / minutes))
      setShowResults(true)
    }
  }, [input, text, time, isRunning, gameStarted])

  const handleInputChange = (e) => {
    if (gameStarted) {
      setInput(e.target.value)
    }
  }

  const handleStart = () => {
    setGameStarted(true)
    inputRef.current.focus()
  }

  const handleNextText = () => {
    fetchRandomText()
    setInput('')
    setTime(0)
    setIsRunning(false)
    setShowResults(false)
    setWpm(0)
    setGameStarted(false)
  }

  const handleRestart = () => {
    setInput('')
    setTime(0)
    setIsRunning(false)
    setWpm(0)
    setShowResults(false)
    setGameStarted(false)
  }

  return (
    <div className="typing-game">
      <div className="stats">
        <p>Time: {time}s</p>
        <p>WPM: {wpm}</p>
      </div>
      {showResults && (
        <div className="results">
          <h2>Results</h2>
          <p>Your typing speed: {wpm} WPM</p>
          <p>Time taken: {time} seconds</p>
          <button onClick={handleNextText}>Next Text</button>
        </div>
      )}
      <div className="text-display">
        {isLoading ? (
          <p>Loading new text...</p>
        ) : (
          text.split('').map((char, index) => {
            let className = 'char'
            if (index < input.length) {
              className += input[index] === char ? ' correct' : ' incorrect'
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            )
          })
        )}
      </div>
      {!showResults && !isLoading && (
        <>
          {!gameStarted ? (
            <button className="start-button" onClick={handleStart}>
              Start Typing
            </button>
          ) : (
            <>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Start typing..."
                autoFocus
              />
              <button onClick={handleRestart}>Restart</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default TypingGame 