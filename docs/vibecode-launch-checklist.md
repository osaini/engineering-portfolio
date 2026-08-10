# 20 (hidden) vibecoded website giveaways

Pre-launch checklist transcribed from an Instagram reel by **[@yatesvids](https://www.instagram.com/yatesvids/)**.

- **Source:** https://www.instagram.com/reel/Dbpctz6Cp5a/
- **Caption:** "Before you publish your first vibecoded website check these!"
- Transcribed from the video's on-screen text (the reel has no caption track).

Each item is a *tell* — something that signals a site was generated and shipped without a
pre-launch pass.

| # | Giveaway | What it means |
|---|----------|---------------|
| 1 | `vercel.app` url | Shipped on the default platform subdomain instead of a real domain |
| 2 | viewsource empty | `View Source` shows an empty root div — everything is client-rendered, nothing for crawlers |
| 3 | no 404 page | Bad URLs fall through to the host's generic error page |
| 4 | vite + react browser | Default Vite/React SPA scaffold, rendered entirely in the browser |
| 5 | same page titles | Every route shares one `<title>` |
| 6 | no meta desc | No `<meta name="description">`, so search results scrape arbitrary text |
| 7 | no `og:image` | Links pasted into Slack/iMessage/X render as a bare grey box |
| 8 | no structured data | No JSON-LD, so no rich results |
| 9 | multiple H1's | Several `<h1>` on one page — no heading hierarchy |
| 10 | no H1's | Headline is a styled `<div>`/`<span>` instead of an `<h1>` |
| 11 | no canonical tag | No `<link rel="canonical">` — duplicate-URL ambiguity |
| 12 | no `llms.txt` | No machine-readable summary for AI crawlers |
| 13 | AI blocked `robots.txt` | A boilerplate `robots.txt` that `Disallow: /`s GPTBot, Google-Extended, CCBot etc. — usually pasted in without intent |
| 14 | no favicon | Blank/default tab icon (often `href="data:,"`) |
| 15 | no `sitemap.xml` | Nothing telling crawlers what pages exist |
| 16 | no lang attribution | `<html>` missing `lang` |
| 17 | missing alt text | Images ship without `alt` |
| 18 | source maps | `.map` files published to production, exposing original source |
| 19 | console errors | Errors/warnings in DevTools on a fresh load |
| 20 | massive JS bundles | Megabytes of JavaScript for a mostly-static page |

> Note on #13: the point is that *blocking AI crawlers by accident* is the tell. A deliberate
> `Disallow` is a legitimate choice — several commenters on the reel made exactly that argument.
