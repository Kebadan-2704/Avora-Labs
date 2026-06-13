"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Baava Technologies",
    category: "Enterprise Infrastructure",
    problem: "Legacy website failing to convert leads and lacking technical authority.",
    solution: "Re-engineered a high-performance corporate platform with enterprise-grade headless architecture.",
    impact: "Increased organic lead generation by 240%.",
    link: "https://baava-technologies.vercel.app/",
    tags: ["Corporate", "Headless", "Next.js"],
  },
  {
    title: "Billing Software",
    category: "SaaS Application",
    problem: "Complex company selection and financial tracking caused high user churn.",
    solution: "Designed and built a robust invoicing dashboard with seamless multi-tenant architecture.",
    impact: "Reduced user onboarding time by 65%.",
    link: "https://billing-software-cyan.vercel.app/company-selection",
    tags: ["SaaS", "Dashboard", "Finance"],
  },
  {
    title: "Costa Devices",
    category: "B2B Commerce",
    problem: "Poor product discoverability hindered enterprise sales.",
    solution: "Deployed an engaging product showcase with advanced filtering and immersive UI.",
    impact: "Boosted average session duration by 180%.",
    link: "https://costa-devices-kappa.vercel.app/",
    tags: ["Enterprise", "Commerce", "UI/UX"],
  },
  {
    title: "TPH Management System",
    category: "Internal Tooling",
    problem: "Manual data handling led to severe operational inefficiencies.",
    solution: "Built a secure, centralized administrative dashboard for organizational data.",
    impact: "Automated 40+ hours per week of manual administration.",
    link: "https://tph-management-system.vercel.app/login",
    tags: ["Admin", "System", "Secure"],
  },
  {
    title: "Amos Frank",
    category: "Personal Brand",
    problem: "Standard template portfolio failed to capture high-ticket consulting clients.",
    solution: "Engineered a sleek, high-performance interactive portfolio with advanced animations.",
    impact: "Increased inbound high-ticket inquiries by 3x.",
    link: "https://amos-frank.vercel.app/",
    tags: ["Interactive", "Creative", "Next.js"],
  }
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { enterHover, leaveHover } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15,
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" }
          }
        );
      }

      // Project cards
      const cards = sectionRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "var(--space-16)" }}>
          <div className="section-label">Case Studies</div>
          <h2 style={{ maxWidth: "700px", marginBottom: "var(--space-6)" }}>
            Systems that deliver ROI.
          </h2>
          <p style={{ maxWidth: "500px" }} className="text-large">
            We don&apos;t just ship code. We build digital products that solve massive business problems and scale operations.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="project-card"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "var(--space-8)",
              }}
            >
              {/* Info row */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "var(--space-8)",
                  alignItems: "flex-end",
                  flexWrap: "wrap"
                }}
              >
                {/* Left: title + description */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-primary)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} — {project.category}
                  </div>
                  <h3
                    style={{
                      marginBottom: "var(--space-6)",
                      fontSize: "2rem",
                      fontWeight: 800,
                    }}
                  >
                    {project.title}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "var(--space-6)" }}>
                    <div>
                      <strong style={{ color: "var(--color-text)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" }}>The Problem</strong>
                      <p style={{ margin: 0, fontSize: "1rem" }}>{project.problem}</p>
                    </div>
                    <div>
                      <strong style={{ color: "var(--color-text)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" }}>The Solution</strong>
                      <p style={{ margin: 0, fontSize: "1rem" }}>{project.solution}</p>
                    </div>
                    <div style={{ padding: "1rem", background: "rgba(197, 160, 89, 0.1)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--color-primary)" }}>
                      <strong style={{ color: "var(--color-text)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" }}>Business Impact</strong>
                      <p style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text)" }}>{project.impact}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-4)" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "var(--radius-full)",
                          background: "var(--color-bg)",
                          border: "1px solid var(--glass-border)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Button */}
                <div style={{ flexShrink: 0 }}>
                  <button 
                    onClick={() => window.open(project.link, "_blank")}
                    onMouseEnter={() => enterHover("pointer")}
                    onMouseLeave={leaveHover}
                    className="btn-outline"
                    style={{
                      background: "var(--color-bg)",
                      gap: "0.5rem"
                    }}
                  >
                    View Full Website
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              {/* Iframe Website Container */}
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  minHeight: "600px",
                  maxHeight: "900px",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  position: "relative",
                  background: "var(--color-bg-tertiary)",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div style={{
                  background: "rgba(250, 249, 246, 0.4)",
                  height: "32px",
                  borderBottom: "1px solid var(--glass-border)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  gap: "6px"
                }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
                  <div style={{ flex: 1, textAlign: "center", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                    {project.link.replace("https://", "")}
                  </div>
                </div>
                <iframe 
                  src={project.link} 
                  title={project.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "calc(100% - 32px)",
                    border: "none",
                    pointerEvents: "auto",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

