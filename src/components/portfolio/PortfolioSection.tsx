"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
    image: "/real_baava.png",
  },
  {
    title: "Billing Software",
    category: "SaaS Application",
    problem: "Complex company selection and financial tracking caused high user churn.",
    solution: "Designed and built a robust invoicing dashboard with seamless multi-tenant architecture.",
    impact: "Reduced user onboarding time by 65%.",
    link: "https://billing-software-cyan.vercel.app/company-selection",
    tags: ["SaaS", "Dashboard", "Finance"],
    image: "/real_billing.png",
  },
  {
    title: "Costa Devices",
    category: "B2B Commerce",
    problem: "Poor product discoverability hindered enterprise sales.",
    solution: "Deployed an engaging product showcase with advanced filtering.",
    impact: "Boosted session duration by 180%.",
    link: "https://costa-devices-kappa.vercel.app/",
    tags: ["Enterprise", "Commerce"],
    image: "/real_costa.png",
  },
  {
    title: "TPH Management",
    category: "Internal Tooling",
    problem: "Manual data handling led to severe operational inefficiencies.",
    solution: "Built a secure, centralized administrative dashboard.",
    impact: "Automated 40+ hours/week.",
    link: "https://tph-management-system.vercel.app/login",
    tags: ["Admin", "System"],
    image: "/real_tph.png",
  },
  {
    title: "Amos Frank",
    category: "Personal Brand",
    problem: "Standard template portfolio failed to capture high-ticket consulting clients.",
    solution: "Engineered a sleek, high-performance interactive portfolio with advanced animations.",
    impact: "Increased inbound high-ticket inquiries by 3x.",
    link: "https://amos-frank.vercel.app/",
    tags: ["Interactive", "Creative", "Next.js"],
    image: "/real_amos.png",
  }
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      // Bento cards
      const cards = gridRef.current?.querySelectorAll(".bento-item");
      cards?.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: index * 0.1,
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
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
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
        }
        .bento-item {
          border-radius: var(--radius-xl);
          background: var(--color-text); /* Dark mode cards */
          color: var(--color-bg); /* Light text */
          border: 1px solid rgba(250, 249, 246, 0.1);
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.4s var(--ease-out-expo);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          text-decoration: none;
        }
        .bento-item:hover {
          border-color: var(--color-primary);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .bento-item:hover .arrow-icon {
          transform: translate(4px, -4px);
          color: var(--color-primary) !important;
        }
        
        .arrow-icon {
          transition: all 0.3s ease;
        }

        /* Specific Grid Placements */
        .bento-item-0 { grid-column: span 2; grid-row: span 2; }
        .bento-item-1 { grid-column: span 2; grid-row: span 1; }
        .bento-item-2 { grid-column: span 1; grid-row: span 1; }
        .bento-item-3 { grid-column: span 1; grid-row: span 1; }
        .bento-item-4 { grid-column: span 4; grid-row: span 1; }

        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-item-0 { grid-column: span 2; grid-row: span 1; }
          .bento-item-1 { grid-column: span 2; grid-row: span 1; }
          .bento-item-2 { grid-column: span 1; grid-row: span 1; }
          .bento-item-3 { grid-column: span 1; grid-row: span 1; }
          .bento-item-4 { grid-column: span 2; grid-row: span 1; }
        }

        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-item { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
        .bento-item:hover .bento-bg-img {
          opacity: 0.7 !important;
          transform: scale(1.05);
        }
      `}</style>

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

        {/* Bento Grid */}
        <div ref={gridRef} className="bento-grid">
          {PROJECTS.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`bento-item bento-item-${i}`}
              onMouseEnter={() => enterHover("pointer")}
              onMouseLeave={leaveHover}
            >
              {/* Immersive Image Background */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover", opacity: 0.4, transition: "opacity 0.4s ease" }}
                  className="bento-bg-img"
                />
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: "linear-gradient(to bottom, rgba(22, 22, 22, 0.2) 0%, var(--color-text) 100%)" 
                }} />
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Top Section: Category and Arrow */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
                  <span style={{ 
                    fontFamily: "var(--font-mono)", 
                    fontSize: "0.75rem", 
                    color: "var(--color-primary)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.1em" 
                  }}>
                    {project.category}
                  </span>
                  <ArrowUpRight className="arrow-icon" size={24} style={{ color: "rgba(250, 249, 246, 0.5)" }} />
                </div>

                {/* Middle Section: Title & Solution */}
                <div style={{ flex: 1, marginBottom: "var(--space-12)" }}>
                  <h3 style={{ 
                    fontSize: i === 0 ? "clamp(2rem, 4vw, 3.5rem)" : i === 4 ? "clamp(1.75rem, 3vw, 3rem)" : "2rem", 
                    marginBottom: "var(--space-4)", 
                    lineHeight: 1.1, 
                    letterSpacing: "-0.02em",
                    color: "var(--color-bg)"
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ 
                    fontSize: i === 0 || i === 4 ? "1.125rem" : "1rem", 
                    color: "rgba(250, 249, 246, 0.7)", 
                    lineHeight: 1.6,
                    maxWidth: "80%"
                  }}>
                    {project.solution}
                  </p>
                </div>

                {/* Bottom Section: Metric */}
                <div style={{ 
                  paddingTop: "var(--space-4)", 
                  borderTop: "1px solid rgba(250, 249, 246, 0.1)", 
                  marginTop: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)"
                }}>
                  <strong style={{ 
                    fontSize: "0.75rem", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em", 
                    color: "rgba(250, 249, 246, 0.5)" 
                  }}>
                    Business Impact
                  </strong>
                  <div style={{ 
                    fontSize: i === 0 ? "1.75rem" : "1.25rem", 
                    fontWeight: 600, 
                    color: "var(--color-primary)" 
                  }}>
                    {project.impact}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
