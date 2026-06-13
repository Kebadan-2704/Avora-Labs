"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Zap, BarChart3, MessageSquare, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ALL_TECH = [
  { name: "React", category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", color: "#0F0F0F" },
  { name: "TypeScript", category: "Frontend", color: "#3178C6" },
  { name: "GSAP", category: "Animation", color: "#88CE02" },
  { name: "Node.js", category: "Backend", color: "#68A063" },
  { name: "Python", category: "Backend", color: "#FFD43B" },
  { name: "PostgreSQL", category: "Database", color: "#336791" },
  { name: "Redis", category: "Caching", color: "#DC382D" },
  { name: "AWS", category: "Cloud", color: "#FF9900" },
  { name: "Vercel", category: "Cloud", color: "#0F0F0F" },
  { name: "OpenAI", category: "AI & ML", color: "#10A37F" },
  { name: "Supabase", category: "Backend", color: "#3ECF8E" },
];

const AI_CAPABILITIES = [
  {
    icon: Bot,
    title: "AI Chatbots",
    desc: "GPT-powered support agents that handle 80% of queries automatically.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    desc: "Automated lead scoring, qualification, and follow-up sequences.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    desc: "Bulk messaging, auto-replies, and conversational commerce flows.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "Data-driven insights that forecast trends and optimize decisions.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    desc: "Calendar sync, reminders, and no-show reduction automation.",
  },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

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

      if (techRef.current) {
        const tiles = techRef.current.querySelectorAll(".tech-tile");
        gsap.fromTo(tiles, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.05,
            scrollTrigger: { trigger: techRef.current, start: "top 80%" }
          }
        );
      }

      if (aiRef.current) {
        const cards = aiRef.current.querySelectorAll(".ai-cap");
        gsap.fromTo(cards, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: aiRef.current, start: "top 80%" }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="section"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="aurora" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "var(--section-padding)" }}>
          <div className="section-label">Technology & AI</div>
          <div
            style={{ display: "grid", gap: "var(--space-8)" }}
            className="grid-cols-1 md:grid-cols-[1.2fr_1fr]"
          >
            <h2>
              Built with the tools<br />that power the future.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <p className="text-large">
                Industry-leading technologies paired with intelligent automation
                to build solutions that are fast, scalable, and future-proof.
              </p>
            </div>
          </div>
        </div>

        {/* Premium App Tile Grid Redesign */}
        <div
          ref={techRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
            marginBottom: "var(--section-padding)",
          }}
        >
          {ALL_TECH.map((tech) => (
            <div
              key={tech.name}
              className="tech-tile"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "160px",
                padding: "1.5rem",
                background: "var(--color-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-lg)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "crosshair",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 32px ${tech.color}15`;
                e.currentTarget.style.borderColor = `${tech.color}40`;
                
                const glow = e.currentTarget.querySelector('.tile-glow') as HTMLElement;
                if (glow) glow.style.opacity = "1";
                
                const dot = e.currentTarget.querySelector('.tile-dot') as HTMLElement;
                if (dot) dot.style.transform = "scale(1.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.01)";
                e.currentTarget.style.borderColor = "var(--glass-border)";
                
                const glow = e.currentTarget.querySelector('.tile-glow') as HTMLElement;
                if (glow) glow.style.opacity = "0";
                
                const dot = e.currentTarget.querySelector('.tile-dot') as HTMLElement;
                if (dot) dot.style.transform = "scale(1)";
              }}
            >
              {/* Subtle hover glow */}
              <div 
                className="tile-glow"
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background: `radial-gradient(circle at top right, ${tech.color}10 0%, transparent 60%)`,
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                }}
              />
              
              {/* Top row: Category & Dot */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)"
                }}>
                  {tech.category}
                </span>
                <div 
                  className="tile-dot"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: tech.color,
                    boxShadow: `0 0 8px ${tech.color}80`,
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              {/* Bottom row: Tech Name */}
              <div style={{ zIndex: 1 }}>
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}>
                  {tech.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* AI & Automation Capabilities */}
        <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "var(--space-12)" }}>
          <div className="section-label" style={{ marginBottom: "var(--space-8)" }}>
            AI Capabilities
          </div>
          <div
            ref={aiRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {AI_CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="ai-cap"
                  style={{
                    padding: "var(--space-6)",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-bg)",
                    border: "1px solid var(--glass-border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-4)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border-gold)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ color: "var(--color-primary)" }}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 600 }}>{cap.title}</h4>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
