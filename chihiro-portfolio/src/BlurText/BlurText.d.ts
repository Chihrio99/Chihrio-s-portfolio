import type { FC } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

declare const BlurText: FC<BlurTextProps>;
export default BlurText;
