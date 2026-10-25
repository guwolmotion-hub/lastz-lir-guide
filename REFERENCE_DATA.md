# Calculator reference data

The calculator card contains nine categories: research, buildings, heroes, tank,
equipment, caravan, area exploration, hero EXP and Lucky Discounter. Existing
speedup/resource-pack utilities are grouped under the same card. The research
guide opens an illustrated catalog of all 21 trees. Each tree has a connected
node canvas, prerequisite paths, current and target levels, a level-cost dialog,
used/remaining resources, speed and savings settings, zoom/pan and layout modes.
It also supports tree comparison and an optional beginner guide. Research pages
contain no outbound links and share progress with the Calculator card.

Game numbers and short item names were checked against the public
[Wild Hoggs](https://wild-hoggs.com/) reference on 2026-10-26. Each tool links
to its relevant source. Numeric snapshots are stored locally; calculations do
not depend on an iframe, third-party login or a live source request.

- `advanced-reference.json`: 32 buildings, 21 complete research trees, 36 hero
  growth profiles, tank/equipment costs, 906 exploration stages, 23 bounties,
  and the Lucky Discounter offer probabilities and milestones.
- `research-reference.json`: laboratory, prerequisite and season requirements.
- `research-visuals.json` and `public/research/`: locally served game research art
  and node icons, refreshed with `scripts/import-research-visuals.mjs`.
- `game-reference.json`: hero identities and EXP costs.
- The original alliance workbook remains authoritative for alliance-specific
  Caravan recommendations and guide schedules.

Refresh using `node scripts/inspect-advanced-reference.mjs`,
`node scripts/import-research-reference.mjs` and
`node scripts/import-advanced-reference.mjs`. The first script writes an ignored
`qa/reference-literals.json`. The static AST parser reads data literals without
executing downloaded JavaScript. Asset versions and prerequisite changes must
be reviewed when refreshing.

Calculations are our own implementation. Public UI/component code and long
descriptions are not copied. Four-language UI copy is maintained locally;
Hindi has its own research, building, equipment and item terminology.

## Calculation boundaries

- Building totals exclude prerequisite buildings and alliance help. Unknown
  costs remain unknown. Speed bonuses divide base time by `1 + bonus / 100`.
- Research targets cover only the selected tree. Badge savings apply to badges
  only. Missing node prerequisites are flagged; other trees are not auto-added.
- Tank leveling carries excess EXP between levels. Wrench modification power
  excludes blueprint mini-upgrades and start/completion bonuses. Module totals
  are base power, not fusion forecasts.
- Equipment promotion/forging/crafting is orange-only. Enhancement caps depend
  on promotion and forging. Forging prerequisites are shown separately.
- Hero power excludes equipment, research, vehicles and resonance buffs.
- Exploration power is advisory; source estimates are marked. Idle reward values
  are not relabeled as hourly rates. Target reward sums exclude the current stage.
- Lucky estimates use 300 deterministic Monte Carlo trials in a worker, drawing
  three offers per row with replacement. Fixed guarantees, the 25-draw pity,
  coupon/purchase points, milestones and optional event resets are included.
  Capped trials are reported. These are estimates, not promised outcomes.

Verification: `node scripts/test-tool-math.mjs`,
`node scripts/test-advanced-math.mjs`, `node scripts/verify-advanced.mjs`,
`node scripts/verify-tools.mjs` and `node scripts/verify-carousel.mjs`.
Browser checks accept `GUIDE_URL` for local or published validation.
