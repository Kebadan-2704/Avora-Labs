"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useHaptics } from "@/hooks/useHaptics";
import { useAudio } from "@/hooks/useAudio";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  intensity = 0.5,
  style = {},
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const haptics = useHaptics();
  const audio = useAudio();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const handleMouseEnter = () => {
    audio.playHover();
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    haptics.lightClick();
    audio.playClick();
    if (onClick) onClick();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      style={{
        ...style,
        position: "relative",
        display: "inline-block" // Ensure it hugs content
      }}
    >
      {children}
    </motion.div>
  );
}
