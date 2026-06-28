# Silent Foundry — Working Notes for Claude

Standing preferences learned while working on this site. Follow these in addition
to the project's configured instructions.

## Git is the user's to run
- NEVER run git from the agent side (no `fetch` / `status` / `add` / `commit` /
  `push`). Git can leave a `.git/index.lock` the sandbox can't remove, which
  blocks the user's Terminal.
- Read and edit files only. When changes are ready, hand the user one
  self-contained command to paste, e.g.:
  `cd /Users/Home/Documents/GitHub/silentfoundry && rm -f .git/index.lock && git add . && git commit -m "..." && git push`

## Site changes apply to ALL English pages
- Any site-wide change (color, copy, layout, logo, etc.) must be applied to all
  four English pages: `index.html`, `sf-team.html`, `sf-contact.html`, `legal.html`.
- Shared CSS (`sf-styles.css`) is NOT sufficient on its own: individual pages
  carry inline `<style>` overrides — often with `!important` — that defeat shared
  rules (e.g. `legal.html` had its own `.nav-logo svg text` fill). ALWAYS grep
  every English page for per-page overrides of whatever is being changed, and
  update those too. Then verify each page live in Chrome.
- EN/ZH translation sync is handled by the user — do not auto-edit the `zh-*`
  pages unless explicitly asked.

## Logo color
- The nav-logo color is controlled by `--logo-color` in `:root` (`sf-styles.css`).
  Changing that one value recolors the logo on every page that uses the shared
  rule. Any per-page override must also be set to `var(--logo-color)`.
- Logo sizing / scroll-shrink behavior is NOT yet consistent across pages
  (only `index.html` has the switcher + scroll-shrink). Standardizing that is a
  separate, queued project.

## Verify before shipping
- This site is deployed via Cloudflare Pages from `main`. Use Chrome (live) to
  confirm rendered results — source can differ from render (logo is an injected
  SVG, image extensions don't match content, etc.).

## Response style (how to report back to Matthew)
- Do the full detailed work as usual — backups, edits, triple-checks, live
  verification. Matthew likes that the detail is there and visible.
- BUT always END every response with a short, plain-language summary:
  1-2 lines, no jargon, just "here's what changed / where we are."
- At decision points, give ONE clear, simple choice in plain words — not a
  wall of options or technical trade-offs.
- Matthew often can't read the long technical parts — the short summary and the
  simple choice at the END are what he actually reads. Put them last, keep them
  human.
