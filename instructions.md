# instructions.md

Development instructions for CSS Un-Center Pro.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
git clone https://github.com/arnoldwender/css-uncenter.git
cd css-uncenter
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:5173. Vite provides hot module replacement.

## Building

```bash
npm run build
```

Output goes to `dist/`. Preview with:

```bash
npm run preview
```

## Code Quality

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript strict checking
```

Both must pass before committing.

## Project Architecture

The app is a single-page React application with no routing and no backend.

**State flow:**
1. `App.tsx` holds `appliedSnippets` state (array of snippet IDs)
2. Chaos level is derived: `(appliedSnippets.length / CSS_SNIPPETS.length) * 100`
3. Chaos level is passed as a prop to all display components
4. Each component conditionally applies styles based on chaos thresholds

**Component hierarchy:**
```
App
  Header (title, badges)
  ChaosMeter (progress bar)
  main layout
    SnippetPanel (snippet buttons)
    LivePreview (destructible layout)
  Footer
  Overlays (scanlines, vignette)
```

## Adding Features

When adding new CSS destruction snippets:
1. Add the snippet object to `CSS_SNIPPETS` in `src/constants.ts`
2. If the snippet targets a new element, add that element to `LivePreview.tsx`
3. The chaos calculation auto-adjusts since it uses `CSS_SNIPPETS.length`

When adding new visual effects:
1. Define keyframe animations in the `<style>` tag within `App.tsx`
2. Apply via inline styles or add to `src/components/Overlays.tsx`

## Deployment

This is a static site. Build with `npm run build` and deploy the `dist/` directory to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).
