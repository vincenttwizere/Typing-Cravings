import React from 'react';

const TypingEffect = ({ words, currentWordIndex, input }) => {
  // Only show words that haven't been typed yet
  const remainingWords = words.slice(currentWordIndex);
  const visibleWords = remainingWords.slice(0, 10);
  const firstLine = visibleWords.slice(0, 5);
  const secondLine = visibleWords.slice(5, 10);

  const getWordClass = (word, index) => {
    // First word is always the current word
    if (index === 0) {
      // If we're typing the current word
      if (input.length > 0) {
        // Check if what we've typed so far matches the beginning of the word
        const typedSoFar = input.trim();
        if (word.startsWith(typedSoFar)) {
          return 'current-word';
        } else {
          return 'incorrect-word';
        }
      }
      return 'current-word';
    }
    // All other words are default
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