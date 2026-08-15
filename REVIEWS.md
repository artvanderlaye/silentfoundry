# REVIEWS.md — Claude ↔ ChatGPT review log

Purpose: preserve decisions from external reviews so future reviews do not
relitigate resolved issues. Each entry: Date / Scope / ChatGPT findings /
Claude assessment / Decision / Unresolved. Keep entries short and factual.
When briefing ChatGPT for a new review, include the relevant prior entries.

---

## 2026-08-15 — Full-site priorities review

**Scope:** All four EN pages (rendered text at 1440px) + working notes
(CLAUDE.md, NOTES.md, DESIGN-CHOICES.md). Text-only — no visuals.
Question: what to improve next, and in what order.

**ChatGPT findings:**
- Reorder priorities: domain move (silent-foundry.com → Cloudflare) first;
  then a "public correctness" release (footer typo, deck link, 2 photos,
  9px scroll hint, 27px 中文 tap target, 768–900px margin drift); voice pass
  on homepage before the TEAM rebuild, not after; TEAM rebuild fourth;
  code consolidation last, kept separate from any redesign.
- Backups (~70 numbered pages) should be deleted before the next big push,
  not deferred to the code-health project.
- "FILM COMING SOON" in the hero reads as an unfinished proof element.
- Missing from everyone's list: conversion paths never tested end-to-end
  (contact form, newsletter, deck downloads); one-time SEO/meta/OG/sitemap
  setup once the real domain is live; Marshall claims ($1.1B exit, $4B+
  market) should have retained sources and precise phrasing; legal page
  mentions analytics that may not actually be installed.

**Claude assessment:** Reordering accepted — live defects on high-traffic
pages beat improving the least-visited page. One amendment: domain move
(Matthew, dashboards) and site fixes (Claude, files) run in parallel, not in
sequence. FILM COMING SOON is Matthew's call, not a defect — an explainer
video is already a planned addition (NOTES.md).

**Decision:**
1. Claude: correctness batch — footer "into" fix all pages, voice pass
   (hero / Foundry intro / team bios: remove "scalable product systems",
   "commercially scalable businesses", "scalable product platforms",
   "manufacturable product systems"), scroll-hint + tap-target JS fixes,
   margin drift.
2. Matthew: domain move (checklist to be provided); delete numbered backups
   before next push.
3. Then: end-to-end test of contact form, newsletter, deck downloads.
4. Then: TEAM page rebuild on the Marshall rhythm.
5. Later: code consolidation, separate from any visual change.
- Process: ChatGPT reviews are for major work and pre-launch checks only,
  not routine fixes. Bridge upgraded 2026-08-15 with screenshot support.

**Unresolved:**
- FILM COMING SOON: keep or hide until the film exists (Matthew).
- Which PDF goes behind "Download The Deck" (Matthew).
- Marshall numbers: verify phrasing against sources before next homepage push.
- Analytics: install minimal measurement or trim the legal wording to match.
- Correctness batch not started — awaiting Matthew's go-ahead.
