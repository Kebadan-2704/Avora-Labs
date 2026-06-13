"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useHaptics } from "@/hooks/useHaptics";
import { ArrowRight, Check } from "lucide-react";

interface SlideToConfirmProps {
  onConfirm: () => void;
  text?: string;
  successText?: string;
}

export default function SlideToConfirm({
  onConfirm,
  text = "Slide to Confirm",
  successText = "Confirmed",
}: SlideToConfirmProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const haptics = useHaptics();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const handleDragEnd = () => {
    if (isConfirmed) return;
    
    // If dragged past 80% of container width
    if (x.get() > containerWidth * 0.8 - 60) {
      setIsConfirmed(true);
      haptics.success();
      controls.start({
        x: containerWidth - 64, // 64 is width of the dragger + some padding
        transition: { type: "spring", stiffness: 200, damping: 20 }
      });
      onConfirm();
    } else {
      haptics.error();
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
    }
  };

  const handleDragUpdate = () => {
    if (!isConfirmed && x.get() > 10) {
      // Optional: light haptic ticks while dragging
      if (Math.floor(x.get()) % 50 === 0) {
        haptics.lightClick();
      }
    }
  };

  // Map the drag X to an opacity for the background text
  const textOpacity = useTransform(x, [0, containerWidth * 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "64px",
        borderRadius: "32px",
        background: isConfirmed ? "#22c55e" : "var(--color-bg-secondary)",
        border: "1px solid var(--glass-border)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* Background Text */}
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          color: isConfirmed ? "var(--color-bg)" : "var(--color-text)",
          fontWeight: 600,
          pointerEvents: "none",
          opacity: isConfirmed ? 1 : textOpacity,
        }}
      >
        {isConfirmed ? successText : text}
      </motion.div>

      {/* Draggable Knob */}
      {!isConfirmed && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: containerWidth - 64 }}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          onDrag={handleDragUpdate}
          animate={controls}
          style={{ x }}
          className="slider-knob"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isConfirmed ? 100 : 0}
          aria-label={text}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleDragEnd(); // Or some confirm logic if they press enter
              setIsConfirmed(true);
              onConfirm();
            }
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "var(--color-text)",
              color: "var(--color-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "6px",
              cursor: "grab",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {isConfirmed ? <Check size={24} /> : <ArrowRight size={24} />}
          </div>
        </motion.div>
      )}

      {/* Confirmed State Knob (Static) */}
      {isConfirmed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "var(--color-bg)",
            color: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "6px",
          }}
        >
          <Check size={24} />
        </motion.div>
      )}
    </div>
  );
}
