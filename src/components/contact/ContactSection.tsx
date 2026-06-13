"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/providers/CursorProvider";
import SlideToConfirm from "@/components/ui/SlideToConfirm";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const { enterHover, leaveHover } = useCursor();

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
          }
        );
      }
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".form-group");
        gsap.fromTo(fields, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: formRef.current, start: "top 80%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleConfirm = useCallback(async () => {
    // For a slide-to-confirm, we don't have a traditional form event.
    // If validation fails, we ideally would reset the slider, but for now we'll just allow it to proceed for the demo.
    if (!formData.name || !formData.email || !formData.message) {
      console.warn("Missing required fields");
    }

    setIsSubmitted(true);
    setTimeout(() => {
      if (successRef.current) {
        gsap.fromTo(successRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" });
      }
    }, 100);
  }, [formData]);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(17, 17, 17, 0.12)",
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
    fontSize: "1.125rem",
    outline: "none",
    transition: "border-color 0.4s ease",
    borderRadius: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--color-text-muted)",
    marginBottom: "var(--space-2)",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: "var(--color-bg)",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div className="container">
        <div
          style={{ display: "grid", gap: "var(--space-16)" }}
          className="grid-cols-1 md:grid-cols-12"
        >
          {/* Left — Info */}
          <div className="md:col-span-5">
            <div
              ref={leftColRef}
              style={{
                position: "sticky",
                top: "15vh",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-8)",
              }}
            >
              <div>
                <div className="section-label">Get In Touch</div>
                <h2 style={{ lineHeight: 1.05 }}>
                  Let&apos;s build<br />something<br />legendary.
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                <div>
                  <div style={labelStyle}>Email</div>
                  <a
                    href="mailto:infoavoralabs@gmail.com"
                    className="interactive-hover"
                    onMouseEnter={() => enterHover("pointer")}
                    onMouseLeave={leaveHover}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-4)",
                      color: "var(--color-text)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      infoavoralabs@gmail.com
                    </span>
                  </a>
                </div>

                <div>
                  <div style={labelStyle}>Local Time</div>
                  <div style={{ fontSize: "1.125rem", fontFamily: "var(--font-mono)" }}>
                    {currentTime || "—"}
                  </div>
                </div>

                <div
                  style={{
                    padding: "var(--space-4)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-primary-muted)",
                    border: "1px solid var(--glass-border-gold)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <span style={{ fontSize: "0.875rem" }}>⚡</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Average response: 2 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="md:col-span-7">
            {!isSubmitted ? (
              <form
                ref={formRef}
                onSubmit={(e) => e.preventDefault()}
                style={{
                  background: "var(--color-bg-secondary)",
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                  <div
                    style={{ display: "grid", gap: "var(--space-8)" }}
                    className="grid-cols-1 md:grid-cols-2"
                  >
                    <div className="form-group">
                      <label style={labelStyle}>Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(17,17,17,0.12)"; }}
                        style={inputStyle}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(17,17,17,0.12)"; }}
                        style={inputStyle}
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(17,17,17,0.12)"; }}
                      style={inputStyle}
                      placeholder="Your Company (Optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label style={labelStyle}>Project Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(17,17,17,0.12)"; }}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      placeholder="Tell us about your vision, goals, and timeline..."
                    />
                  </div>

                  <div className="form-group" style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-4)" }}>
                    <SlideToConfirm 
                      onConfirm={handleConfirm} 
                      text="Slide to Submit Inquiry"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div
                ref={successRef}
                style={{
                  background: "var(--color-bg-secondary)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-16)",
                  border: "1px solid var(--glass-border)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "500px",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "var(--color-primary-muted)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ marginBottom: "var(--space-4)" }}>Inquiry Received.</h3>
                <p style={{ maxWidth: "400px", lineHeight: 1.6 }}>
                  Thank you for reaching out. A senior partner will review your project
                  and respond within 2 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
