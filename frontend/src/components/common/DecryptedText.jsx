import React, { useEffect, useState, useRef } from 'react';

/**
 * React Bits inspired DecryptedText effect.
 * Scrambles characters rapidly before resolving into the final plaintext string.
 */
export const DecryptedText = ({
  text,
  speed = 40,
  maxIterations = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  style = {},
  animateOnMount = true
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const startDecryption = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / (maxIterations / text.length || 1);
    }, speed);
  };

  useEffect(() => {
    if (animateOnMount) {
      startDecryption();
    }
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span
      className={className}
      style={{ fontFamily: 'inherit', display: 'inline-block', ...style }}
      onMouseEnter={() => {
        setIsHovered(true);
        startDecryption();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};
export default DecryptedText;
