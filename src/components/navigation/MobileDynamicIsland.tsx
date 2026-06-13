"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Grid, Mail, X } from "lucide-react";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

const NAV_ITEMS = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "Services", icon: Briefcase, href: "#services" },
  { name: "Process", icon: Grid, href: "#process" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export default function MobileDynamicIsland() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  return (
    <div className="md:hidden">
      {/* Background Blur Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(17, 17, 17, 0.4)",
              backdropFilter: "blur(8px)",
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Island Pill */}
      <motion.div
        layout
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "fixed",
          bottom: isOpen ? "var(--space-6)" : "var(--space-6)",
          left: "50%",
          transform: "translateX(-50%)",
          width: isOpen ? "calc(100% - var(--space-12))" : "200px",
          height: isOpen ? "300px" : "56px",
          background: "var(--glass-bg)",
          backdropFilter: "saturate(180%) blur(20px)",
          border: "1px solid var(--glass-border)",
          borderRadius: isOpen ? "var(--radius-2xl)" : "var(--radius-full)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          zIndex: 9999,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(true)}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1.5rem",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-primary)", boxShadow: "0 0 10px var(--color-primary)" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Menu</span>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-text)" }} />
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-text)" }} />
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-text)" }} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "var(--space-6)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>Navigation</span>
                <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", color: "var(--color-text)" }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(item.href);
                        setIsOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-4)",
                        textDecoration: "none",
                        color: "var(--color-text)",
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        padding: "0.5rem",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <Icon size={20} style={{ color: "var(--color-primary)" }} />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
