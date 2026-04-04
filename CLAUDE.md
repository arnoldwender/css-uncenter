# CLAUDE.md

## Project Overview

CSS Un-Center Pro is a humorous interactive React app that demonstrates destructive CSS anti-patterns. Users apply CSS snippets to a live preview and watch the layout break progressively. The app uses a retro terminal aesthetic (cyan on black, scanlines, glitch effects).

## Tech Stack

- React 18 + TypeScript, bundled with Vite 5
- Tailwind CSS 3 for utility classes
- Lucide React for icons
- No backend required (Supabase dependency exists in package.json but is unused)

## Commands

- `npm run dev` -- Start dev server (port 5173)
- `npm run build` -- Production build to `dist/`
- `npm run lint` -- ESLint check
- `npm run typecheck` -- TypeScript type check (`tsc --noEmit`)
- `npm run preview` -- Preview production build

## Architecture

- **Entry:** `index.html` -> `src/main.tsx` -> `src/App.tsx`
- **State:** React hooks in App.tsx manage chaos level (0-100) and applied snippets array
- **Components:** Small, focused components in `src/components/` -- Header, ChaosMeter, LivePreview, SnippetPanel, Footer, Overlays
- **Hooks:** `src/hooks/` contains `useGlitchTitle` (periodic title glitch) and `useRotatingTip` (rotating tips)
- **Constants:** `src/constants.ts` holds CSS snippets, glitch characters, and chaos tips
- **Styling:** Mix of Tailwind classes and inline styles. Inline styles are used heavily for dynamic chaos-based values. Global styles in `src/index.css`.

## Key Patterns

- Inline styles with dynamic values based on chaos level (not CSS classes)
- Heavy use of CSS animations defined in App.tsx (blink, scandown, drift, wobble, pulse)
- Components receive chaos level as props and conditionally render/style based on it
- All CSS snippets are defined in `src/constants.ts` as structured objects with id, label, target, and code

## Code Style

- Strict TypeScript (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- ESLint with React Hooks and React Refresh plugins
- Functional components with hooks only (no class components)
- No test framework configured

## Working on This Project

- The app is purely client-side; no API keys or environment variables needed
- The Supabase dependency in package.json is unused and can be ignored
- When modifying CSS snippets, update `src/constants.ts` -- the rest of the app reacts automatically
- The chaos level is calculated as `(appliedSnippets.length / totalSnippets) * 100`
- LivePreview.tsx has the most complex conditional styling based on chaos level thresholds
