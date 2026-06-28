import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { C, MONT, MANR, ctaGrad, glassStyle } from "./theme";

// Реальные ассеты бренда из public/maya/ (логотип, фото услуг, сертификат, QR)
export const asset = (p: string) => staticFile(`maya/${p}`);

// Настоящий логотип-монограмма |M| (иконка приложения) в фирменной плитке
export const LogoTile: React.FC<{
  size?: number;
  radius?: number;
  style?: React.CSSProperties;
}> = ({ size = 200, radius, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? size * 0.22,
      overflow: "hidden",
      border: `1px solid ${C.line}`,
      boxShadow: "0 22px 60px rgba(0,0,0,0.55)",
      ...style,
    }}
  >
    <Img
      src={asset("logo.png")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

// Фото с лёгким ken-burns
export const Photo: React.FC<{
  src: string;
  frame: number;
  from?: number;
  to?: number;
  dur?: number;
  style?: React.CSSProperties;
}> = ({ src, frame, from = 1.06, to = 1.16, dur = 90, style }) => {
  const scale = interpolate(frame, [0, dur], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <Img
        src={asset(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};

// Появление снизу + затухание
export const up = (frame: number, delay = 0, dur = 18, dist = 28) => {
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

export const Eyebrow: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      fontFamily: MONT,
      fontWeight: 400,
      fontSize: 24,
      letterSpacing: "0.34em",
      textIndent: "0.34em",
      textTransform: "uppercase",
      color: C.dim,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Wordmark: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => (
  <div
    style={{
      fontFamily: MONT,
      fontWeight: 300,
      fontSize: 34,
      letterSpacing: "0.42em",
      textIndent: "0.42em",
      textTransform: "uppercase",
      color: C.ink,
      opacity: 0.92,
      ...style,
    }}
  >
    МУЖСКАЯ ЭСТЕТИКА
  </div>
);

export const CapsTitle: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = C.accentHi, style }) => (
  <div
    style={{
      fontFamily: MONT,
      fontWeight: 600,
      fontSize: 26,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Glass: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div style={{ ...glassStyle, position: "relative", ...style }}>{children}</div>
);

export const Chip: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  style?: React.CSSProperties;
}> = ({ children, active, style }) => (
  <div
    style={{
      fontFamily: MONT,
      fontWeight: 500,
      fontSize: 23,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: "18px 32px",
      color: active ? "#10120a" : C.dim,
      background: active ? C.accent : "transparent",
      border: `1px solid ${active ? C.accent : C.line}`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = C.success,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" />
    <path
      d="M7 12.5l3.2 3.2L17 8.8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Иконка ножницы-молния (бренд-аксессуар кнопки записи)
export const BoltScissors: React.FC<{ size?: number; color?: string }> = ({
  size = 34,
  color = C.ink,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2L5 13h5l-1 9 8-12h-5l1-8z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Кнопка «ЗАПИСАТЬСЯ» — fill 0..1 проливает жёлтую заливку, glow для финала
export const BookBtn: React.FC<{
  fill?: number;
  subtitle?: string;
  glow?: number;
  width?: number;
}> = ({ fill = 0, subtitle = "Ближайшее окно — сегодня 18:30", glow = 0, width = 720 }) => {
  const filled = fill > 0.5;
  return (
    <div
      style={{
        ...glassStyle,
        width,
        borderRadius: 34,
        padding: "34px 40px",
        overflow: "hidden",
        position: "relative",
        boxShadow:
          glow > 0
            ? `0 18px 60px rgba(0,0,0,0.55), 0 0 ${26 + glow * 18}px rgba(245,180,0,${0.25 + glow * 0.25})`
            : glassStyle.boxShadow,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${fill * 100}%`,
          background: ctaGrad,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <BoltScissors color={filled ? "#1a1500" : C.ink} />
        <div>
          <div
            style={{
              fontFamily: MONT,
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: filled ? "#1a1500" : C.ink,
            }}
          >
            Записаться
          </div>
          <div
            style={{
              fontFamily: MANR,
              fontWeight: 400,
              fontSize: 22,
              marginTop: 6,
              color: filled ? "rgba(26,21,0,0.7)" : C.dim,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrimaryPill: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      borderRadius: 34,
      padding: "32px 48px",
      background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`,
      boxShadow: "0 18px 44px rgba(200,198,192,0.28)",
      fontFamily: MONT,
      fontWeight: 600,
      fontSize: 28,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "#10120a",
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const StatusDot: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: C.success,
      boxShadow: `0 0 ${size}px ${C.success}`,
      display: "inline-block",
    }}
  />
);
