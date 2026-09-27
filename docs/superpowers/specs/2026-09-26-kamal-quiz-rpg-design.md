# kamal — 2D Educational Quiz RPG — Design Spec

Date: 2026-09-26

## Context

The user wants a browser-based 2D educational game for kids in grades 1-6
that turns quiz answering into RPG-style combat: walking around a village,
fighting enemies and a boss by answering questions correctly, earning
currency and XP, and spending currency on cosmetic upgrades for the
character's armor and the player's home base ("hideout"). The project
starts from an empty directory (`kamal/`) with no existing code, so this is
a new project rather than a change to an existing one.

This spec covers the MVP: a single small village with one boss, a handful
of regular enemies, a hideout, an opening tutorial, and the full core loop
(explore → battle → earn → bank progress at the hideout). It is designed to
be extended later with more villages/subjects/enemies without restructuring.

## Goals

- A satisfying, low-stakes core loop: explore → quiz-battle → earn →
  (optionally) lose it all if you don't get home → bank it for good.
- Quiz content spans grades 1-6 across math, world history, English
  grammar, geography, science, health, and morality.
- Fully localized into **English, Hebrew, and Arabic** — both the game's UI
  (menus, HUD, tutorial) and the quiz question content itself, with correct
  RTL layout for Hebrew/Arabic.
- Runs entirely in the browser, no backend, no accounts — progress persists
  via `localStorage` only.
- Match the conventions already established in the sibling `neuropalsticity`
  project (the closest analog: also a from-scratch React game) so the
  workspace stays consistent.

## Non-goals (MVP)

- No multiplayer, accounts, or server-synced progress.
- No stat-affecting upgrades — armor and hideout upgrades are cosmetic only.
- No large content library — one village, one boss, 3-5 regular enemies to
  start; more villages/subjects are follow-up work once the loop is proven.
- No game engine (Phaser, etc.) — the village is a DOM/CSS tile grid, not a
  canvas-rendered scene.

## Core Loop

1. **Welcome screen** — player enters a name, picks a character (cosmetic
   avatar choice), and picks a language (English, Hebrew, or Arabic).
   Stored immediately to `localStorage` so a returning player skips this
   screen. The language choice sets the document's text direction
   (`ltr` for English, `rtl` for Hebrew/Arabic) for the rest of the app.
2. **Tutorial** — a short guided walkthrough on first launch explaining
   movement, battles, currency/XP, and the hideout's role. Skippable on
   subsequent visits (tracked via a `hasSeenTutorial` flag in saved state).
3. **Village exploration** — top-down tile grid, player sprite moves with
   arrow keys/WASD. The village contains the hideout, 3-5 regular enemies,
   and one boss, placed at fixed tile coordinates.
4. **Battle** — walking into an enemy or boss tile transitions to a
   portrait-vs-portrait battle screen (player avatar vs enemy avatar, no
   full-body sprites). The game presents a question (multiple choice or
   true/false) drawn from the JSON question bank.
   - Correct answer → damage to the enemy, and the player gains currency +
     XP (added to **unbanked** run state, not saved yet).
   - Wrong answer → damage to the player's HP.
   - Enemy/boss defeated → battle ends, player returns to the village at
     the same tile where the encounter started (the defeated enemy no
     longer occupies it).
   - Player HP reaches 0 → player is teleported back to the hideout, and
     **all unbanked currency/XP/items earned since the last hideout visit
     are discarded**. Banked (already-saved) progress is unaffected.
5. **Hideout** — entering the hideout tile "banks" the run: unbanked
   currency/XP/items are merged into saved state and persisted to
   `localStorage` immediately. The hideout is also where the player spends
   banked currency on cosmetic armor and hideout-decoration upgrades.

This makes the hideout both the narrative home base and the literal
save point, which is the risk/reward hook the user asked for.

## State Model

Two clearly separated pieces of state, to keep "what's safe" unambiguous:

- **Banked state** (persisted): player name, character choice, locale
  (`en` | `he` | `ar`), HP max, banked currency, banked XP, owned/equipped
  cosmetic upgrades, `hasSeenTutorial`, defeated-enemy flags for enemies
  that shouldn't respawn once cleared. Written to `localStorage` only at
  the moment the player reaches the hideout (or completes an upgrade
  purchase, or finishes the welcome/tutorial flow).
- **Run state** (in-memory only, per session): current HP, currency/XP
  earned since the last hideout visit, current battle state (active
  question, enemy HP), player's current village position. Reset to a
  fresh run whenever the player leaves the hideout, or discarded on death.

