"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const { mouse, viewport } = useThree();

  // Mouse parallax and rotation
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Base rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    // Mouse parallax (target rotation based on mouse)
    const targetX = (mouse.y * viewport.height) / 8;
    const targetY = (mouse.x * viewport.width) / 8;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);

    if (materialRef.current) {
      const time = state.clock.elapsedTime;
      materialRef.current.distort = 0.4 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[2, 20]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#111111"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3DObject() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]} // Optimize for high DPI displays
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#C5A059" />
          
          <AbstractShape />

          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
