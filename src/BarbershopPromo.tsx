import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import { Background } from "./Background";

const { fontFamily: SERIF } = loadSerif();
const { fontFamily: SANS } = loadSans();

const GOLD = "#c9a86a";
const CREAM = "#f4efe6";
const MUTED = "#9a958c";

export type Service = { name: string; price: string };
export type PromoProps = {
  brand: string;
  sub: string;
  tagline: string;
  promise: string;
  services: Service[];
  site: string;
  cta: string;
};

// Появление снизу с затуханием
const fadeUp = (frame: number, delay = 0, dur = 18, dist = 34) => {
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

// Обёртка сцены: плавный вход/выход
const SceneWrap: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 14, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        opacity,
        justifyContent: "center",
        alignItems: "center",
        padding: 90,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const GoldLine: React.FC<{ scaleX: number; width?: number }> = ({
  scaleX,
  width = 460,
}) => (
  <div
    style={{
      width,
      height: 2,
      margin: "30px auto",
      transform: `scaleX(${scaleX})`,
      background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
    }}
  />
);

// 1 — Логотип
const LogoScene: React.FC<Pick<PromoProps, "brand" | "sub">> = ({
  brand,
  sub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 26,
          letterSpacing: 16,
          color: GOLD,
          ...fadeUp(frame, 0, 16),
        }}
      >
        БАРБЕРШОП
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 230,
          fontWeight: 600,
          lineHeight: 1,
          color: CREAM,
          letterSpacing: 6,
          margin: "18px 0 0",
          opacity: s,
          transform: `scale(${0.88 + 0.12 * s})`,
        }}
      >
        {brand}
      </div>
      <GoldLine scaleX={s} />
      <div
        style={{
          fontFamily: SANS,
          fontSize: 32,
          letterSpacing: 12,
          color: MUTED,
          ...fadeUp(frame, 22, 18),
        }}
      >
        {sub}
      </div>
    </div>
  );
};

// 2 — Слоган
const TaglineScene: React.FC<Pick<PromoProps, "tagline" | "promise">> = ({
  tagline,
  promise,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ textAlign: "center", maxWidth: 880 }}>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 110,
          fontWeight: 600,
          lineHeight: 1.05,
          whiteSpace: "pre-line",
          color: CREAM,
          ...fadeUp(frame, 0, 20),
        }}
      >
        {tagline}
      </div>
      <GoldLine scaleX={interpolate(frame, [10, 34], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })} width={260} />
      <div
        style={{
          fontFamily: SANS,
          fontSize: 40,
          fontWeight: 300,
          letterSpacing: 2,
          color: MUTED,
          ...fadeUp(frame, 24, 20),
        }}
      >
        {promise}
      </div>
    </div>
  );
};

// 3 — Услуги
const ServicesScene: React.FC<Pick<PromoProps, "services">> = ({ services }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: "100%", maxWidth: 820 }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 26,
          letterSpacing: 14,
          color: GOLD,
          textAlign: "center",
          marginBottom: 50,
          ...fadeUp(frame, 0, 14),
        }}
      >
        УСЛУГИ
      </div>
      {services.map((srv, i) => {
        const delay = 10 + i * 9;
        return (
          <div
            key={srv.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderBottom: `1px solid rgba(201,168,106,0.22)`,
              padding: "26px 4px",
              ...fadeUp(frame, delay, 16),
            }}
          >
            <span
              style={{ fontFamily: SERIF, fontSize: 56, color: CREAM }}
            >
              {srv.name}
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 38,
                fontWeight: 500,
                color: GOLD,
                whiteSpace: "nowrap",
                marginLeft: 28,
              }}
            >
              {srv.price}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// 4 — CTA
const CtaScene: React.FC<Pick<PromoProps, "cta" | "site">> = ({ cta, site }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, delay: 6 });
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 130,
          fontWeight: 600,
          color: CREAM,
          ...fadeUp(frame, 0, 18),
        }}
      >
        {cta}
      </div>
      <div
        style={{
          display: "inline-block",
          marginTop: 50,
          padding: "26px 64px",
          border: `2px solid ${GOLD}`,
          borderRadius: 999,
          fontFamily: SANS,
          fontSize: 44,
          letterSpacing: 4,
          color: GOLD,
          transform: `scale(${0.9 + 0.1 * s})`,
          opacity: s,
        }}
      >
        {site}
      </div>
    </div>
  );
};

export const BarbershopPromo: React.FC<PromoProps> = (props) => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence durationInFrames={78}>
        <SceneWrap durationInFrames={78}>
          <LogoScene brand={props.brand} sub={props.sub} />
        </SceneWrap>
      </Sequence>
      <Sequence from={78} durationInFrames={72}>
        <SceneWrap durationInFrames={72}>
          <TaglineScene tagline={props.tagline} promise={props.promise} />
        </SceneWrap>
      </Sequence>
      <Sequence from={150} durationInFrames={82}>
        <SceneWrap durationInFrames={82}>
          <ServicesScene services={props.services} />
        </SceneWrap>
      </Sequence>
      <Sequence from={232} durationInFrames={68}>
        <SceneWrap durationInFrames={68}>
          <CtaScene cta={props.cta} site={props.site} />
        </SceneWrap>
      </Sequence>
    </AbsoluteFill>
  );
};
