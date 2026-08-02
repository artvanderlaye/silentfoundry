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

## Design reference — the Marshall case study is the benchmark
- The Marshall DNA-translation section on `index.html` is the layout that WORKS.
  Matthew has confirmed it's the strongest section on the site. Treat it as the
  house pattern and adapt other sections to match over time.
- Why it works: it PROVES instead of claiming. The rhythm is
  eyebrow -> big display headline -> short setup paragraph -> hard numbers
  (1962 / 60+ / $4B+ / $1.1B) -> image -> concrete attribute grid (6 short
  labelled items) -> outcome. Text and image alternate, so it breathes.
- Already reused once: the SWITCH featured project uses the same shape
  (Form, Structure, CMF, Signature Details, Stance, Manufacturing). Repeating it
  is deliberate — it's becoming the site's signature.
- Queued: rebuild the TEAM page on this rhythm (it's currently ~1,140 words,
  cramped and unbalanced). Other sections to follow.

## Voice / taste (learned from the copy pass)
- Matthew is chasing RESTRAINT, not impact. When given bold vs calm options he
  picks calm (chose the cream contained video layout over full-bleed cinematic,
  chose the no-eyebrow full-width text block).
- Strip corporate/consulting language on sight: "scalable", "product systems",
  "unit economics", "price architecture", "channel logic", "credible paths to
  liquidity". He calls this "try hard" and wants it gone sitewide.
- Also removing decorative try-hard elements (e.g. the "Open for 2026
  partnerships" floating badge was deleted from all pages).
- Positioning: NOT a "studio" (too small/agency). The Foundry for Brand DNA.
  Anchor line (updated Aug 2026): "The world's best brands deserve more than
  merch." (Superseded: "...strongest brands deserve more than merchandise.")
- Not a design consultancy either. Positioning is a VENTURE PLATFORM built
  around physical products: finds authentic brand DNA, turns it into
  world-class products, and has the manufacturing network, commercial
  structure and investment relationships to build ventures around them.

## Verify before shipping
- This site is deployed via Cloudflare Pages from `main`. Use Chrome (live) to
  confirm rendered results — source can differ from render (logo is an injected
  SVG, image extensions don't match content, etc.).

## ALWAYS give the URL — every single time. LEAD with it.
- Matthew works across many preview pages and the address changes constantly.
- Put the live URL of the page that changed at the very TOP of the response, on
  its own line, before any explanation, audit or code. Repeat it at the bottom.
  Do NOT bury it under a long technical report — he has repeatedly had to ask,
  and it frustrates him. If he has to ask "what's the link", that's a failure.
- Give the link to the PAGE THAT CHANGED — never the homepage as a substitute.
- Root homepage: `https://silentfoundry.pages.dev`
- Any other page: `https://silentfoundry.pages.dev/<filename-without-.html>`
- If several pages changed, list each one.
- Current working pages:
  - `https://silentfoundry.pages.dev/sf-team-explore`  30 explorations + ORIG
  - `https://silentfoundry.pages.dev/sf-team-final`    the chosen baseline (layout 27)
  - `https://silentfoundry.pages.dev/sf-team`          the live team page

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

## Matthew ALWAYS pushes — never blame the push
- Matthew reliably runs the full push (add + commit + push). Do NOT default to
  "did you push?" / "you need to push" as the troubleshooting step, and do NOT
  tell him to push repeatedly. It's almost never the issue and it frustrates him.
- If something isn't live, diagnose the REAL cause yourself, without asking:
  - Confirm it's on GitHub: read `.git/refs/heads/main` vs
    `.git/refs/remotes/origin/main` (same hash = pushed) and `.git/logs/HEAD`
    for the commit history/messages. (Read these files; never RUN git.)
  - If it IS on origin/main but not live, it's a Cloudflare Pages DEPLOY issue,
    not git: cache-buster the URL (`?cb=123`) to rule out cache, then it's a
    stale/failed/pending Cloudflare build — point Matthew to the Cloudflare
    Pages → Deployments tab (retry deploy / check build error), not to git.
