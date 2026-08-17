# Silent Foundry — Production Design System

**Authoritative source:** `SILENT FOUNDRY site consitancy rules).pdf` (17 August 2026), in the
repo root. This file is the working Markdown version of that document. Where the two ever
disagree, the PDF wins — but keep this file in step so the rules are readable in the repo.

**Status:** these are production values, measured on the live `index.html` at 390 / 768 / 1024 /
1440 / 1920 / 2560 / 3840. They supersede everything in *Superseded — 2026 concept exploration*
at the bottom of this file.

---

## 00. The overall rule

**REPEAT RELATIONSHIPS, NOT JUST NUMBERS.**

The system should be recognisable because the same kinds of information behave the same way:

```
section begins        →  identity appears
eyebrow               →  headline
headline              →  explanation
section identifier    →  primary information  →  secondary key
```

Use the numbers below to preserve those relationships. Use optical judgement only where the
composition gives a concrete reason to depart from them.

---

## 01. Core vertical rhythm

Major narrative sections use the same hierarchy:

```
SECTION BOUNDARY
   ↓  ~100px
EYEBROW
   ↓  34px
DISPLAY HEADLINE
   ↓  clear optical separation
SUPPORTING COPY / CONTENT
```

This is the default narrative rhythm and the starting point for any new section.

---

## 02. Standard section entry — ~100px

Desktop and tablet: **visual section boundary → eyebrow ≈ 100px.**

| Section | Entry |
|---|---|
| THE FOUNDRY FOR BRAND DNA | 100px |
| HOW WE BUILD | 100px |
| FEATURED VENTURE | 100px |
| DESIGNED DNA: SWITCH | 100px |

Measured from the **perceived** visual boundary, not the nearest DOM wrapper:

| Section | Boundary the viewer actually sees |
|---|---|
| THE FOUNDRY FOR BRAND DNA | bottom edge of the image above |
| HOW WE BUILD | top of the blue field |
| FEATURED VENTURE | top of the Featured Venture field |
| DESIGNED DNA: SWITCH | top of the Designed DNA composition |

---

## 03. Mobile section entry

The ~100px rhythm should generally survive on mobile.

| Section | Mobile entry |
|---|---|
| HERO | 100px |
| HOW WE BUILD | 100px |
| DESIGNED DNA | 100px |
| FEATURED VENTURE | **88px** |

Featured Venture is intentionally slightly tighter because the extra SWITCH + eSCRAMBLER
identity layer makes the complete introduction taller.

**Do not** let narrative sections collapse to 20–50px top gaps just because the viewport is narrow.

---

## 04. Section-entry exceptions

100px is the **default, not an absolute rule**. An exception requires a compositional reason.

**Current intentional exception — MARSHALL ≈ 66px.**

The animation / technical graphic above the Marshall introduction already occupies the upper
visual field:

```
TECHNICAL VISUAL
   ↓  66px
THE CASE FOR DNA TRANSLATION: MARSHALL
```

It does not *look* tighter, because the upper space already carries visual information.

**Rule:** do not measure empty CSS space alone — judge perceived visual space. But do not
introduce arbitrary exceptions either. An exception must be explainable by an actual visual
element or a structural difference.

---

## 05. Eyebrow → display headline — 34px

```
EYEBROW
   ↓  34px
DISPLAY HEADLINE
```

Consistent at **every tested width from 390 to 3840**.

| Eyebrow | Headline |
|---|---|
| THE FOUNDRY FOR BRAND DNA | THE BEST BRANDS DESERVE / MORE THAN MERCH. |
| HOW WE BUILD | FROM BRAND DNA / TO SCALABLE VENTURES. |
| THE CASE FOR DNA TRANSLATION: MARSHALL | ROCK & ROLL / NEVER DIES |
| DESIGNED DNA: SWITCH | FROM ONE PRODUCT TO / AN ENTIRE SYSTEM. |

This 34px relationship is one of the strongest repeated pieces of Silent Foundry's visual identity.

---

## 06. Eyebrow typography

Standard major-section eyebrow:

| | |
|---|---|
| Font | DM Sans |
| Size | 10.88px |
| Weight | 300 |
| Tracking | 2.72px |
| Case | UPPERCASE |

Applies to: THE FOUNDRY FOR BRAND DNA · HOW WE BUILD · THE CASE FOR DNA TRANSLATION: MARSHALL ·
FEATURED VENTURE · DESIGNED DNA: SWITCH.

**Colour is NOT standardised.** Section accent colours (gold, cyan, dark neutral) are
intentional. Do not change colour merely to make eyebrows identical.

---

## 07. Display headline typography

**Standard line-height: 0.92.**

