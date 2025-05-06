import React from 'react';

const TypingEffect = ({ words, currentWordIndex, input }) => {
  const visibleWords = words.slice(currentWordIndex, currentWordIndex + 10);
  const firstLine = visibleWords.slice(0, 5);
  const secondLine = visibleWords.slice(5, 10);
  const typedWords = input.trim().split(/\s+/);

  const getWordClass = (word, index) => {
    // Current word being typed
    if (index === 0) {
      return 'word current';
    }

    // Words that have been typed
    if (index < typedWords.length) {
      return typedWords[index] === word ? 'word correct' : 'word incorrect';
    }

    // Words that haven't been typed yet
    return 'word';
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
            className="word"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingEffect; 