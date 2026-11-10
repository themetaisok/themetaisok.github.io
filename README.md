# themetaisok.com

The personal portfolio site for the handle **themetaisok** (Meta). Static, single page,
no build step. Cross-links with [emergentlabz.com](https://www.emergentlabz.com/), the
two-person research and development shop run with Zlerp.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site. Self-contained: CSS and JS inline, no external dependencies. |
| `og.png` | Social card image, 1200x630, matching the `og:image:width`/`height` declared in the page. |
| `robots.txt` | Allows all crawlers, and explicitly allows the AI answer engines (GPTBot, ClaudeBot, PerplexityBot and others). |
| `sitemap.xml` | Single URL. Update `lastmod` when the page changes substantively. |
| `llms.txt` | Plain-text summary for AI crawlers, an emerging convention for answer engines. |
| `CNAME` | Required by GitHub Pages to serve the apex domain. Contains `themetaisok.com` and nothing else. |

## Deploying

The repo is the site. Push to the default branch and GitHub Pages serves it.

Settings > Pages > Source: Deploy from a branch, root (`/`).

## DNS

The domain is registered at **Njalla**. DNS is managed in the Njalla panel, not here.
Records required for GitHub Pages at the apex:

- Four `A` records on `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Four `AAAA` records on `@` to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- One `CNAME` on `www` to `themetaisok.github.io`

Remove any default records Njalla sets automatically, and do not add a wildcard record.
After DNS resolves, enable "Enforce HTTPS" in the Pages settings. That option can take up
to 24 hours to become available.

## Editing

Open `index.html` and edit it. There is no toolchain, no `npm install`, nothing to run.
Keep the canonical URL, the `og:image` URL and the sitemap `loc` pointed at
`https://themetaisok.com/`.

## Conventions used in this site

- No em dashes anywhere in the copy.
- Live figures are stated as non-exact floors ("more than 9,000"), never as exact counts
  that go stale.
- The handle only. No legal name appears anywhere in this repo, deliberately.
