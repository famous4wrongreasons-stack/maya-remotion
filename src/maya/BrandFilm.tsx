import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, MONT, MANR, ctaGrad, cardSolidStyle } from "./theme";
import { Background } from "./Background";
import {
  up,
  asset,
  LogoTile,
  Eyebrow,
  Wordmark,
  CapsTitle,
  Glass,
  Chip,
  BookBtn,
  PrimaryPill,
  StatusDot,
} from "./ui";

const fmt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Реальная палитра чаевых (tips.html)
const TIP = {
  surface: "#11100f",
  surface2: "#181715",
  text: "#f4f0eb",
  muted: "rgba(244,240,235,0.62)",
  line: "rgba(244,240,235,0.18)",
  mint: "#b6e2cf",
  gold: "#e4c36a",
};

const Col: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", padding: "150px 80px", ...style }}
  >
    {children}
  </AbsoluteFill>
);

const SceneWrap: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 10, dur - 10, dur], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// Реальное видео мастера (cover-кроп под вертикаль), стартуем с момента крупного плана
const TeamVideo: React.FC<{ name: string; trimBefore?: number; style?: React.CSSProperties }> = ({
  name,
  trimBefore = 150,
  style,
}) => (
  <OffthreadVideo
    src={asset(`team/${name}.mp4`)}
    muted
    trimBefore={trimBefore}
    style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
  />
);

/* 1 · Интро — настоящий логотип |M| */
const SceneIntro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  return (
    <Col>
      <div style={{ opacity: s, transform: `scale(${0.82 + 0.18 * s})` }}>
        <LogoTile size={300} />
      </div>
      <div style={{ height: 64 }} />
      <Wordmark style={{ ...up(f, 16, 22), fontSize: 42 }} />
      <div style={{ ...up(f, 28, 18), marginTop: 28 }}>
        <Eyebrow style={{ fontSize: 24 }}>Барбершоп · Ставрополь</Eyebrow>
      </div>
    </Col>
  );
};

/* 2 · Герой — реальное видео мастера */
const SceneHero: React.FC = () => {
  const f = useCurrentFrame();
  const fill = interpolate(f, [30, 56], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <TeamVideo name="sasha" trimBefore={150} style={{ position: "absolute", inset: 0 }} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,8,16,0.35) 0%, rgba(7,8,16,0.05) 30%, rgba(7,8,16,0.95) 100%)",
        }}
      />
      <AbsoluteFill style={{ padding: "190px 80px 220px", justifyContent: "space-between" }}>
        <Eyebrow style={{ ...up(f, 0, 14) }}>Онлайн-запись за 30 секунд</Eyebrow>
        <div style={{ width: "100%" }}>
          {["МЕСТО,", "КУДА ХОЧЕТСЯ", "ВОЗВРАЩАТЬСЯ"].map((l, i) => (
            <div
              key={l}
              style={{
                ...up(f, 6 + i * 5, 16),
                fontFamily: MONT,
                fontWeight: 200,
                fontSize: 82,
                lineHeight: 1.05,
                color: C.ink,
              }}
            >
              {l}
            </div>
          ))}
          <div style={{ ...up(f, 24, 16), marginTop: 42 }}>
            <BookBtn fill={fill} width={920} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* 3 · Команда — реальные видео мастеров */
