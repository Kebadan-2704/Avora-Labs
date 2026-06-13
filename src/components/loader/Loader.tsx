"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

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

    // Reveal Brand Name (Staggered letters)
    if (brandRef.current) {
      tl.to(brandRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.05
      });
    }

    // Animate the progress bar horizontally
    if (progressLineRef.current) {
      tl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut"
      }, "-=0.8"); // Start roughly when the letters start appearing
    }

    // Pause briefly
    tl.to({}, { duration: 0.5 });

    // Fade out both brand name and progress line before exit
    tl.to(
      progressLineRef.current,
      {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in"
      }
    );

    if (brandRef.current) {
      tl.to(brandRef.current.children, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.03
      }, "<");
    }

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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        {/* Brand Reveal */}
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            padding: "0 20px"
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

        {/* Sleek Progress Line directly below */}
        <div style={{
          width: "100%",
          maxWidth: "350px",
          height: "2px",
          background: "rgba(197,160,89, 0.15)",
          borderRadius: "4px",
          overflow: "hidden"
        }}>
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
    </div>
  );
}
