"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { name: "LinkedIn", url: "#" },
  { name: "Twitter / X", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "GitHub", url: "#" },
  { name: "Dribbble", url: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { enterHover, leaveHover } = useCursor();
  const { scrollTo } = useSmoothScroll();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata", 
        hour: "numeric", 
        minute: "2-digit", 
        hour12: true 
      };
      setTime(`Coimbatore — ${new Intl.DateTimeFormat("en-US", options).format(now)}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Parallax background
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        position: "relative",
        background: "var(--color-text)", // Charcoal bg
        color: "var(--color-bg)",
        overflow: "hidden",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--space-8)",
      }}
    >
      {/* Parallax gold aura */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: "-50%",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "100vw",
          height: "100vw",
          background: "radial-gradient(circle, rgba(197,160,89,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Main CTA */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-20)" }}>
          <h2 style={{ color: "var(--color-bg)", marginBottom: "var(--space-6)" }}>
            Ready to scale?
          </h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)", maxWidth: "500px", margin: "0 auto var(--space-8)" }}>
            Let&apos;s discuss how we can transform your digital infrastructure to drive measurable growth.
          </p>
          <a
            href="#contact"
            className="btn-gold"
            onMouseEnter={() => enterHover("pointer")}
            onMouseLeave={leaveHover}
            style={{ padding: "1rem 2.5rem" }}
          >
            Start a Conversation
          </a>
        </div>

        {/* Footer content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-12)",
            marginBottom: "var(--space-16)",
            paddingTop: "var(--space-10)",
            borderTop: "1px solid rgba(250, 249, 246, 0.1)",
          }}
        >
          {/* Brand column */}
          <div className="col-span-1 md:col-span-2">
            <div
              style={{
                marginBottom: "var(--space-6)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/Transparent Logo.png"
                alt="Avora Labs Logo"
                width={260}
                height={85}
                style={{ objectFit: "contain", height: "5rem", width: "auto" }}
              />
            </div>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: "300px", color: "var(--color-text-muted)" }}>
              Premium technology agency crafting digital experiences that transform businesses and engineer growth.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
                marginBottom: "var(--space-6)",
              }}
            >
              Explore
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {["Portfolio", "Services", "Process", "About"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(`#${link.toLowerCase()}`, { offset: -80 });
                  }}
                  onMouseEnter={() => enterHover("pointer")}
                  onMouseLeave={leaveHover}
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
                marginBottom: "var(--space-6)",
              }}
            >
              Connect
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  onMouseEnter={() => enterHover("pointer")}
                  onMouseLeave={leaveHover}
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                >
                  {social.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
                marginBottom: "var(--space-6)",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <a 
                href="mailto:hello@avoralabs.com"
                onMouseEnter={() => enterHover("pointer")}
                onMouseLeave={leaveHover}
                style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.3s ease" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                hello@avoralabs.com
              </a>
              <span style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)" }}>
                +91 94434 37081
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid rgba(250, 249, 246, 0.1)",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "rgba(250, 249, 246, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} Avora Labs. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: "var(--space-8)", alignItems: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(250, 249, 246, 0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {time || "Coimbatore — --:-- --"}
            </div>
            {/* Back to top */}
            <button
              onClick={() => scrollTo(0, { duration: 2 })}
              onMouseEnter={() => enterHover("pointer")}
              onMouseLeave={leaveHover}
              style={{
                background: "transparent",
                border: "1px solid rgba(250, 249, 246, 0.2)",
                color: "var(--color-bg)",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(250, 249, 246, 0.2)";
                e.currentTarget.style.color = "var(--color-bg)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-label="Back to top"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
