# Calculator reference data

The Calculator card contains heroes, tank, equipment, area exploration, hero EXP,
Lucky Discounter and speedup/resource-pack utilities. Buildings live in the HQ
Level Up card; Caravan calculation lives in the Caravan card. Research lives
in its own guide card. The two main-header tool shortcuts have been removed.
The research guide opens an illustrated catalog of all 21 trees. Each tree has a connected
node canvas, prerequisite paths, current and target levels, a level-cost dialog,
used/remaining resources, speed and savings settings, zoom/pan and layout modes.
It also supports tree comparison and an optional beginner guide. Research pages
contain no outbound links and share progress with the Calculator card.

Game numbers and short item names were checked against the public
[Wild Hoggs](https://wild-hoggs.com/) reference on 2026-10-26. Attribution is plain
text: all tool and guide views stay on this site. Numeric snapshots and game
artwork are stored locally; calculations do not depend on an iframe, third-party
login, embedded upstream app, or a live source request.

- `advanced-reference.json`: 32 buildings, 21 complete research trees, 36 hero
  growth profiles, tank/equipment costs, 906 exploration stages, 23 bounties,
  and the Lucky Discounter offer probabilities and milestones.
- `research-reference.json`: laboratory, prerequisite and season requirements.
- `research-visuals.json` and `public/research/`: locally served game research art
  and node icons, refreshed with `scripts/import-research-visuals.mjs`.
- `game-reference.json`: hero identities and EXP costs.
- `caravan-reference.json`: all 50 source calculator levels, separate from the
  original alliance workbook's guide table.
- `tool-art.json` and `public/game-tools/`: local building, vehicle, module,
  plugin, equipment, faction, rarity and shop artwork; mini-upgrade numeric data.
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
- Tank leveling carries excess EXP between levels. The native modification map
  includes wrench nodes, blueprint mini-upgrades and start/completion bonuses.
  Module totals are base power, not fusion success forecasts.
- Equipment promotion/forging/crafting is orange-only. Enhancement caps depend
  on promotion and forging. Forging prerequisites are shown separately.
- Hero power excludes equipment, research, vehicles and resonance buffs.
- Exploration power is advisory; source estimates are marked. Idle rewards use
  the source screen's per-minute unit. First-clear rewards and bounties are separate.
- Lucky estimates use 300 deterministic Monte Carlo trials in a worker, drawing
  three offers per row with replacement. Fixed guarantees, the 25-draw pity,
  coupon/purchase points, milestones and optional event resets are included.
  Capped trials are reported. These are estimates, not promised outcomes.

## Native tool screens

The layouts were checked against current rendered upstream screens, including
tank's four modes, building cards, the equipment inventory and add dialog, hero
portraits/filters, Caravan faction controls, EXP sliders, exploration stage
cards and the Lucky planner/shop. Screenshot capture scripts write ignored QA
files. The application uses independently implemented React components, not
copied upstream component bundles.

Tank modification totals include the blueprint mini-upgrades as well as wrench
nodes. Full completion is 70,700 wrenches, 3,414,514 blueprints and 8,823,143 power.
Inventory equipment can be assigned to a hero; a hero has one item per slot.
Hero skill levels and numeric values are local. Exploration completion and
account/inventory inputs persist on this device.

`scripts/verify-native-tools.mjs` covers the current UI and relocated cards in
four languages at 360, 390, 768 and 1440px. `scripts/test-lucky-native.mjs` checks
guaranteed discounts, pity, milestones, purchases and goal/coupon simulations.

Verification: `node scripts/test-tool-math.mjs`,
`node scripts/test-advanced-math.mjs`, `node scripts/verify-advanced.mjs`,
`node scripts/verify-tools.mjs` and `node scripts/verify-carousel.mjs`.
Browser checks accept `GUIDE_URL` for local or published validation.
