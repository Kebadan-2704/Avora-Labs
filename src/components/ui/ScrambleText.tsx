"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function ScrambleText({ text, className = "", speed = 50, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, " ")); // Start empty
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const hasRun = useRef(false);

  useEffect(() => {
    if (isInView && !hasRun.current) {
      hasRun.current = true;
      let iterations = 0;
      const maxIterations = text.length;

      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText((prev) => {
            const nextStr = prev
              .split("")
              .map((char, index) => {
                if (index < iterations) {
                  return text[index]; // Lock in correct character
                }
                if (text[index] === " ") return " "; // preserve spaces
                return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
              })
              .join("");

            return nextStr;
          });

          if (iterations >= maxIterations) {
            clearInterval(interval);
            setDisplayText(text);
          }
          
          iterations += 1/3; // Slows down the lock-in rate
        }, speed);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
