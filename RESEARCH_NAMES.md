# Korean research names

The user requested Korean names matching the game UI, including 전쟁 수호 and
유닛 특훈. All 21 category titles and 430 individual node labels were audited.
131 existing node labels changed; the other 299 labels matched the reference.

Names were cross-checked on 2026-10-26 against the publicly displayed Korean
research tree at `https://lastz.invnrd.com/#tech`, including the site's Korean
game-data names and English labels. The two user examples are also displayed
in Korean research listings at `https://lastzplanner.com/ko/research/peace_shield/`.
This does not claim a direct verification in the user's running game client.

Matching uses category identity, English labels, maximum levels and full level
cost/power arrays where unique. Four repeated Age of Steel nodes have identical
Korean labels across all possible candidates; only the shared name is adopted,
without asserting a unique numeric or branch-ID match.

`src/research-korean-names.json` is the complete audited name inventory. Names
are applied to the main research dataset and the unlock-reference dataset so
cards, prerequisite labels, comparison views, nodes, dialogs and tables agree.
The old four-name rendering override is removed. In-game IDs, topology, costs,
unlock conditions, English/Spanish/Hindi labels and saved progress keys remain
unchanged. The Korean explanatory guide also uses the same category terms.

Other corrected category examples: 피난소 건설, 엘리트 부대, 본부 관리, 군사 이론,
도시 함락, 초고속 건설, 군사 발전, 연맹 무장, 라이더/돌격/슈터 특훈, 전술 마스터.
Node examples include 고급 보상, 경기 달인, 전군 출격!, 에너지 실드 and the
distinct 재고 관리I/II/III/IV labels (previously all incorrectly shown as IV).

Validation: `test-korean-research-names.mjs`, `test-advanced-math.mjs`,
`test-research-state.mjs`, and the 356-view responsive research browser check.
No source footer is added to the published site.