const TEAM = [
  { v: "ilya", n: "Илья" },
  { v: "max", n: "Макс" },
  { v: "alexey", n: "Алексей" },
  { v: "stas", n: "Стас" },
];
const SceneTeam: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Col>
      <div style={{ width: 920 }}>
        <CapsTitle style={{ ...up(f, 0, 12), textAlign: "center" }}>Команда</CapsTitle>
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {TEAM.map((m, i) => (
            <div
              key={m.v}
              style={{
                ...up(f, 8 + i * 6, 16),
                position: "relative",
                borderRadius: 26,
                overflow: "hidden",
                height: 560,
                border: `1px solid ${C.line}`,
                background: "#000",
              }}
            >
              <TeamVideo name={m.v} trimBefore={150 + i * 6} />
              <AbsoluteFill
                style={{
                  background: "linear-gradient(to bottom, transparent 55%, rgba(5,5,8,0.9) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  bottom: 22,
                  fontFamily: MONT,
                  fontWeight: 500,
                  fontSize: 28,
                  letterSpacing: "0.08em",
                  color: C.ink,
                }}
              >
                {m.n}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            ...up(f, 36, 14),
            textAlign: "center",
            marginTop: 30,
            fontFamily: MANR,
            fontSize: 30,
            color: C.dim,
          }}
        >
          Мастера, к которым возвращаются
        </div>
      </div>
    </Col>
  );
};

/* 4 · Услуги — чистый список (без фейк-фото) */
const SERVICES = [
  "Мужская стрижка",
  "Моделирование бороды",
  "Королевское бритьё",
  "Камуфляж седины",
  "Детская стрижка",
  "Уход и стайлинг",
];
const SceneServices: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Col>
      <div style={{ width: 860 }}>
        <CapsTitle style={{ ...up(f, 0, 12), textAlign: "center" }}>Услуги</CapsTitle>
        <div style={{ marginTop: 40 }}>
          {SERVICES.map((s, i) => (
            <div
              key={s}
              style={{
                ...up(f, 8 + i * 5, 16),
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "30px 6px",
                borderBottom: `1px solid ${C.line}`,
              }}
            >
              <span
                style={{
                  fontFamily: MONT,
                  fontWeight: 200,
                  fontSize: 30,
                  color: C.accentHi,
                  width: 64,
                }}
              >
                0{i + 1}
              </span>
              <span style={{ fontFamily: MONT, fontWeight: 300, fontSize: 46, color: C.ink }}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            ...up(f, 40, 14),
            marginTop: 30,
            textAlign: "center",
            fontFamily: MANR,
            fontSize: 28,
            color: C.dim,
          }}
        >
          Полный прайс и запись — в приложении
        </div>
      </div>
    </Col>
  );
};

