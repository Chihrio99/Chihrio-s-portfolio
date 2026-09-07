import type { FC, ReactNode } from 'react';

export type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

export type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

export const ScrollStackItem: FC<ScrollStackItemProps>;
declare const ScrollStack: FC<ScrollStackProps>;
export default ScrollStack;
