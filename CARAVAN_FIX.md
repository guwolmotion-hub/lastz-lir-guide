# Caravan correction

- The guide table previously read only 42 rows from the original workbook,
  while the calculator used a different 50-level dataset. Both now import
  `caravanLevels` from `src/caravan-math.js` (levels 1–50).
- Confirmed all 50 start/end pairs against the existing public calculator
  dataset on 2026-10-26; level 50 is 136,200,000–165,000,000.
- `parseCaravanPower` supports raw grouped numbers, decimal commas, K/M/B/G,
  selected numeric units and Korean compound units. Explicit suffixes override
  the dropdown so values are never multiplied twice. Non-positive, non-finite,
  malformed and unsafe values are rejected.
- The original parser silently changed `15,5M` into `155M` and rejected Korean
  compounds such as `1억 5000만`. These cases now return 15.5M and 150M.
- The guide's unconditional ×1.1 advice has been replaced with the same
  selected-bonus formula as the calculator. Matching-faction 3/4/5 heroes use
  +5/+7/+10%; the optional active hero buff adds +10% only with a faction.
- Full 20-substage clearance, partial reach and power needed for the next full
  stage are separately labelled. Intermediate substages remain estimates.
- Enter submits; edits update existing results; faction/count buttons do not
  submit. The checkbox no longer inherits 100% width from power inputs.
- Reader-facing source footers, author/date/page markers and source counts
  are removed site-wide at the user's request. Internal audit documentation
  is retained; game screenshots and mechanics explanations remain available.

Validation: `scripts/test-caravan.mjs`, `scripts/verify-caravan.mjs` (16 complete
responsive/multilingual flows) and `scripts/verify-native-tools.mjs` (244 views).
