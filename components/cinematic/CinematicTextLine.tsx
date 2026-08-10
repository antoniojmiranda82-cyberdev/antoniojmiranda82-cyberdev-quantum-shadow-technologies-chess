import type { CSSProperties, ReactNode } from 'react';

export function CinematicTextLine({
  children,
  index,
  className = '',
}: {
  children: ReactNode;
  index: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <span
      className={`cinematic-line ${className}`}
      data-cinematic-line={index + 1}
      style={{ '--cinematic-line': index } as CSSProperties}
    >
      <i>{children}</i>
    </span>
  );
}
