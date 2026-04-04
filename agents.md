# agents.md

Guidelines for AI agents working on this repository.

## Project Context

This is a small React/TypeScript frontend app (CSS Un-Center Pro) with no backend. It's a humorous interactive tool that applies destructive CSS to a live preview. The codebase is compact: ~6 components, 2 custom hooks, 1 constants file, 1 utility file.

## Setup

```bash
npm install
npm run dev
```

No environment variables or API keys required.

## Validation

Run these before committing changes:

```bash
npm run typecheck   # Must pass -- strict TypeScript
npm run lint        # Must pass -- ESLint
npm run build       # Must succeed -- production build
```

There is no test suite.

## File Guide

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main component, state, animations. Most changes start here. |
| `src/constants.ts` | CSS snippets, tips, glitch chars. Edit here to add/modify snippets. |
| `src/components/LivePreview.tsx` | Complex conditional rendering based on chaos level. |
| `src/components/Header.tsx` | Title and badges, reacts to chaos. |
| `src/components/ChaosMeter.tsx` | Progress bar visualization. |
| `src/components/SnippetPanel.tsx` | Snippet buttons with apply logic. |
| `src/components/Footer.tsx` | Footer, shifts with chaos. |
| `src/components/Overlays.tsx` | Visual effects (scanlines, vignette). |
| `src/hooks/useGlitchTitle.ts` | Glitch text effect hook. |
| `src/hooks/useRotatingTip.ts` | Rotating tip display hook. |
| `src/utils.ts` | `glitchText()` utility function. |
| `src/index.css` | Tailwind directives + global resets. |

## Conventions

- Functional components only, no class components
- TypeScript strict mode -- no `any` types, no unused variables
- Inline styles for dynamic/chaos-dependent values, Tailwind for static styles
- Keep the humorous tone in user-facing strings
- Color palette: `#00ffff` (cyan), `#000` (black), `#ff9900` (warning), `#ff0000` (danger)

## Common Tasks

**Add a new CSS snippet:** Add an entry to `CSS_SNIPPETS` in `src/constants.ts`. The snippet needs `id`, `label`, `target`, and `code` fields. LivePreview.tsx may need updates if the new snippet targets a new element.

**Modify chaos thresholds:** Chaos logic lives in `src/App.tsx` (calculation) and `src/components/LivePreview.tsx` (visual thresholds). The meter color thresholds are in `src/components/ChaosMeter.tsx`.

**Add a new component:** Create in `src/components/`, import in `App.tsx`. Follow the pattern of receiving `chaos` as a prop for dynamic styling.
