'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { PieceConfig } from '../pieces/pieceConfig';
import type { CinematicScrollState } from '../motion/cinematicScroll';
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
    const update = () => {
      visible.current = document.visibilityState === 'visible';
    };
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  return visible;
}

function MoltenRings({
  accent,
  width,
  height,
  reduced,
  quality,
  energy,
}: {
  accent: string;
  width: number;
  height: number;
  reduced: boolean;
  quality: number;
  energy: { current: number };
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || reduced) return;

    const t = state.clock.elapsedTime;
    const boost = energy.current;

    group.current.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh;
      const pulse =
        1 +
        Math.sin(t * (.72 + index * .11) + index * 1.3) *
          (.028 + index * .005 + boost * .028);

      mesh.scale.x = pulse;
      mesh.scale.y = pulse * (.20 + index * .022);

      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity =
        (.09 - index * .018) +
        Math.sin(t * .9 + index) * .014 +
        boost * (.055 - index * .008);
    });
  });

  const y = -height * .43;
  const ringWidth = Math.max(width * .42, 1.6);

  return (
    <group ref={group} position={[width * .05, y, -.035]}>
      {[1, 1.42, 1.92].map((scale, index) => (
        <mesh
          key={scale}
          scale={[1, .20 + index * .022, 1]}
          position={[0, index * -.025, 0]}
        >
          <ringGeometry
            args={[
              ringWidth * scale * .86,
              ringWidth * scale,
              quality > .7 ? 96 : 48,
            ]}
          />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={.09 - index * .018}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function PiecePlane({
  config,
  scroll,
}: {
  config: PieceConfig;
  scroll: { current: CinematicScrollState };
}) {
  const texture = useTexture(config.image);
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const rim = useRef<THREE.Mesh>(null);
  const pointer = useDampedPointer();
  const [hovered, setHovered] = useState(false);
  const { viewport, size } = useThree();
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const motion = config.motion;
  const cinematicEnergy = useRef(0);
  const pixelActivity = useRef(0);
  const pixelScroll = useRef(0);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  useFrame((state, delta) => {
    if (!group.current || !pageVisible.current) return;

    const p = pointer.current;
    const t = state.clock.elapsedTime;
    const cinematic = scroll.current;
    const readingCalm = cinematic.phase.read;
    const transitionEnergy = Math.min(
      1,
      cinematic.phase.exit * .72 + cinematic.velocity * .58
    );

    cinematicEnergy.current = THREE.MathUtils.damp(
      cinematicEnergy.current,
      transitionEnergy,
      5.2,
      delta
    );

    pixelActivity.current = Math.min(
      1,
      (hovered ? 1 : p.activity) * .55 + cinematicEnergy.current * .72
    );
    pixelScroll.current = Math.min(
      1.15,
      cinematic.progress + cinematicEnergy.current * .08
    );

    const hoverBoost = hovered ? 1 : p.activity * .22;

    if (reduced || cinematic.reducedMotion) {
      group.current.position.set(0, 0, 0);
      group.current.rotation.set(0, 0, 0);
      group.current.scale.setScalar(1);
      cinematicEnergy.current = 0;
      return;
    }

    const motionScale = THREE.MathUtils.lerp(1.04, .58, readingCalm);
    const targetX =
      p.x * (.26 + motion.drift * .12) * motionScale +
      cinematic.progress * motion.scrollX;

    const targetY =
      p.y * .20 * motionScale +
      Math.sin(t * motion.float) * .11 * motionScale +
      cinematic.progress * motion.scrollY;

    const targetRY = p.x * motion.tilt * motionScale;
    const targetRX = -p.y * motion.tilt * .62 * motionScale;

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      targetX,
      4.4,
      delta
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY,
      4.8,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRY,
      4.2,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRX,
      4.2,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      Math.sin(t * motion.spin) * .015 * motionScale,
      3.4,
      delta
    );

    const cinematicScale = transitionEnergy * .018;
    const targetScale =
      motion.hoverScale +
      hoverBoost * (motion.hoverScale - 1) +
      cinematicScale -
      cinematic.progress * .018;

    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, targetScale, 5.2, delta)
    );

    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        .060 +
        hoverBoost * .075 +
        transitionEnergy * .105 +
        Math.sin(t * .8) * .012;
    }

    if (rim.current) {
      const mat = rim.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        .105 +
        hoverBoost * .065 +
        transitionEnergy * .095 +
        Math.sin(t * 1.1) * .015;
    }
  });

  const image = texture.image as
    | { width?: number; height?: number }
    | undefined;

  const textureAspect =
    image?.width && image?.height ? image.width / image.height : 1.4;

  const maxWidth = Math.min(
    viewport.width * (size.width < 720 ? .94 : .68),
    size.width < 720 ? 5.4 : 6.4
  );

  const h = maxWidth / textureAspect;
  const quality =
    size.width < 720 || scroll.current.coarsePointer ? .56 : .92;

  return (
    <group ref={group}>
      <MoltenRings
        accent={config.accent}
        width={maxWidth}
        height={h}
        reduced={reduced}
        quality={quality}
        energy={cinematicEnergy}
      />

      <mesh ref={glow} position={[0, 0, -.10]} scale={1.085}>
        <planeGeometry args={[maxWidth, h]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={.060}
          color={config.accent}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={rim} position={[.018, -.01, -.055]} scale={1.025}>
        <planeGeometry args={[maxWidth, h]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={.105}
          color={config.accent}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[maxWidth, h]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <group
        scale={[maxWidth / 4.8, h / 3.4, 1]}
        position={[maxWidth * .05, 0, .08]}
      >
        <GoldPixelLoop
          accent={config.accent}
          profile={motion}
          activity={pixelActivity}
          scroll={pixelScroll}
          reduced={reduced || scroll.current.reducedMotion}
          quality={quality}
        />
      </group>
    </group>
  );
}

export function PieceScene({
  config,
  scroll,
}: {
  config: PieceConfig;
  scroll: { current: CinematicScrollState };
}) {
  const camera = useMemo(
    () => ({
      position: [0, 0, 6.2] as [number, number, number],
      fov: 37,
    }),
    []
  );

  return (
    <Canvas
      camera={camera}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <Suspense fallback={null}>
        <PiecePlane config={config} scroll={scroll} />
      </Suspense>
    </Canvas>
  );
}
