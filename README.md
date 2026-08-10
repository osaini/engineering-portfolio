# Engineering Portfolio — Oaj Saini

A static site. No framework, no bundler, no server. Each page is plain HTML that loads React
from a CDN and its own precompiled bundle from `assets/`.

## Layout

```
index.html                  Home (the pit wall)
projects/*.html             One page per project
src/**/*.jsx                Page logic — EDIT THESE
assets/**/*.js              Compiled output — generated, do not edit
build.mjs                   The compiler
404.html  robots.txt  sitemap.xml  llms.txt
docs/vibecode-launch-checklist.md
```

## Making a change

Page markup, styles and `<head>` metadata live in the `.html` files — edit those directly.

Everything inside the page (components, data, layout) lives in `src/`. After editing any
`.jsx` file, recompile:

```bash
node build.mjs      # or: npm run build
```

This rewrites `assets/`. **Commit the compiled output** — Vercel serves this repo as-is and does
not run a build.

`build.mjs` needs no `npm install`: on first run it downloads the JSX compiler once into
`.build-cache/` (gitignored). If you'd rather pin it as a real dependency, `npm install` picks up
`@babel/standalone` from `package.json` and the build prefers that.

## Local preview

Any static file server works. The site relies on extensionless URLs (`/projects/cade`), which
Vercel provides via `"cleanUrls": true` in `vercel.json` — mirror that locally or just open the
`.html` paths directly.

## Before you deploy

Search-and-replace `https://engineering-portfolio-liart.vercel.app` if the domain changes. It appears in:

- `index.html` and each `projects/*.html` — `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — every `<loc>`
- `llms.txt` — the project links

## Known gaps

- `assets/models/*.glb` are referenced by the C.A.D.E and FPV drone pages but are not in the repo.
  The viewer degrades to a caption when the model 404s; add the files to light it up.
- The site is client-rendered, so `view-source:` shows an empty `#root`. The `<head>` metadata,
  JSON-LD and `llms.txt` carry the content for crawlers and social scrapers.
