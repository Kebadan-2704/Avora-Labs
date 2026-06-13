"use client";

import { useCallback } from "react";

type VibratePattern = number | number[];

export const useHaptics = () => {
  const isSupported = typeof window !== "undefined" && "vibrate" in navigator;

  const trigger = useCallback(
    (pattern: VibratePattern = 10) => {
      if (!isSupported) return;
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        // Ignore errors, often blocked by browser policy without user interaction
        console.warn("Haptic feedback failed", error);
      }
    },
    [isSupported]
  );

  const lightClick = useCallback(() => trigger(10), [trigger]);
  const heavyClick = useCallback(() => trigger([20, 30, 20]), [trigger]);
  const success = useCallback(() => trigger([15, 50, 15, 50, 20]), [trigger]);
  const error = useCallback(() => trigger([30, 50, 30, 50, 40]), [trigger]);

  return {
    isSupported,
    trigger,
    lightClick,
    heavyClick,
    success,
    error,
  };
};
