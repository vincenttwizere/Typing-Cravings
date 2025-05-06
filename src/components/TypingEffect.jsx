import React from 'react';

const TypingEffect = ({ words, currentWordIndex, input }) => {
  const visibleWords = words.slice(currentWordIndex, currentWordIndex + 10);
  const firstLine = visibleWords.slice(0, 5);
  const secondLine = visibleWords.slice(5, 10);
  const typedWords = input.trim().split(/\s+/);
  const currentInput = input.trim();

  const getWordClass = (word, index) => {
    // If this word has been typed (completed with space)
    if (index < typedWords.length) {
      return typedWords[index] === word ? 'correct-word' : 'incorrect-word';
    }

    // If this is the current word being typed
    if (index === 0) {
      // Only show blue background if we're actually typing this word
      return currentInput.length > 0 ? 'current-word' : 'default-word';
    }

    // Default state for untyped words
    return 'default-word';
  };

  return (
    <div className="text-display">
      <div className="word-line">
        {firstLine.map((word, index) => (
          <span 
            key={`first-${index}`} 
            className={getWordClass(word, index)}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="word-line">
        {secondLine.map((word, index) => (
          <span 
            key={`second-${index}`} 
            className="default-word"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingEffect; 