"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import ClientMarquee from "./ClientMarquee";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
};

const STATS: Stat[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 80, suffix: "+", label: "Global Clients" },
  { value: 200, suffix: "+", label: "Automations Built" },
];

const TESTIMONIALS = [];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15,
            scrollTrigger: { trigger: headingRef.current, start: "top 80%" }
          }
        );
      }

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
              el.textContent = `${stat.prefix || ""}${Math.floor(obj.value)}${stat.suffix}`;
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

      // Testimonials
      if (testimonialRef.current) {
        gsap.fromTo(testimonialRef.current.children, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: testimonialRef.current, start: "top 85%" }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: "var(--color-bg)", padding: 0 }}
    >
      {/* Client marquee */}
      <ClientMarquee />

      <div className="container" style={{ paddingTop: "var(--section-padding)", paddingBottom: "var(--section-padding)" }}>
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "var(--space-16)" }}>
          <div className="section-label">About Avora Labs</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-8)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: "1 1 50%", minWidth: "320px" }}>
            <h2>
              We don&apos;t build websites.<br />
              We engineer digital assets.
            </h2>
            </div>
            <div style={{ flex: "1 1 40%", minWidth: "320px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "var(--space-6)" }}>
              <p className="text-large">
                Founded in 2021, Avora Labs partners with visionary founders and
                enterprise teams to build software that doesn&apos;t just work — it
                transforms. Every project is a masterpiece of performance and design.
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <img 
                  src="/Founder%20Pic.jpeg" 
                  alt="Keba - Founder of Avora Labs, Premium Software Engineering Agency in Coimbatore" 
                  style={{ 
                    width: "64px", 
                    height: "64px", 
                    borderRadius: "50%", 
                    objectFit: "cover", 
                    border: "2px solid var(--glass-border-gold)",
                    boxShadow: "var(--shadow-gold)"
                  }} 
                />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.125rem", color: "var(--color-text)" }}>
                    Keba
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-primary)" }}>
                    Founder & Lead Engineer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-8)",
            marginBottom: "var(--section-padding)",
            paddingTop: "var(--space-10)",
            borderTop: "1px solid var(--glass-border)",
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
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
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
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  display: "block",
                  marginTop: "var(--space-2)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials removed as requested */}
      </div>
    </section>
  );
}
