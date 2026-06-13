"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

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

    // Pause briefly on brand name
    tl.to({}, { duration: 1.2 });

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
    </div>
  );
}
