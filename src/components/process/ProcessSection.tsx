"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Lightbulb, Code2, TestTube, Rocket } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your business, users, and goals. We audit your existing systems, interview stakeholders, and map the competitive landscape to build a bullet-proof strategy.",
    icon: Search,
    accent: "var(--color-primary)",
  },
  {
    number: "02",
    title: "Architecture",
    description: "We design the technical blueprint — information architecture, system design, wireframes, and prototypes. Every decision is validated before a single line of code is written.",
    icon: Lightbulb,
    accent: "#3178C6",
  },
  {
    number: "03",
    title: "Engineering",
    description: "Agile sprints with weekly deliverables. Full transparency with staging environments, code reviews, and real-time progress updates. No black boxes.",
    icon: Code2,
    accent: "#68A063",
  },
  {
    number: "04",
    title: "Testing & QA",
    description: "Rigorous cross-browser, cross-device, and performance testing. Security audits, load testing, and accessibility compliance. Nothing ships without our seal of approval.",
    icon: TestTube,
    accent: "#DC382D",
  },
  {
    number: "05",
    title: "Launch & Scale",
    description: "Zero-downtime deployment with monitoring, analytics, and 60-day post-launch support. We stay in the trenches until your product is thriving in production.",
    icon: Rocket,
    accent: "#C5A059",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15,
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" }
          }
        );
      }

      // Horizontal scroll on desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (!trackRef.current || !wrapperRef.current) return;

        const track = trackRef.current;
        const totalWidth = track.scrollWidth - window.innerWidth + 200;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });
      });

      // Mobile: simple stagger in
      mm.add("(max-width: 768px)", () => {
        const cards = sectionRef.current?.querySelectorAll(".process-card");
        if (cards) {
          cards.forEach((card) => {
            gsap.fromTo(card, 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 90%" }
              }
            );
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ background: "var(--color-bg-secondary)", overflow: "hidden" }}
    >
      {/* Header — always visible */}
      <div className="container" style={{ paddingTop: "var(--section-padding)", paddingBottom: "var(--space-16)" }}>
        <div ref={headingRef}>
          <div className="section-label">How We Work</div>
          <h2 style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            A process built for certainty.
          </h2>
          <p className="text-large" style={{ maxWidth: "500px" }}>
            Five battle-tested phases that eliminate guesswork and deliver predictable, exceptional results.
          </p>
        </div>
      </div>

      {/* Horizontal scroll wrapper — desktop */}
      <div
        ref={wrapperRef}
        className="hidden md:block"
        style={{ paddingBottom: "var(--section-padding)" }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "var(--space-6)",
            paddingLeft: "var(--container-padding)",
            paddingRight: "40vw",
            width: "max-content",
          }}
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="process-card"
                style={{
                  width: "420px",
                  height: "560px",
                  flexShrink: 0,
                  background: "var(--color-bg)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-8)",
                  border: "1px solid var(--glass-border)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.5s var(--ease-out-expo)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = step.accent;
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 24px 60px ${step.accent}15`;
                  const num = e.currentTarget.querySelector('.process-num') as HTMLElement;
                  if (num) {
                    num.style.color = `${step.accent}15`;
                    num.style.transform = "scale(1.05) translate(-10px, 10px)";
                  }
                  const iconWrap = e.currentTarget.querySelector('.icon-wrap') as HTMLElement;
                  if (iconWrap) {
                    iconWrap.style.background = step.accent;
                    iconWrap.style.color = "var(--color-bg)";
                    iconWrap.style.transform = "scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  const num = e.currentTarget.querySelector('.process-num') as HTMLElement;
                  if (num) {
                    num.style.color = "var(--color-bg-tertiary)";
                    num.style.transform = "scale(1) translate(0, 0)";
                  }
                  const iconWrap = e.currentTarget.querySelector('.icon-wrap') as HTMLElement;
                  if (iconWrap) {
                    iconWrap.style.background = `${step.accent}12`;
                    iconWrap.style.color = step.accent;
                    iconWrap.style.transform = "scale(1)";
                  }
                }}
              >
                {/* Massive Watermark Number */}
                <div
                  className="process-num"
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    fontFamily: "var(--font-display)",
                    fontSize: "12rem",
                    fontWeight: 800,
                    lineHeight: 0.8,
                    letterSpacing: "-0.05em",
                    color: "var(--color-bg-tertiary)",
                    transition: "all 0.8s var(--ease-out-expo)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                >
                  {step.number}
                </div>

                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Icon */}
                  <div
                    className="icon-wrap"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: `${step.accent}12`,
                      border: `1px solid ${step.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: step.accent,
                      marginBottom: "auto",
                      transition: "all 0.5s var(--ease-out-expo)",
                    }}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  {/* Text Container at bottom */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: step.accent, fontWeight: 600, letterSpacing: "0.1em" }}>
                        PHASE {step.number}
                      </span>
                      <div style={{ height: "1px", flex: 1, background: "var(--glass-border)" }} />
                    </div>
                    <h3 style={{ fontSize: "2rem", marginBottom: "var(--space-4)" }}>{step.title}</h3>
                    <p style={{ fontSize: "1.0625rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical stack */}
      <div
        className="md:hidden container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          paddingBottom: "var(--section-padding)",
        }}
      >
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="process-card"
              style={{
                background: "var(--color-bg)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-8)",
                border: "1px solid var(--glass-border)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "8rem",
                  fontWeight: 800,
                  lineHeight: 0.8,
                  letterSpacing: "-0.05em",
                  color: "var(--color-bg-tertiary)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                {step.number}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: `${step.accent}12`,
                    border: `1px solid ${step.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: step.accent,
                    marginBottom: "var(--space-12)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: step.accent, fontWeight: 600, letterSpacing: "0.1em" }}>
                    PHASE {step.number}
                  </span>
                  <div style={{ height: "1px", flex: 1, background: "var(--glass-border)" }} />
                </div>
                <h4 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--space-3)" }}>{step.title}</h4>
                <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
