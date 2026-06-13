"use client";

import { useState, useEffect, useCallback } from "react";
import { lerp } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(smooth = false) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const [target, setTarget] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

    if (smooth) {
      setTarget({ x: e.clientX, y: e.clientY });
    } else {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    }
  }, [smooth]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Smooth lerping for smooth mode
  useEffect(() => {
    if (!smooth) return;

    let animationFrame: number;
    const currentPos = { x: position.x, y: position.y };

    const animate = () => {
      currentPos.x = lerp(currentPos.x, target.x, 0.1);
      currentPos.y = lerp(currentPos.y, target.y, 0.1);

      setPosition({
        x: currentPos.x,
        y: currentPos.y,
        normalizedX: (currentPos.x / window.innerWidth) * 2 - 1,
        normalizedY: (currentPos.y / window.innerHeight) * 2 - 1,
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [smooth, target]); // eslint-disable-line react-hooks/exhaustive-deps

  return position;
}
