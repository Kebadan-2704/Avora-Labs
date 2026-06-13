"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Amos Frank",
    category: "Personal Portfolio",
    description: "A sleek and modern personal portfolio showcasing professional achievements and projects.",
    link: "https://amos-frank.vercel.app/",
    tags: ["Portfolio", "Creative", "Next.js"],
  },
  {
    title: "Keba",
    category: "Personal Portfolio",
    description: "An interactive personal website designed to highlight skills, experience, and creative work.",
    link: "https://keba.qzz.io/",
    tags: ["Interactive", "Web Design"],
  },
  {
    title: "Baava Technologies",
    category: "Business Portfolio",
    description: "A sophisticated corporate digital presence for Baava Technologies. Built to communicate trust, scale, and technical excellence.",
    link: "https://baava-technologies.vercel.app/",
    tags: ["Corporate", "Business", "Next.js"],
  },
  {
    title: "Costa Devices",
    category: "Business Portfolio",
    description: "An engaging business portfolio for Costa Devices, showcasing their products and enterprise solutions.",
    link: "https://costa-devices-kappa.vercel.app/",
    tags: ["Enterprise", "Showcase"],
  },
  {
    title: "Trinity Prayer House",
    category: "Church Portfolios",
    description: "A welcoming and comprehensive website for Trinity Prayer House Madukkarai, featuring event schedules and community resources.",
    link: "https://trinity-prayer-house-madukkarai.vercel.app/",
    tags: ["Community", "Church", "Events"],
  },
  {
    title: "Billing Software",
    category: "Service Softwares",
    description: "A robust billing and invoicing management software designed for seamless company selection and financial tracking.",
    link: "https://billing-software-cyan.vercel.app/company-selection",
    tags: ["SaaS", "Dashboard", "Finance"],
  },
  {
    title: "TPH Management System",
    category: "Service Softwares",
    description: "A secure and efficient management system dashboard tailored for organizational administration and data handling.",
    link: "https://tph-management-system.vercel.app/login",
    tags: ["Admin", "System", "Secure"],
  },
  {
    title: "Lydia & Stelin",
    category: "Wedding Websites",
    description: "A beautiful and elegant wedding website to celebrate Lydia and Stelin's special day, featuring RSVP and event details.",
    link: "https://lydia-stelin.vercel.app/",
    tags: ["Wedding", "Event", "Elegant"],
  },
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
          <div className="section-label">Selected Work</div>
          <h2 style={{ maxWidth: "700px", marginBottom: "var(--space-6)" }}>
            Projects that prove the point.
          </h2>
          <p style={{ maxWidth: "500px" }} className="text-large">
            We don&apos;t just ship code. We build digital products that transform
            businesses and set new industry benchmarks. Experience them live below.
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
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ maxWidth: "600px", fontSize: "1rem" }}>
                    {project.description}
                  </p>

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