Implementation: a small `zustand` store with the `persist` middleware is
the one place that talks to `localStorage`, holding banked state.
`zustand` is already a transitive dependency (via `@react-three/drei` in
neuropalsticity) elsewhere in the workspace, so this promotes it to a
direct dependency for kamal specifically — it does not need to be added to
other projects. Run state lives in local component state / a `useReducer`
scene machine (mirroring neuropalsticity's `SimState`/`SimAction` pattern),
not in the persisted store, so it's naturally wiped on death or reload.

## Tech Stack

Matches `neuropalsticity` (the closest sibling project) rather than the
CRUD-app conventions in `issue-tracker`/`balance-app`:

- React 19 + TypeScript, Vite, `@tailwindcss/vite` (Tailwind v4)
- `oxlint` for linting
- `vitest` for tests (co-located `*.test.ts` files)
- npm as the package manager
- Path aliases: `@`, `@content`, `@village`, `@battle`, `@hideout`, `@lib`,
  `@components`, `@i18n`

## Internationalization (i18n)

Three supported locales: `en` (English), `he` (Hebrew), `ar` (Arabic). No
i18n library is needed at this scope — a small hand-rolled dictionary
covers it:

- **UI strings**: one flat `Record<string, Record<Locale, string>>`
  dictionary (`src/i18n/strings.ts`) keyed by string id (e.g. `"hud.hp"`,
  `"tutorial.step1"`), looked up via a `useTranslation()` hook that reads
  the current locale from the persisted store.
- **Question content**: `Question.prompt` and `Question.options` become
  per-locale maps instead of plain strings (see updated type below), so
  every question carries all three languages together in one place rather
  than duplicating question files per locale.
- **Text direction**: a locale's direction (`ltr` for `en`, `rtl` for `he`
  and `ar`) is applied to `<html dir="...">` whenever the locale changes
  (on language pick, and on load from saved state), so the browser handles
  RTL mirroring for text and standard block layout automatically. Text UI
  (HUD labels, battle/hideout panels, tutorial, buttons) uses logical CSS
  properties (`margin-inline-start`, `text-align: start`, etc.) rather
  than hardcoded `left`/`right` so it mirrors correctly under `rtl`. The
  **village tile grid keeps fixed screen-space coordinates regardless of
  locale** — it represents physical game-world space, not text flow, so
  mirroring it would invert the map's actual layout rather than just its
  reading direction.
- **Locale switching**: chosen once on the welcome screen and persisted;
  out of scope for the MVP to also expose an in-hideout language switcher
  (noted under Future Work).

## Folder Structure

Domain-based, not type-based (mirrors neuropalsticity):

```
kamal/
  src/
    content/         # static data: question banks, enemy/boss defs, tile maps
      questions/      # one file per subject (math.ts, history.ts, ...)
      enemies.ts
      village-map.ts
    village/          # exploration scene: tile grid, movement, collision
    battle/           # battle scene: question flow, HP/damage, rewards
    hideout/          # hideout scene: banking, cosmetic shop/upgrades UI
    lib/
      persistence/    # zustand + persist store (banked state)
      scene-machine.ts # shared useReducer scene-state helper pattern
    i18n/             # locale dictionary, useTranslation hook, Locale type
    components/       # shared UI (portrait, HUD, buttons)
    hooks/
    types/
  docs/superpowers/specs/   # this spec and future ones
```

## Question Bank Format

Hand-written JSON/TS data files, one per subject, grouped loosely by grade
band within the file. Each question carries all three locales' text
together:

```ts
type Locale = "en" | "he" | "ar";

type LocalizedText = Record<Locale, string>;

type Question = {
  id: string;
  subject: "math" | "history" | "grammar" | "geography" | "science" | "health" | "morality";
  grade: 1 | 2 | 3 | 4 | 5 | 6;
  type: "multiple-choice" | "true-false";
  prompt: LocalizedText;
  options: LocalizedText[];  // 4 entries for multiple-choice, 2 ("True"/"False" per locale) for true-false
  answerIndex: number;
};
```

Grammar questions are the one subject where the "same" question can't
just be translated word-for-word across languages (an English grammar
rule doesn't map onto Hebrew/Arabic grammar) — for that subject the three
locale variants of a question are independently written to test the
equivalent grade-level grammar concept in that language, not literal
translations of each other. Every other subject (math, history,
geography, science, health, morality) is a straight translation of the
same question/answer.

Enemies/boss reference a subject (and optionally a grade range) rather
than individual questions, so battles pull a random matching question from
the bank — this keeps content additions decoupled from enemy definitions.

## Rendering Approach

The village is a grid of fixed-size tiles rendered as React
components/CSS, not a canvas. The player is an absolutely-positioned
sprite whose grid coordinates update on keydown (arrow keys/WASD),
clamped to the map bounds and blocked by non-walkable tiles. Entering an
enemy/boss/hideout tile is a simple coordinate-match check that fires a
scene transition. This keeps the whole game debuggable in devtools and
stylable with plain CSS, appropriate for a small tile-based MVP village.

## Testing

- `vitest` unit tests for: the scene-state reducers (village movement,
  battle HP/reward math), the persistence store (bank/discard logic on
  hideout-reach vs. death), question-bank selection logic, and the
  `useTranslation` lookup (falls back sensibly, returns the right string
  per locale).
- No end-to-end/browser testing planned for MVP; manual playtesting is
  sufficient given the small scope.

## Open Questions / Future Work (explicitly out of scope for this spec)

- Additional villages/subjects/grade progression beyond the MVP boss +
  3-5 enemies.
- Whether upgrades eventually gain stat effects (explicitly deferred, not
  decided against forever).
- Sound/animation polish.
- An in-hideout language switcher (MVP only sets locale once, at the
  welcome screen).
- Larger per-subject question pools. Playtesting the MVP surfaced that with
  only 2 questions per subject, the same question repeats noticeably often
  within and across battles against the same enemy/subject — needs more
  content per subject before this feels varied.
- A visible damage/hit animation/flash when an enemy (especially the boss)
  takes damage. Playtesting found the current instant HP-bar update isn't
  obvious enough — a player can miss that they actually landed a hit,
  particularly against the boss's larger HP pool.
- Real character/enemy sprite art. The MVP intentionally uses plain
  geometric placeholders (colored circles/squares, emoji) per the "DOM/CSS
  tile grid, not canvas" non-goal — playtesting confirmed this reads as
  too plain and should be revisited with actual character/enemy artwork.
