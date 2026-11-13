# css-uncenter — contributor notes

## Project

- Humour web app by Arnold Wender (React 18 + Vite + Tailwind + Framer Motion). Public repository; the licence in
  `LICENSE` is deliberate.
- Live: <https://css-uncenter.netlify.app>. The Netlify site builds from `main` on GitHub (`npm run build` → `dist/`):
  a merge deploys. Static files that must be served (legal pages, `llms.txt`) live in `public/`; Vite copies only that
  directory into `dist/`.

## Rules

- **No third-party requests.** Only system fonts; never add Google Fonts or other CDN assets.
- **Legal pages** are static files: `public/impressum/index.html` and `public/datenschutz/index.html`, linked from
  `src/components/Footer.tsx` outside the chaos transforms. If you add a feature that stores data in the browser or
  contacts a third party, update the Datenschutzerklärung in the same change.
- `localStorage` (`css-uncenter-high-score`, `-global-counter`, `-achievements`) is written only after a user action,
  never on page load.
