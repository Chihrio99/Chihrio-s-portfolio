import { useEffect, useRef } from "react";
import "./ShinyText.css";

type ShinyTextProps = {
  text: string;
  className?: string;
  color?: string;
  disabled?: boolean;
};

type LightState = {
  x: number;
  y: number;
  intensity: number;
};

export default function ShinyText({
  text,
  className = "",
  color = "#FFFFFF",
  disabled = false,
}: ShinyTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const output = canvas?.getContext("2d");
    if (!root || !canvas || !output) return;

    const mask = document.createElement("canvas");
    const maskContext = mask.getContext("2d");
    if (!maskContext) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let ratio = 1;
    let light: LightState = { x: 0, y: 0, intensity: 0 };

    const paint = () => {
      frame = 0;
      output.setTransform(ratio, 0, 0, ratio, 0, 0);
      output.clearRect(0, 0, width, height);

      // The rasterized glyph bitmap is the only alpha mask used for both layers.
      output.globalCompositeOperation = "source-over";
      output.globalAlpha = 1;
      output.drawImage(mask, 0, 0, width, height);
      output.globalCompositeOperation = "source-in";
      output.fillStyle = color;
      output.fillRect(0, 0, width, height);

      if (!disabled && light.intensity > 0) {
        const rainbow = output.createRadialGradient(light.x, light.y, 0, light.x, light.y, 190);
        rainbow.addColorStop(0, "#ffffff");
        rainbow.addColorStop(.12, "#eefeff");
        rainbow.addColorStop(.23, "#72dcff");
        rainbow.addColorStop(.36, "#8f82ff");
        rainbow.addColorStop(.49, "#ee8bda");
        rainbow.addColorStop(.61, "#ffd388");
        rainbow.addColorStop(.72, "rgba(144,255,219,.78)");
        rainbow.addColorStop(1, "rgba(174,181,183,0)");
        output.globalCompositeOperation = "source-atop";
        output.globalAlpha = light.intensity;
        output.fillStyle = rainbow;
        output.fillRect(0, 0, width, height);
      }

      output.globalAlpha = 1;
      output.globalCompositeOperation = "source-over";
    };

    const rasterizeText = () => {
      const titleStyle = getComputedStyle(root.parentElement ?? root);
      const fontSize = Number.parseFloat(titleStyle.fontSize);
      const letterSpacing = Number.parseFloat(titleStyle.letterSpacing) || 0;
      const font = `${titleStyle.fontWeight} ${fontSize}px ${titleStyle.fontFamily}`;
      const measure = document.createElement("canvas").getContext("2d");
      if (!measure) return;
      measure.font = font;

      const glyphWidths = Array.from(text, character => measure.measureText(character).width);
      const metrics = measure.measureText(text);
      const padding = 8;
      width = Math.ceil(glyphWidths.reduce((sum, glyphWidth) => sum + glyphWidth, 0) + letterSpacing * Math.max(0, glyphWidths.length - 1) + padding * 2);
      height = Math.ceil((metrics.actualBoundingBoxAscent || fontSize * .82) + (metrics.actualBoundingBoxDescent || fontSize * .2) + padding * 2);
      ratio = Math.min(devicePixelRatio || 1, 2);

      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      mask.width = canvas.width;
      mask.height = canvas.height;
      maskContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      maskContext.clearRect(0, 0, width, height);
      maskContext.font = font;
      maskContext.textBaseline = "alphabetic";
      maskContext.fillStyle = "#fff";

      const baseline = padding + (metrics.actualBoundingBoxAscent || fontSize * .82);
      let cursorX = padding;
      Array.from(text).forEach((character, index) => {
        maskContext.fillText(character, cursorX, baseline);
        cursorX += glyphWidths[index] + letterSpacing;
      });

      light = { x: width / 2, y: height / 2, intensity: 0 };
      paint();
    };

    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nearestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
      const nearestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
      const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);
      light = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top + 20,
        intensity: Math.max(0, Math.min(1, 1 - distance / 260)),
      };
      requestPaint();
    };
    const onPointerLeave = () => {
      light.intensity = 0;
      requestPaint();
    };

    rasterizeText();
    document.fonts.ready.then(rasterizeText);
    window.addEventListener("resize", rasterizeText);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", rasterizeText);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [color, disabled, text]);

  return <span ref={rootRef} className={`shiny-text ${className}`}>
    <canvas ref={canvasRef} className="shiny-text-canvas" aria-hidden="true" />
    <span className="shiny-text-accessible">{text}</span>
  </span>;
}
