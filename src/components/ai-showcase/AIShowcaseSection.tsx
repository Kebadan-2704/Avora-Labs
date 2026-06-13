"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AUTOMATIONS = [
  { id: "chatbot", title: "AI Chatbots", desc: "GPT-powered support agents that handle 80% of queries automatically", x: 15, y: 20 },
  { id: "leadgen", title: "Lead Generation", desc: "Automated lead scoring, qualification, and follow-up sequences", x: 75, y: 15 },
  { id: "whatsapp", title: "WhatsApp Automation", desc: "Bulk messaging, auto-replies, and conversational commerce flows", x: 20, y: 65 },
  { id: "crm", title: "CRM Integration", desc: "Seamless data sync across HubSpot, Salesforce, and custom CRMs", x: 50, y: 45 },
  { id: "booking", title: "Appointment Booking", desc: "Calendar sync, reminders, and no-show reduction automation", x: 80, y: 70 },
];

const CONNECTIONS = [
  ["chatbot", "crm"],
  ["leadgen", "crm"],
  ["crm", "whatsapp"],
  ["crm", "booking"],
  ["chatbot", "leadgen"],
];

export default function AIShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        const label = headingRef.current.previousElementSibling;
        gsap.from(label, {
          x: -30, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
        gsap.from(headingRef.current, {
          y: 60, opacity: 0, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }

      // Nodes
      if (graphRef.current) {
        const nodes = graphRef.current.querySelectorAll(".ai-node");
        gsap.from(nodes, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.12,
          scrollTrigger: { trigger: graphRef.current, start: "top 75%" },
        });

        // Pulse animation on nodes
        nodes.forEach((node) => {
          gsap.to(node.querySelector(".node-pulse"), {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power2.out",
            delay: Math.random() * 2,
          });
        });
      }
    }, sectionRef);

    // Animated connection lines
    const canvas = canvasRef.current;
    if (!canvas) return () => ctx.revert();
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return () => ctx.revert();

    let animFrame: number;
    let time = 0;

    const animate = () => {
      if (!canvasCtx || !canvas) return;
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      CONNECTIONS.forEach(([fromId, toId]) => {
        const from = AUTOMATIONS.find((a) => a.id === fromId);
        const to = AUTOMATIONS.find((a) => a.id === toId);
        if (!from || !to) return;

        const x1 = (from.x / 100) * canvas.width;
        const y1 = (from.y / 100) * canvas.height;
        const x2 = (to.x / 100) * canvas.width;
        const y2 = (to.y / 100) * canvas.height;

        // Draw dashed line
        canvasCtx.beginPath();
        canvasCtx.setLineDash([4, 6]);
        canvasCtx.moveTo(x1, y1);
        canvasCtx.lineTo(x2, y2);
        canvasCtx.strokeStyle = "rgba(212, 175, 55, 0.15)";
        canvasCtx.lineWidth = 1;
        canvasCtx.stroke();
        canvasCtx.setLineDash([]);

        // Moving data packet
        const progress = ((Math.sin(time + CONNECTIONS.indexOf([fromId, toId]) * 1.5) + 1) / 2);
        const px = x1 + (x2 - x1) * progress;
        const py = y1 + (y2 - y1) * progress;

        canvasCtx.beginPath();
        canvasCtx.arc(px, py, 3, 0, Math.PI * 2);
        canvasCtx.fillStyle = "rgba(212, 175, 55, 0.6)";
        canvasCtx.fill();

        canvasCtx.beginPath();
        canvasCtx.arc(px, py, 8, 0, Math.PI * 2);
        canvasCtx.fillStyle = "rgba(212, 175, 55, 0.1)";
        canvasCtx.fill();
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ctx.revert();
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-showcase"
      className="section"
      style={{ background: "var(--color-bg)", position: "relative" }}
    >
      <div className="aurora" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            AI & Automation
          </div>
          <h2 ref={headingRef}>Intelligent systems that work 24/7</h2>
          <p style={{ maxWidth: "600px", margin: "1.5rem auto 0", fontSize: "1.05rem" }}>
            We build automated workflows that connect your tools, engage your customers,
            and grow your revenue — even while you sleep.
          </p>
        </div>

        {/* Automation flow graph */}
        <div
          ref={graphRef}
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(400px, 50vw, 600px)",
            margin: "0 auto",
          }}
        >
          {/* Connection lines canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />

          {/* Nodes */}
          {AUTOMATIONS.map((auto) => (
            <div
              key={auto.id}
              className="ai-node glass-gold border-gold-glow"
              style={{
                position: "absolute",
                left: `${auto.x}%`,
                top: `${auto.y}%`,
                transform: "translate(-50%, -50%)",
                padding: "1.25rem 1.5rem",
                borderRadius: "16px",
                maxWidth: "200px",
                zIndex: 2,
                textAlign: "center",
              }}
            >
              {/* Pulse effect */}
              <div
                className="node-pulse"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  pointerEvents: "none",
                }}
              />

              <h4
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "0.35rem",
                }}
              >
                {auto.title}
              </h4>
              <p
                style={{
                  fontSize: "0.7rem",
                  lineHeight: 1.5,
                  color: "var(--color-text-secondary)",
                }}
              >
                {auto.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
