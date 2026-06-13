"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const PHRASES = [
  "Awakening systems...",
  "Loading assets...",
  "Preparing experience...",
  "Ready."
];

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // split brand text for staggered animation
    if (brandRef.current) {
      const text = brandRef.current.innerText;
      brandRef.current.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.transform = "translateY(100%)";
        span.style.opacity = "0";
        brandRef.current?.appendChild(span);
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete,
        });
      },
    });

    // Animate the counter wrapper up initially
    gsap.from(wrapperRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.floor(counter.val)}`;
        }
        if (progressLineRef.current) {
          progressLineRef.current.style.transform = `scaleX(${counter.val / 100})`;
        }
        if (phraseRef.current) {
           const idx = Math.min(Math.floor((counter.val / 100) * PHRASES.length), PHRASES.length - 1);
           phraseRef.current.textContent = PHRASES[idx];
        }
      },
    });

    // Fade out counter and phrase
    tl.to([wrapperRef.current, phraseRef.current], {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.1
    });

    // Reveal Brand Name (Staggered letters)
    if (brandRef.current) {
      tl.to(brandRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.05
      }, "-=0.2");
    }

    // Pause briefly on brand name
    tl.to({}, { duration: 0.8 });

    // Fade out brand name before exit
    if (brandRef.current) {
      tl.to(brandRef.current.children, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.03
      });
    }
    
    // Scale out progress line
    tl.to(progressLineRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, "<");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Dynamic Phrases */}
        <div
          ref={phraseRef}
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--color-text-muted)",
          }}
        >
          Awakening systems...
        </div>

        {/* Counter */}
        <div 
          ref={wrapperRef} 
          style={{ 
            display: "flex", 
            alignItems: "baseline",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            ref={counterRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(6rem, 15vw, 15rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            0
          </div>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 5rem)",
              color: "var(--color-primary)",
              marginLeft: "0.2em",
            }}
          >
            %
          </span>
        </div>

        {/* Brand Reveal */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            padding: "20px"
          }}
        >
          <div
            ref={brandRef}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex"
            }}
          >
            AVORA LABS
          </div>
        </div>

      </div>
      
      {/* Progress Line */}
      <div 
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: "rgba(197,160,89, 0.1)",
        }}
      >
        <div
          ref={progressLineRef}
          style={{
            width: "100%",
            height: "100%",
            background: "var(--color-primary)",
            transformOrigin: "left",
            transform: "scaleX(0)",
            willChange: "transform"
          }}
        />
      </div>
    </div>
  );
}
