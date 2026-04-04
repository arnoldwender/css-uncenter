# CSS Un-Center Pro v6.6.6

**Layout Destruction Suite** -- Making divs suffer since 2026.

An interactive React/TypeScript web app that demonstrates what happens when you deliberately apply terrible CSS practices. Click through increasingly chaotic CSS snippets and watch a sample website layout fall apart in real time.

Built with a retro terminal/hacker aesthetic: cyan glowing text, scanlines, and a dark background.

## Features

- **Progressive Chaos Meter** -- Each applied CSS snippet adds 25% chaos (up to 100%)
- **Live Preview** -- Watch a sample layout deteriorate as you apply destructive snippets
- **4 CSS Destruction Snippets** -- Misalign buttons, shrink headings, rotate images, and bury navigation
- **Retro Terminal UI** -- Scanline overlays, glitch text effects, and CRT-style visuals
- **Restore Sanity** -- One-click reset to undo all the damage

## Tech Stack

- **React 18** with TypeScript
- **Vite 5** for builds and dev server
- **Tailwind CSS 3** for utility styles
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command              | Description                  |
|----------------------|------------------------------|
| `npm run dev`        | Start Vite dev server        |
| `npm run build`      | Build for production         |
| `npm run preview`    | Preview production build     |
| `npm run lint`       | Run ESLint                   |
| `npm run typecheck`  | TypeScript type checking     |

## Project Structure

```
src/
  App.tsx              Main app component, state management, animations
  constants.ts         CSS snippets, glitch characters, chaos tips
  utils.ts             Glitch text utility
  index.css            Global styles (Tailwind + custom)
  components/
    Header.tsx         Title, tagline, badge tags
    ChaosMeter.tsx     Visual chaos level progress bar
    LivePreview.tsx    Interactive layout that deteriorates
    SnippetPanel.tsx   CSS snippet buttons
    Footer.tsx         Misaligned footer text
    Overlays.tsx       Scanline and vignette effects
  hooks/
    useGlitchTitle.ts  Periodic glitch effect on title
    useRotatingTip.ts  Rotating "PRO TIP" display
```

## How It Works

The app maintains a list of applied CSS snippets. Each snippet targets a different element in the live preview (button, heading, image, nav). As snippets are applied, the chaos meter fills and the preview layout progressively breaks -- text shifts, elements rotate, opacity drops, and z-indexes go negative. At max chaos the preview is barely usable, which is the point.

## License

MIT
