'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { PieceMotionProfile, PixelPathKind } from '../pieces/pieceConfig';

type LiveNumber = number | { current: number };

function readLive(value: LiveNumber) {
  return typeof value === 'number' ? value : value.current;
}

function seeded(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function pathOffset(
  kind: PixelPathKind,
  phase: number,
  radius: number,
  height: number,
  spread: number
) {
  const envelope = Math.pow(Math.sin(Math.PI * phase), 1.35);
  const theta = phase * Math.PI * 2;
  const r = radius * spread * envelope;

  switch (kind) {
    case 'wide-orbit':
      return new THREE.Vector3(
        r * (1.18 + .34 * Math.sin(theta * 2)),
        Math.sin(theta) * height * envelope,
        Math.cos(theta) * r * .42
      );
    case 'diagonal':
      return new THREE.Vector3(
        r * .95,
        r * .58 + Math.sin(theta) * height * .24 * envelope,
        Math.cos(theta) * r * .24
      );
    case 'fortress':
      return new THREE.Vector3(
        r * .56 + Math.sin(theta * 2) * .12 * envelope,
        Math.sin(theta) * height * .46 * envelope,
        Math.cos(theta) * r * .16
      );
    case 'angular': {
      const bend = Math.sin(theta);
      return new THREE.Vector3(
        r * (bend >= 0 ? 1.05 : .62),
        Math.sin(theta * 2) * height * .52 * envelope,
        Math.cos(theta) * r * .34
      );
    }
    case 'rise':
      return new THREE.Vector3(
        Math.sin(theta) * r * .22,
        height * 1.25 * envelope,
        Math.cos(theta) * r * .16
      );
    default:
      return new THREE.Vector3(
        r,
        Math.sin(theta) * height * .55 * envelope,
        Math.cos(theta) * r * .35
      );
  }
}

const vertexShader = `
attribute float aSize;
attribute float aBrightness;
varying float vBrightness;
void main(){
  vBrightness = aBrightness;
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_PointSize = aSize;
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = `
uniform vec3 uColor;
uniform float uOpacity;
varying float vBrightness;
void main(){
  vec2 p = abs(gl_PointCoord - 0.5);
  float edge = 1.0 - smoothstep(0.36,0.5,max(p.x,p.y));
  float core = 1.0 - smoothstep(0.12,0.42,length(gl_PointCoord-0.5));
  float a = max(edge,core*.65) * uOpacity * vBrightness;
  gl_FragColor = vec4(uColor * (0.82 + vBrightness*.5), a);
}`;

export function GoldPixelLoop({
  accent,
  profile,
  activity,
  scroll,
  reduced = false,
  quality = 1,
}: {
  accent: string;
  profile: PieceMotionProfile;
  activity: LiveNumber;
  scroll: LiveNumber;
  reduced?: boolean;
  quality?: number;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const count = Math.max(54, Math.round(profile.pixelCount * quality));

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const radii = new Float32Array(count);
    const heights = new Float32Array(count);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);
    const anchors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const sideBand = seeded(i, 1);
      const y = -1.75 + seeded(i, 2) * 3.5;
      const x = .22 + seeded(i, 3) * .58 + sideBand * .18;
      const z = -.04 + seeded(i, 4) * .12;

      anchors.set([x, y, z], i * 3);
      positions.set([x, y, z], i * 3);
      phases[i] = seeded(i, 5);
      radii[i] = .46 + seeded(i, 6) * 1.35;
      heights[i] = .34 + seeded(i, 7) * 1.18;
      sizes[i] = 4.4 + seeded(i, 8) * 8.5;
      brightness[i] = .42 + seeded(i, 9) * .72;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute(
      'aBrightness',
      new THREE.BufferAttribute(brightness, 1)
    );

    return {
      geometry,
      positions,
      phases,
      radii,
      heights,
      anchors,
    };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(accent) },
      uOpacity: { value: reduced ? .32 : .72 },
    }),
    [accent, reduced]
  );

  useFrame((state) => {
    if (!points.current || !material.current || reduced) return;

    const elapsed = state.clock.elapsedTime;
    const liveActivity = Math.min(1, Math.max(0, readLive(activity)));
    const liveScroll = Math.min(1.15, Math.max(0, readLive(scroll)));

    const spread =
      profile.pixelSpread * (1 + liveActivity * .24 + liveScroll * .07);

    const speed =
      profile.pixelSpeed * (1 + liveActivity * .22);

    for (let i = 0; i < count; i++) {
      const phase = (data.phases[i] + elapsed * speed) % 1;
      const offset = pathOffset(
        profile.pixelPath,
        phase,
        data.radii[i],
        data.heights[i],
        spread
      );

      const j = i * 3;
      data.positions[j] = data.anchors[j] + offset.x;
      data.positions[j + 1] = data.anchors[j + 1] + offset.y;
      data.positions[j + 2] = data.anchors[j + 2] + offset.z;
    }

    (data.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate =
      true;

    material.current.uniforms.uOpacity.value =
      .48 +
      liveActivity * .30 +
      Math.sin(elapsed * .8) * .035;
  });

  return (
    <points ref={points} geometry={data.geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        args={[
          {
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          },
        ]}
      />
    </points>
  );
}
