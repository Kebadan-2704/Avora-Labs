/**
 * Reusable GSAP animation presets for Avora Labs
 */
import { gsap } from "gsap";

// Standard easing curves
export const EASE = {
  smooth: "power4.out",
  smoothInOut: "power4.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  elastic: "elastic.out(1, 0.5)",
  bounce: "bounce.out",
  back: "back.out(1.7)",
  circ: "circ.out",
} as const;

// Duration presets
export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  slower: 1.6,
  cinematic: 2.0,
} as const;

// Stagger presets
export const STAGGER = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
  relaxed: 0.12,
  dramatic: 0.15,
} as const;

/**
 * Fade up animation for elements entering the viewport
 */
export function fadeUpPreset(targets: gsap.TweenTarget, options: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    y: 60,
    opacity: 0,
    duration: DURATION.normal,
    ease: EASE.smooth,
    stagger: STAGGER.normal,
    ...options,
  });
}

/**
 * Character reveal animation (for split text)
 */
export function charRevealPreset(chars: HTMLElement[], options: gsap.TweenVars = {}) {
  return gsap.from(chars, {
    y: "110%",
    rotateX: -80,
    opacity: 0,
    duration: DURATION.slow,
    ease: EASE.smooth,
    stagger: STAGGER.fast,
    ...options,
  });
}

/**
 * Word-by-word blur reveal
 */
export function blurRevealPreset(words: HTMLElement[], options: gsap.TweenVars = {}) {
  return gsap.from(words, {
    filter: "blur(10px)",
    opacity: 0,
    y: 20,
    duration: DURATION.normal,
    ease: EASE.smooth,
    stagger: STAGGER.slow,
    ...options,
  });
}

/**
 * Scale reveal for cards/images
 */
export function scaleRevealPreset(targets: gsap.TweenTarget, options: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    scale: 0.85,
    opacity: 0,
    duration: DURATION.slow,
    ease: EASE.smooth,
    stagger: STAGGER.relaxed,
    ...options,
  });
}

/**
 * Line draw animation (for SVG paths)
 */
export function lineDrawPreset(path: SVGPathElement, options: gsap.TweenVars = {}) {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return gsap.to(path, {
    strokeDashoffset: 0,
    duration: DURATION.cinematic,
    ease: EASE.smoothInOut,
    ...options,
  });
}

/**
 * Counter animation (number roll up)
 */
export function counterPreset(
  target: HTMLElement,
  endValue: number,
  options: { duration?: number; prefix?: string; suffix?: string; decimals?: number } = {}
) {
  const { duration = 2, prefix = "", suffix = "", decimals = 0 } = options;
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: EASE.smooth,
    onUpdate() {
      target.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
    },
  });
}

/**
 * Gradient sweep text animation
 */
export function gradientSweepPreset(target: HTMLElement, options: gsap.TweenVars = {}) {
  return gsap.to(target, {
    backgroundPosition: "200% center",
    duration: DURATION.cinematic,
    ease: "none",
    ...options,
  });
}

/**
 * Clip path reveal (circle expand)
 */
export function clipRevealPreset(target: gsap.TweenTarget, options: gsap.TweenVars = {}) {
  return gsap.from(target, {
    clipPath: "circle(0% at 50% 50%)",
    duration: DURATION.cinematic,
    ease: EASE.smoothInOut,
    ...options,
  });
}

/**
 * Image wipe reveal
 */
export function wipeRevealPreset(target: gsap.TweenTarget, direction: "left" | "right" | "up" | "down" = "left", options: gsap.TweenVars = {}) {
  const clipPaths = {
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
    up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
  };

  gsap.set(target, { clipPath: clipPaths[direction].from });
  return gsap.to(target, {
    clipPath: clipPaths[direction].to,
    duration: DURATION.slow,
    ease: EASE.smoothInOut,
    ...options,
  });
}
