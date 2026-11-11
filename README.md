# themetaisok.com

The personal portfolio site for the handle **themetaisok** (meta). Static, single page,
no build step. Cross-links with [emergentlabz.com](https://www.emergentlabz.com/), the
two-person research and development shop run with Zlerp.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site. CSS and JS are inline. It loads nothing from another host. |
| `fonts/` | Two typefaces, three files: Adventor Web (regular and bold) for headings and figures, Caladea Web for text. Latin subsets, self-hosted. `fonts/LICENSES.txt` says where they come from and what was changed. |
| `pfp.webp` | The profile picture in the header. The page palette is sampled from it. |
| `favicon.ico`, `favicon-32.png`, `icon-192.png`, `apple-touch-icon.png` | The browser tab and home-screen icons, all cut from the profile picture. |
| `og.png` | Social card image, 1200x630, matching the `og:image:width`/`height` declared in the page. |
| `robots.txt` | Allows all crawlers, and explicitly allows the AI answer engines (GPTBot, ClaudeBot, PerplexityBot and others). |
| `sitemap.xml` | Single URL. Update `lastmod` when the page changes substantively. |
| `llms.txt` | Plain-text summary for AI crawlers, an emerging convention for answer engines. |
| `CNAME` | Required by GitHub Pages to serve the apex domain. Contains `themetaisok.com` and nothing else. |

## Design

One line runs down the page. Left of it is what counts, right of it is what does not,
and each section heading relabels the two columns for that section. On a phone the line
turns: the right-hand blocks are set in from the left edge.

Two sections, Writing and Earlier, have nothing to exclude. They sit on the light ground
alone, so the dark field keeps one meaning.

Three colors a theme, all taken from the profile picture.

| | Ground | Ink | Field and accent |
|---|---|---|---|
| Light | porcelain `#F4EEEE` | `#18181A` | indigo `#282C6D` |
| Dark | `#131115` | porcelain `#F4EEEE` | plum `#4E2544`, accent `#B665A2` |

The theme follows the system until the visitor uses the switch in the header, after
which their choice is kept in `localStorage` under `theme`.

The dots in the registry figure are static SVG, written into the page. Nothing is
drawn at runtime.

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
HTTPS is enforced in the Pages settings.

## Editing

Open `index.html` and edit it. There is no toolchain, no `npm install`, nothing to run.
Keep the canonical URL, the `og:image` URL and the sitemap `loc` pointed at
`https://themetaisok.com/`.

## Conventions used in this site

- No em dashes anywhere in the copy.
- Live figures are stated as non-exact floors ("more than 9,000"), never as exact counts
  that go stale.
- The handle only. No legal name appears anywhere in this repo, deliberately.
- Nothing on the dark field is decoration. Every line there is a real exclusion.
- The page is checked at every window width from 280px to 2560px. The registry figure is
  measured inside the page margins, so it holds its shape on wide screens.
