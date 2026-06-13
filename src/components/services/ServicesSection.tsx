"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { Code2, Smartphone, Brain, Palette, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Code2,
    title: "Digital Architecture",
    description: "Full-stack platforms built for scale. From SaaS products to enterprise portals — we architect software that handles millions of users without breaking a sweat.",
    capabilities: ["Web Applications", "SaaS Platforms", "API Design", "Cloud Infrastructure"],
  },
  {
    icon: Smartphone,
    title: "Enterprise Applications",
    description: "Cross-platform mobile and desktop applications with native performance. Real-time sync, offline capability, and seamless user experiences.",
    capabilities: ["React Native", "Progressive Web Apps", "Real-Time Systems", "Cross-Platform"],
  },
  {
    icon: Brain,
    title: "AI & Automation",
    description: "GPT-powered chatbots, automated workflows, and intelligent analytics. We build systems that learn, adapt, and drive measurable business outcomes.",
    capabilities: ["AI Chatbots", "Workflow Automation", "Predictive Analytics", "NLP Integration"],
  },
  {
    icon: Palette,
    title: "Brand & Interface",
    description: "Award-caliber design systems and immersive digital experiences. Every pixel is intentional. Every interaction is crafted to convert.",
    capabilities: ["UI/UX Design", "Design Systems", "Motion Design", "Brand Strategy"],
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
          <div className="section-label">What We Do</div>
          <h2 style={{ maxWidth: "600px", marginBottom: "var(--space-6)" }}>
            Capabilities that engineer growth.
          </h2>
          <p className="text-large">
            Every service is designed to deliver measurable business impact —
            not just deliverables.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--space-4)",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {SERVICES.map((service) => {
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
