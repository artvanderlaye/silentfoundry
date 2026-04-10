// ── SCROLL REVEAL ──
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

revealElements.forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'none';
});

if ('IntersectionObserver' in window) {
  revealElements.forEach(el => {
    el.style.opacity = '';
    el.style.transform = '';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// ── MOBILE MENU ──
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── NAV SCROLL FADE ──
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// ── HERO HEADLINE FIT ──
// Stretches top line to match bottom line width exactly
function fitHeadline() {
  const top = document.querySelector('.hero-headline-top');
  const bot = document.querySelector('.hero-headline-bottom');
  if (!top || !bot) return;

  // Temporarily set inline-block to get true text width (not container width)
  top.style.transform = 'none';
  top.style.display = 'inline-block';
  bot.style.display = 'inline-block';

  const topW = top.getBoundingClientRect().width;
  const botW = bot.getBoundingClientRect().width;

  // Restore block display then apply scale
  top.style.display = 'block';
  bot.style.display = 'block';

  if (topW === 0 || botW === 0) return;

  top.style.transform = `scaleX(${botW / topW})`;
  top.style.transformOrigin = 'left top';
}

document.fonts.ready.then(fitHeadline);
window.addEventListener('resize', fitHeadline);


// ══════════════════════════════════════════════════════════════
// CASE STUDY FORMAT SWITCHER
// 00 = original (no change)
// 01-15 = structural framing treatments injected around/into
// the .case-study section to clearly present Marshall as a
// case study, not SF's own brand identity.
// Content never changes. Only framing and structural elements.
// ══════════════════════════════════════════════════════════════
(function () {

  var FORMATS = {

    0: { name: '00 — Original', fn: null },

    // 01 — THIN BORDER FRAME
    // Entire Marshall section wrapped in a 1px gold hairline border.
    // Corner label "Case Study — 01" top-left. Clean contained feel.
    1: {
      name: '01 — Framed / Border',
      css: '.case-study { outline: 1px solid rgba(200,169,110,0.35) !important; outline-offset: -1px !important; position: relative !important; }',
      before: '<div class="cs-frame-label">Case Study — 01 &nbsp;/&nbsp; Marshall Amplification</div>'
    },

    // 02 — MAGAZINE SPREAD HEADER
    // Full-width ruled header row above the section.
    // "CASE STUDY 01" left / "Marshall Amplification — 1962" right.
    // Like a published editorial feature.
    2: {
      name: '02 — Magazine Header',
      before: '<div class="cs-mag-header"><span class="cs-mag-l">Case Study &nbsp;01</span><span class="cs-mag-rule"></span><span class="cs-mag-r">Marshall Amplification &nbsp;—&nbsp; Est. 1962</span></div>'
    },

    // 03 — CHAPTER BREAK
    // Full-width dark interstitial panel before Marshall.
    // Large "01" and "The Translation" — feels like opening a chapter.
    3: {
      name: '03 — Chapter Break',
      before: '<div class="cs-chapter"><span class="cs-chapter-num">01</span><span class="cs-chapter-div"></span><span class="cs-chapter-title">The Translation</span><span class="cs-chapter-sub">Marshall Amplification — Case Study</span></div>'
    },

    // 04 — VERTICAL SIDE TAB
    // Left-edge vertical tab reading "CASE STUDY 01" rotated 90°.
    // Like a folder divider or binder tab.
    4: {
      name: '04 — Side Tab',
      css: '.case-study { position: relative !important; }',
      before: '<div class="cs-side-tab"><span>Case Study &nbsp;01 &nbsp;— &nbsp;Marshall</span></div>'
    },

    // 05 — DOCUMENT HEADER
    // Minimal document-style header: left logo area, right metadata.
    // "Presented by Silent Foundry" / "Reference: CS-001-MARSHALL"
    5: {
      name: '05 — Document / Reference',
      before: '<div class="cs-doc-header"><div class="cs-doc-l"><span class="cs-doc-from">Presented by Silent Foundry</span><span class="cs-doc-ref">Reference: CS-001 — Marshall Amplification</span></div><div class="cs-doc-r"><span class="cs-doc-date">2024</span><span class="cs-doc-type">Brand Translation Case Study</span></div></div>'
    },

    // 06 — NUMBERED EXHIBIT LABEL
    // Bottom-left corner persistent label — like a museum exhibit tag.
    // Stays fixed within the section as you scroll through it.
    6: {
      name: '06 — Exhibit Label',
      css: '.case-study { position: relative !important; }',
      inject: '<div class="cs-exhibit"><span class="cs-exhibit-num">01</span><span class="cs-exhibit-name">Marshall Amplification</span><span class="cs-exhibit-type">Brand Translation Case Study</span><span class="cs-exhibit-by">Silent Foundry</span></div>'
    },

    // 07 — NEWSPAPER MASTHEAD
    // Top of Marshall section gets a printed masthead row.
    // Date, volume, section name — like opening a newspaper to a feature.
    7: {
      name: '07 — Newspaper Masthead',
      before: '<div class="cs-masthead"><span class="cs-mast-vol">Vol. 01 &nbsp;·&nbsp; No. 1</span><span class="cs-mast-title">Silent Foundry Industrial Review</span><span class="cs-mast-date">Case Study — Marshall Amplification</span></div>'
    },

    // 08 — BRACKET FRAMING
    // Large typographic brackets [ ] flank the entire section title area.
    // Editorial, graphic — common in design publications.
    8: {
      name: '08 — Bracket Frame',
      before: '<div class="cs-bracket-header"><span class="cs-bracket-l">[</span><div class="cs-bracket-mid"><span class="cs-bracket-label">Case Study</span><span class="cs-bracket-name">Marshall Amplification</span></div><span class="cs-bracket-r">]</span></div>'
    },

    // 09 — PROGRESS / POSITION INDICATOR
    // "Case Study 01 of 03" with a thin horizontal progress line.
    // Signals this is part of a series — SF has more work to show.
    9: {
      name: '09 — Progress Indicator',
      before: '<div class="cs-progress"><span class="cs-prog-label">Case Study</span><span class="cs-prog-count">01 of 03</span><div class="cs-prog-track"><div class="cs-prog-fill"></div></div><span class="cs-prog-name">Marshall Amplification</span></div>'
    },

    // 10 — PULL QUOTE INTRO
    // Large editorial intro statement before the section.
    // "How a 60-year-old brand became a hardware platform."
    // Sets the scene before Marshall content begins.
    10: {
      name: '10 — Pull Quote Intro',
      before: '<div class="cs-pullquote"><span class="cs-pq-label">Case Study — 01</span><p class="cs-pq-text">How a 60-year-old amplifier brand became a global hardware platform.</p><span class="cs-pq-rule"></span></div>'
    },

    // 11 — FILE FOLDER TAB
    // Section sits inside a folder-style container.
    // Tab at top reads "CS-001 / MARSHALL" like a physical file.
    11: {
      name: '11 — File Folder',
      css: '.case-study { border-top: 3px solid rgba(200,169,110,0.6) !important; }',
      before: '<div class="cs-folder-tab"><span class="cs-folder-ref">CS-001</span><span class="cs-folder-sep">/</span><span class="cs-folder-name">Marshall Amplification</span><span class="cs-folder-type">Brand Translation</span></div>'
    },

    // 12 — EDITORIAL BYLINE
    // Small byline row beneath a ruled line before the section.
    // "Analysis by Silent Foundry Industrial Studio — Brand Translation Division"
    12: {
      name: '12 — Editorial Byline',
      before: '<div class="cs-byline"><div class="cs-byline-rule"></div><div class="cs-byline-row"><span class="cs-byline-text">Analysis by Silent Foundry Industrial Studio</span><span class="cs-byline-mid">·</span><span class="cs-byline-cat">Brand Translation — Case Study 01</span><span class="cs-byline-mid">·</span><span class="cs-byline-year">2024</span></div></div>'
    },

    // 13 — STAMP / WATERMARK
    // Large faint "CASE STUDY" diagonal watermark over the section.
    // Unmistakeable — Marshall section is clearly presented work.
    13: {
      name: '13 — Watermark Stamp',
      css: '.case-study { position: relative !important; overflow: hidden !important; }',
      inject: '<div class="cs-watermark">CASE STUDY</div>'
    },

    // 14 — CORNER BADGE
    // Fixed corner badge top-right that reads "Case Study 01".
    // Stays visible as you scroll through the Marshall section.
    14: {
      name: '14 — Corner Badge',
      css: '.case-study { position: relative !important; }',
      inject: '<div class="cs-corner-badge"><span class="cs-badge-cs">Case Study</span><span class="cs-badge-num">01</span></div>'
    },

    // 15 — FULL INTERSTITIAL + FRAMED EXIT
    // Most complete treatment: chapter break before + ruled exit line after.
    // Marshall section is bookended — clearly a contained presentation.
    15: {
      name: '15 — Bookended / Full Frame',
      before: '<div class="cs-inter-open"><div class="cs-inter-left"><span class="cs-inter-num">01</span><span class="cs-inter-label">Case Study</span></div><div class="cs-inter-right"><span class="cs-inter-name">Marshall Amplification</span><span class="cs-inter-desc">Brand DNA Translation — Global Hardware Expansion</span><span class="cs-inter-credit">Presented by Silent Foundry</span></div></div>',
      after: '<div class="cs-inter-close"><span class="cs-inter-end-rule"></span><span class="cs-inter-end-label">End of Case Study 01 — Marshall Amplification</span><span class="cs-inter-end-rule"></span></div>'
    }
  };

  // ── CSS FOR ALL FORMATS ──
  var SHARED_CSS = `
/* ── FORMAT 01: BORDER FRAME ── */
.cs-frame-label {
  font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(200,169,110,0.6);
  padding: 12px 48px; background: rgba(200,169,110,0.06);
  border-bottom: 1px solid rgba(200,169,110,0.15);
}

/* ── FORMAT 02: MAGAZINE HEADER ── */
.cs-mag-header {
  display: flex; align-items: center; gap: 24px;
  padding: 20px 48px; border-top: 1px solid rgba(200,169,110,0.2);
  border-bottom: 1px solid rgba(200,169,110,0.2);
  background: rgba(200,169,110,0.04);
}
.cs-mag-l { font-family:'Bebas Neue',sans-serif; font-size:0.9rem; letter-spacing:0.22em; color:rgba(200,169,110,0.8); white-space:nowrap; }
.cs-mag-rule { flex:1; height:1px; background:rgba(200,169,110,0.2); }
.cs-mag-r { font-family:'DM Sans',sans-serif; font-size:0.58rem; letter-spacing:0.18em; text-transform:uppercase; color:rgba(244,241,236,0.35); white-space:nowrap; font-weight:300; }

/* ── FORMAT 03: CHAPTER BREAK ── */
.cs-chapter {
  display: flex; align-items: center; gap: 32px;
  padding: 56px 48px; background: #0d0b08;
  border-top: 1px solid rgba(200,169,110,0.12);
  border-bottom: 1px solid rgba(200,169,110,0.12);
}
.cs-chapter-num { font-family:'Bebas Neue',sans-serif; font-size:5rem; line-height:1; color:rgba(200,169,110,0.15); letter-spacing:0.08em; }
.cs-chapter-div { width:1px; height:60px; background:rgba(200,169,110,0.2); flex-shrink:0; }
.cs-chapter-title { font-family:'Bebas Neue',sans-serif; font-size:2.8rem; letter-spacing:0.14em; text-transform:uppercase; color:rgba(244,241,236,0.82); }
.cs-chapter-sub { font-family:'DM Sans',sans-serif; font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(200,169,110,0.5); font-weight:300; margin-left:auto; }

/* ── FORMAT 04: SIDE TAB ── */
.cs-side-tab {
  position: absolute; left: -1px; top: 80px; z-index: 10;
  background: rgba(200,169,110,0.12); border: 1px solid rgba(200,169,110,0.3);
  border-left: 3px solid rgba(200,169,110,0.7);
  padding: 10px 8px; writing-mode: vertical-rl; text-orientation: mixed;
}
.cs-side-tab span { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(200,169,110,0.75); font-weight:300; white-space:nowrap; transform:rotate(180deg); display:block; }

/* ── FORMAT 05: DOCUMENT HEADER ── */
.cs-doc-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 20px 48px; border-bottom: 1px solid rgba(244,241,236,0.08);
  background: rgba(10,10,10,0.6);
}
.cs-doc-l,.cs-doc-r { display:flex; flex-direction:column; gap:4px; }
.cs-doc-r { text-align:right; }
.cs-doc-from { font-family:'Bebas Neue',sans-serif; font-size:0.75rem; letter-spacing:0.18em; color:rgba(200,169,110,0.7); }
.cs-doc-ref,.cs-doc-type { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(244,241,236,0.3); font-weight:300; }
.cs-doc-date { font-family:'Bebas Neue',sans-serif; font-size:1.2rem; letter-spacing:0.1em; color:rgba(244,241,236,0.2); }

/* ── FORMAT 06: EXHIBIT LABEL ── */
.cs-exhibit {
  position: absolute; bottom: 40px; left: 48px; z-index: 10;
  display: flex; flex-direction: column; gap: 3px;
  padding: 14px 18px; background: rgba(10,10,10,0.85);
  border: 1px solid rgba(200,169,110,0.25); border-left: 3px solid rgba(200,169,110,0.6);
}
.cs-exhibit-num { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:0.1em; color:rgba(200,169,110,0.4); line-height:1; }
.cs-exhibit-name { font-family:'Bebas Neue',sans-serif; font-size:0.9rem; letter-spacing:0.14em; text-transform:uppercase; color:rgba(244,241,236,0.82); }
.cs-exhibit-type { font-family:'DM Sans',sans-serif; font-size:0.5rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(244,241,236,0.35); font-weight:300; }
.cs-exhibit-by { font-family:'DM Sans',sans-serif; font-size:0.5rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(200,169,110,0.45); font-weight:300; margin-top:4px; }

/* ── FORMAT 07: MASTHEAD ── */
.cs-masthead {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 48px; border-top: 2px solid rgba(244,241,236,0.15);
  border-bottom: 1px solid rgba(244,241,236,0.08);
  background: #080808;
}
.cs-mast-vol { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(244,241,236,0.25); font-weight:300; }
.cs-mast-title { font-family:'Bebas Neue',sans-serif; font-size:1rem; letter-spacing:0.2em; color:rgba(244,241,236,0.7); }
.cs-mast-date { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(200,169,110,0.55); font-weight:300; }

/* ── FORMAT 08: BRACKET FRAME ── */
.cs-bracket-header {
  display: flex; align-items: center; gap: 24px;
  padding: 36px 48px; background: rgba(10,10,10,0.4);
  border-bottom: 1px solid rgba(244,241,236,0.06);
}
.cs-bracket-l,.cs-bracket-r { font-family:'Bebas Neue',sans-serif; font-size:4rem; color:rgba(200,169,110,0.25); line-height:1; }
.cs-bracket-mid { display:flex; flex-direction:column; gap:6px; flex:1; }
.cs-bracket-label { font-family:'DM Sans',sans-serif; font-size:0.58rem; letter-spacing:0.28em; text-transform:uppercase; color:rgba(200,169,110,0.55); font-weight:300; }
.cs-bracket-name { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(244,241,236,0.82); }

/* ── FORMAT 09: PROGRESS INDICATOR ── */
.cs-progress {
  display: flex; align-items: center; gap: 20px;
  padding: 16px 48px; border-bottom: 1px solid rgba(244,241,236,0.06);
  background: rgba(10,10,10,0.5);
}
.cs-prog-label { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(244,241,236,0.3); font-weight:300; white-space:nowrap; }
.cs-prog-count { font-family:'Bebas Neue',sans-serif; font-size:0.9rem; letter-spacing:0.12em; color:rgba(200,169,110,0.75); white-space:nowrap; }
.cs-prog-track { flex:1; height:1px; background:rgba(244,241,236,0.1); position:relative; }
.cs-prog-fill { position:absolute; left:0; top:0; height:100%; width:33.3%; background:rgba(200,169,110,0.6); }
.cs-prog-name { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.18em; text-transform:uppercase; color:rgba(200,169,110,0.5); font-weight:300; white-space:nowrap; }

/* ── FORMAT 10: PULL QUOTE INTRO ── */
.cs-pullquote {
  padding: 64px 48px 48px; background: #0a0a0a;
  border-bottom: 1px solid rgba(200,169,110,0.12);
  display: flex; flex-direction: column; align-items: flex-start; gap: 20px;
}
.cs-pq-label { font-family:'DM Sans',sans-serif; font-size:0.58rem; letter-spacing:0.28em; text-transform:uppercase; color:rgba(200,169,110,0.55); font-weight:300; }
.cs-pq-text { font-family:'Bebas Neue',sans-serif; font-size:clamp(1.8rem,3.5vw,3.2rem); letter-spacing:0.08em; text-transform:uppercase; color:rgba(244,241,236,0.82); line-height:0.96; max-width:680px; }
.cs-pq-rule { width:48px; height:1px; background:rgba(200,169,110,0.4); }

/* ── FORMAT 11: FILE FOLDER TAB ── */
.cs-folder-tab {
  display: flex; align-items: center; gap: 16px;
  padding: 10px 48px; background: rgba(200,169,110,0.07);
  border-bottom: 1px solid rgba(200,169,110,0.2);
}
.cs-folder-ref { font-family:'Bebas Neue',sans-serif; font-size:0.82rem; letter-spacing:0.18em; color:rgba(200,169,110,0.75); }
.cs-folder-sep { color:rgba(200,169,110,0.3); font-size:0.75rem; }
.cs-folder-name { font-family:'DM Sans',sans-serif; font-size:0.62rem; letter-spacing:0.14em; text-transform:uppercase; color:rgba(244,241,236,0.55); font-weight:300; flex:1; }
.cs-folder-type { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.18em; text-transform:uppercase; color:rgba(244,241,236,0.25); font-weight:300; }

/* ── FORMAT 12: EDITORIAL BYLINE ── */
.cs-byline { padding: 0 48px; }
.cs-byline-rule { height:1px; background:rgba(244,241,236,0.1); margin-bottom:12px; }
.cs-byline-row { display:flex; align-items:center; gap:16px; padding-bottom:16px; }
.cs-byline-text,.cs-byline-cat,.cs-byline-year { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(244,241,236,0.28); font-weight:300; }
.cs-byline-cat { color:rgba(200,169,110,0.45); }
.cs-byline-mid { color:rgba(244,241,236,0.15); font-size:0.7rem; }

/* ── FORMAT 13: WATERMARK ── */
.cs-watermark {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) rotate(-30deg);
  font-family:'Bebas Neue',sans-serif; font-size: clamp(4rem,12vw,14rem);
  letter-spacing: 0.2em; color: rgba(200,169,110,0.04);
  pointer-events: none; z-index: 5; white-space: nowrap; user-select: none;
}

/* ── FORMAT 14: CORNER BADGE ── */
.cs-corner-badge {
  position: absolute; top: 24px; right: 24px; z-index: 20;
  display: flex; flex-direction: column; align-items: center;
  padding: 10px 16px; background: rgba(10,10,10,0.85);
  border: 1px solid rgba(200,169,110,0.35);
}
.cs-badge-cs { font-family:'DM Sans',sans-serif; font-size:0.45rem; letter-spacing:0.28em; text-transform:uppercase; color:rgba(200,169,110,0.6); font-weight:300; }
.cs-badge-num { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:0.1em; color:rgba(200,169,110,0.8); line-height:1; }

/* ── FORMAT 15: BOOKENDED ── */
.cs-inter-open {
  display: flex; align-items: center; gap: 48px;
  padding: 48px 48px; background: #0c0a06;
  border-top: 1px solid rgba(200,169,110,0.15);
  border-bottom: 1px solid rgba(200,169,110,0.15);
}
.cs-inter-left { display:flex; flex-direction:column; gap:4px; flex-shrink:0; }
.cs-inter-num { font-family:'Bebas Neue',sans-serif; font-size:4.5rem; letter-spacing:0.08em; color:rgba(200,169,110,0.15); line-height:1; }
.cs-inter-label { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.28em; text-transform:uppercase; color:rgba(200,169,110,0.5); font-weight:300; }
.cs-inter-right { display:flex; flex-direction:column; gap:8px; border-left:1px solid rgba(200,169,110,0.15); padding-left:48px; }
.cs-inter-name { font-family:'Bebas Neue',sans-serif; font-size:2.5rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(244,241,236,0.85); line-height:1; }
.cs-inter-desc { font-family:'DM Sans',sans-serif; font-size:0.62rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(244,241,236,0.35); font-weight:300; }
.cs-inter-credit { font-family:'DM Sans',sans-serif; font-size:0.52rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(200,169,110,0.45); font-weight:300; margin-top:4px; }
.cs-inter-close {
  display:flex; align-items:center; gap:20px;
  padding:20px 48px; border-top:1px solid rgba(244,241,236,0.06);
  background:#080806;
}
.cs-inter-end-rule { flex:1; height:1px; background:rgba(200,169,110,0.18); }
.cs-inter-end-label { font-family:'DM Sans',sans-serif; font-size:0.5rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(200,169,110,0.4); font-weight:300; white-space:nowrap; }
`;

  // ── ENGINE ──
  var styleEl = null;
  var injectedEls = [];

  function clearAll() {
    // Remove style block
    var old = document.getElementById('cs-format-style');
    if (old) old.parentNode.removeChild(old);
    // Remove all injected elements
    for (var i = 0; i < injectedEls.length; i++) {
      var el = injectedEls[i];
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
    injectedEls = [];
  }

  function injectHTML(htmlStr, position) {
    // position: 'before' | 'after' | 'inside'
    var cs = document.querySelector('.case-study');
    if (!cs) return null;
    var tmp = document.createElement('div');
    tmp.innerHTML = htmlStr;
    var el = tmp.firstChild;
    if (position === 'before') {
      cs.parentNode.insertBefore(el, cs);
    } else if (position === 'after') {
      cs.parentNode.insertBefore(el, cs.nextSibling);
    } else {
      // inside — append into case-study
      cs.appendChild(el);
    }
    injectedEls.push(el);
    return el;
  }

  function apply(id) {
    clearAll();

    var f = FORMATS[id];
    if (!f || !f.fn && id === 0) {
      updateBar(id);
      try { localStorage.setItem('cs-format', id); } catch(e) {}
      return;
    }

    // Always inject shared CSS
    styleEl = document.createElement('style');
    styleEl.id = 'cs-format-style';
    styleEl.textContent = SHARED_CSS + (f.css || '');
    document.head.appendChild(styleEl);

    // Inject structural elements
    if (f.before) injectHTML(f.before, 'before');
    if (f.after) injectHTML(f.after, 'after');
    if (f.inject) injectHTML(f.inject, 'inside');

    updateBar(id);
    try { localStorage.setItem('cs-format', id); } catch(e) {}
  }

  function updateBar(id) {
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(/\bisel-active\b/g, '').trim();
      if (parseInt(btns[i].getAttribute('data-id')) === id) {
        btns[i].className += ' isel-active';
      }
    }
    var nameEl = document.getElementById('isel-name');
    if (nameEl) nameEl.textContent = (FORMATS[id] && FORMATS[id].name) || '';
  }

  function init() {
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          apply(parseInt(btn.getAttribute('data-id')));
        });
      })(btns[i]);
    }
    try {
      var saved = localStorage.getItem('cs-format');
      if (saved !== null && FORMATS[parseInt(saved)]) { apply(parseInt(saved)); return; }
    } catch(e) {}
    apply(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
// ══ END CASE STUDY FORMAT SWITCHER ══
