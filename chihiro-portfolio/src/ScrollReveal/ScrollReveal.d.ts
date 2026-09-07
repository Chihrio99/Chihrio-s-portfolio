import type { FC, RefObject } from 'react';

type ScrollRevealProps = {
  children: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

declare const ScrollReveal: FC<ScrollRevealProps>;
export default ScrollReveal;
