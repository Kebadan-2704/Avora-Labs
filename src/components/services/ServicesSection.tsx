"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { Zap, Brain, ShieldCheck, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: Zap,
    title: "Faster",
    description: "Rapid development cycles. We ship production-ready enterprise software in weeks, not months. Speed is a feature.",
    capabilities: ["Agile Sprints", "Next.js Architecture", "Rapid Prototyping"],
  },
  {
    icon: Brain,
    title: "Smarter",
    description: "AI-powered solutions natively integrated. We don't just build software, we build intelligent systems that automate workflows.",
    capabilities: ["AI Agents", "Automated Workflows", "Predictive Analytics"],
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    description: "Enterprise-grade architecture. Built on serverless infrastructure designed for 99.9% uptime and infinite scale.",
    capabilities: ["Zero Downtime", "Serverless Edge", "Military-grade Security"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { enterHover, leaveHover } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15,
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" }
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");
        gsap.fromTo(cards, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "var(--space-16)", maxWidth: "600px" }}>
          <div className="section-label">Why Avora</div>
          <h2 style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            The Avora Advantage.
          </h2>
          <p className="text-large">
            We operate at the intersection of high-speed execution and uncompromising quality.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {PILLARS.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card"
                onMouseEnter={(e) => {
                  enterHover("pointer");
                  gsap.to(e.currentTarget, {
                    y: -4,
                    boxShadow: "var(--shadow-lg)",
                    borderColor: "var(--glass-border-gold)",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  leaveHover();
                  gsap.to(e.currentTarget, {
                    y: 0,
                    boxShadow: "none",
                    borderColor: "var(--glass-border)",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                }}
                style={{
                  background: "var(--color-bg-secondary)",
                  borderRadius: "var(--radius-xl)",
                  padding: "clamp(2rem, 4vw, 3rem)",
                  border: "1px solid var(--glass-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-6)",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* Icon + Arrow row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-primary-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    style={{ color: "var(--color-text-muted)", opacity: 0.5 }}
                  />
                </div>

                {/* Title */}
                <h3 style={{ fontSize: "clamp(1.375rem, 2vw, 1.75rem)" }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "1rem", flex: 1 }}>
                  {service.description}
                </p>

                {/* Capabilities tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-2)",
                    paddingTop: "var(--space-4)",
                    borderTop: "1px solid var(--glass-border)",
                  }}
                >
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      style={{
                        padding: "0.25rem 0.625rem",
                        borderRadius: "var(--radius-full)",
                        background: "var(--color-bg)",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-text-secondary)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
