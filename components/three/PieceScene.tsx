'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { PieceConfig } from '../pieces/pieceConfig';
import { useDampedPointer } from '../motion/useDampedPointer';
import { GoldPixelLoop } from './GoldPixelLoop';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

function usePageVisible() {
  const visible = useRef(true);
  useEffect(() => {
    const update = () => { visible.current = document.visibilityState === 'visible'; };
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return visible;
}

function PiecePlane({ config, scrollProgress }: { config: PieceConfig; scrollProgress: { current: number } }) {
  const texture = useTexture(config.image);
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const pointer = useDampedPointer();
  const [hovered, setHovered] = useState(false);
  const { viewport, size } = useThree();
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const motion = config.motion;

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  useFrame((state, delta) => {
    if (!group.current || !pageVisible.current) return;
    const p = pointer.current;
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress.current;
    const hoverBoost = hovered ? 1 : p.activity * .22;
    if (reduced) {
      group.current.position.set(0, 0, 0);
      group.current.rotation.set(0, 0, 0);
      group.current.scale.setScalar(1);
      return;
    }
    const targetX = p.x * (0.26 + motion.drift * 0.12) + scroll * motion.scrollX;
    const targetY = p.y * 0.20 + Math.sin(t * motion.float) * 0.11 + scroll * motion.scrollY;
    const targetRY = p.x * motion.tilt;
    const targetRX = -p.y * motion.tilt * 0.62;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 4.4, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 4.8, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRY, 4.2, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRX, 4.2, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, Math.sin(t * motion.spin) * .017, 3.4, delta);
    const scale = motion.hoverScale + hoverBoost * (motion.hoverScale - 1) - scroll * .025;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, scale, 5.2, delta));
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = .045 + hoverBoost * .08 + Math.sin(t * .8) * .012;
    }
  });

  const image = texture.image as { width?: number; height?: number } | undefined;
  const textureAspect = image?.width && image?.height ? image.width / image.height : 1.4;
  const maxWidth = Math.min(viewport.width * (size.width < 720 ? .94 : .68), size.width < 720 ? 5.4 : 6.4);
  const h = maxWidth / textureAspect;
  const quality = size.width < 720 || window.matchMedia('(pointer: coarse)').matches ? .56 : .92;

  return <group ref={group}>
    <mesh ref={glow} position={[0, 0, -0.08]} scale={1.06}>
      <planeGeometry args={[maxWidth, h]} />
      <meshBasicMaterial map={texture} transparent opacity={0.055} color={config.accent} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
    <mesh onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <planeGeometry args={[maxWidth, h]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
    </mesh>
    <group scale={[maxWidth / 4.8, h / 3.4, 1]} position={[maxWidth * .05, 0, .08]}>
      <GoldPixelLoop accent={config.accent} profile={motion} activity={hovered ? 1 : pointer.current.activity} scroll={scrollProgress.current} reduced={reduced} quality={quality} />
    </group>
  </group>;
}

export function PieceScene({ config, scrollProgress }: { config: PieceConfig; scrollProgress: { current: number } }) {
  const camera = useMemo(() => ({ position: [0, 0, 6.2] as [number, number, number], fov: 37 }), []);
  return <Canvas camera={camera} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
    <Suspense fallback={null}>
      <PiecePlane config={config} scrollProgress={scrollProgress} />
    </Suspense>
  </Canvas>;
}
