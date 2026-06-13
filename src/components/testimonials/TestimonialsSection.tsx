"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO",
    company: "NovaPay",
    text: "Avora Labs transformed our entire digital infrastructure. The AI chatbot they built handles 85% of our support tickets automatically. Game changer.",
  },
  {
    name: "Marcus Rivera",
    role: "Founder",
    company: "Atlas Ventures",
    text: "The website they built for us is consistently the first thing investors comment on. It communicates trust, sophistication, and scale instantly.",
  },
  {
    name: "Amira Okafor",
    role: "COO",
    company: "Pulse Health",
    text: "From concept to launch in 8 weeks. The quality of the code, the design, the animations — everything exceeded our expectations.",
  },
  {
    name: "David Park",
    role: "CTO",
    company: "Orbit Commerce",
    text: "Their automation systems saved us 120+ hours per month. The ROI was visible within the first 30 days of deployment.",
  },
  {
    name: "Elena Vasquez",
    role: "Head of Product",
    company: "MindFlow",
    text: "Working with Avora Labs felt like having a world-class engineering team as an extension of our own. Highly recommended.",
  },
  {
    name: "James Thornton",
    role: "Director",
    company: "Pinnacle Group",
    text: "They don't just build software — they understand business. Every feature they suggested directly impacted our bottom line.",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const label = headingRef.current.previousElementSibling;
        gsap.fromTo(label, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: label, start: "top 85%" } }
        );
        gsap.fromTo(headingRef.current, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
        );
      }

      // Pause marquee on hover
      [track1Ref, track2Ref].forEach((ref) => {
        const track = ref.current;
        if (!track) return;

        track.addEventListener("mouseenter", () => {
          track.style.animationPlayState = "paused";
        });
        track.addEventListener("mouseleave", () => {
          track.style.animationPlayState = "running";
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCard = (testimonial: typeof TESTIMONIALS[0], idx: number) => (
    <div
      key={`${testimonial.name}-${idx}`}
      className="glass border-gold-glow"
      style={{
        minWidth: "380px",
        maxWidth: "420px",
        padding: "2rem",
        borderRadius: "16px",
        flexShrink: 0,
        transition: "all 0.3s var(--ease-out-expo)",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3, ease: "power2.out" });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
      }}
    >
      {/* Stars */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "2px" }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="var(--color-primary)" color="var(--color-primary)" />
        ))}
      </div>

      <p
        style={{
          fontSize: "0.92rem",
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
          marginBottom: "1.5rem",
          fontStyle: "italic",
        }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-heading)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--color-primary)",
          }}
        >
          {testimonial.name[0]}
        </div>
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );

  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section"
      style={{
        background: "var(--color-bg)",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ marginBottom: "3rem" }}>
        <div style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Testimonials
          </div>
          <h2 ref={headingRef}>What our clients say</h2>
        </div>
      </div>

      {/* Row 1 — scrolling left */}
      <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
        <div
          ref={track1Ref}
          className="marquee-track"
          data-direction="left"
          style={{ gap: "1.25rem" }}
        >
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => renderCard(t, i))}
        </div>
      </div>

      {/* Row 2 — scrolling right */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={track2Ref}
          className="marquee-track"
          data-direction="right"
          style={{ gap: "1.25rem" }}
        >
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => renderCard(t, i))}
        </div>
      </div>
    </section>
  );
}
