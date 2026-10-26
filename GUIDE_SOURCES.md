# Season 2 and combat-growth editorial sources

## Supplied Season 2 PDF

- User-supplied file: `321서버 이후 시즌 2 설명(설원 테마) _ 네이버 카페.pdf`.
- Author: sgthhjjytt; article: `https://cafe.naver.com/hackersfamily/20926`.
- Written January 22, 2026; final article update April 9, 2026.
- 81 PDF pages: article through page 69, comments from page 70 onward.
- The article permits translation; the author also approves sharing in the comments.
- `src/season2-expanded.js` independently summarizes the article and relevant
  author answers in Korean, English, Spanish and Hindi. Each chapter identifies
  its PDF pages. Reader comments are not treated as authoritative mechanics.
- 38 original game screenshots are extracted from PDF image objects to local
  `public/season2/*.webp`, preserving their complete aspect ratios and content.
  They are encoded in WebP for web delivery, without redesign, translation or
  cropping. No avatars, comment stickers, article browser chrome or whole PDF
  are published. Original Korean screenshot text is explicitly disclosed.
- Original article/answers correct the earlier three-image guide: greenhouse
  levels should stay balanced; daily core rewards are initially 30 then become
  15 around week two; high-tier zombie hunts are the daily core priority;
  level-60 achievements, ongoing 8-hour badges, mastery-point saving, late-game
  shops and confirmed settlement milestones are covered separately.
- Server examples and paid offers are historical, not live schedule/price data.
  Ice Cave and Glory battle are linked-out articles in the PDF, not detailed
  source content: the site discloses that gap rather than inventing mechanics.

## Combat growth guide

- `src/power-growth.js` follows the user's requested priority:
  **heroes and equipment → research → tank**.
- Priorities are editorial alliance guidance; they are not a mathematical claim
  that every account has the same marginal return or should stop using dedicated
  materials for lower-priority systems.
- Existing alliance Day 3 research instructions and `src/research-guide.js`
  support the early Alliance Recognition focus, prerequisite planning and
  research-day routine.
- Mechanics are cross-checked against local datasets and observed source UI:
  `https://wild-hoggs.com/ko/heroes/`,
  `https://wild-hoggs.com/ko/tools/research/`,
  `https://wild-hoggs.com/ko/tools/tank/`, checked October 26, 2026.
- The growth guide is written independently; it introduces no fixed spending
  percentages, invented drop rates or specific mandatory paid purchases.

## Validation

- `scripts/verify-season-growth.mjs`: 320 chapter views across four languages
  and 360/390/768/1440px, 38 local screenshots, image decoding, enlargement,
  Escape/button closing, overflow and clipped text checks.
- `scripts/verify-carousel.mjs`: 176 card layouts across the same languages and
  widths, all five revised growth tabs and carousel arrows.
