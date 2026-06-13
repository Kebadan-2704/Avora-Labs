"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const ALL_PROJECTS = [
  {
    title: "Billing Software Cyan",
    category: "SaaS Application",
    problem: "Complex company selection and financial tracking caused high user churn.",
    solution: "Designed and built a robust invoicing dashboard with seamless multi-tenant architecture.",
    impact: "Reduced user onboarding time by 65%.",
    link: "https://billing-software-cyan.vercel.app/company-selection",
    tags: ["SaaS", "Dashboard", "Finance"],
  },
  {
    title: "Trinity Prayer House",
    category: "Community Platform",
    problem: "Lack of digital presence limited community engagement and outreach.",
    solution: "Developed a modern, accessible web platform for community interaction.",
    impact: "Increased online engagement by 150%.",
    link: "https://trinity-prayer-house-madukkarai.vercel.app/",
    tags: ["Community", "Web", "Platform"],
  },
  {
    title: "Costa Devices",
    category: "B2B Commerce",
    problem: "Poor product discoverability hindered enterprise sales.",
    solution: "Deployed an engaging product showcase with advanced filtering and immersive UI.",
    impact: "Boosted session duration by 180%.",
    link: "https://costa-devices-kappa.vercel.app/",
    tags: ["Enterprise", "Commerce", "UI/UX"],
  },
  {
    title: "Keba Portfolio",
    category: "Personal Brand",
    problem: "Standard template portfolio failed to capture high-ticket clients.",
    solution: "Engineered a custom, high-performance portfolio with dynamic interactions.",
    impact: "Increased personal brand visibility.",
    link: "https://keba.qzz.io/",
    tags: ["Portfolio", "Creative"],
  },
  {
    title: "Lydia Stelin",
    category: "Personal Brand",
    problem: "Required a professional digital footprint for consulting.",
    solution: "Built a sleek, responsive personal website.",
    impact: "Enhanced professional credibility and leads.",
    link: "https://lydia-stelin.vercel.app/",
    tags: ["Personal", "Web"],
  },
  {
    title: "Stitches Virid",
    category: "E-Commerce",
    problem: "Legacy storefront was slow and hard to navigate.",
    solution: "Created a fast, headless e-commerce experience.",
    impact: "Improved conversion rates by 40%.",
    link: "https://stitches-virid.vercel.app/",
    tags: ["E-Commerce", "Retail"],
  },
  {
    title: "Helmet Guard",
    category: "Product Showcase",
    problem: "Product features were not clearly communicated to buyers.",
    solution: "Developed an interactive 3D product landing page.",
    impact: "Increased product inquiries by 2x.",
    link: "https://helmet-guard.vercel.app/",
    tags: ["Product", "Landing Page"],
  },
  {
    title: "Backyard PWA App",
    category: "Web Application",
    problem: "Mobile users experienced slow load times and drops.",
    solution: "Built a Progressive Web App (PWA) for native-like performance.",
    impact: "Achieved 100% offline capability.",
    link: "https://backyard-pwa-app.vercel.app/",
    tags: ["PWA", "Mobile"],
  },
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
    title: "Amos Frank",
    category: "Personal Brand",
    problem: "Standard template portfolio failed to capture high-ticket consulting clients.",
    solution: "Engineered a sleek, high-performance interactive portfolio with advanced animations.",
    impact: "Increased inbound high-ticket inquiries by 3x.",
    link: "https://amos-frank.vercel.app/",
    tags: ["Interactive", "Creative", "Next.js"],
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
    title: "Shanthi Traders",
    category: "Business Portal",
    problem: "Inefficient inventory and order management.",
    solution: "Deployed a customized business portal for operations.",
    impact: "Streamlined supply chain workflows.",
    link: "https://shanthi-traders.vercel.app/",
    tags: ["Business", "Operations"],
  },
  {
    title: "Tri-Vent Smart Storage",
    category: "IoT Dashboard",
    problem: "Lack of real-time monitoring for smart storage facilities.",
    solution: "Developed a real-time data visualization dashboard.",
    impact: "Enabled proactive system maintenance.",
    link: "https://tri-vent-smart-storage-dashboard.vercel.app/",
    tags: ["IoT", "Dashboard", "Analytics"],
  },
  {
    title: "Nureo Step",
    category: "Health & Fitness",
    problem: "User progress tracking was cumbersome and unintuitive.",
    solution: "Created an intuitive fitness tracking interface.",
    impact: "Increased daily active users.",
    link: "https://nureo-step.vercel.app/home",
    tags: ["Health", "Tracking"],
  },
  {
    title: "Solar Irrigation",
    category: "Green Tech",
    problem: "Farmers lacked control over remote irrigation systems.",
    solution: "Built a remote control and monitoring web portal.",
    impact: "Reduced water waste by 30%.",
    link: "https://solar-irrigation.vercel.app/login",
    tags: ["Green Tech", "Agriculture", "Portal"],
  }
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { enterHover, leaveHover } = useCursor();

  useEffect(() => {
    // Refresh ScrollTrigger since new elements load
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main style={{ background: "var(--color-bg-secondary)", minHeight: "100vh", paddingTop: "140px", paddingBottom: "120px" }}>
        <div className="container" ref={containerRef}>
          {/* Header */}
          <div style={{ marginBottom: "var(--space-12)" }}>
            <Link href="/#portfolio" passHref>
              <button 
                onMouseEnter={() => enterHover("pointer")}
                onMouseLeave={leaveHover}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "var(--color-text-secondary)", cursor: "pointer", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.875rem", marginBottom: "var(--space-8)", padding: 0 }}
              >
                <ArrowLeft size={16} /> Back to Home
              </button>
            </Link>
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, marginBottom: "var(--space-4)" }}>Our Complete Portfolio</h1>
            <p className="text-large" style={{ maxWidth: "600px" }}>A showcase of all the digital products, enterprise systems, and interactive experiences we have engineered.</p>
          </div>

          {/* Projects Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
            {ALL_PROJECTS.map((project, i) => (
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
                    height: "55vh",
                    minHeight: "350px",
                    maxHeight: "550px",
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
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
