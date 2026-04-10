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
// IDENTITY ENGINE
// Defeats inline styles via JS-injected <style> with !important
// + direct element.style patching for deeply hardcoded values
// SWITCH section (#featured) is ALWAYS locked — never touched
// ══════════════════════════════════════════════════════════════
(function () {

  // ── TOKEN SETS ──
  // Each identity: bg tiers, accent, text tiers, section colours
  // Understated, considered palettes — no loud primaries
  var T = {

    // 00 — ORIGINAL — null = no override
    0: null,

    // 01 — ASH
    // Near-black. Cool grey undertone. Silver hairlines.
    // Feels like brushed concrete — stripped industrial
    1: {
      name: 'Ash — Cool Grey / Brushed Concrete',
      bg:    '#0b0c0d', bg2: '#0f1011', bg3: '#141517',
      acc:   '#9aa4ac', accD: 'rgba(154,164,172,0.3)', accT: '#6a7880',
      hi:    'rgba(228,232,236,0.88)', mid: 'rgba(228,232,236,0.52)', lo: 'rgba(228,232,236,0.28)',
      dhi:   'rgba(228,232,236,0.85)', dmid: 'rgba(228,232,236,0.5)', dlo: 'rgba(228,232,236,0.28)',
      mqBg:  '#1e2124', mqTx: '#9aa4ac',
      cta:   '#141517', ctaTx: 'rgba(228,232,236,0.82)',
      imgF:  'brightness(0.6) grayscale(0.4)'
    },

    // 02 — SLATE
    // Deep blue-grey. Architectural. Like a cold winter office.
    2: {
      name: 'Slate — Blue-Grey / Architectural Cool',
      bg:    '#09101a', bg2: '#0d1520', bg3: '#111c2a',
      acc:   '#5a8fa8', accD: 'rgba(90,143,168,0.3)', accT: '#3a7090',
      hi:    'rgba(210,225,238,0.88)', mid: 'rgba(210,225,238,0.5)', lo: 'rgba(210,225,238,0.27)',
      dhi:   'rgba(210,225,238,0.85)', dmid: 'rgba(210,225,238,0.5)', dlo: 'rgba(210,225,238,0.27)',
      mqBg:  '#152030', mqTx: '#5a8fa8',
      cta:   '#0d1a28', ctaTx: 'rgba(210,225,238,0.82)',
      imgF:  'brightness(0.55) saturate(0.5) hue-rotate(190deg)'
    },

    // 03 — PEWTER
    // Warm dark grey. Muted. Like weathered steel left outside.
    3: {
      name: 'Pewter — Warm Dark Grey / Weathered Steel',
      bg:    '#0e0d0c', bg2: '#131210', bg3: '#181614',
      acc:   '#8c8278', accD: 'rgba(140,130,120,0.3)', accT: '#6a6058',
      hi:    'rgba(230,225,218,0.88)', mid: 'rgba(230,225,218,0.5)', lo: 'rgba(230,225,218,0.27)',
      dhi:   'rgba(230,225,218,0.85)', dmid: 'rgba(230,225,218,0.5)', dlo: 'rgba(230,225,218,0.27)',
      mqBg:  '#201e1b', mqTx: '#8c8278',
      cta:   '#181614', ctaTx: 'rgba(230,225,218,0.82)',
      imgF:  'brightness(0.58) saturate(0.3) sepia(0.15)'
    },

    // 04 — VOID
    // Pure black. White text only. No accent colour at all.
    // Maximum reduction. Silence as statement.
    4: {
      name: 'Void — Pure Black / White Only',
      bg:    '#080808', bg2: '#0c0c0c', bg3: '#111111',
      acc:   'rgba(255,255,255,0.65)', accD: 'rgba(255,255,255,0.3)', accT: 'rgba(0,0,0,0.6)',
      hi:    'rgba(255,255,255,0.9)', mid: 'rgba(255,255,255,0.5)', lo: 'rgba(255,255,255,0.25)',
      dhi:   'rgba(255,255,255,0.88)', dmid: 'rgba(255,255,255,0.5)', dlo: 'rgba(255,255,255,0.25)',
      mqBg:  '#1a1a1a', mqTx: 'rgba(255,255,255,0.7)',
      cta:   '#111111', ctaTx: 'rgba(255,255,255,0.85)',
      imgF:  'brightness(0.5) grayscale(1)'
    },

    // 05 — FLINT
    // Dark warm brown. Like flint or dried earth.
    // Earthy, tactile — different from gold/copper
    5: {
      name: 'Flint — Dark Earth / Warm Brown',
      bg:    '#100d0a', bg2: '#16120e', bg3: '#1c1712',
      acc:   '#957860', accD: 'rgba(149,120,96,0.3)', accT: '#70583e',
      hi:    'rgba(235,224,210,0.88)', mid: 'rgba(235,224,210,0.5)', lo: 'rgba(235,224,210,0.27)',
      dhi:   'rgba(235,224,210,0.85)', dmid: 'rgba(235,224,210,0.5)', dlo: 'rgba(235,224,210,0.27)',
      mqBg:  '#241e18', mqTx: '#957860',
      cta:   '#1c1712', ctaTx: 'rgba(235,224,210,0.82)',
      imgF:  'brightness(0.6) saturate(0.8) sepia(0.2)'
    },

    // 06 — INK
    // Deep navy-black. Almost black but pulls blue.
    // Premium, considered. Like expensive ink on thick paper.
    6: {
      name: 'Ink — Deep Navy Black / Considered',
      bg:    '#090c12', bg2: '#0d1018', bg3: '#12161f',
      acc:   '#7898b8', accD: 'rgba(120,152,184,0.3)', accT: '#4a70a0',
      hi:    'rgba(215,225,240,0.88)', mid: 'rgba(215,225,240,0.5)', lo: 'rgba(215,225,240,0.27)',
      dhi:   'rgba(215,225,240,0.85)', dmid: 'rgba(215,225,240,0.5)', dlo: 'rgba(215,225,240,0.27)',
      mqBg:  '#141a28', mqTx: '#7898b8',
      cta:   '#0d1018', ctaTx: 'rgba(215,225,240,0.82)',
      imgF:  'brightness(0.55) saturate(0.4) hue-rotate(200deg)'
    },

    // 07 — OXIDE
    // Dark greenish-black. Like oxidised bronze or verdigris.
    // Unexpected. Rare in this space.
    7: {
      name: 'Oxide — Dark Verdigris / Oxidised Bronze',
      bg:    '#090d0b', bg2: '#0d1210', bg3: '#121815',
      acc:   '#607a68', accD: 'rgba(96,122,104,0.3)', accT: '#426050',
      hi:    'rgba(210,228,218,0.88)', mid: 'rgba(210,228,218,0.5)', lo: 'rgba(210,228,218,0.27)',
      dhi:   'rgba(210,228,218,0.85)', dmid: 'rgba(210,228,218,0.5)', dlo: 'rgba(210,228,218,0.27)',
      mqBg:  '#141e18', mqTx: '#607a68',
      cta:   '#0d1210', ctaTx: 'rgba(210,228,218,0.82)',
      imgF:  'brightness(0.55) saturate(0.5) hue-rotate(120deg)'
    },

    // 08 — SMOKE
    // Pure dark. Warm smoke tone. Barely-there purple undertone.
    // Feels like a black-box theatre or a velvet interior.
    8: {
      name: 'Smoke — Warm Black / Velvet Undertone',
      bg:    '#0d0b0f', bg2: '#121014', bg3: '#17141a',
      acc:   '#8878a0', accD: 'rgba(136,120,160,0.3)', accT: '#665888',
      hi:    'rgba(228,222,238,0.88)', mid: 'rgba(228,222,238,0.5)', lo: 'rgba(228,222,238,0.27)',
      dhi:   'rgba(228,222,238,0.85)', dmid: 'rgba(228,222,238,0.5)', dlo: 'rgba(228,222,238,0.27)',
      mqBg:  '#1a1620', mqTx: '#8878a0',
      cta:   '#17141a', ctaTx: 'rgba(228,222,238,0.82)',
      imgF:  'brightness(0.55) saturate(0.4) hue-rotate(270deg)'
    },

    // 09 — IRON
    // Cold near-black. Blue-steel. Precise. No warmth at all.
    // Like a machined part fresh off the mill.
    9: {
      name: 'Iron — Cold Steel / Machine Precision',
      bg:    '#080a0e', bg2: '#0c0e14', bg3: '#10121a',
      acc:   '#4a6882', accD: 'rgba(74,104,130,0.3)', accT: '#305070',
      hi:    'rgba(200,215,232,0.88)', mid: 'rgba(200,215,232,0.5)', lo: 'rgba(200,215,232,0.27)',
      dhi:   'rgba(200,215,232,0.85)', dmid: 'rgba(200,215,232,0.5)', dlo: 'rgba(200,215,232,0.27)',
      mqBg:  '#10161e', mqTx: '#4a6882',
      cta:   '#0c0e14', ctaTx: 'rgba(200,215,232,0.82)',
      imgF:  'brightness(0.5) saturate(0.2) hue-rotate(210deg)'
    },

    // 10 — BLANCHE
    // Full site inverted. Light world. Cream background, dark text.
    // Stark contrast to everything else — maximum difference.
    10: {
      name: 'Blanche — Inverted / Cream World',
      bg:    '#f0ece4', bg2: '#ece8e0', bg3: '#e6e2da',
      acc:   '#2a2520', accD: 'rgba(42,37,32,0.3)', accT: '#1a1512',
      hi:    'rgba(30,25,20,0.88)', mid: 'rgba(30,25,20,0.52)', lo: 'rgba(30,25,20,0.3)',
      dhi:   'rgba(30,25,20,0.85)', dmid: 'rgba(30,25,20,0.52)', dlo: 'rgba(30,25,20,0.3)',
      mqBg:  '#2a2520', mqTx: '#f0ece4',
      cta:   '#2a2520', ctaTx: 'rgba(240,236,228,0.88)',
      imgF:  'brightness(0.85) saturate(0.8)',
      invert: true
    },

    // M1 — MARSHALL: CARBON
    // SF gold stays. Marshall goes near-black carbon.
    // Separated from SF by maximum darkness.
    m1: {
      name: 'Marshall — Carbon / Near Black',
      marshallOnly: true,
      bg:    '#0a0908', bg2: '#0f0e0c', bg3: '#151310',
      acc:   '#9a8870', accD: 'rgba(154,136,112,0.3)', accT: '#7a6a50',
      hi:    'rgba(232,224,212,0.88)', mid: 'rgba(232,224,212,0.5)', lo: 'rgba(232,224,212,0.27)',
      dhi:   'rgba(232,224,212,0.85)', dmid: 'rgba(232,224,212,0.5)', dlo: 'rgba(232,224,212,0.27)',
      imgF:  'brightness(0.55) contrast(1.2) saturate(0.5)'
    },

    // M2 — MARSHALL: SEPIA
    // SF gold stays. Marshall goes amber-sepia heritage.
    // Feels like a 1960s press photo — aged and warm.
    m2: {
      name: 'Marshall — Sepia / Amber Heritage',
      marshallOnly: true,
      bg:    '#1c1408', bg2: '#221a0c', bg3: '#2a2010',
      acc:   '#b89050', accD: 'rgba(184,144,80,0.3)', accT: '#8a6a28',
      hi:    'rgba(245,230,200,0.88)', mid: 'rgba(245,230,200,0.5)', lo: 'rgba(245,230,200,0.27)',
      dhi:   'rgba(245,230,200,0.85)', dmid: 'rgba(245,230,200,0.5)', dlo: 'rgba(245,230,200,0.27)',
      imgF:  'brightness(0.65) sepia(0.7) contrast(1.1)'
    },

    // M3 — MARSHALL: VAULT
    // SF gold stays. Marshall goes full cold dark.
    // Blue-black — like a vault door. Completely different temperature.
    m3: {
      name: 'Marshall — Vault / Cold Blue-Black',
      marshallOnly: true,
      bg:    '#080c12', bg2: '#0c1018', bg3: '#101520',
      acc:   '#4878a0', accD: 'rgba(72,120,160,0.3)', accT: '#305880',
      hi:    'rgba(200,220,240,0.88)', mid: 'rgba(200,220,240,0.5)', lo: 'rgba(200,220,240,0.27)',
      dhi:   'rgba(200,220,240,0.85)', dmid: 'rgba(200,220,240,0.5)', dlo: 'rgba(200,220,240,0.27)',
      imgF:  'brightness(0.55) saturate(0.4) hue-rotate(195deg)'
    },

    // M4 — MARSHALL: GRID
    // SF gold stays. Marshall becomes a technical document.
    // Blueprint-style grid overlay. Analytical, not emotional.
    m4: {
      name: 'Marshall — Grid / Blueprint Technical',
      marshallOnly: true,
      bg:    '#09111e', bg2: '#0d1626', bg3: '#111c30',
      acc:   '#5090c0', accD: 'rgba(80,144,192,0.3)', accT: '#2870a8',
      hi:    'rgba(195,220,245,0.88)', mid: 'rgba(195,220,245,0.5)', lo: 'rgba(195,220,245,0.27)',
      dhi:   'rgba(195,220,245,0.85)', dmid: 'rgba(195,220,245,0.5)', dlo: 'rgba(195,220,245,0.27)',
      imgF:  'brightness(0.5) saturate(0.2) hue-rotate(200deg)',
      grid: true
    },

    // M5 — MARSHALL: LINEN
    // SF gold stays. Marshall goes full light — cream/linen.
    // Opposite of dark SF — Marshall as the light case study.
    m5: {
      name: 'Marshall — Linen / Warm Light',
      marshallOnly: true,
      bg:    '#f5efe4', bg2: '#efe9de', bg3: '#e8e2d6',
      acc:   '#7a6040', accD: 'rgba(122,96,64,0.3)', accT: '#5a4428',
      hi:    'rgba(28,22,14,0.88)', mid: 'rgba(28,22,14,0.52)', lo: 'rgba(28,22,14,0.3)',
      dhi:   'rgba(28,22,14,0.85)', dmid: 'rgba(28,22,14,0.52)', dlo: 'rgba(28,22,14,0.3)',
      imgF:  'brightness(0.85) saturate(0.7) sepia(0.15)',
      light: true
    }
  };

  // ── NAMES FOR DISPLAY ──
  var NAMES = {
    0:'Original — Gold / Cream / Black',
    1:'01 — Ash — Cool Grey / Concrete',
    2:'02 — Slate — Blue-Grey / Architectural',
    3:'03 — Pewter — Warm Dark Grey',
    4:'04 — Void — Pure Black / White Only',
    5:'05 — Flint — Dark Earth / Warm Brown',
    6:'06 — Ink — Deep Navy Black',
    7:'07 — Oxide — Dark Verdigris',
    8:'08 — Smoke — Warm Black / Velvet',
    9:'09 — Iron — Cold Steel / Precision',
    10:'10 — Blanche — Inverted / Cream',
    m1:'M1 — Marshall: Carbon',
    m2:'M2 — Marshall: Sepia Heritage',
    m3:'M3 — Marshall: Vault Cold',
    m4:'M4 — Marshall: Blueprint Grid',
    m5:'M5 — Marshall: Linen Light'
  };

  // ── CSS GENERATOR ──
  // Builds a complete !important override block for a given token set
  function buildCSS(t, marshallOnly) {

    // Sections excluded always: #featured (SWITCH)
    var X = ':not(#featured):not(#featured *)';

    if (!t) return '';

    // For Marshall-only identities, scope everything to .case-study and .funds
    var scope = marshallOnly ? '.case-study, .funds' : 'body';
    var pre   = marshallOnly ? '.case-study ' : '';

    var css = '';

    if (!marshallOnly) {
      // ── ROOT VARIABLES ──
      css += `
:root {
  --black: ${t.bg} !important;
  --white: ${t.hi} !important;
  --cream: ${t.bg3} !important;
  --accent: ${t.acc} !important;
  --mid: ${t.mid} !important;
}`;

      // ── BODY + BASE ──
      css += `
body { background: ${t.bg} !important; color: ${t.hi} !important; }
nav { background: rgba(${hexToRgb(t.bg)},0.97) !important; border-bottom-color: ${t.accD} !important; }
nav::before { background: linear-gradient(to bottom, ${t.bg} 0%, transparent 100%) !important; }`;

      // ── HERO ──
      css += `
.hero { background: ${t.bg} !important; }
.hero-bg { filter: ${t.imgF} !important; }
.hero-eyebrow { color: ${t.acc} !important; }
.hero-headline-top { color: ${t.mid} !important; }
.hero-headline-bottom { color: ${t.hi} !important; }
.hero-scroll span { color: ${t.lo} !important; }
.scroll-line { background: linear-gradient(to bottom, ${t.acc}, transparent) !important; }`;

      // ── MARQUEE ──
      css += `
.marquee-wrap { background: ${t.mqBg} !important; }
.marquee-track span { color: ${t.mqTx} !important; }`;

      // ── SHARED LABELS + TITLES ──
      css += `
.label { color: ${t.acc} !important; }
.section-title { color: ${t.hi} !important; }
.section-title em { color: ${t.accD.replace('0.3','0.7')} !important; }`;

      // ── WWD / WHY NOW ──
      css += `
.wwd-section { background: ${t.bg2} !important; background-image: none !important; }
.wwd-section * { border-color: ${t.accD} !important; }
[class*="wwd"] span[style*="color:#8a6e3a"],
[class*="wwd"] span[style*="color:rgba(138"],
.wwd-section span[style*="color"] { color: ${t.acc} !important; }
.wwd-section p[style*="color:rgba(10,10,10"] { color: ${t.mid} !important; }
.wwd-section p[style*="color:rgba(26"] { color: ${t.mid} !important; }`;

      // ── HOW IT WORKS ACCORDION ──
      css += `
#how { background: ${t.bg} !important; }
#how span[style*="color:rgba(200,169,110"] { color: ${t.acc} !important; }
.accordion-item { border-bottom-color: ${t.accD} !important; }
.accordion-num { color: ${t.accD} !important; }
.accordion-title { color: ${t.hi} !important; }
.accordion-icon { color: ${t.acc} !important; }
.accordion-body p { color: ${t.mid} !important; }`;

      // ── ENGINEERING ──
      css += `
#e2, [id="e2"] { background: ${t.bg2} !important; }
section[style*="background:#ede8e0"][style*="cad_texture"] { background: ${t.bg2} !important; background-image: none !important; }
section[style*="background:#ede8e0"]:not(.case-study):not(.funds):not(.wwd-section) { background: ${t.bg2} !important; background-image: none !important; }
div[style*="background:#ede8e0"]:not(.case-study *) { background: ${t.bg2} !important; background-image: none !important; }
div[style*="background:rgba(237,232,224)"]:not(.case-study *) { background: ${t.bg2} !important; }
div[style*="position:absolute"][style*="background:#ede8e0"] { background: ${t.bg2} !important; }
div[style*="position:absolute"][style*="opacity:0.92"] { background: ${t.bg2} !important; }
.es2b { border-color: ${t.accD} !important; color: ${t.mid} !important; }
.es2b:hover { color: ${t.acc} !important; border-color: ${t.acc} !important; }
.es2b.active { background: ${t.accD} !important; color: ${t.acc} !important; border-color: ${t.acc} !important; }
#es2-sw { background: ${t.bg} !important; border-top-color: ${t.accD} !important; border-bottom-color: ${t.accD} !important; }
.ec2-tag { color: ${t.acc} !important; }
.ec2-name { color: ${t.hi} !important; }
.ec2-btn { border-color: ${t.accD} !important; color: ${t.acc} !important; }
.eng-pill { border-color: ${t.accD} !important; color: ${t.acc} !important; }
.eng-spec-label { color: ${t.lo} !important; }
.eng-spec-val { color: ${t.mid} !important; }
.eng-spec-row { border-color: ${t.accD} !important; }
section[style*="background:#ede8e0"] p[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
section[style*="background:#ede8e0"] p[style*="color:rgba(10,10,10"] { color: ${t.mid} !important; }
div[style*="background:#ede8e0"] p[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
div[style*="background:#ede8e0"] p[style*="color:rgba(10,10,10"] { color: ${t.mid} !important; }
div[style*="background:#ede8e0"] span[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
div[style*="background:#ede8e0"] span[style*="color:rgba(10,10,10"] { color: ${t.lo} !important; }
.factory-duo-overlay span { color: ${t.hi} !important; }
.factory-solo { filter: ${t.imgF} !important; }`;

      // ── FOUNDRY THESIS ──
      css += `
section[style*="background:#ede8e0"][style*="text-align:center"] { background: ${t.bg3} !important; }
section[style*="background:#ede8e0"][style*="text-align:center"] span[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
section[style*="background:#ede8e0"][style*="text-align:center"] p[style*="font-family:'Bebas"] { color: ${t.hi} !important; }
section[style*="background:#ede8e0"][style*="text-align:center"] p[style*="color:rgba(10,10,10,0.28)"] { color: ${t.lo} !important; }
section[style*="background:#ede8e0"][style*="text-align:center"] div[style*="background:rgba(200,169,110"] { background: ${t.accD} !important; }`;

      // ── CHINA SECTION ──
      css += `
section[style*="background:#ede8e0"]:not([style*="text-align:center"]) { background: ${t.bg2} !important; background-image: none !important; }
.cpl-china-left span[style*="color:rgba(138"] { color: ${t.acc} !important; }
.cpl-china-left h2[style*="color:rgba(10,10,10"] { color: ${t.hi} !important; }
.cpl-china-left p[style*="color:rgba(10,10,10"] { color: ${t.mid} !important; }
.ch-item { border-bottom-color: ${t.accD} !important; }
.ch-eyebrow { color: ${t.lo} !important; }
.ch-icon { color: ${t.acc} !important; }
.ch-body p { color: ${t.mid} !important; }
.china-accordion { background: ${t.bg3} !important; }
.cpl-china-acc::before { background: ${t.acc} !important; }`;

      // ── VALUE SECTION ──
      css += `
.value { background: ${t.bg2} !important; background-image: none !important; }
section.value { background: ${t.bg2} !important; background-image: none !important; }
.value > div[style*="background:#ede8e0"] { background: ${t.bg2} !important; }
.value .label { color: ${t.acc} !important; }
.value-card { background: ${t.accD.replace('0.3','0.04')} !important; border-color: ${t.accD.replace('0.3','0.12')} !important; }
.value-card h4 { color: ${t.hi} !important; }
.value-card p { color: ${t.mid} !important; }
.value-card::before { background: ${t.acc} !important; }
.value-card:hover { border-color: ${t.acc} !important; }
.val-icon { color: ${t.acc} !important; }
div[style*="background:#ede8e0"][style*="font-family:'Bebas Neue'"] { color: ${t.hi} !important; }
div[style*="padding:56px 48px"][style*="background:rgba(10,10,10,0.04)"] { background: ${t.accD.replace('0.3','0.04')} !important; }
div[style*="padding:56px 48px"] h2[style*="color:rgba(10,10,10"] { color: ${t.hi} !important; }`;

      // ── LOGOS ──
      css += `
.logos { background: ${t.bg} !important; }
.logos .label { color: ${t.acc} !important; }`;

      // ── CTA ──
      css += `
.cta { background: ${t.cta} !important; }
.cta .section-title { color: ${t.ctaTx} !important; }
.cta .section-title em { color: ${t.mid} !important; }
.cta p { color: ${t.mid} !important; }
.cta .label { color: ${t.accD.replace('0.3','0.6')} !important; }
.btn { border-color: ${t.acc} !important; color: ${t.acc} !important; }
.btn:hover { background: ${t.accD} !important; }
.cta a[style*="color:rgba(244,241,236"] { color: ${t.ctaTx} !important; }`;

      // ── FOOTER ──
      css += `
footer { background: ${t.bg} !important; border-top-color: ${t.accD} !important; }
.footer-brand { color: ${t.hi} !important; }
.footer-tagline { color: ${t.mid} !important; }
.footer-col h5 { color: ${t.acc} !important; }
.footer-col p, .footer-col address, .footer-col a { color: ${t.mid} !important; }
.footer-col a:hover { color: ${t.hi} !important; }
.footer-bottom { background: ${t.bg} !important; border-top-color: ${t.accD} !important; }
.footer-bottom span { color: ${t.lo} !important; }`;

      // ── DIVIDERS ──
      css += `
.divider { background: ${t.accD} !important; }`;

      // ── PERSISTENT UI ELEMENTS ──
      css += `
#v11-badge { border-color: ${t.accD} !important; color: ${t.acc} !important; }
#v11-status-dot { background: ${t.acc} !important; box-shadow: 0 0 8px ${t.accD} !important; }
#scrollIndicator { background: ${t.acc} !important; }`;

      // ── CASE STUDY (gets full retheme on SF identities 01-10) ──
      css += `
.case-study { background: ${t.bg2} !important; background-image: none !important; }
.case-study .mc-hero { background: ${t.bg} !important; }
.case-study .mc-hero-eyebrow { color: ${t.acc} !important; }
.case-study .mc-hero-title { color: ${t.hi} !important; }
.case-study .mc-hero-body { color: ${t.mid} !important; }
.case-study .mc-metric-val { color: ${t.acc} !important; }
.case-study .mc-metric-lbl { color: ${t.lo} !important; }
.case-study div[style*="background:var(--cream)"] { background: ${t.bg3} !important; }
.case-study div[style*="background:#ede8e0"], .case-study div[style*="background: #ede8e0"] { background: ${t.bg3} !important; }
.case-study span[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
.case-study p[style*="color:rgba(10,10,10"] { color: ${t.mid} !important; }
.case-study div[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
.case-study p[style*="color:rgba(10,10,10,0.55)"] { color: ${t.mid} !important; }
.case-study .case-img img { filter: ${t.imgF} !important; }
.case-study div[style*="border-bottom:1px solid rgba(10,10,10"] { border-bottom-color: ${t.accD} !important; }
.case-study .translation-label { color: ${t.acc} !important; }
.case-study .arrow-line { background: ${t.acc} !important; }
.case-study .arrow-label, .case-study .arrow-head { color: ${t.acc} !important; }
.case-study .case-note { color: ${t.acc} !important; }
.case-study .mc-hero-div { background: linear-gradient(to bottom, transparent, ${t.accD}, transparent) !important; }`;

      // ── FUNDS (gets retheme on SF identities too) ──
      css += `
.funds { background: ${t.bg2} !important; }
.funds .label { color: ${t.acc} !important; }
.funds .section-title { color: ${t.hi} !important; }
.fund-card { background: ${t.accD.replace('0.3','0.04')} !important; border-color: ${t.accD.replace('0.3','0.1')} !important; }
.fund-card:hover { border-color: ${t.acc} !important; }
.fund-tag { color: ${t.acc} !important; }
.fund-body h3 { color: ${t.hi} !important; }
.fund-body p { color: ${t.mid} !important; }
.fund-expand { color: ${t.mid} !important; }`;

    } else {
      // ── MARSHALL-ONLY IDENTITIES (M1-M5) ──
      // Only touch .case-study and .funds — SF stays original gold

      var isLight = t.light;
      var hasGrid = t.grid;

      css += `
.case-study { background: ${t.bg2} !important; background-image: none !important; ${hasGrid ? 'background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(80,144,192,0.05) 39px, rgba(80,144,192,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(80,144,192,0.05) 39px, rgba(80,144,192,0.05) 40px) !important;' : ''} }
.case-study .mc-hero { background: ${t.bg} !important; }
.case-study .mc-hero-eyebrow { color: ${t.acc} !important; }
.case-study .mc-hero-title { color: ${t.hi} !important; }
.case-study .mc-hero-body { color: ${t.mid} !important; }
.case-study .mc-metric-val { color: ${t.acc} !important; }
.case-study .mc-metric-lbl { color: ${t.lo} !important; }
.case-study div[style*="background:var(--cream)"] { background: ${t.bg3} !important; }
.case-study div[style*="background:#ede8e0"] { background: ${t.bg3} !important; }
.case-study span[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
.case-study p[style*="color:rgba(10,10,10"] { color: ${t.mid} !important; }
.case-study div[style*="color:#8a6e3a"] { color: ${t.acc} !important; }
.case-study .case-img img { filter: ${t.imgF} !important; }
.case-study div[style*="border-bottom:1px solid rgba(10,10,10"] { border-bottom-color: ${t.accD} !important; }
.case-study .translation-label { color: ${t.acc} !important; }
.case-study .arrow-line { background: ${t.acc} !important; }
.case-study .arrow-label, .case-study .arrow-head { color: ${t.acc} !important; }
.case-study .case-note { color: ${t.acc} !important; }
.case-study .mc-hero-div { background: linear-gradient(to bottom, transparent, ${t.accD}, transparent) !important; }
.funds { background: ${t.bg2} !important; }
.funds .label { color: ${t.acc} !important; }
.funds .section-title { color: ${t.hi} !important; }
.fund-card { background: ${t.accD.replace('0.3','0.04')} !important; border-color: ${t.accD.replace('0.3','0.1')} !important; }
.fund-card:hover { border-color: ${t.acc} !important; }
.fund-tag { color: ${t.acc} !important; }
.fund-body h3 { color: ${t.hi} !important; }
.fund-body p { color: ${t.mid} !important; }
.fund-expand { color: ${t.mid} !important; }`;
    }

    // ── BLANCHE INVERTED — extra overrides for light mode ──
    if (t.invert) {
      css += `
nav { background: rgba(240,236,228,0.97) !important; }
.nav-logo span { -webkit-text-stroke-color: rgba(30,25,20,0.8) !important; }
.nav-links a { color: rgba(30,25,20,0.55) !important; }
.nav-links a:hover { color: rgba(30,25,20,0.9) !important; }
.logo-grid img { filter: brightness(0) invert(0) !important; opacity: 0.3 !important; }
.logo-grid img:hover { opacity: 0.65 !important; }
#isel-bar { background: rgba(240,236,228,0.97) !important; border-bottom-color: rgba(42,37,32,0.15) !important; }
.isel-meta { color: rgba(42,37,32,0.22) !important; }
.isel-btn { border-color: rgba(42,37,32,0.1) !important; color: rgba(42,37,32,0.3) !important; }
.isel-btn:hover { border-color: rgba(42,37,32,0.4) !important; color: rgba(42,37,32,0.8) !important; }
.isel-btn.isel-active { background: rgba(42,37,32,0.1) !important; border-color: rgba(42,37,32,0.5) !important; color: #2a2520 !important; }
#isel-name { color: rgba(42,37,32,0.28) !important; }
.isel-div { background: rgba(42,37,32,0.12) !important; }`;
    }

    return css;
  }

  // ── HEX TO RGB HELPER ──
  function hexToRgb(hex) {
    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? parseInt(r[1],16)+','+parseInt(r[2],16)+','+parseInt(r[3],16) : '10,10,10';
  }

  // ── APPLY IDENTITY ──
  var styleEl = null;
  var currentId = 0;

  function applyIdentity(id) {
    currentId = id;
    var t = T[id];
    var isMarshallOnly = t && t.marshallOnly;

    // Remove existing override
    if (styleEl) { styleEl.remove(); styleEl = null; }

    // Remove body class from previous identity
    document.body.className = document.body.className
      .replace(/\bisel-\S+/g, '').trim();

    if (t) {
      // Inject new style block
      styleEl = document.createElement('style');
      styleEl.id = 'isel-override';
      styleEl.textContent = buildCSS(t, isMarshallOnly);
      document.head.appendChild(styleEl);

      // Patch deeply hardcoded !important inline styles (value section)
      // These have background:#ede8e0 !important baked into style attr
      patchInlineImportants(t, isMarshallOnly);

      // Mark body for blanche invert
      if (t.invert) document.body.classList.add('isel-blanche');
    } else {
      // Reset to original — remove any inline patches
      restoreInlineImportants();
    }

    // Update bar UI
    document.querySelectorAll('.isel-btn').forEach(function(btn) {
      btn.classList.toggle('isel-active', btn.getAttribute('data-id') == id);
    });
    var nameEl = document.getElementById('isel-name');
    if (nameEl) nameEl.textContent = NAMES[id] || '';

    // Persist
    try { localStorage.setItem('sf-identity', id); } catch(e) {}
  }

  // ── PATCH INLINE !important STYLES ──
  // The value section has background:#ede8e0 !important in inline style attr
  // Only JS can override that — we store originals and swap them
  var patchedEls = [];

  function patchInlineImportants(t, marshallOnly) {
    restoreInlineImportants();
    if (marshallOnly) return; // Marshall-only identities don't touch value section

    // Find all elements with hardcoded !important backgrounds
    var all = document.querySelectorAll('[style*="!important"]');
    all.forEach(function(el) {
      // Skip SWITCH section always
      try { if (el.closest && el.closest('#featured')) return; } catch(e) {}

      var orig = el.getAttribute('style');
      if (!orig) return;

      var patched = orig;
      // Replace hardcoded !important backgrounds
      patched = patched.replace(/background:#ede8e0\s*!important/g, 'background:' + t.bg2 + ' !important');
      patched = patched.replace(/background-image:url\([^)]+\)\s*!important/g, 'background-image:none !important');
      patched = patched.replace(/background-attachment:fixed\s*!important/g, 'background-attachment:scroll !important');

      if (patched !== orig) {
        patchedEls.push({ el: el, orig: orig });
        el.setAttribute('style', patched);
      }
    });
  }

  function restoreInlineImportants() {
    patchedEls.forEach(function(item) {
      item.el.setAttribute('style', item.orig);
    });
    patchedEls = [];
    document.body.classList.remove('isel-blanche');
  }

  // ── INIT ──
  function init() {
    var btns = document.querySelectorAll('.isel-btn');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-id');
        // Parse id — numeric or m1-m5
        var parsed = isNaN(id) ? id : parseInt(id);
        applyIdentity(parsed);
      });
    });

    // Restore saved
    try {
      var saved = localStorage.getItem('sf-identity');
      if (saved !== null) {
        var parsed = isNaN(saved) ? saved : parseInt(saved);
        if (T.hasOwnProperty(parsed)) { applyIdentity(parsed); return; }
      }
    } catch(e) {}

    applyIdentity(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
// ══ END IDENTITY ENGINE ══
