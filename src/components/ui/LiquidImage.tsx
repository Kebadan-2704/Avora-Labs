"use client";

import { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHoverState;
  
  void main() {
    vec2 uv = vUv;
    
    // Liquid distortion effect based on hover state
    float waveX = sin(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
    float waveY = cos(uv.x * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
    
    uv.x += waveX;
    uv.y += waveY;
    
    // Zoom effect on hover
    uv = mix(uv, uv * 0.9 + 0.05, uHoverState * 0.5);
    
    vec4 textureColor = texture2D(uTexture, uv);
    gl_FragColor = textureColor;
  }
`;

function Scene({ src, isHovered }: { src: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(src);
  
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      // Lerp hover state for smooth transition
      const targetHover = isHovered ? 1 : 0;
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        targetHover,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LiquidImage({ src, alt }: { src: string; alt: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene src={src} isHovered={isHovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