/* 5 · Кабинет + кэшбэк 5% */
const SceneCabinet: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  const pts = fmt(1250 * s);
  const tiles = ["История визитов", "Абонементы", "Подарочные сертификаты"];
  return (
    <Col>
      <div style={{ width: 900 }}>
        <CapsTitle style={{ ...up(f, 0, 12), textAlign: "center" }}>Личный кабинет</CapsTitle>
        <Glass style={{ ...up(f, 8, 18), marginTop: 42, padding: 56 }}>
          <div style={{ fontFamily: MANR, fontSize: 30, color: C.dim }}>Баллы лояльности</div>
          <div
            style={{
              fontFamily: MONT,
              fontWeight: 200,
              fontSize: 148,
              color: C.ink,
              lineHeight: 1.05,
              marginTop: 4,
            }}
          >
            {pts}
          </div>
          <div
            style={{
              marginTop: 22,
              height: 18,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ width: `${64 * s}%`, height: "100%", background: ctaGrad }} />
          </div>
          <div style={{ fontFamily: MANR, fontSize: 26, color: C.success, marginTop: 22 }}>
            Кэшбэк 5% с каждого визита
          </div>
        </Glass>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          {tiles.map((t, i) => (
            <div
              key={t}
              style={{
                ...up(f, 20 + i * 5, 16),
                ...cardSolidStyle,
                padding: "30px 36px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: MANR,
                fontSize: 32,
                color: C.ink,
              }}
            >
              {t}
              <span style={{ color: C.faint, fontSize: 36 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};

/* 6 · Сертификат — реальная ЛИЦЕВАЯ сторона */
const SceneCert: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  const tilt = Math.sin(f / 22) * 3.5;
  return (
    <Col>
      <div style={{ width: 900, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CapsTitle style={{ ...up(f, 0, 12), textAlign: "center" }}>
          Подарочные сертификаты
        </CapsTitle>
        <div style={{ perspective: 1600, marginTop: 56 }}>
          <div
            style={{
              width: 880,
              transform: `rotateY(${tilt}deg) scale(${0.92 + 0.08 * s})`,
              opacity: s,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 44px 90px rgba(0,0,0,0.6)",
            }}
          >
            <Img src={asset("cert-front.png")} style={{ width: "100%", display: "block" }} />
          </div>
        </div>
        <div style={{ ...up(f, 24, 14), marginTop: 42, fontFamily: MANR, fontSize: 30, color: C.dim }}>
          Номиналы 2 000 · 3 000 · 5 000 ₽ · срок год
        </div>
        <div style={{ ...up(f, 32, 16), marginTop: 36 }}>
          <PrimaryPill>Купить · 5 000 ₽</PrimaryPill>
        </div>
      </div>
    </Col>
  );
};

/* 7 · Чаевые — реальная палитра (tips.html), без QR */
const SceneTips: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  const sums = ["200 ₽", "500 ₽", "1 000 ₽"];
  return (
    <Col>
      <div style={{ width: 860 }}>
        <CapsTitle style={{ ...up(f, 0, 12), textAlign: "center" }}>Чаевые мастеру</CapsTitle>
        <div
          style={{
            transform: `scale(${0.96 + 0.04 * s})`,
            opacity: s,
            marginTop: 42,
            borderRadius: 34,
            padding: 50,
            background: TIP.surface,
            border: `1px solid ${TIP.line}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <LogoTile size={56} radius={12} />
            <div>
              <div
                style={{
                  fontFamily: MONT,
                  fontWeight: 500,
                  fontSize: 26,
                  color: TIP.text,
                  letterSpacing: "0.04em",
                }}
              >
                Спасибо мастеру
              </div>
              <div style={{ fontFamily: MANR, fontSize: 23, color: TIP.muted, marginTop: 6 }}>
                Онлайн · после визита
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 38 }}>
            {sums.map((sm, i) => (
              <div
                key={sm}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "26px 0",
                  borderRadius: 18,
                  fontFamily: MONT,
                  fontWeight: 500,
                  fontSize: 32,
                  color: i === 1 ? "#10120a" : TIP.text,
                  background: i === 1 ? TIP.mint : "transparent",
                  border: `1px solid ${i === 1 ? TIP.mint : TIP.line}`,
                }}
              >
                {sm}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 30,
              padding: "26px 0",
              textAlign: "center",
              borderRadius: 18,
              background: TIP.gold,
              color: "#1a1500",
              fontFamily: MONT,
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Оставить чаевые
          </div>
        </div>
      </div>
    </Col>
  );
};

/* 8 · AI-ассистент MAYA */
const VoiceOrb: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 1 + 0.07 * Math.sin(f / 7);
  const ringRot = (f * 4) % 360;
  return (
    <div style={{ position: "relative", width: 220, height: 220 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          transform: `scale(${pulse})`,
          background:
            "radial-gradient(circle at 38% 34%, rgba(255,255,255,0.9), rgba(109,143,184,0.55) 42%, rgba(91,141,239,0.15) 70%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: 999,
          background: `conic-gradient(from ${ringRot}deg, transparent, rgba(194,192,184,0.6), transparent 40%)`,
          WebkitMask: "radial-gradient(transparent 64%, #000 66%)",
          mask: "radial-gradient(transparent 64%, #000 66%)",
        }}
      />
    </div>
  );
};
const SceneAssistant: React.FC = () => {
  const f = useCurrentFrame();
  const msg = "Здравствуйте! Я MAYA — помогу записаться и подскажу по услугам.";
  const chars = Math.round(interpolate(f, [12, 56], [0, msg.length], clamp));
  const caret = Math.floor(f / 8) % 2 === 0 ? "▍" : "";
  return (
    <Col>
      <div style={{ width: 900 }}>
        <CapsTitle style={{ ...up(f, 0, 12), textAlign: "center" }}>Умный помощник 24/7</CapsTitle>
        <Glass style={{ ...up(f, 8, 18), marginTop: 42, padding: 44 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              paddingBottom: 30,
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            <LogoTile size={68} radius={18} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: MONT,
                  fontWeight: 500,
                  fontSize: 30,
                  letterSpacing: "0.06em",
                  color: C.ink,
                }}
              >
                MAYA
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                <StatusDot size={14} />
                <span style={{ fontFamily: MANR, fontSize: 22, color: C.dim }}>онлайн</span>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 30,
              maxWidth: 640,
              borderRadius: "28px 28px 28px 8px",
              background: "rgba(244,240,235,0.06)",
              border: `1px solid ${C.line}`,
              padding: "26px 30px",
              fontFamily: MANR,
              fontSize: 31,
              lineHeight: 1.45,
              color: C.ink,
              minHeight: 120,
            }}
          >
            {msg.slice(0, chars)}
            <span style={{ color: C.accentHi }}>{chars < msg.length ? caret : ""}</span>
          </div>
        </Glass>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 54 }}>
          <VoiceOrb />
        </div>
      </div>
    </Col>
  );
};

/* 9 · Финал */
const SceneFinal: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 9);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ background: "linear-gradient(to bottom, transparent 48%, rgba(7,8,16,0.82) 100%)" }}
      />
      <Col style={{ justifyContent: "center" }}>
        <div style={{ ...up(f, 2, 16) }}>
          <LogoTile size={150} />
        </div>
        <Wordmark style={{ ...up(f, 8, 16), fontSize: 34, marginTop: 38 }} />
        <div
          style={{
            ...up(f, 14, 16),
            marginTop: 30,
            fontFamily: MONT,
            fontWeight: 200,
            fontSize: 64,
            color: C.ink,
            textAlign: "center",
            lineHeight: 1.06,
          }}
        >
          Готовы к новому образу?
        </div>
        <div style={{ ...up(f, 20, 16), marginTop: 50 }}>
          <BookBtn fill={0} glow={glow} subtitle="Записаться онлайн" width={640} />
        </div>
        <div
          style={{
            ...up(f, 26, 16),
            marginTop: 58,
            textAlign: "center",
            fontFamily: MANR,
            lineHeight: 1.85,
          }}
        >
          <div style={{ fontSize: 38, fontWeight: 600, color: C.ink, letterSpacing: "0.04em" }}>
            malesthetic.pro
          </div>
          <div style={{ fontSize: 30, color: C.dim7 }}>@malesthetic_bot</div>
          <div style={{ fontSize: 28, color: C.dim7 }}>Ставрополь, ул. Лермонтова, 343</div>
        </div>
      </Col>
      <div
        style={{
          position: "absolute",
          bottom: 64,
          width: "100%",
          textAlign: "center",
          fontFamily: MANR,
          fontSize: 22,
          color: C.faint,
        }}
      >
        © 2026 Мужская Эстетика
      </div>
    </AbsoluteFill>
  );
};

/* Сборка */
type SceneT = { c: React.FC; d: number };
const SCENES: SceneT[] = [
  { c: SceneIntro, d: 48 },
  { c: SceneHero, d: 66 },
  { c: SceneTeam, d: 72 },
  { c: SceneServices, d: 60 },
  { c: SceneCabinet, d: 54 },
  { c: SceneCert, d: 54 },
  { c: SceneTips, d: 54 },
  { c: SceneAssistant, d: 54 },
  { c: SceneFinal, d: 66 },
];

export const MAYAFilm: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Background />
      {SCENES.map((s, i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={s.d}>
            <SceneWrap dur={s.d}>
              <s.c />
            </SceneWrap>
          </Sequence>
        );
        from += s.d;
        return el;
      })}
    </AbsoluteFill>
  );
};
