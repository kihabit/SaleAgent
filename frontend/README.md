# KDS ERP Crew — Next.js Frontend

Converted from the uploaded static frontend into a Next.js + React + TypeScript structure.

## Run

1. Copy `.env.example` to `.env.local`.
2. Set `LARAVEL_API_URL` to your Laravel 12 application URL, for example:

   `LARAVEL_API_URL=http://127.0.0.1:8000`

3. Install dependencies:

   `npm install`

4. Start development:

   `npm run dev`

The Next.js rewrite proxies `/api/*` to Laravel, so the React components can continue using `/api/...` without hard-coded Laravel URLs or browser CORS configuration.

## Routes

- `/` — Home
- `/about` — About
- `/agent-library` — Agent Library

## Laravel endpoints used

- `/api/header-settings`
- `/api/menu-items`
- `/api/hero-slides`
- `/api/agent-section`
- `/api/bottom-sliders`
- `/api/bottom-step-sliders`
- `/api/footer-settings`
- `/api/footer-socials`
- `/api/agent-categories`
- `/api/agents`
- `/api/catalogue-settings`

## Important: assets

The uploaded ZIP did not contain the `assets/images` directory even though the HTML references image files. Add the original images to `public/images/`, especially:

- `kds-logo-header.png`
- `kds-logo-full.png`
- `erpcrew-section-bg.png`
- `about-hero-bg.png`
- any hero slide images returned by the API
- any demo-step images returned by the API

The supplied ZIP also did not contain the Inter WOFF2 font, so `public/fonts/inter.woff2` must be added if you want the bundled font rather than the system fallback.

## Architecture

Laravel + Filament -> Laravel API -> Next.js components -> browser

The old DOM-manipulating JavaScript has been replaced by React state/effects and reusable components.
