// Реальные дизайн-токены MAYA / «Мужская Эстетика» (aurora-dark, боевой дефолт PWA).
// Извлечено из app.html/index.html — ролик нативен приложению.
import { loadFont as loadMont } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadManr } from "@remotion/google-fonts/Manrope";

export const { fontFamily: MONT } = loadMont("normal", {
  weights: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
});
export const { fontFamily: MANR } = loadManr("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
});

export const C = {
  bg: "#070810",
  bg2: "#0c0e1a",
  cardSolid: "#10121e",
  card: "rgba(255,255,255,0.055)",
  ink: "#eef1f8",
  dim: "rgba(238,241,248,0.60)",
  dim7: "rgba(238,241,248,0.78)",
  faint: "rgba(238,241,248,0.30)",
  accent: "#9d9b93",
  accentHi: "#c2c0b8",
  accentDeep: "#6c6a63",
  line: "rgba(255,255,255,0.12)",
  glassTint: "rgba(15,17,26,0.72)",
  glassBorder: "rgba(255,255,255,0.18)",
  success: "#3f9e6a",
  successHi: "#56d364",
  error: "#e0564f",
  cool: "#6d8fb8",
  ctaA: "#ffd21e",
  ctaB: "#f5b400",
  rosyA: "#df857c",
  rosyB: "#d2746b",
} as const;

export const ctaGrad = `linear-gradient(90deg, ${C.ctaA}, ${C.ctaB})`;
export const rosyGrad = `linear-gradient(160deg, ${C.rosyA}, ${C.rosyB})`;
export const pearlGrad =
  "linear-gradient(110deg,#cdd0f4,#e2d4f1,#cfe2f2,#d9d2f7,#f0dcef,#cdd6f5,#d8d3f6)";

export const EASE = [0.32, 0.72, 0, 1] as const; // фирменный sheet-easing

// Стеклянный материал (Glass) — карточки/таб-бар
export const glassStyle: React.CSSProperties = {
  borderRadius: 40,
  background: C.glassTint,
  border: `1px solid rgba(255,255,255,0.10)`,
  boxShadow:
    "0 18px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -16px 36px rgba(0,0,0,0.22)",
};

export const cardSolidStyle: React.CSSProperties = {
  background: C.cardSolid,
  border: `1px solid ${C.line}`,
  borderRadius: 30,
};
