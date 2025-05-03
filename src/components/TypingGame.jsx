import { useState, useEffect, useRef } from 'react'

const TypingGame = () => {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog')
  const [input, setInput] = useState('')
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [wpm, setWpm] = useState(0)
  const inputRef = useRef(null)

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
    if (input.length === 1 && !isRunning) {
      setIsRunning(true)
    }

    if (input === text) {
      setIsRunning(false)
      const words = text.split(' ').length
      const minutes = time / 60
      setWpm(Math.round(words / minutes))
    }
  }, [input, text, time, isRunning])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleRestart = () => {
    setInput('')
    setTime(0)
    setIsRunning(false)
    setWpm(0)
    inputRef.current.focus()
  }

  return (
    <div className="typing-game">
      <div className="stats">
        <p>Time: {time}s</p>
        <p>WPM: {wpm}</p>
      </div>
      <div className="text-display">
        {text.split('').map((char, index) => {
          let className = 'char'
          if (index < input.length) {
            className += input[index] === char ? ' correct' : ' incorrect'
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing..."
        autoFocus
      />
      <button onClick={handleRestart}>Restart</button>
    </div>
  )
}

export default TypingGame 