"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useCursor } from "@/providers/CursorProvider";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

export default function CustomCursor() {
  const { variant, text } = useCursor();
  const isMobile = useIsMobile();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);

    const updateCursor = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      
      // Very fast, buttery lerp
      posRef.current.x += dx * 0.4;
      posRef.current.y += dy * 0.4;

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: posRef.current.x,
          y: posRef.current.y,
          xPercent: -50,
          yPercent: -50,
        });
      }
    };

    gsap.ticker.add(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(updateCursor);
    };
  }, [isMobile, handleMouseMove]);

  // Animate cursor size/state changes
  useEffect(() => {
    if (!cursorRef.current || isMobile) return;

    const sizes = {
      default: { width: 16, height: 16 },
      pointer: { width: 60, height: 60 },
      text: { width: 120, height: 120 },
      magnetic: { width: 60, height: 60 },
      hidden: { width: 0, height: 0 },
    };

    const size = sizes[variant];

    gsap.to(cursorRef.current, {
      width: size.width,
      height: size.height,
      duration: 0.3,
      ease: "power2.out",
    });

    // Show/hide text
    if (cursorTextRef.current) {
      gsap.to(cursorTextRef.current, {
        opacity: variant === "text" ? 1 : 0,
        scale: variant === "text" ? 1 : 0.5,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [variant, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform, width, height",
        }}
      >
        {/* The actual blob */}
        <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
          <Canvas camera={{ position: [0, 0, 2] }} gl={{ alpha: true }}>
            <ambientLight intensity={2} />
            <directionalLight position={[2, 2, 2]} intensity={2} />
            <mesh scale={1.2}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <MeshDistortMaterial
                color={variant === "default" ? "#111111" : "#c5a059"}
                speed={5}
                distort={0.4}
                radius={1}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </Canvas>
        </div>

        <span
          ref={cursorTextRef}
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-heading)",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "var(--color-bg)",
            opacity: 0,
            transform: "scale(0.5)",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      </div>
    </>
  );
}
