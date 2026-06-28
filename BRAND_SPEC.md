# MAYA / «Мужская Эстетика» — Brand Spec (для видео/баннеров)

Извлечено из реального фронта (`app.html`/`index.html`) 2026-06-23. Тема **aurora-dark** (боевой дефолт PWA). Реализовано в `src/maya/`.

## Токены (тёмная — основная)
| Роль | Значение |
|---|---|
| bg | `#070810` · bg2 `#0c0e1a` |
| cardSolid | `#10121e` · card `rgba(255,255,255,0.055)` |
| ink | `#eef1f8` · dim `rgba(238,241,248,0.60)` · faint `rgba(238,241,248,0.30)` *(только декор!)* |
| accent (латунь) | `#9d9b93` · hi `#c2c0b8` · deep `#6c6a63` |
| line | `rgba(255,255,255,0.12)` · glassTint `rgba(15,17,26,0.72)` |
| success | `#3f9e6a` (онлайн/оплачено) |
| CTA «Записаться» | `linear-gradient(90deg,#ffd21e,#f5b400)` (жёлтый YClients) |
| Чаевые (tips.html) | фон `#11100f`, текст `#f4f0eb`, акцент МЯТА `#b6e2cf`, золото `#e4c36a` (НЕ розовый); механика tipUrl/WhiteLines, без QR в панели |
| Реальные ассеты | логотип |M| `pwa-assets/for-app/icon-512.png`; видео команды `team-videos-optimized/*.mp4`; лицевые серты `ai администратор/cert_assets/cert_*_front.png` |
| Серты (перламутр) | `linear-gradient(110deg,#cdd0f4,#e2d4f1,#cfe2f2,#d9d2f7,#f0dcef,#cdd6f5,#d8d3f6)` |
| cool | `#6d8fb8` · error `#e0564f` |

Светлая (alt): bg `#f3f2ef`, cardSolid `#faf9f6`, ink `#151823`.

## Шрифты
- **Montserrat** — дисплей/заголовки/caps (веса 100–600; крупные тонкие = 100–200).
- **Manrope** — body/подписи (400–700).
- Сигнатура: широкий **letter-spacing на UPPERCASE** (eyebrow .34em, wordmark .42em, чипы .14em, кнопки .16em). Serif НЕТ.
- В PWA шрифты самохостятся (`/fonts.css`); в Remotion — `@remotion/google-fonts` (точное совпадение), subset `cyrillic`.

## Рецепты
- **Фон:** `#070810` + 3 radial-блоба (белый 0.04 / латунь 0.16 / cool 0.10) + зерно (feTurbulence, overlay, opacity .06) + центр-виньетка.
- **Glass:** `background:rgba(15,17,26,0.72)`; `border:1px rgba(255,255,255,.10)`; `box-shadow:0 18px 60px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.14)`; radius 26–40.
- **cardSolid:** `#10121e` + `1px line` + radius 18–30.
- **BookBtn:** glass-капсула, заливка `ctaGrad` слева→направо, при заполнении текст `#1a1500`.
- **Chip:** radius 999; active = фон `#9d9b93`, текст `#10120a`.
- Easing: `cubic-bezier(.32,.72,0,1)`.

## Storyboard ролика (реализован, 1080×1920, 14с)
1. Бренд-интро (M-вотермарк + wordmark) 2. Онлайн-запись (жёлтая кнопка + чек) 3. Кабинет + кэшбэк 5% 4. Чаевые (онлайн/по QR) 5. Серты 2000/3000/5000, срок год 6. AI-ассистент MAYA (чат + орб) 7. Финал-CTA (malesthetic.pro · @malesthetic_bot · Ставрополь, ул. Лермонтова 343).

## 🔴 Запреты (требования владельца / факты)
- **VK / MAX — не показывать** (в app.html есть живой VK-auth код — в кадр не попадает).
- VPN-приписку — не показывать. CutMatch — только с ОК владельца (152-ФЗ).
- Имя «Антон» внутреннее → клиенту всегда **MAYA**.
- Чаевые — НЕ «по СБП» (идут через YClients/ЮMoney, по QR). Кэшбэк 5% (`CASHBACK_PCT`). Серты: 2000/3000/5000.
- Телефон/email в публичный кадр не выносить — связь через бот/YClients.