Applies to: THE BEST BRANDS DESERVE / MORE THAN MERCH. · FROM BRAND DNA / TO SCALABLE VENTURES. ·
ROCK & ROLL / NEVER DIES · FROM ACQUIRED ASSET / TO NEW VENTURE. · FROM ONE PRODUCT TO / AN
ENTIRE SYSTEM.

The Hero previously used **1.35**. That was removed: it made the two-line headline visually loose
and made the eyebrow/headline relationship look inconsistent.

**Rule:** do not use conventional body-text line-height on display headlines. They are
intentionally tightly stacked.

---

## 08. Headline → body

**Do not standardise this to one pixel value.** The rule is visual:

```
EYEBROW  ↓ 34px  HEADLINE  ↓ clear breathing space  ↓ BODY
```

The body should clearly read as the next level of information. Raw box measurements are
misleading here, particularly because display headlines run at 0.92 line-height — the box sits
inside the glyphs. Judge optical separation and keep the existing section composition.

---

## 09. Left alignment

Within a standard narrative introduction, eyebrow / headline / body share a deliberate left axis.

Measured at desktop: HERO 48/48/48 · HOW WE BUILD 216/216/216 · MARSHALL 48/48/48 ·
DESIGNED DNA 48/48/48.

The absolute page X does **not** need to match between sections. The **internal** axis does.
Do not force every section onto one global X coordinate.

---

## 10. SWITCH / Featured Venture exception

Featured Venture has a deliberately different hierarchy:

```
FEATURED VENTURE
   ↓  16px
SWITCH + eSCRAMBLER            ← brand identity lock-up
   ↓  32px
FROM ACQUIRED ASSET / TO NEW VENTURE.
   ↓
BODY
```

Do **not** force `FEATURED VENTURE ↓ 34px ↓ HEADLINE`. The logo layer is an intermediate
information level and part of the section architecture.

---

## 11. Consistency principle

Same function → same visual relationship.

| Relationship | Value |
|---|---|
| Narrative eyebrow → headline | 34px |
| Standard narrative section entry | ≈100px |
| Display headline line-height | 0.92 |
| Major eyebrow typography | DM Sans / 10.88px / 300 / 2.72px |

Exceptions require a reason. Current valid ones: Marshall's entry (technical animation occupies
the upper field) and Featured Venture's internal hierarchy (brand lock-up between eyebrow and
headline). **Do not create exceptions merely because an old section happens to have different CSS.**

---

## 12. Marshall DNA key

INTANGIBLE / TANGIBLE are **secondary** diagram information.

| | |
|---|---|
| Size | 8px |
| Weight | 300 |
| Tracking | 1.92px |
| Position | bottom-right of the constellation |
| Alignment | right aligned |

Opacity distinction is intentional: INTANGIBLE `rgba(10,10,10,0.26)`, TANGIBLE
`rgba(10,10,10,0.38)`.

Typography reference: **EXPANDED MARKET** — 8px / 300 / 1.92px.

**Rule:** diagram keys must not compete with primary diagram labels.

---

## 13. Marshall constellation hierarchy

1. **EXTRACTED DNA** — section identifier
2. **PRESENCE · ACOUSTIC IDENTITY · PROVENANCE · ATTITUDE · TACTILE · MECHANICAL · VISUAL · CMF**
   — primary diagram information
3. **INTANGIBLE / TANGIBLE** — secondary diagram key
4. **RESULTS** — start of the next information block

Level 3 must never visually compete with level 2.

---

## 14. Responsive consistency

Always check **390 / 768 / 1024 / 1440 / 1920 / 2560 / 3840**.

A relationship that carries identity must survive breakpoint changes:

- eyebrow → headline: 34px at all widths
- standard section entry: ≈100px across widths
- display headline: 0.92 line-height across widths

Do not let breakpoint-specific legacy rules silently alter these.

---

## 15. Ultrawide

Ultrawide does **not** mean stretching the design. Production intentionally constrains the major
visual frames:

| Token | Value |
|---|---|
| MEDIA | 2200px |
| FRAME | 1600px |
| HERO FRAME | 2104px |
| SUBJECT | 960px |

At 2560 / 3840, allow the surrounding space to grow. Do not make designed compositions fill the
viewport.

---

## 16. Visual width principle

Sections should feel related in maximum visual width. Avoid one section stopping at a designed
content frame while the next stretches arbitrarily to the viewport edge. Use the established
frame system — ultrawide whitespace is intentional.

---

## 17. Display vs body hierarchy

Display typography: compact, architectural, deliberate.
Body typography: open, readable, secondary.

Do not loosen display line-height to behave like paragraph typography, and do not compress body
typography to imitate the headlines.

---

## 18. Section pacing

The page should not feel *uniformly spaced*. It should feel *rhythmically consistent*.

