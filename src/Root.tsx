import React from "react";
import { Composition } from "remotion";
import { MAYAFilm } from "./maya/BrandFilm";
import { BarbershopPromo, PromoProps } from "./BarbershopPromo";

const promoProps: PromoProps = {
  brand: "MAYA",
  sub: "МУЖСКАЯ ЭСТЕТИКА",
  tagline: "Стиль начинается\nс деталей",
  promise: "Точность · Стиль · Уверенность",
  services: [
    { name: "Мужская стрижка", price: "от 1 500 ₽" },
    { name: "Стрижка + борода", price: "от 2 200 ₽" },
    { name: "Королевское бритьё", price: "от 1 800 ₽" },
    { name: "Камуфляж седины", price: "от 1 200 ₽" },
  ],
  site: "malesthetic.pro",
  cta: "Записаться",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Боевой бренд-ролик — нативен приложению (aurora-dark, реальные токены) */}
      <Composition
        id="MAYAFilm"
        component={MAYAFilm}
        durationInFrames={528}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Ранний премиум-промо (демо) */}
      <Composition
        id="MAYAPromo"
        component={BarbershopPromo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={promoProps}
      />
    </>
  );
};
