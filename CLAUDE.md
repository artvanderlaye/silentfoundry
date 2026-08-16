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
- It must be the LIVE pages.dev URL — the address where he will see the change
  AFTER he pushes. That is the link he wants, every single time, without asking.
  A `file:///` path is an EXTRA, never a substitute. Put the pages.dev URL first.
- This applies to EVERY output that touches a page — including small fixes,
  re-outputs and follow-ups. Never omit it because "it's the same link as before".
- THE LINK MUST BE CLICKABLE. Write it as a markdown link, never wrapped in
  backticks — backticks render as code and cannot be clicked:
      GOOD  [https://silentfoundry.pages.dev](https://silentfoundry.pages.dev)
      BAD   `https://silentfoundry.pages.dev`
  This applies to the URL at the top AND the one at the bottom of every reply.
  (The push command still goes in a code block — that one is for copying, not
  clicking.)
- Root homepage: `https://silentfoundry.pages.dev`
- Any other page: `https://silentfoundry.pages.dev/<filename-without-.html>`
- If several pages changed, list each one.
- Current live pages:
  - `https://silentfoundry.pages.dev`             the homepage (`index.html`)
  - `https://silentfoundry.pages.dev/sf-team`     the team page
  - `https://silentfoundry.pages.dev/sf-contact`  the contact page
  - `https://silentfoundry.pages.dev/legal`       legal

## Variation studies: NUMBERED BOXES on the bar, not a drag slider
- The lab pages are right: one variation shown full size at a time. What was
  wrong was the CONTROL. Do not use an `<input type=range>` drag slider.
- Use a row of small numbered BOXES along the bottom bar — one box per
  variation, the number in it, click to jump, the active one filled gold.
  Arrow keys still step. The current variation's name sits above the row.
- Matthew asked for this twice; the first time it was misread as a page of
  thumbnail previews. It is NOT a contact sheet of shrunken full pages —
  he called those "weird full page outlines". One variation, full size,
  chosen from little numbered boxes.
- Keep the box numbers identical to the numbering used in the reply, so
  "I like 9, 23 and 35" maps straight onto the boxes.

## ALWAYS include the push command — every single time
- Every response that changes a file MUST end with the ready-to-paste push
  command. Never make Matthew ask for it, and never assume he remembers it from
  an earlier message. It goes in EVERY output that touches the repo, alongside
  the URL — same rule, same reason.
- Format, one line, self-contained. Note the SEMICOLON before `git push` and
  `add -A`, both of which matter:
  `cd /Users/Home/Documents/GitHub/silentfoundry && rm -f .git/index.lock && git add -A && git commit -m "..." ; git push`
- WHY THE SEMICOLON: with `&& git push`, if there is nothing new to commit
  `git commit` exits non-zero, the chain stops, and the push never runs — the
  command looks broken when in fact the repo was simply already up to date.
  This has bitten Matthew. A `;` runs the push regardless.
- `git add -A` not `git add .` so deletions and renames are picked up too.
- Include it even when the change is small, even when it is a re-output, and
  even when the previous message already had one.
- Still NEVER run git from the agent side — hand him the command, he runs it.

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
- KNOWN CAUSE, seen once already: the Pages build failed with
  `RPC failed; curl 16 ... fatal: early EOF` after spending 6m40s cloning.
  The repo is heavy (~99 MB `.git`, ~80 MB working tree, ~70 numbered backups).
  Retrying the deployment fixed it, but it WILL recur as backups accumulate.


====================================================================
CURRENT STATE — as of August 2026
====================================================================

## Where the site is now
All three main pages have been through a full mobile + responsive pass and are
LIVE. Previous versions are kept as numbered backups (`index107.html`,
`sf-team22.html`, etc). Working copies still exist and are identical to live:
`index-mobile.html` (= `index.html`), `sf-team-m.html` (= `sf-team.html`).
`sf-contact-m.html` exists but was NOT promoted — Matthew said the live contact
page was fine as-is.

## The layout system now in force (do not break these)
- **Mobile side margin: 24px.** Every section, every page, from 360 to 768.
  Venture Models was the reference. Sections that supply their own inset must
  not stack another on top — that's how text ended up at 48 twice.
- **Text measure: `max-width: min(100%, 680px)`** on all body copy. Before this
  Marshall ran to 934px (109 characters) at 1440 while everything else sat
  frozen at 666. They now break together.
- **Above 1601px every section takes the video's frame** — 1600px wide,
  centred: `padding-inline: calc((100% - 1600px)/2)`. Video, portfolio,
  Venture Models and Marshall all share identical left/right edges.
- **SWITCH hero**: `aspect-ratio:3/2` (never a fixed height — a `min-height`
  in `vh` was what made it crop as the window narrowed). Capped at
  `max-width:2200px` above 2300px and re-centred with
  `margin-left:calc(50% - min(2200px,100vw)/2)`.
- **Carousels on mobile are one card per screen** — homepage portfolio and the
  team cards both use `flex:0 0 100vw`. Images break out of the card inset with
  `width:calc(100% + 48px); margin-inline:-24px` so photos are edge to edge
  while text keeps its 24px.
- All of the above lives in `<style id="sf-mobile-fixes">` (homepage) and
  `<style id="sf-consistency">` (team/contact), appended at the END of each
  file. Position matters: body styles beat head styles on ties.

## Menus
- Homepage uses `.mobile-menu`; team and contact use `#mmenu`. Different
  elements, same design, applied by `<script id="sf-menu-b">` on each page.
- Design: `Screenshot_2026-03-29_at_00_05_04.png` behind a dark gradient,
  three white caps links with hairline rules, then SILENT FOUNDRY over
  "Authentic brands into premium products."
- The script must NOT set `display` inline — open/close is
  `.mobile-menu.open{display:flex}` in the shared stylesheet and an inline
  display would beat it, so the menu would never open. Styling goes in an
  injected `#mm-b-css` rule instead.
- It watches `document.documentElement`, not the menu node. The nav code
  REPLACES the menu element on toggle; a node-scoped observer dies with it,
  which is why the design reverted after the first open.

## Traps that cost the most time — check these first
1. **Inline `!important` written by JS cannot be overridden by any stylesheet.**
   The lock-up heights, the "Scroll →" hint and the artwork's own
   `filter: invert(1) brightness(0.25) !important` all had to be fixed in the
   JS, not the CSS. If a rule "isn't applying", check for an inline
   `!important` before rewriting the selector.
2. **Colour filters assume a BLACK source.** The logos are WHITE, so
   `invert(1)` produced black and every "grey" collapsed to `#000`. Normalise
   first: `brightness(0) saturate(100%) <recipe>`.
3. **Painted padding.** The carousel dots were 44px because `padding:16px` plus
   a background colour and `content-box` sizing paints the whole padded circle.
   `padding:0` shrinks them; a transparent `::after` carries the tap area.
4. **`:first-of-type` counts elements, not classes.** `.footer-col:first-of-type`
   matched nothing because the first div is `.footer-logo-wrap`. Navigate is
   `.footer-inner > div:nth-of-type(2)`.
5. **Section padding stacks.** `#pc` supplies 24px and the section inside adds
   another — zero the inner one rather than adding more.
6. **Measure the RENDERED page, not the source.** Several sections are rebuilt
   at runtime with different classes (`.a28`/`.s-*` never exist in the DOM;
   `.x-lead` disappeared after the lock-up bake). Always verify selectors
   against the live DOM before writing rules for them.
7. **Verify in a real browser at real widths.** jsdom has no layout engine —
   `getBoundingClientRect` returns 0. Use iframes at set widths in Chrome.

## Open items
- **`zh.html` and the `zh-*` pages** are now far behind the English pages.
  Matthew handles translation sync himself — do not auto-edit them.
- **The Foundry section caps at 1120px** while the rest of the page caps at
  1600 — reads noticeably narrower on a wide screen. Flagged, not changed.
- **Two things CSS can't reach**: the Foundry "Scroll →" hint (9px, inline
  `!important` from JS) and the 中文 link (27px tap target). Both need a
  one-line script change.
- **Venture Models drifts 24px** off the page margin between 768 and 900.
  An earlier attempt made it worse (x48 → x96) and was reverted.
- **"Download The Deck"** still points at the partner PDF — never chosen.
- **~70 numbered backups** should be cleared. Matthew deletes them manually.
  They are what pushed the Cloudflare clone past its limit.
- Replace `amandawang.jpg` (no face visible); re-export `anders.jpg` (a cursor
  is baked into the image).
- Team photo greyscale — Matthew said "leave it for now".
- `sf-team.html` has ONE pre-existing unbalanced `<style>` block (77/76
  braces). It predates this work; don't chase it as a new bug.
