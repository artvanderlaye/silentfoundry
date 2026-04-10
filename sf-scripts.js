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
// IDENTITY ENGINE v3
// Light-world identities. Accent on labels/eyebrows only.
// JS injects <style> with !important to defeat all inline styles.
// Patches elements with !important baked into style attribute.
// SWITCH #featured always locked — never touched.
// ══════════════════════════════════════════════════════════════
(function () {

  // ── IDENTITY TOKEN SETS ──
  // All SF identities (01-10): light backgrounds, accent colour on details only
  // All Marshall identities (m1-m5): SF gold untouched, Marshall section only
  var T = {

    0: null, // Original — no override

    // 01 — CHALK
    // Warm white. Dusty chalk surface. Accent: terracotta.
    // Feels like a Milanese design studio — dry, considered.
    1: {
      name: '01 — Chalk / Terracotta',
      bg:  '#f5f2ee', bg2: '#eeebe6', bg3: '#e8e4df',
      acc: '#b85c38',
      hi:  'rgba(22,18,14,0.88)', mid: 'rgba(22,18,14,0.52)', lo: 'rgba(22,18,14,0.3)',
      mqBg: '#b85c38', mqTx: '#f5f2ee',
      cta: '#1a1410', ctaTx: 'rgba(245,242,238,0.88)',
      imgF: 'brightness(0.88) saturate(0.9)'
    },

    // 02 — BONE
    // Cool off-white. Almost surgical. Accent: slate blue.
    // Precise, architectural — like a structural drawing.
    2: {
      name: '02 — Bone / Slate Blue',
      bg:  '#f2f3f5', bg2: '#eaecf0', bg3: '#e2e5ea',
      acc: '#3d6080',
      hi:  'rgba(14,18,24,0.88)', mid: 'rgba(14,18,24,0.52)', lo: 'rgba(14,18,24,0.3)',
      mqBg: '#3d6080', mqTx: '#f2f3f5',
      cta: '#0e1218', ctaTx: 'rgba(242,243,245,0.88)',
      imgF: 'brightness(0.85) saturate(0.6) hue-rotate(190deg)'
    },

    // 03 — LINEN
    // Deep warm linen. Slightly yellowed. Accent: dark moss.
    // Heritage press, old paper — tactile and analog.
    3: {
      name: '03 — Linen / Dark Moss',
      bg:  '#f0ead8', bg2: '#e8e2d0', bg3: '#e0d9c6',
      acc: '#3a5040',
      hi:  'rgba(18,14,8,0.88)', mid: 'rgba(18,14,8,0.52)', lo: 'rgba(18,14,8,0.3)',
      mqBg: '#3a5040', mqTx: '#f0ead8',
      cta: '#161210', ctaTx: 'rgba(240,234,216,0.88)',
      imgF: 'brightness(0.85) saturate(0.7) sepia(0.15)'
    },

    // 04 — SALT
    // Pure cool white. Clinical. Accent: graphite.
    // Nothing warm. Like a product page for a $40k object.
    4: {
      name: '04 — Salt / Graphite',
      bg:  '#f8f8f8', bg2: '#f0f0f0', bg3: '#e8e8e8',
      acc: '#404040',
      hi:  'rgba(10,10,10,0.88)', mid: 'rgba(10,10,10,0.5)', lo: 'rgba(10,10,10,0.28)',
      mqBg: '#282828', mqTx: '#f8f8f8',
      cta: '#101010', ctaTx: 'rgba(248,248,248,0.88)',
      imgF: 'brightness(0.88) grayscale(0.3)'
    },

    // 05 — STONE
    // Mid warm stone. Not white, not cream. Accent: deep rust.
    // Feels quarried — heavy, permanent, real.
    5: {
      name: '05 — Stone / Deep Rust',
      bg:  '#ede7de', bg2: '#e5dfd6', bg3: '#dcd5cb',
      acc: '#8c3a28',
      hi:  'rgba(20,14,10,0.88)', mid: 'rgba(20,14,10,0.52)', lo: 'rgba(20,14,10,0.3)',
      mqBg: '#8c3a28', mqTx: '#ede7de',
      cta: '#180e0a', ctaTx: 'rgba(237,231,222,0.88)',
      imgF: 'brightness(0.85) saturate(0.8) sepia(0.1)'
    },

    // 06 — PAPER
    // Newspaper grey-white. Slightly cool. Accent: midnight navy.
    // Editorial. Dense type. Things that matter get printed.
    6: {
      name: '06 — Paper / Midnight Navy',
      bg:  '#f0eff0', bg2: '#e8e7e9', bg3: '#dedddf',
      acc: '#1a2840',
      hi:  'rgba(12,10,14,0.88)', mid: 'rgba(12,10,14,0.52)', lo: 'rgba(12,10,14,0.3)',
      mqBg: '#1a2840', mqTx: '#f0eff0',
      cta: '#0c0a10', ctaTx: 'rgba(240,239,240,0.88)',
      imgF: 'brightness(0.88) saturate(0.5)'
    },

    // 07 — PLASTER
    // Warm mid-grey plaster. Accent: aged bronze.
    // Architecture firm. Maquettes on a shelf. Serious work.
    7: {
      name: '07 — Plaster / Aged Bronze',
      bg:  '#e8e5e0', bg2: '#e0ddd8', bg3: '#d8d4ce',
      acc: '#7a6248',
      hi:  'rgba(16,13,10,0.88)', mid: 'rgba(16,13,10,0.52)', lo: 'rgba(16,13,10,0.3)',
      mqBg: '#7a6248', mqTx: '#e8e5e0',
      cta: '#141008', ctaTx: 'rgba(232,229,224,0.88)',
      imgF: 'brightness(0.88) saturate(0.7) sepia(0.1)'
    },

    // 08 — PARCHMENT
    // Deep amber parchment. Rich, aged. Accent: dark teal.
    // Feels like a luxury goods catalogue — rare materials.
    8: {
      name: '08 — Parchment / Dark Teal',
      bg:  '#ede0c8', bg2: '#e5d8c0', bg3: '#dcd0b6',
      acc: '#2a5050',
      hi:  'rgba(18,10,6,0.88)', mid: 'rgba(18,10,6,0.52)', lo: 'rgba(18,10,6,0.3)',
      mqBg: '#2a5050', mqTx: '#ede0c8',
      cta: '#141010', ctaTx: 'rgba(237,224,200,0.88)',
      imgF: 'brightness(0.88) saturate(0.9) sepia(0.2)'
    },

    // 09 — FROST
    // Cool pale blue-grey. Almost white but pulls north.
    // Accent: prussian blue. Like a winter morning in a workshop.
    9: {
      name: '09 — Frost / Prussian Blue',
      bg:  '#eef0f4', bg2: '#e5e8ed', bg3: '#dce0e7',
      acc: '#1e3a58',
      hi:  'rgba(10,14,20,0.88)', mid: 'rgba(10,14,20,0.52)', lo: 'rgba(10,14,20,0.3)',
      mqBg: '#1e3a58', mqTx: '#eef0f4',
      cta: '#0c1018', ctaTx: 'rgba(238,240,244,0.88)',
      imgF: 'brightness(0.85) saturate(0.5) hue-rotate(195deg)'
    },

    // 10 — ASH
    // Cool grey. Not warm, not cold — just present. Accent: charcoal.
    // Feels like a machined billet before it becomes something.
    10: {
      name: '10 — Ash / Charcoal',
      bg:  '#e8e9ea', bg2: '#e0e1e3', bg3: '#d6d8da',
      acc: '#2e3238',
      hi:  'rgba(12,13,14,0.88)', mid: 'rgba(12,13,14,0.52)', lo: 'rgba(12,13,14,0.3)',
      mqBg: '#2e3238', mqTx: '#e8e9ea',
      cta: '#0e1012', ctaTx: 'rgba(232,233,234,0.88)',
      imgF: 'brightness(0.88) grayscale(0.2)'
    },

    // M1 — MARSHALL: NOIR
    // SF gold untouched. Marshall goes full cinematic black.
    // Near-black bg. White text. Gold hairlines only. Dramatic.
    m1: {
      name: 'M1 — Marshall: Noir',
      marshallOnly: true,
      bg:  '#080808', bg2: '#0d0d0d', bg3: '#141414',
      acc: '#c8a96e',
      hi:  'rgba(244,241,236,0.9)', mid: 'rgba(244,241,236,0.55)', lo: 'rgba(244,241,236,0.3)',
      imgF: 'brightness(0.55) contrast(1.3) grayscale(0.3)',
      img4F: 'brightness(0.5) contrast(1.4) grayscale(0.5)',
      grunge: false
    },

    // M2 — MARSHALL: GRUNGE
    // SF gold untouched. Marshall gets heavy grain texture overlay.
    // Raw, rock and roll — like a tour poster from 1978.
    m2: {
      name: 'M2 — Marshall: Grunge',
      marshallOnly: true,
      bg:  '#0f0c08', bg2: '#161208', bg3: '#1e1810',
      acc: '#d4a040',
      hi:  'rgba(240,228,200,0.9)', mid: 'rgba(240,228,200,0.55)', lo: 'rgba(240,228,200,0.3)',
      imgF: 'brightness(0.6) contrast(1.4) sepia(0.4) saturate(1.2)',
      img4F: 'brightness(0.5) contrast(1.5) sepia(0.6)',
      grunge: true
    },

    // M3 — MARSHALL: BLUEPRINT
    // SF gold untouched. Marshall becomes a technical document.
    // Deep navy bg. Blueprint grid. Cold, precise, engineered.
    m3: {
      name: 'M3 — Marshall: Blueprint',
      marshallOnly: true,
      bg:  '#06101e', bg2: '#0a1628', bg3: '#0e1c34',
      acc: '#4a90c8',
      hi:  'rgba(200,225,248,0.9)', mid: 'rgba(200,225,248,0.55)', lo: 'rgba(200,225,248,0.3)',
      imgF: 'brightness(0.55) saturate(0.2) hue-rotate(200deg)',
      img4F: 'brightness(0.5) saturate(0.15) hue-rotate(200deg)',
      grid: true,
      grunge: false
    },

    // M4 — MARSHALL: SEPIA
    // SF gold untouched. Marshall goes amber heritage print.
    // Warm, aged. Like a Marshall catalogue from 1965.
    m4: {
      name: 'M4 — Marshall: Heritage',
      marshallOnly: true,
      bg:  '#1c1408', bg2: '#241c0c', bg3: '#2c2412',
      acc: '#c89040',
      hi:  'rgba(248,232,200,0.9)', mid: 'rgba(248,232,200,0.55)', lo: 'rgba(248,232,200,0.3)',
      imgF: 'brightness(0.65) sepia(0.75) contrast(1.1)',
      img4F: 'brightness(0.6) sepia(0.9) contrast(1.2)',
      grunge: false
    },

    // M5 — MARSHALL: LINEN
    // SF gold untouched. Marshall flips to full light — warm linen.
    // Maximum separation from SF dark. Marshall as the heritage showpiece.
    m5: {
      name: 'M5 — Marshall: Linen',
      marshallOnly: true,
      bg:  '#f5efe2', bg2: '#ede8da', bg3: '#e5dfd0',
      acc: '#6a4e2e',
      hi:  'rgba(24,16,8,0.88)', mid: 'rgba(24,16,8,0.52)', lo: 'rgba(24,16,8,0.3)',
      imgF: 'brightness(0.88) saturate(0.7) sepia(0.15)',
      img4F: 'brightness(0.85) saturate(0.6) sepia(0.2)',
      grunge: false,
      light: true
    }
  };

  var NAMES = {
    0:'Original — Gold / Cream / Black',
    1:'01 — Chalk / Terracotta', 2:'02 — Bone / Slate Blue', 3:'03 — Linen / Dark Moss',
    4:'04 — Salt / Graphite', 5:'05 — Stone / Deep Rust', 6:'06 — Paper / Midnight Navy',
    7:'07 — Plaster / Aged Bronze', 8:'08 — Parchment / Dark Teal',
    9:'09 — Frost / Prussian Blue', 10:'10 — Ash / Charcoal',
    m1:'M1 — Marshall: Noir', m2:'M2 — Marshall: Grunge',
    m3:'M3 — Marshall: Blueprint', m4:'M4 — Marshall: Heritage', m5:'M5 — Marshall: Linen'
  };

  // ── CSS BUILDER ──
  function buildCSS(t) {
    if (!t) return '';
    var m = t.marshallOnly;
    var c = '';

    if (!m) {
      // ── SF FULL SITE RETHEME (identities 01-10) ──

      // Root vars
      c += ':root { --black:'+t.bg+' !important; --white:'+t.hi+' !important; --cream:'+t.bg2+' !important; --accent:'+t.acc+' !important; --mid:'+t.mid+' !important; }\n';

      // Body + nav
      c += 'body { background:'+t.bg+' !important; color:'+t.hi+' !important; }\n';
      c += 'nav { background:'+t.bg+'fa !important; border-bottom:1px solid rgba(0,0,0,0.08) !important; }\n';
      c += 'nav::before { background:linear-gradient(to bottom,'+t.bg+' 0%,transparent 100%) !important; }\n';
      c += '.nav-logo span { color:'+t.hi+' !important; -webkit-text-stroke-color:'+t.hi+' !important; }\n';
      c += '.nav-links a { color:'+t.hi+' !important; }\n';
      c += '.nav-links a:hover { color:'+t.acc+' !important; }\n';
      c += '.mobile-menu { background:'+t.bg+' !important; }\n';

      // Hero — dark overlay stays, just tint bg
      c += '.hero { background:'+t.bg2+' !important; }\n';
      c += '.hero-bg { filter:'+t.imgF+' !important; }\n';
      c += '.hero-eyebrow { color:'+t.acc+' !important; }\n';
      c += '.hero-headline-top { color:rgba(0,0,0,0.12) !important; }\n';
      c += '.hero-headline-bottom { color:'+t.hi+' !important; }\n';
      c += '.hero-scroll span { color:'+t.mid+' !important; }\n';
      c += '.scroll-line { background:linear-gradient(to bottom,'+t.acc+',transparent) !important; }\n';

      // Marquee
      c += '.marquee-wrap { background:'+t.mqBg+' !important; }\n';
      c += '.marquee-track span { color:'+t.mqTx+' !important; }\n';

      // WWD section — light bg, dark text
      c += '.wwd-section { background:'+t.bg2+' !important; background-image:none !important; }\n';
      c += '.wwd-section span[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += '.wwd-section span[style*="color:rgba(138"] { color:'+t.acc+' !important; }\n';
      c += '.wwd-section p[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += '.wwd-section div[style*="border-bottom"] { border-bottom-color:rgba(0,0,0,0.08) !important; }\n';

      // Dividers
      c += '.divider { background:rgba(0,0,0,0.08) !important; }\n';

      // Marshall case study — rethemed with SF identity on 01-10
      c += '.case-study { background:'+t.bg3+' !important; }\n';
      c += '.case-study .mc-hero { background:'+t.bg+' !important; }\n';
      c += '.mc-hero::after { background:linear-gradient(to right,'+t.bg+'e0 0%,'+t.bg+'b8 45%,transparent 100%) !important; }\n';
      c += '.mc-hero-eyebrow { color:'+t.acc+' !important; }\n';
      c += '.mc-hero-title { color:'+t.hi+' !important; }\n';
      c += '.mc-hero-body { color:'+t.mid+' !important; }\n';
      c += '.mc-metric-val { color:'+t.acc+' !important; }\n';
      c += '.mc-metric-lbl { color:'+t.lo+' !important; }\n';
      c += '.mc-hero-div { background:linear-gradient(to bottom,transparent,'+t.acc+'40,transparent) !important; }\n';
      c += '.case-study div[style*="background:var(--cream)"] { background:'+t.bg2+' !important; }\n';
      c += '.case-study div[style*="background:#ede8e0"] { background:'+t.bg2+' !important; }\n';
      c += '.case-study span[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += '.case-study p[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += '.case-study div[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += '.case-study div[style*="border-bottom:1px solid rgba(10,10,10"] { border-bottom-color:rgba(0,0,0,0.1) !important; }\n';
      c += '.case-study .case-img img { filter:'+t.imgF+' !important; }\n';
      c += '.case-study img[style*="object-fit:cover"] { filter:'+t.imgF+' !important; }\n';
      c += '.case-study .translation-label { color:'+t.acc+' !important; }\n';
      c += '.case-study .arrow-line { background:'+t.acc+' !important; }\n';
      c += '.case-study .arrow-label,.case-study .arrow-head { color:'+t.acc+' !important; }\n';
      c += '.case-study .case-note { color:'+t.acc+' !important; }\n';

      // Foundry Thesis — CRITICAL: all 4 text layers
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] { background:'+t.bg3+' !important; }\n';
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] span[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] p[style*="color:rgba(10,10,10,0.1)"] { color:rgba(0,0,0,0.1) !important; }\n';
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] p[style*="color:rgba(10,10,10,0.3)"] { color:rgba(0,0,0,0.3) !important; }\n';
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] p[style*="color:#c8a96e"] { color:'+t.acc+' !important; }\n';
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] p[style*="color:rgba(10,10,10,0.28)"] { color:rgba(0,0,0,0.35) !important; }\n';
      c += 'section[style*="background:#ede8e0"][style*="text-align:center"] div[style*="background:rgba(200,169,110"] { background:'+t.acc+'66 !important; }\n';

      // How It Works accordion
      c += '#how { background:'+t.bg+' !important; }\n';
      c += '#how span[style*="color:rgba(200,169,110"] { color:'+t.acc+' !important; }\n';
      c += '.accordion-item { border-bottom-color:rgba(0,0,0,0.08) !important; }\n';
      c += '.accordion-num { color:rgba(0,0,0,0.15) !important; }\n';
      c += '.accordion-title { color:'+t.hi+' !important; }\n';
      c += '.accordion-icon { color:'+t.acc+' !important; }\n';
      c += '.accordion-body p { color:'+t.mid+' !important; }\n';

      // Engineering section
      c += 'section[style*="background:#ede8e0"][style*="cad_texture"] { background:'+t.bg2+' !important; background-image:none !important; }\n';
      c += 'div[style*="background:#ede8e0"]:not(.case-study *) { background:'+t.bg2+' !important; background-image:none !important; }\n';
      c += 'div[style*="position:absolute"][style*="background:#ede8e0"] { background:'+t.bg2+' !important; }\n';
      c += 'div[style*="position:absolute"][style*="opacity:0.92"] { opacity:0 !important; }\n';
      c += '#es2-sw { background:'+t.bg+' !important; border-top-color:rgba(0,0,0,0.08) !important; border-bottom-color:rgba(0,0,0,0.08) !important; }\n';
      c += '.es2b { border-color:rgba(0,0,0,0.15) !important; color:'+t.mid+' !important; }\n';
      c += '.es2b:hover,.es2b.active { color:'+t.acc+' !important; border-color:'+t.acc+' !important; }\n';
      c += '.ec2-tag { color:'+t.acc+' !important; }\n';
      c += '.ec2-name { color:'+t.hi+' !important; }\n';
      c += 'section[style*="background:#ede8e0"] p[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += 'section[style*="background:#ede8e0"] p[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += 'section[style*="background:#ede8e0"] span[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += 'section[style*="background:#ede8e0"] span[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += 'div[style*="background:#ede8e0"] p[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += 'div[style*="background:#ede8e0"] p[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += 'div[style*="background:#ede8e0"] span[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += 'div[style*="background:#ede8e0"] span[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += 'div[style*="background:rgba(10,10,10,0.07)"] { background:rgba(0,0,0,0.06) !important; }\n';
      c += 'div[style*="border-bottom:1px solid rgba(10,10,10,0.07)"] { border-bottom-color:rgba(0,0,0,0.08) !important; }\n';
      c += '.factory-duo-overlay span { color:'+t.hi+' !important; }\n';

      // China section
      c += 'section[style*="background:#ede8e0"]:not([style*="text-align:center"]):not([style*="cad_texture"]) { background:'+t.bg2+' !important; background-image:none !important; }\n';
      c += '.cpl-china-left span[style*="color:rgba(138"] { color:'+t.acc+' !important; }\n';
      c += '.cpl-china-left h2 { color:'+t.hi+' !important; }\n';
      c += '.cpl-china-left p[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += '.ch-item { border-bottom-color:rgba(0,0,0,0.08) !important; }\n';
      c += '.ch-eyebrow { color:'+t.lo+' !important; }\n';
      c += '.ch-icon { color:'+t.acc+' !important; }\n';
      c += '.ch-body p { color:'+t.mid+' !important; }\n';
      c += '.cpl-china-acc { background:'+t.bg3+' !important; }\n';
      c += '.cpl-china-acc::before { background:'+t.acc+' !important; }\n';
      c += '.ch-header span[style*="color:rgba(10,10,10"] { color:'+t.lo+' !important; }\n';

      // Value section
      c += '.value,.value section { background:'+t.bg2+' !important; background-image:none !important; }\n';
      c += '.value .label { color:'+t.acc+' !important; }\n';
      c += '.value-card { background:rgba(0,0,0,0.03) !important; border-color:rgba(0,0,0,0.1) !important; }\n';
      c += '.value-card h4 { color:'+t.hi+' !important; }\n';
      c += '.value-card p { color:'+t.mid+' !important; }\n';
      c += '.value-card::before { background:'+t.acc+' !important; }\n';
      c += '.value-card:hover { border-color:'+t.acc+' !important; }\n';
      c += '.val-icon { color:'+t.acc+' !important; }\n';
      c += 'div[style*="padding:56px 48px"] h2[style*="color:rgba(10,10,10"] { color:'+t.hi+' !important; }\n';
      c += 'div[style*="padding:56px 48px"][style*="background:rgba(10,10,10,0.04)"] { background:rgba(0,0,0,0.03) !important; border-color:rgba(0,0,0,0.08) !important; }\n';

      // Logos
      c += '.logos { background:'+t.bg+' !important; }\n';
      c += '.logos .label { color:'+t.acc+' !important; }\n';
      c += '.logo-grid img { filter:brightness(0) !important; opacity:0.25 !important; }\n';
      c += '.logo-grid img:hover { opacity:0.55 !important; }\n';

      // Funds
      c += '.funds { background:'+t.bg2+' !important; }\n';
      c += '.funds .label { color:'+t.acc+' !important; }\n';
      c += '.funds .section-title { color:'+t.hi+' !important; }\n';
      c += '.fund-card { background:rgba(0,0,0,0.03) !important; border-color:rgba(0,0,0,0.08) !important; }\n';
      c += '.fund-card:hover { border-color:'+t.acc+' !important; }\n';
      c += '.fund-tag { color:'+t.acc+' !important; }\n';
      c += '.fund-body h3 { color:'+t.hi+' !important; }\n';
      c += '.fund-body p,.fund-expand { color:'+t.mid+' !important; }\n';

      // CTA — flips dark
      c += '.cta { background:'+t.cta+' !important; }\n';
      c += '.cta .section-title { color:'+t.ctaTx+' !important; }\n';
      c += '.cta .section-title em { color:rgba(255,255,255,0.3) !important; }\n';
      c += '.cta p { color:rgba(255,255,255,0.45) !important; }\n';
      c += '.cta .label { color:rgba(255,255,255,0.35) !important; }\n';
      c += '.btn { border-color:rgba(255,255,255,0.4) !important; color:rgba(255,255,255,0.75) !important; }\n';
      c += '.btn:hover { background:rgba(255,255,255,0.08) !important; }\n';
      c += '.cta a[style] span { color:'+t.ctaTx+' !important; -webkit-text-stroke-color:'+t.ctaTx+' !important; }\n';

      // Footer
      c += 'footer,.footer-bottom { background:'+t.bg+' !important; border-color:rgba(0,0,0,0.08) !important; }\n';
      c += '.footer-brand { color:'+t.hi+' !important; }\n';
      c += '.footer-tagline,.footer-col p,.footer-col address,.footer-col a { color:'+t.mid+' !important; }\n';
      c += '.footer-col h5 { color:'+t.acc+' !important; }\n';
      c += '.footer-col a:hover { color:'+t.hi+' !important; }\n';
      c += '.footer-bottom span { color:'+t.lo+' !important; }\n';

      // Persistent UI
      c += '#v11-badge { border-color:'+t.acc+'66 !important; color:'+t.acc+' !important; }\n';
      c += '#v11-status-dot { background:'+t.acc+' !important; box-shadow:0 0 8px '+t.acc+'66 !important; }\n';
      c += '#scrollIndicator { background:'+t.acc+' !important; }\n';

      // Selector bar adapts on light identities
      c += '#isel-bar { background:'+t.bg+'f5 !important; border-bottom:1px solid rgba(0,0,0,0.1) !important; }\n';
      c += '.isel-meta { color:rgba(0,0,0,0.2) !important; }\n';
      c += '.isel-btn { border-color:rgba(0,0,0,0.12) !important; color:rgba(0,0,0,0.3) !important; }\n';
      c += '.isel-btn:hover { border-color:rgba(0,0,0,0.4) !important; color:rgba(0,0,0,0.75) !important; }\n';
      c += '.isel-btn.isel-active { background:'+t.acc+'22 !important; border-color:'+t.acc+' !important; color:'+t.acc+' !important; }\n';
      c += '.isel-btn.isel-m { border-color:rgba(0,0,0,0.1) !important; color:rgba(0,0,0,0.25) !important; }\n';
      c += '.isel-btn.isel-m:hover { border-color:rgba(0,0,0,0.35) !important; color:rgba(0,0,0,0.65) !important; }\n';
      c += '.isel-btn.isel-m.isel-active { background:rgba(0,0,0,0.08) !important; border-color:rgba(0,0,0,0.4) !important; color:rgba(0,0,0,0.7) !important; }\n';
      c += '.isel-div { background:rgba(0,0,0,0.12) !important; }\n';
      c += '#isel-name { color:rgba(0,0,0,0.25) !important; }\n';

    } else {
      // ── MARSHALL-ONLY RETHEME (M1-M5) ──
      // SF gold stays. Only .case-study + .funds sections change.

      var isLight = t.light;
      var darkText = isLight ? t.hi : t.hi;
      var borderC = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

      c += '.case-study { background:'+t.bg2+' !important; }\n';
      c += '.case-study .mc-hero { background:'+t.bg+' !important; }\n';

      if (!isLight) {
        c += '.mc-hero::after { background:linear-gradient(to right,'+t.bg+'e8 0%,'+t.bg+'c0 45%,transparent 100%) !important; }\n';
      }

      c += '.mc-hero-eyebrow { color:'+t.acc+' !important; }\n';
      c += '.mc-hero-title { color:'+t.hi+' !important; }\n';
      c += '.mc-hero-body { color:'+t.mid+' !important; }\n';
      c += '.mc-metric-val { color:'+t.acc+' !important; }\n';
      c += '.mc-metric-lbl { color:'+t.lo+' !important; }\n';
      c += '.mc-hero-div { background:linear-gradient(to bottom,transparent,'+t.acc+'50,transparent) !important; }\n';

      // Marshall body text sections
      c += '.case-study div[style*="background:var(--cream)"] { background:'+t.bg3+' !important; }\n';
      c += '.case-study div[style*="background:#ede8e0"] { background:'+t.bg3+' !important; }\n';
      c += '.case-study span[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += '.case-study p[style*="color:rgba(10,10,10"] { color:'+t.mid+' !important; }\n';
      c += '.case-study div[style*="color:#8a6e3a"] { color:'+t.acc+' !important; }\n';
      c += '.case-study div[style*="border-bottom:1px solid rgba(10,10,10"] { border-bottom-color:'+borderC+' !important; }\n';
      c += '.case-study .translation-label { color:'+t.acc+' !important; }\n';
      c += '.case-study .arrow-line { background:'+t.acc+' !important; }\n';
      c += '.case-study .arrow-label,.case-study .arrow-head { color:'+t.acc+' !important; }\n';
      c += '.case-study .case-note { color:'+t.acc+' !important; }\n';

      // Bottom 4 images — rethemed
      c += '.case-study div[style*="grid-template-columns:1fr 1fr 1fr 1fr"] img { filter:'+t.img4F+' !important; }\n';
      c += '.case-study img[style*="aspect-ratio:1/1"] { filter:'+t.img4F+' !important; }\n';

      // Grunge overlay on Marshall section
      if (t.grunge) {
        c += '.case-study::before { content:"" !important; position:fixed !important; inset:0 !important; pointer-events:none !important; z-index:1000 !important; background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.12\'/%3E%3C/svg%3E") !important; opacity:0.5 !important; mix-blend-mode:multiply !important; }\n';
      }

      // Blueprint grid
      if (t.grid) {
        c += '.case-study { background-image:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(74,144,200,0.06) 39px,rgba(74,144,200,0.06) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(74,144,200,0.06) 39px,rgba(74,144,200,0.06) 40px) !important; }\n';
      }

      // Funds section
      c += '.funds { background:'+t.bg2+' !important; }\n';
      c += '.funds .label { color:'+t.acc+' !important; }\n';
      c += '.funds .section-title { color:'+t.hi+' !important; }\n';
      c += '.fund-card { background:'+(isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)')+' !important; border-color:'+borderC+' !important; }\n';
      c += '.fund-card:hover { border-color:'+t.acc+' !important; }\n';
      c += '.fund-tag { color:'+t.acc+' !important; }\n';
      c += '.fund-body h3 { color:'+t.hi+' !important; }\n';
      c += '.fund-body p,.fund-expand { color:'+t.mid+' !important; }\n';
    }

    return c;
  }

  // ── INLINE !important PATCHER ──
  // Handles elements with background:#ede8e0 !important in style attr
  var patchedEls = [];

  function patchInline(t) {
    restoreInline();
    if (!t || t.marshallOnly) return;
    var els = document.querySelectorAll('[style*="!important"]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      // Skip SWITCH section
      var p = el.parentNode;
      var skip = false;
      while (p) { if (p.id === 'featured') { skip = true; break; } p = p.parentNode; }
      if (skip) continue;
      var orig = el.getAttribute('style') || '';
      var patched = orig
        .replace(/background:#ede8e0\s*!important/g, 'background:'+t.bg2+' !important')
        .replace(/background-image:url\([^)]*\)\s*!important/g, 'background-image:none !important')
        .replace(/background-attachment:fixed\s*!important/g, 'background-attachment:scroll !important');
      if (patched !== orig) {
        patchedEls.push({ el: el, orig: orig });
        el.setAttribute('style', patched);
      }
    }
  }

  function restoreInline() {
    for (var i = 0; i < patchedEls.length; i++) {
      patchedEls[i].el.setAttribute('style', patchedEls[i].orig);
    }
    patchedEls = [];
  }

  // ── APPLY ──
  var styleEl = null;

  function applyIdentity(id) {
    var t = T[id];

    // Remove previous style block
    var old = document.getElementById('isel-override');
    if (old) old.parentNode.removeChild(old);
    styleEl = null;

    // Restore any patched inline styles
    restoreInline();

    if (t) {
      styleEl = document.createElement('style');
      styleEl.id = 'isel-override';
      styleEl.textContent = buildCSS(t);
      document.head.appendChild(styleEl);
      patchInline(t);
    }

    // Update bar buttons
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var bid = btn.getAttribute('data-id');
      var parsed = (bid === 'm1'||bid === 'm2'||bid === 'm3'||bid === 'm4'||bid === 'm5') ? bid : parseInt(bid);
      btn.className = btn.className.replace(/\bisel-active\b/g, '').trim();
      if (parsed == id) btn.className += ' isel-active';
    }

    var nameEl = document.getElementById('isel-name');
    if (nameEl) nameEl.textContent = NAMES[id] || '';

    try { localStorage.setItem('sf-identity', id); } catch(e) {}
  }

  // ── INIT ──
  function init() {
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var bid = btn.getAttribute('data-id');
          var id = (bid==='m1'||bid==='m2'||bid==='m3'||bid==='m4'||bid==='m5') ? bid : parseInt(bid);
          applyIdentity(id);
        });
      })(btns[i]);
    }

    // Restore saved
    try {
      var saved = localStorage.getItem('sf-identity');
      if (saved !== null) {
        var id = (saved==='m1'||saved==='m2'||saved==='m3'||saved==='m4'||saved==='m5') ? saved : parseInt(saved);
        if (T.hasOwnProperty(id)) { applyIdentity(id); return; }
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
