"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClientMarquee from "./ClientMarquee";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed", decimals: 1 },
  { value: 10, suffix: "Cr+", prefix: "₹", label: "Revenue Generated" },
  { value: 20, suffix: "+", label: "Automations Deployed" },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counters
      if (statsRef.current) {
        STATS.forEach((stat, i) => {
          const el = counterRefs.current[i];
          if (!el) return;

          const obj = { value: 0 };
          gsap.to(obj, {
            value: stat.value,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
            onUpdate: () => {
              const val = stat.decimals ? obj.value.toFixed(stat.decimals) : Math.floor(obj.value);
              el.textContent = `${stat.prefix || ""}${val}${stat.suffix}`;
            },
          });
        });

        gsap.fromTo(statsRef.current.children, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      style={{ background: "var(--color-bg)", padding: 0 }}
    >
      {/* Client marquee */}
      <ClientMarquee />

      <div className="container" style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-20)" }}>
        
        {/* Stats Row */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-8)",
            paddingTop: "var(--space-10)",
          }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <span
                ref={(el) => {
                  if (el) counterRefs.current[i] = el;
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  display: "block",
                  color: "var(--color-text)",
                  lineHeight: 1,
                }}
              >
                {stat.prefix || ""}0{stat.suffix}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  display: "block",
                  marginTop: "var(--space-3)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
