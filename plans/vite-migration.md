# Plan — Transform Resource Hub into a Vite + TypeScript app

Target: production Vite + React + TypeScript build, deployed to GitHub Pages on the
custom domain `claude.app.happymates.dk`.

## Phase 1 — Scaffolding & tooling
- [x] Add `package.json` (react, react-dom, lucide-react, vite, typescript, gh-pages)
- [x] Add `vite.config.ts` (`base: '/'` because of custom domain)
- [x] Add `tsconfig.json` + `tsconfig.node.json`
- [x] Add `.gitignore`
- [x] Move static assets into `public/assets/` (svg, jpeg, css)
- [x] Add `public/CNAME` → `claude.app.happymates.dk`
- [x] New `index.html` at root loading `/src/main.tsx`

## Phase 2 — Source conversion (window globals → ES modules + TS)
- [x] `src/types.ts` — data model + tweak types
- [x] `src/data.ts` — RESOURCES + COURSES (from data.jsx)
- [x] `src/components.tsx` — helpers, Icon (lucide-react DynamicIcon), nav, footer
- [x] `src/cards.tsx` — resource cards + courses section
- [x] `src/tweaks-panel.tsx` — tweaks shell + controls
- [x] `src/App.tsx` — main app
- [x] `src/main.tsx` — entry (replaces inline Babel + MutationObserver/createIcons)
- [x] `src/vite-env.d.ts`

## Phase 3 — Deployment
- [x] `.github/workflows/deploy.yml` — build + deploy to GitHub Pages
- [x] `deploy` npm script via `gh-pages` for manual publish

## Phase 4 — Verify
- [x] `npm install`
- [x] `npm run build` passes (tsc + vite)
