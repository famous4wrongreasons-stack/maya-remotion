# Remotion — видео кодом на React

Чистый проект Remotion. Видео описывается React-компонентами в `src/`.

## Команды
- `npm run dev` — открыть **Remotion Studio** (визуальный редактор, ~http://localhost:3000)
- `npm run render` — отрендерить видео в `out/video.mp4`
- `npm run still` — отрендерить один кадр (30-й) в `out/frame.png`
- `npm run upgrade` — обновить Remotion до свежей версии

## Структура
- `src/index.ts` — точка входа (`registerRoot`)
- `src/Root.tsx` — список композиций (`<Composition>`: id, fps, размер, длительность)
- `src/Composition.tsx` — сам кадр/анимация (демо: появляющийся заголовок «MAYA»)
- `remotion.config.ts` — настройки рендера

## Лицензия Remotion
Remotion бесплатен для частных лиц и небольших команд. Компаниям >3 человек нужна
платная Company License — см. remotion.dev/license.
