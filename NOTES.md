# Silent Foundry — Working Notes / To Review

_Running list of things to fix. Skim tomorrow, decide, then tackle._
_Last updated: 22 Jul 2026 (late night)._

---

## Content & copy
- **Homepage → "Value Creation" — CUT.** Generic "value for every side" stakeholder grid. Repeats the four-audiences idea already covered on the contact page + in the decks. Site reads tighter without it.
- **Homepage → "Localised for China" — REWRITE, don't delete.** The China angle is a genuine differentiator, so keep the substance. Problem is the *voice*: reads like a strategy-consulting slide — "price architecture," "channel logic," "manufacturable and governed," "structured recurring layer." Rewrite in the bold brand voice, or trim to 2–3 punchy lines.
- **Voice pass (theme).** A few sections read corporate / like they were written for a different company. Worth one consistency sweep so everything sounds like the hero: _"the best products won't be invented, they'll be extracted."_

## Ideas / additions
- **Explainer video on the homepage.** Add a short explainer / intro video to the main page for personality — put a human, moving-image feel on the studio. Decide: format (founder to-camera / motion graphics / product montage), length (~30–60s), and placement (hero, or its own section). Good counterweight to all the text.

## Layout
- **Team page — too much text, cramped, unbalanced.** ~1,140 words across Mission / Vision / Studio Belief / How We Build / Our Studio / Board of Directors + a 3-column editorial grid. The people get squeezed out. Fix: cut the company-philosophy sections (they repeat the homepage), keep it focused on the actual people, open the layout up (fewer columns, more breathing room).
- **Body text size — unified to ~0.9rem** across all pages (homepage brought down from 1.05, team/contact up from 0.82, legal already ~0.92). DONE in files. Verify live after deploy; nudge bigger/smaller to taste.

## Decks & downloads
- **4 tailored decks built + wired** to the contact-page download links (Partner / Investor / Factory / Careers). Pushed. Verify they deploy and actually download on the live site. First drafts — review the wording when fresh.

## Infra / deploy
- **Cloudflare build sometimes fails at the "clone repo" step** (transient). Fix = Retry deployment in Cloudflare → Pages → silentfoundry → Deployments.
- **Git push hit network errors tonight** (HTTP/2 framing / "empty reply from server") — transient. Cleared on retry / different network. Not a repo problem.

## Domain (morning task)
- **Point silent-foundry.com → Cloudflare.** Domain is registered at Squarespace (where the old draft site was started). Keep the domain, bin the Squarespace site.
- Safe order: (1) check the domain isn't bundled with the Squarespace plan → (2) point/transfer it to Cloudflare → (3) confirm the site's live on it → (4) THEN cancel the Squarespace subscription. Domain safe first, cancel last.

## Switch 2.0 (separate track)
- Rebuild from the old switchmotorcycles.com site. Its own project — tackle once Silent Foundry is settled.
