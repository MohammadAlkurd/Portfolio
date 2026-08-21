# Mohammed Kord — Portfolio

Personal portfolio for Mohammed Kord, a Computer Engineering student at Palestine Polytechnic University. Built with Vite, React, TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

The development server is available at the URL Vite prints in the terminal.

## Checks and production build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. On every push to `main`, it builds the site and deploys the `dist` artifact to GitHub Pages. The Vite base path is configured for:

`https://mohammadalkurd.github.io/Portfolio/`

The workflow enables GitHub Pages automatically on its first successful run. If automatic enablement is unavailable for the repository, use **Settings → Pages → Build and deployment → GitHub Actions** as a fallback.

## How to edit your content

All identity, copy, social links, skills, education, and projects live in **`src/data/content.ts`**. Update the typed `content` object there to change the portfolio without editing components.

- Replace `PLACEHOLDER_RESUME_URL` when a resume link is ready; the resume button is hidden until then.
- Keep project links and descriptions in the data module so the UI remains reusable.
- A project can use `kind: 'game'` to appear in the distinct playable games group, and `demo` for a play/live link.

## Structure

- `src/data/content.ts` — editable, typed portfolio content
- `src/App.tsx` — semantic page sections and interactions
- `src/styles.css` — responsive design tokens and styling
- `.github/workflows/deploy.yml` — GitHub Pages deployment
