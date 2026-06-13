"use client";

import { useEffect, useRef, useState } from "react";

import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { useCursor } from "@/providers/CursorProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { enterHover, leaveHover } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple intersection observer logic for active section
      const sections = NAV_LINKS.map(l => l.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top is above middle of screen and bottom is below middle
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="hidden md:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-nav)",
        padding: isScrolled ? "1rem 0" : "1.5rem 0",
        transition: "padding 0.4s var(--ease-out-expo)",
        pointerEvents: "none", // Let clicks pass through empty space
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(2rem, 5vw, 4rem)",
            background: "var(--glass-bg)",
            backdropFilter: "saturate(180%) blur(var(--glass-blur))",
            WebkitBackdropFilter: "saturate(180%) blur(var(--glass-blur))",
            border: "1px solid var(--glass-border)",
            borderRadius: "var(--radius-full)",
            padding: isScrolled ? "0.5rem 1rem" : "0.75rem 1.5rem",
            boxShadow: isScrolled ? "var(--shadow-md)" : "var(--shadow-sm)",
            transition: "all 0.4s var(--ease-out-expo)",
            pointerEvents: "auto", // Re-enable clicks for the nav box
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            onMouseEnter={() => enterHover("pointer")}
            onMouseLeave={leaveHover}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              background: "rgba(17, 17, 17, 0.04)",
              border: "1px solid rgba(17, 17, 17, 0.08)",
              overflow: "hidden"
            }}
            aria-label="Avora Labs Home"
          >
            <Image
              src="/Logo.png"
              alt="Avora Labs"
              width={120}
              height={120}
              unoptimized
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                transform: "scale(1.2)" // Slight scale up just in case the image has built-in padding
              }}
              priority
            />
          </a>

          {/* Links (Desktop) */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "1.5rem" }}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href, { offset: -80 });
                  }}
                  onMouseEnter={() => enterHover("pointer")}
                  onMouseLeave={leaveHover}
                  style={{
                    position: "relative",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                    textDecoration: "none",
                    padding: "0.25rem 0",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-text)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  {link.name}
                  {/* Active Indicator Line */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: "50%",
                      transform: isActive ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                      width: "12px",
                      height: "2px",
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "1px",
                      transition: "transform 0.3s ease",
                      transformOrigin: "center",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <MagneticButton intensity={0.4}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              onMouseEnter={() => enterHover("pointer")}
              onMouseLeave={leaveHover}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem 1.25rem",
                background: "var(--color-text)",
                color: "var(--color-bg)",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            >
              Start Project
            </a>
          </MagneticButton>
        </nav>
      </div>
    </header>
  );
}
