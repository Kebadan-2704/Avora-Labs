"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import dynamic from "next/dynamic";

const Hero3DObject = dynamic(() => import("@/components/hero/Hero3DObject"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { enterHover, leaveHover } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge
      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
        }, 0);
      }

      // Headline — line by line
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.from(lines, {
          y: "110%",
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.12,
        }, 0.1);
      }

      // Sub
      if (subRef.current) {
        tl.from(subRef.current, {
          y: 30, opacity: 0, duration: 1, ease: "power3.out",
        }, 0.7);
      }

      // CTA
      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
        }, 0.9);
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.from(scrollIndicatorRef.current, {
          opacity: 0, duration: 1, ease: "power2.out",
        }, 1.2);

        gsap.to(scrollIndicatorRef.current.querySelector(".scroll-line"), {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Parallax on scroll
      if (sectionRef.current && headlineRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (headlineRef.current) {
              gsap.set(headlineRef.current, {
                y: p * 80,
                opacity: 1 - p * 1.5,
              });
            }
            if (subRef.current) {
              gsap.set(subRef.current, {
                y: p * 40,
                opacity: 1 - p * 2,
              });
            }
          },
        });
      }

      // Animated Background Shapes
      const shapes = sectionRef.current?.querySelectorAll(".bg-shape");
      if (shapes) {
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            x: "random(-10vw, 10vw)",
            y: "random(-10vh, 10vh)",
            rotation: "random(-45, 45)",
            scale: "random(0.8, 1.2)",
            duration: "random(15, 25)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * -3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
        paddingTop: "clamp(80px, 12vh, 120px)",
        paddingBottom: "5rem",
      }}
    >
      {/* Premium Animated Background */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div className="bg-shape" style={{
          position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 60%)",
          filter: "blur(60px)", borderRadius: "50%",
        }} />
        <div className="bg-shape" style={{
          position: "absolute", bottom: "-20%", right: "-10%", width: "60vw", height: "60vw",
          background: "radial-gradient(circle, rgba(17, 17, 17, 0.04) 0%, transparent 60%)",
          filter: "blur(80px)", borderRadius: "50%",
        }} />
        <div className="bg-shape" style={{
          position: "absolute", top: "20%", left: "40%", width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)", borderRadius: "50%",
        }} />
        
        {/* Fine Noise Texture for Premium Feel */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Interactive 3D Hero Object */}
      <div 
        className="hidden md:block"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "auto", // allow mouse interaction with 3D canvas
        }}
      >
        <Hero3DObject />
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1rem, 2vh, 1.5rem)",
        }}
      >
        {/* Availability badge */}
        <div
          ref={badgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            alignSelf: "flex-start",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--glass-border)",
            background: "var(--color-bg-card)",
            fontSize: "0.8125rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.02em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#34C759",
              boxShadow: "0 0 8px rgba(52,199,89,0.4)",
            }}
          />
          Accepting new projects for Q3 2026
        </div>

        {/* SEO Hidden H1 */}
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Top Web Development & AI Software Agency in India
        </h1>

        <h2
          ref={headlineRef}
          style={{
            maxWidth: "900px",
            marginTop: 0,
            marginBottom: "0.5rem",
            fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          <div style={{ overflow: "hidden", paddingTop: "0.2em", marginTop: "-0.2em", paddingBottom: "0.8em", marginBottom: "-0.8em" }}>
            <span className="hero-line" style={{ display: "block", willChange: "transform" }}>
              We build digital
            </span>
          </div>
          <div style={{ overflow: "hidden", paddingTop: "0.2em", marginTop: "-0.2em", paddingBottom: "0.8em", marginBottom: "-0.8em" }}>
            <span className="hero-line" style={{ display: "block", willChange: "transform" }}>
              systems that
            </span>
          </div>
          <div style={{ overflow: "hidden", paddingTop: "0.2em", marginTop: "-0.2em", paddingBottom: "0.8em", marginBottom: "-0.8em" }}>
            <span
              className="hero-line text-gradient-gold-animated"
              style={{
                display: "block",
                willChange: "transform",
                paddingBottom: "0.5em"
              }}
            >
              Generate Revenue.
            </span>
          </div>
        </h2>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            maxWidth: "520px",
            marginTop: 0,
            marginBottom: "0.5rem",
            fontWeight: 400,
          }}
        >
          Custom websites, AI agents, business automation and scalable software for ambitious companies. We don&apos;t just write code — we build growth engines.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <MagneticButton intensity={0.4}>
            <a
              href="#contact"
              className="btn-primary"
              onMouseEnter={() => enterHover("pointer")}
              onMouseLeave={leaveHover}
              style={{ padding: "1.125rem 2.5rem", borderRadius: "9999px" }}
            >
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </MagneticButton>
          <MagneticButton intensity={0.2}>
            <a
              href="#portfolio"
              className="btn-outline"
              onMouseEnter={() => enterHover("pointer")}
              onMouseLeave={leaveHover}
              style={{ 
                padding: "1.125rem 2.5rem", 
                borderRadius: "9999px",
                border: "1.5px solid var(--color-text)",
                background: "transparent",
                color: "var(--color-text)",
                fontWeight: 500
              }}
            >
              View Case Studies
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: "clamp(1rem, 3vh, 2rem)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "rgba(17,17,17,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="scroll-line"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "var(--color-primary)",
              transformOrigin: "top",
              transform: "scaleY(0)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
