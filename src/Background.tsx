import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const GOLD = "rgba(201,168,106,";

// Плёночное зерно через SVG-шум — даёт «премиальную» текстуру поверх фона
const Grain: React.FC = () => (
  <svg
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.08,
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  >
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.9"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Медленно дрейфующее золотое «сияние» (aurora)
  const x = interpolate(frame, [0, durationInFrames], [28, 72]);
  const y = interpolate(frame, [0, durationInFrames], [34, 66]);
  const breathe = interpolate(
    Math.sin((frame / durationInFrames) * Math.PI * 2),
    [-1, 1],
    [0.85, 1.1],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#08080a" }}>
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) scale(${breathe})`,
          background: `radial-gradient(circle, ${GOLD}0.30) 0%, ${GOLD}0) 60%)`,
          filter: "blur(130px)",
        }}
      />
      {/* лёгкий тёплый низ */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 700,
          left: "50%",
          bottom: -200,
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse, ${GOLD}0.12) 0%, ${GOLD}0) 70%)`,
          filter: "blur(120px)",
        }}
      />
      {/* виньетка */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <Grain />
    </AbsoluteFill>
  );
};
