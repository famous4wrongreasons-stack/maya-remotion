import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "./theme";

const Grain: React.FC = () => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0.06,
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  >
    <filter id="mayaGrain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.85"
        numOctaves="2"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#mayaGrain)" />
  </svg>
);

// Постоянный фон: aurora-блобы (точные из app.html) + дрейф + зерно
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const drift = interpolate(t, [0, 1], [0, 1]);

  const blob = (
    left: number,
    top: number,
    size: number,
    color: string,
    dx: number,
    dy: number,
  ): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    left: `${left + dx * drift}%`,
    top: `${top + dy * drift}%`,
    transform: "translate(-50%,-50%)",
    background: `radial-gradient(circle, ${color}, transparent 62%)`,
    filter: "blur(60px)",
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={blob(20, 12, 1100, "rgba(255,255,255,0.05)", 6, 4)} />
      <div style={blob(88, 30, 1300, "rgba(150,148,142,0.16)", -10, 8)} />
      <div style={blob(50, 108, 1500, "rgba(109,143,184,0.10)", 0, -6)} />
      {/* виньетка для фокуса по центру */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <Grain />
    </AbsoluteFill>
  );
};
