import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { AnatomyRegion, HealthStatus } from '../../types';
import { getStatusColor } from '../../utils/statusColors';

interface Anatomy3DCanvasProps {
  selectedRegion: AnatomyRegion | null;
  onSelectRegion: (region: AnatomyRegion) => void;
  regionStatuses: Record<AnatomyRegion, HealthStatus>;
}

// 3D Region Node Component
interface OrganNodeProps {
  position: [number, number, number];
  regionId: AnatomyRegion;
  label: string;
  status: HealthStatus;
  isSelected: boolean;
  onSelect: (region: AnatomyRegion) => void;
  scale?: number;
}

const OrganNode: React.FC<OrganNodeProps> = ({
  position,
  regionId,
  label,
  status,
  isSelected,
  onSelect,
  scale = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const color = getStatusColor(status);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      if (isSelected || hovered) {
        meshRef.current.scale.setScalar(scale * (1.15 + Math.sin(time * 4) * 0.08));
      } else {
        meshRef.current.scale.setScalar(scale);
      }
    }
    if (glowRef.current) {
      const time = state.clock.getElapsedTime();
      glowRef.current.scale.setScalar(scale * (1.3 + Math.sin(time * 3) * 0.15));
    }
  });

  return (
    <group position={position}>
      {/* Outer Glow Halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.35 : hovered ? 0.25 : 0.12}
        />
      </mesh>

      {/* Core Clickable Node */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(regionId);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.6 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Label billboard */}
      {(isSelected || hovered) && (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, 0.35, 0]}
            fontSize={0.12}
            color="#22d3ee"
            anchorX="center"
            anchorY="middle"
          >
            {label.toUpperCase()}
          </Text>
        </Float>
      )}
    </group>
  );
};

// Stylized Anatomical Wireframe Figure
const HolographicMannequin: React.FC = () => {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.18, 16]} />
        <meshStandardMaterial color="#0284c7" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.38, 0.26, 0.95, 20]} />
        <meshStandardMaterial
          color="#0369a1"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.28, 0.24, 0.3, 16]} />
        <meshStandardMaterial color="#0284c7" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.52, 0.8, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.08, 0.06, 0.85, 12]} />
        <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.52, 0.8, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.08, 0.06, 0.85, 12]} />
        <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, -0.55, 0]}>
        <cylinderGeometry args={[0.1, 0.07, 1.25, 14]} />
        <meshStandardMaterial color="#0369a1" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, -0.55, 0]}>
        <cylinderGeometry args={[0.1, 0.07, 1.25, 14]} />
        <meshStandardMaterial color="#0369a1" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Base Grid Plate */}
      <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 1.2, 32]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

export const Anatomy3DCanvas: React.FC<Anatomy3DCanvasProps> = ({
  selectedRegion,
  onSelectRegion,
  regionStatuses,
}) => {
  return (
    <div className="w-full h-full min-h-[460px] relative rounded-xl overflow-hidden bg-slate-950/70 border border-cyan-500/20">
      {/* 3D Instructions Overlay */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none font-mono text-[11px] text-cyan-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
        <span className="font-semibold text-white">INTERACTIVE 3D ANATOMY</span>
        <div className="text-gray-400 text-[10px]">
          Drag to rotate • Scroll to zoom • Click organ nodes
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0.7, 3.2], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0284c7" />

        <HolographicMannequin />

        {/* 1. Cranium & Eyes */}
        <OrganNode
          position={[0, 1.82, 0.22]}
          regionId="cranium-eyes"
          label="Cranium & Eyes (SANS)"
          status={regionStatuses['cranium-eyes']}
          isSelected={selectedRegion === 'cranium-eyes'}
          onSelect={onSelectRegion}
        />

        {/* 2. Heart & Vessels */}
        <OrganNode
          position={[-0.1, 1.05, 0.22]}
          regionId="heart-vessels"
          label="Heart & Jugular"
          status={regionStatuses['heart-vessels']}
          isSelected={selectedRegion === 'heart-vessels'}
          onSelect={onSelectRegion}
        />

        {/* 3. Lungs */}
        <OrganNode
          position={[0.12, 1.08, 0.2]}
          regionId="lungs"
          label="Lungs & SpO2"
          status={regionStatuses['lungs']}
          isSelected={selectedRegion === 'lungs'}
          onSelect={onSelectRegion}
        />

        {/* 4. Spine & Musculoskeletal */}
        <OrganNode
          position={[0, 0.65, -0.05]}
          regionId="spine-musculoskeletal"
          label="Spine & Bone"
          status={regionStatuses['spine-musculoskeletal']}
          isSelected={selectedRegion === 'spine-musculoskeletal'}
          onSelect={onSelectRegion}
        />

        {/* 5. Gut & Metabolic */}
        <OrganNode
          position={[0, 0.45, 0.18]}
          regionId="gut-metabolic"
          label="Gut & Glycemia"
          status={regionStatuses['gut-metabolic']}
          isSelected={selectedRegion === 'gut-metabolic'}
          onSelect={onSelectRegion}
        />

        {/* 6. Neuro & Sleep */}
        <OrganNode
          position={[0, 1.62, -0.1]}
          regionId="neuro-sleep"
          label="Neuro & Circadian"
          status={regionStatuses['neuro-sleep']}
          isSelected={selectedRegion === 'neuro-sleep'}
          onSelect={onSelectRegion}
        />

        {/* 7. Skin & Immune */}
        <OrganNode
          position={[0.42, 0.65, 0.1]}
          regionId="skin-immune"
          label="Skin & Dermal"
          status={regionStatuses['skin-immune']}
          isSelected={selectedRegion === 'skin-immune'}
          onSelect={onSelectRegion}
        />

        <OrbitControls
          enablePan={false}
          minDistance={1.8}
          maxDistance={4.5}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.5}
        />
      </Canvas>
    </div>
  );
};
