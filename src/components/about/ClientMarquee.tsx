"use client";

import { useEffect, useRef } from "react";


const CLIENTS = [
  "NovaPay Finance",
  "Atlas Ventures",
  "Pulse Health",
  "Orbit Commerce",
  "MindFlow AI",
  "Pinnacle Group",
  "Aura Cosmetics",
  "Nexus Tech",
];

export default function ClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add pause/play on hover
    if (trackRef.current) {
      const track = trackRef.current;
      track.addEventListener("mouseenter", () => {
        track.style.animationPlayState = "paused";
      });
      track.addEventListener("mouseleave", () => {
        track.style.animationPlayState = "running";
      });
    }
  }, []);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--glass-border)",
        background: "var(--color-bg-secondary)",
        padding: "1rem 0",
        overflow: "hidden",
      }}
    >
      <div
        ref={trackRef}
        className="marquee-track"
        data-direction="left"
        style={{
          display: "flex",
          gap: "4rem",
          alignItems: "center",
          width: "max-content",
        }}
      >
        {/* Render 3 sets of clients to ensure seamless looping */}
        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
          <div
            key={`${client}-${i}`}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--color-text)",
              opacity: 0.4,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              transition: "opacity 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "0.4")}
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}
