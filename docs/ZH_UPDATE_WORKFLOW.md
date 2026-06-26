# Silent Foundry — Chinese Update Workflow
## How to sync English changes to zh.html

---

## THE RULE
Every time English text changes in `index.html`, the Chinese equivalent in `zh.html` must be updated.
Use `TRANSLATION_MAP.md` to find the exact location in zh.html.

---

## STEP 1 — Tell Claude what changed in English

Paste the new English text and say which section it's in. Example:

> "Updated the Why Now body copy in index.html to: [new text]"

Claude will look up the location in TRANSLATION_MAP.md, translate, and update zh.html in one pass.

---

## STEP 2 — The Python update pattern (one change)

Every text replacement uses this pattern. Copy and adapt:

```python
with open('zh.html', 'rb') as f:
    html = f.read().decode('utf-8')

def do(label, old, new):
    count = html.count(old)
    assert count == 1, f"[{label}] found {count} — check your string"
    return html.replace(old, new)

html = do('section-name', 'OLD CHINESE TEXT HERE', 'NEW CHINESE TEXT HERE')

with open('zh.html', 'wb') as f:
    f.write(html.encode('utf-8'))
```

**Key rule:** The `assert count == 1` protects you — if the string appears 0 or 2+ times, it stops and tells you before making any change.

---

## STEP 3 — Multiple changes in one pass

```python
with open('zh.html', 'rb') as f:
    html = f.read().decode('utf-8')

changes = []

def do(label, old, new):
    global html
    count = html.count(old)
    if count != 1:
        print(f"  SKIP [{label}]: found {count}")
        return
    html = html.replace(old, new)
    changes.append(label)
    print(f"  OK   [{label}]")

# ── Add your changes below ──
do('why-now',       '旧中文文本', '新中文文本')
do('cta-body',      '旧中文文本', '新中文文本')
do('section-title', '旧中文文本', '新中文文本')
# ── End changes ──

print(f"\nDone: {len(changes)} changes")
with open('zh.html', 'wb') as f:
    f.write(html.encode('utf-8'))
```

---

## STEP 4 — Verify after changes

```python
with open('zh.html', 'r') as f:
    h = f.read()

checks = [
    ('新中文文本1', 'section 1'),
    ('新中文文本2', 'section 2'),
    ('新中文文本3', 'section 3'),
]

all_ok = True
for s, label in checks:
    ok = s in h
    if not ok: all_ok = False
    print('  ✓' if ok else '  ✗ MISSING', label)

print('ALL CLEAR' if all_ok else 'ISSUES REMAIN')
```

---

## FONT SWAP RULE (already built into zh.html)

The font switcher (中文 / 中文2) uses a single CSS class toggle on `<body>`:

```css
/* zh.html head — already in place, do not remove */
body.zh2,
body.zh2 * {
  font-family: 'Noto Serif SC', serif !important;
}
body.zh2 .sf-mark,
body.zh2 .sf-mark-line,
body.zh2 .gm,
body.zh2 .nav-ring {
  font-family: 'Bebas Neue', sans-serif !important;
}
```

To add a third font option in future, add a new CSS block (`body.zh3, body.zh3 * { ... }`) and a new button that calls `setZhFont(3)`. The pattern scales infinitely.

---

## SECTION QUICK REFERENCE

| Section | zh.html selector | Notes |
|---|---|---|
| Why Now body | `p` after `.wwd-label:2` | Plain paragraph |
| HIW accordion 1–6 | `.accordion-body p:1–6` | Body text only, titles already ZH |
| Marshall DNA values | `.cs-ddna-v:1–6` | 6 items |
| China accordion 1–4 | `.ch-body p:1–4` | Body text |
| Value cards 1–4 | `.val-body:1–4` | Brands/Factories/Operators/Investors |
| Acquisition body | `p.fp-body-text` in acquisition div | Long paragraph |
| SWITCH DNA grid | 6× div label + p pairs | Form/Structure/CMF/Sig/Stance/Mfg |
| Fund A/B/Exit body | `.fund-body p:1–3` | Short paragraphs |
| Fund A/B/Exit expand | `.fund-expand:1–3` | Hover-reveal text |
| CTA body | `p` in `.cta` | Single paragraph |
| Footer addresses | `address:1–2` | HK + Shanghai |

Full detail → see `TRANSLATION_MAP.md`

---

## DEPLOY CHECKLIST

Every deploy needs all three files:
- `index.html` → rename to `index.html` before drag-drop
- `zh.html`
- `sf-styles.css` (only if changed)
- `sf-scripts.js` (only if changed)

Cloudflare Pages: drag all files together in one upload.
