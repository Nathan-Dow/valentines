"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, Float, Instances, Instance } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import { Model } from './Bouquet';

function RotationReporter({ onRotate }: { onRotate: (val: number) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Check both the group and its parent for the highest accuracy rotation value
      const currentRot = groupRef.current.rotation.y;
      const parentRot = groupRef.current.parent?.rotation.y || 0;
      
      const val = Math.abs(currentRot) > Math.abs(parentRot) ? currentRot : parentRot;
      onRotate(val);
    }
  });

  return (
    <group ref={groupRef}>
      <Model scale={3.5} position={[0, -1.3, 0]} />
    </group>
  );
}

function PetalParticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <Instances range={30}>
      <planeGeometry args={[0.1, 0.1]} />
      <meshStandardMaterial color="#ff4d6d" transparent opacity={0.7} side={THREE.DoubleSide} />
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <Instance 
            position={[(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]} 
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} 
          />
        </Float>
      ))}
    </Instances>
  );
}

export default function BouquetScene({ onRotate, isCarouselOpen }: { onRotate: (val: number) => void, isCarouselOpen: boolean }) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-transparent z-0 overflow-hidden">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 4.5], fov: 45 }} 
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.5, 
          outputColorSpace: THREE.SRGBColorSpace 
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#ffc2d5']} />
          <ambientLight intensity={1.5} color="#ffe4e6" /> 
          <Environment preset="city" environmentIntensity={2.5} />
          
          <PetalParticles active={isCarouselOpen} />
          
          <PresentationControls 
            global 
            speed={5} 
            snap={false}
            polar={[0, 0]} 
            azimuth={[-Infinity, Infinity]}
            damping={0.25}
          >
            <RotationReporter onRotate={onRotate} />
          </PresentationControls>

          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.2} radius={0.4} />
            <ToneMapping mode={THREE.ACESFilmicToneMapping} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}