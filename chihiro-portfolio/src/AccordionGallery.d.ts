import type { FC } from "react";

export type AccordionGalleryItem = {
  image: string;
  label: string;
  link?: string;
  alt?: string;
};

export type AccordionGalleryProps = {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
};

declare const AccordionGallery: FC<AccordionGalleryProps>;

export default AccordionGallery;
