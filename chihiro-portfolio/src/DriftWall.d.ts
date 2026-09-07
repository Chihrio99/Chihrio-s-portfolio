import type { CSSProperties, FC } from "react";

export type DriftWallItem = {
  image: string;
  title?: string;
  href?: string;
  width?: number;
  height?: number;
};

export type DriftWallProps = {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  groupByNativeSize?: boolean;
  preserveNativeAspect?: boolean;
  className?: string;
  style?: CSSProperties;
};

declare const DriftWall: FC<DriftWallProps>;

export default DriftWall;