- **Bad:** every section has identical padding because of one global CSS variable.
- **Good:** comparable narrative sections enter at approximately the same perceived distance, and
  special compositions deviate only when an actual visual element explains the difference.

---

## 19. Perceived space > DOM space

Identify the visual boundary before measuring:

- **Hero** — the image edge is the boundary.
- **How We Build** — the blue field edge is the boundary.
- **Marshall** — the technical animation participates in the entry composition.
- **Designed DNA** — the preceding visual/film boundary is the reference.

Do not measure from an invisible wrapper and call the result a design rule.

---

## 20. New section default

Start here:

```
VISUAL SECTION BOUNDARY
   ↓  100px
EYEBROW            DM Sans · 10.88px · 300 · 2.72px tracking · uppercase
   ↓  34px
DISPLAY HEADLINE   0.92 line-height
   ↓  intentional larger optical separation
BODY
```

Then deviate only when the composition provides a clear reason.

---

## 21. Design review order

When something "feels wrong", check in this order — **do not immediately redesign the section**:

1. Is the section-entry distance inconsistent?
2. Is eyebrow → headline different from 34px?
3. Is the display headline using something other than 0.92 line-height?
4. Is the eyebrow typography inconsistent?
5. Are eyebrow / headline / body left edges accidentally misaligned?
6. Is another visual element legitimately changing the perceived spacing?
7. Is an old responsive rule overriding the intended production value?

---

## 22. Production principle — bake the selection

Do not keep multiple experimental versions inside production code. Exploration may use variations
during development; once a version is selected, **BAKE THE SELECTION**.

Production should contain the selected design — not 10–50 old alternatives plus JavaScript that
picks the final one after load.

---

## 23. First-paint principle

**The first visible state must be the approved state.** Never ship:

```
OLD DESIGN  →  JS LOADS  →  CURRENT DESIGN
```

Specifically corrected for **Marshall Extracted DNA** and **SWITCH Product Portfolio**. Static
presentation that is known before runtime must be available at first paint.

---

## 24. Spacing summary — production reference values

| | |
|---|---|
| Standard section entry | ~100px |
| Featured Venture mobile entry | 88px |
| Marshall entry | 66px *(justified exception)* |
| Eyebrow → headline | 34px |
| Featured Venture → SWITCH logo | 16px |
| SWITCH logo → headline | 32px |
| Display headline line-height | 0.92 |
| Eyebrow | DM Sans · 10.88px · 300 · 2.72px tracking |
| Marshall secondary key | 8px · 300 · 1.92px tracking |

---
---

# Superseded — 2026 concept exploration (historical record)

> Kept for provenance only. This was the running record of picks made while reviewing
> `index-concepts.html` (20 concepts), written **before** the values above were established on the
> live site. **Where it conflicts with the Production Design System above, the rules above win.**
>
> Known conflicts, all now resolved in production:
>
> | Old exploration value | Current production rule |
> |---|---|
> | Section rhythm `68px` top/bottom | Section entry **~100px** (§02) |
> | Eyebrow `0.58rem`, `0.32em` tracking, weight **400** | **DM Sans 10.88px / 300 / 2.72px** (§06) |
> | Display headline — no line-height specified | **0.92** (§07) |
>
> The remaining notes below (body measure, video frame, section tone, character) were not
> contradicted by the production pass and are still useful background.

**Locked, not part of the exploration:** Marshall case study, Venture Models, Let's Build Together.

## Intro copy block + video — CONCEPT 2 · Industrial Engineering

Chosen for the "world's best brands deserve more than merch" block and the film beneath it.

| | |
|---|---|
| Section rhythm | `68px` top/bottom — tight, one of the densest — **superseded, see §02** |
| Eyebrow | `0.58rem`, `0.32em` tracking, weight 400, gold — **superseded, see §06** |
| Display headline | `clamp(1.3rem, 2vw, 1.9rem)` Bebas, `0.26em` tracking — small and widely tracked |
| Body | `0.9rem`, line-height `1.85`, 55% ink, `680px` measure |
| Dividers | hairline at `0.17` alpha — the heaviest hairline in the set |
| Video | frame capped at `1100px`, centred |
| Section tone | page cream (The Foundry shifts to `#e6e0d6` under this concept) |

Character: dense, engineered, small type with wide tracking, visible rules.

## Still to choose

- The Foundry
- Featured Venture / SWITCH
- SWITCH DNA presentation
- Product extension gallery

## Notes

- Concept 2 also sets the SWITCH hero to full-bleed and runs both image grids 6-up. If a
  different concept wins those sections, only the intro + video tokens above get taken from 2.
- Mixing is fine — the build step takes named tokens per section rather than a whole concept, so
  long as the result stays internally consistent.
