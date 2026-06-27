"use client";

import { useState, useEffect, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (text[index] === " ") return " ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Run once on mount
    startAnimation();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span 
      className={className} 
      onMouseOver={startAnimation}
    >
      {displayText}
    </span>
  );
}
