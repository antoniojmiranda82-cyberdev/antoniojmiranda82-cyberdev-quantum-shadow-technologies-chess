import type { ReactNode } from 'react';

export function CinematicTextScene({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`cinematic-text-scene ${className}`}>{children}</div>;
}
