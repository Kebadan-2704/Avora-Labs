"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";



export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15,
            scrollTrigger: { trigger: headingRef.current, start: "top 80%" }
          }
        );
      }

      // Testimonials
      if (testimonialRef.current) {
        gsap.fromTo(testimonialRef.current.children, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: testimonialRef.current, start: "top 85%" }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: "var(--color-bg)", padding: 0 }}
    >
      <div className="container" style={{ paddingTop: "var(--section-padding)", paddingBottom: "var(--section-padding)" }}>
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "var(--space-16)" }}>
          <div className="section-label">A Letter from the Founder</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-8)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: "1 1 50%", minWidth: "320px" }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              &quot;We don&apos;t build toys.<br />
              We build engines that drive revenue.&quot;
            </h2>
            </div>
            <div style={{ flex: "1 1 40%", minWidth: "320px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "var(--space-6)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <p className="text-large">
                  When I started Avora Labs, I noticed a massive problem in the agency space.
                  Too many developers were focused on building things that looked pretty, but failed
                  to move the needle for the actual business.
                </p>
                <p className="text-large">
                  A website or application should not be an expense. It should be your highest-performing sales asset, 
                  your most reliable employee, and the foundation of your digital growth.
                </p>
                <p className="text-large">
                  That is why we don&apos;t just write code. We partner with you to understand your business model,
                  identify the bottlenecks, and engineer digital systems that solve real problems.
                </p>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <Image 
                  src="/Founder%20Pic.jpeg" 
                  alt="Keba - Founder of Avora Labs, Premium Software Engineering Agency in Coimbatore" 
                  width={64}
                  height={64}
                  style={{ 
                    width: "64px", 
                    height: "64px", 
                    borderRadius: "50%", 
                    objectFit: "cover", 
                    border: "2px solid var(--glass-border-gold)",
                    boxShadow: "var(--shadow-gold)"
                  }} 
                />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.125rem", color: "var(--color-text)" }}>
                    Keba
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-primary)" }}>
                    Founder & Lead Engineer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials removed as requested */}
      </div>
    </section>
  );
}
