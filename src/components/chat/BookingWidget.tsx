"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Calendar, X, ChevronRight, Clock, Video, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function BookingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"greeting" | "calendar" | "success">("greeting");
  const [selectedDate, setSelectedDate] = useState(1);

  // Prevent background scrolling when open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Context-aware FAB logic
  const [scrollDepth, setScrollDepth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollDepth(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const FabIcon = scrollDepth > 800 ? MessageSquare : Calendar;

  const handleBook = () => {
    setStep("success");
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setStep("greeting"), 500); // reset after close
    }, 3000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group md:bottom-6 md:right-6 md:w-[60px] md:h-[60px] bottom-[100px] right-4 w-[50px] h-[50px]"
        style={{
          position: "fixed",
          zIndex: 9999,
          borderRadius: "50%",
          background: "var(--color-text)",
          color: "var(--color-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          border: "none",
          cursor: "pointer",
          transition: "transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease",
          transform: isOpen ? "scale(0) opacity(0)" : "scale(1) opacity(1)",
          pointerEvents: isOpen ? "none" : "auto",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.15)";
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scrollDepth > 800 ? "msg" : "cal"}
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <FabIcon size={24} />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(17, 17, 17, 0.2)",
              backdropFilter: "blur(4px)",
              zIndex: 9998,
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: window.innerWidth < 768 ? "0" : "var(--space-6)",
              right: window.innerWidth < 768 ? "0" : "var(--space-6)",
              width: window.innerWidth < 768 ? "100%" : "380px",
              height: window.innerWidth < 768 ? "85vh" : "auto",
              minHeight: "450px",
              background: "var(--color-bg)",
              borderRadius: window.innerWidth < 768 ? "var(--radius-xl) var(--radius-xl) 0 0" : "var(--radius-xl)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.12)",
              border: "1px solid var(--glass-border)",
              zIndex: 10000,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "var(--space-5)",
                background: "var(--color-text)",
                color: "var(--color-bg)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 10px #22c55e",
                  }}
                />
                <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                  Engineering Team Online
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-bg)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                  opacity: 0.7,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div style={{ padding: "var(--space-6)", flex: 1, display: "flex", flexDirection: "column" }}>
              <AnimatePresence mode="wait">
                {step === "greeting" && (
                  <motion.div
                    key="greeting"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--space-2)" }}>
                      Ready to build something legendary?
                    </h3>
                    <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-8)", lineHeight: 1.6 }}>
                      Skip the generic sales calls. Schedule a direct technical consultation with a senior engineer today.
                    </p>

                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                      <button
                        onClick={() => setStep("calendar")}
                        className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "space-between" }}
                      >
                        Schedule a Meet <ChevronRight size={18} />
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn-outline"
                        style={{ width: "100%" }}
                      >
                        Maybe Later
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "calendar" && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "var(--space-6)" }}>Select a Time</h3>
                    
                    {/* Premium Calendar UI */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "var(--space-8)" }}>
                      {["Mon", "Tue", "Wed", "Thu"].map((day, i) => {
                        const isSelected = i === selectedDate;
                        return (
                          <div
                            key={day}
                            onClick={() => setSelectedDate(i)}
                            style={{
                              padding: "0.75rem 0",
                              textAlign: "center",
                              background: isSelected ? "var(--color-primary)" : "var(--color-bg-tertiary)",
                              color: isSelected ? "var(--color-bg)" : "var(--color-text)",
                              borderRadius: "var(--radius-md)",
                              border: isSelected ? "1px solid var(--color-primary)" : "1px solid var(--glass-border)",
                              cursor: "pointer",
                              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                              boxShadow: isSelected ? "0 8px 20px rgba(197, 160, 89, 0.35)" : "none",
                              transform: isSelected ? "scale(1.05)" : "scale(1)",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = "var(--color-bg-secondary)";
                                e.currentTarget.style.borderColor = "var(--color-text-muted)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = "var(--color-bg-tertiary)";
                                e.currentTarget.style.borderColor = "var(--glass-border)";
                              }
                            }}
                          >
                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", opacity: isSelected ? 1 : 0.6, marginBottom: "4px" }}>{day}</div>
                            <div style={{ fontWeight: 800, fontSize: "1.25rem" }}>{14 + i}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "var(--space-4)" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-primary)", boxShadow: "0 0 8px rgba(197, 160, 89, 0.6)" }} />
                      <h4 style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-secondary)", margin: 0 }}>
                        Available Slots
                      </h4>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "var(--space-6)" }}>
                      {["10:00 AM", "1:30 PM", "3:00 PM"].map((time) => (
                        <div
                          key={time}
                          onClick={handleBook}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-3)",
                            padding: "1rem",
                            background: "var(--color-bg-secondary)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--color-bg-tertiary)";
                            e.currentTarget.style.borderColor = "var(--color-primary)";
                            e.currentTarget.style.transform = "translateX(5px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--color-bg-secondary)";
                            e.currentTarget.style.borderColor = "var(--glass-border)";
                            e.currentTarget.style.transform = "translateX(0px)";
                          }}
                        >
                          <Clock size={18} color="var(--color-primary)" />
                          <span style={{ fontWeight: 600, fontSize: "1rem", color: "var(--color-text)" }}>{time}</span>
                          <span style={{ marginLeft: "auto", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", background: "var(--color-bg)", padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid var(--glass-border)" }}>EST</span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setStep("greeting")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-text-secondary)",
                        cursor: "pointer",
                        marginTop: "auto",
                        textAlign: "center",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        fontSize: "0.875rem",
                        transition: "color 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                    >
                      <ArrowLeft size={16} /> Back to Options
                    </button>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "var(--color-bg-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "var(--space-6)",
                        color: "#22c55e",
                      }}
                    >
                      <Video size={32} />
                    </div>
                    <h3 style={{ marginBottom: "var(--space-2)" }}>Meeting Scheduled!</h3>
                    <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                      A calendar invite with the Google Meet link has been sent to your email. We look forward to speaking with you.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
