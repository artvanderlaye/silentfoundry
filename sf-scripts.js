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


(function () {

  var originalHTML = null;

  var D = {
    heroImg: 'images-1.jpeg',
    eyebrow: 'Case Study \u2014 Marshall DNA Translation',
    title: 'Rock &amp; Roll<br/>Never Dies.',
    body: "By 2010, Marshall\u2019s core market was shrinking. The brand still had strong equity, but the legacy guitar amplifier category was no longer enough.",
    translation: 'Marshall moved beyond amplifiers into headphones, speakers, and home audio. This was not merch or logo licensing. It was real product-level DNA translation into a larger category.',
    dna: [
      { k: 'Tactile', v: 'Pebbled tolex amp texture' },
      { k: 'Physical', v: 'Weighted brass knobs and metal controls' },
      { k: 'Mechanical', v: 'Toggle-click switch' },
      { k: 'Acoustic', v: 'Tuned to feel recognisably Marshall' },
      { k: 'Intangible', v: 'Original stage presence preserved' },
      { k: 'CMF', v: 'Colour, material, finish applied consistently' }
    ],
    result: 'Marshall expanded into a much larger category without losing what made the brand distinctive. Stronger relevance in China. A $1.1B acquisition in early 2025.',
    metrics: [
      { val: '1962', lbl: 'Founded' },
      { val: '60+', lbl: 'Years Heritage' },
      { val: '$4B+', lbl: 'Expanded Market' },
      { val: '$1.1B', lbl: 'Acquired 2025' }
    ],
    imgs: [
      'amp_marshall_original.jpeg',
      '614BCLPutVL-1__SL1000_.jpg',
      '71gXnSa8ogL__AC_UF1000_1000_QL80_.jpg',
      'MarshallActonIIIBluetoothSpeakers_6_jpg.webp'
    ]
  };

  var BN = "'Bebas Neue',sans-serif";
  var DS = "'DM Sans',sans-serif";

  function mets(vCls, lCls) {
    return D.metrics.map(function(m){
      return '<div><span class="'+vCls+'">'+m.val+'</span><span class="'+lCls+'">'+m.lbl+'</span></div>';
    }).join('');
  }

  function dnaRows(rowCls, kCls, vCls) {
    return D.dna.map(function(d){
      return '<div class="'+rowCls+'"><span class="'+kCls+'">'+d.k+'</span><span class="'+vCls+'">'+d.v+'</span></div>';
    }).join('');
  }

  // RIGHT SIDE IMAGE COLUMN — hero large, 2 products below, editorial cascade
  function imgCol(imgCls, gridCls, filter1, filter2) {
    filter1 = filter1 || 'brightness(.88) saturate(.9)';
    filter2 = filter2 || 'brightness(.84) saturate(.85)';
    return '<img class="'+imgCls+'" src="'+D.heroImg+'" style="width:100%;aspect-ratio:3/2;object-fit:cover;display:block;filter:'+filter1+'"/>'
      + '<div class="'+gridCls+'" style="display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-top:3px">'
      + '<img src="'+D.imgs[0]+'" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:'+filter2+'"/>'
      + '<img src="'+D.imgs[3]+'" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:'+filter2+'"/>'
      + '</div>';
  }

  var FORMATS = {
    0: { name: '00 \u2014 Original', build: null },

    // ─────────────────────────────────────────────────────────────
    // 01 — INSET BORDERED DOCUMENT
    // Outer dark bg, cream card inset with thick border, 2-col layout.
    // Header band at top. Images full height right col.
    // ─────────────────────────────────────────────────────────────
    1: { name: '01 \u2014 Inset Bordered Document', build: function() {
      var css = [
        '.csw{background:#1a1612;padding:48px}',
        '.cs-card{background:#f2ede4;border:2px solid rgba(138,110,58,.35);max-width:1200px;margin:0 auto}',
        '.cs-card-head{background:#ece7dc;border-bottom:2px solid rgba(138,110,58,.25);padding:20px 36px;display:flex;justify-content:space-between;align-items:center}',
        '.cs-cht{font-family:'+BN+';font-size:.82rem;letter-spacing:.22em;color:rgba(138,110,58,.75)}',
        '.cs-chr{font-family:'+DS+';font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(10,10,10,.3);font-weight:300}',
        '.cs-card-body{display:grid;grid-template-columns:1fr 340px}',
        '.cs-card-left{padding:40px 36px;border-right:1px solid rgba(138,110,58,.15)}',
        '.cs-card-right{padding:0;background:#e8e3da}',
        '.cs-sec{padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid rgba(138,110,58,.12)}',
        '.cs-sec:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}',
        '.cs-secnum{font-family:'+BN+';font-size:.7rem;letter-spacing:.14em;color:rgba(138,110,58,.4);margin-right:10px}',
        '.cs-seclabel{font-family:'+DS+';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(10,10,10,.35);font-weight:300;display:flex;align-items:center;margin-bottom:12px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2.2rem,3.5vw,4rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.92;margin-bottom:14px}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-p{font-family:'+DS+';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-mets{display:grid;grid-template-columns:1fr 1fr;gap:0}',
        '.cs-met{padding:12px 0;border-bottom:1px solid rgba(138,110,58,.1)}',
        '.cs-metv{font-family:'+BN+';font-size:2rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.3);display:block;margin-top:2px;font-weight:300}',
        '.cs-dna{display:grid;grid-template-columns:1fr 1fr;gap:6px 16px}',
        '.cs-dnarow{padding:6px 0;border-bottom:1px solid rgba(138,110,58,.08)}',
        '.cs-dnak{font-family:'+DS+';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-dnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.45);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-card">'
        +'<div class="cs-card-head"><span class="cs-cht">Case Study 01 \u2014 Silent Foundry</span><span class="cs-chr">Marshall Amplification \u00b7 Brand DNA Translation \u00b7 2024</span></div>'
        +'<div class="cs-card-body">'
        +'<div class="cs-card-left">'
        +'<div class="cs-sec"><span class="cs-eyebrow">'+D.eyebrow+'</span><div class="cs-headline">'+D.title+'</div><p class="cs-p">'+D.body+'</p></div>'
        +'<div class="cs-sec"><div class="cs-seclabel"><span class="cs-secnum">01</span>Key Numbers</div><div class="cs-mets">'+mets('cs-metv','cs-metl')+'</div></div>'
        +'<div class="cs-sec"><div class="cs-seclabel"><span class="cs-secnum">02</span>Translation</div><p class="cs-p">'+D.translation+'</p></div>'
        +'<div class="cs-sec"><div class="cs-seclabel"><span class="cs-secnum">03</span>Brand DNA</div><div class="cs-dna">'+dnaRows('cs-dnarow','cs-dnak','cs-dnav')+'</div></div>'
        +'<div class="cs-sec"><div class="cs-seclabel"><span class="cs-secnum">04</span>The Result</div><p class="cs-p">'+D.result+'</p></div>'
        +'</div>'
        +'<div class="cs-card-right">'+imgCol('','','brightness(.82) saturate(.88)','brightness(.78) saturate(.82)')+'</div>'
        +'</div></div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 02 — FULL BLEED CREAM, GOLD BORDER RULE LEFT
    // Full cream edge-to-edge. Thick gold left border on content col.
    // Images right: hero + 2 sq below. Content as open generous rows.
    // ─────────────────────────────────────────────────────────────
    2: { name: '02 \u2014 Gold Rule / Open Rows', build: function() {
      var css = [
        '.csw{background:#f0ebe0}',
        '.cs-topbar{padding:16px 56px;border-bottom:1px solid rgba(138,110,58,.18);display:flex;justify-content:space-between;align-items:center;background:#ece7dc}',
        '.cs-tbl{font-family:'+DS+';font-size:.5rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300}',
        '.cs-tbr{font-family:'+DS+';font-size:.5rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300}',
        '.cs-wrap{display:grid;grid-template-columns:1fr 380px;border-top:4px solid rgba(138,110,58,.3)}',
        '.cs-left{border-right:1px solid rgba(138,110,58,.15)}',
        '.cs-row{padding:36px 56px;border-bottom:1px solid rgba(138,110,58,.1);display:grid;grid-template-columns:160px 1fr;gap:32px;align-items:start}',
        '.cs-row-intro{padding:44px 56px;border-bottom:1px solid rgba(138,110,58,.12)}',
        '.cs-rlabel{font-family:'+DS+';font-size:.5rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;padding-top:3px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2.5rem,4vw,5rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.9;margin-bottom:12px}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-p{font-family:'+DS+';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-mets{display:flex;gap:36px;flex-wrap:wrap}',
        '.cs-metv{font-family:'+BN+';font-size:2.2rem;letter-spacing:.06em;color:rgba(138,110,58,.75);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.3);display:block;margin-top:2px;font-weight:300}',
        '.cs-dna{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 20px}',
        '.cs-dnak{font-family:'+DS+';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-dnav{font-family:'+DS+';font-size:.86rem;color:rgba(10,10,10,.45);font-weight:300}',
        '.cs-right{background:#ebe6dd;padding:32px 24px;display:flex;flex-direction:column;gap:0}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-topbar"><span class="cs-tbl">Silent Foundry \u2014 Case Study Collection</span><span class="cs-tbr">No. 01 \u00b7 Marshall Amplification</span></div>'
        +'<div class="cs-wrap">'
        +'<div class="cs-left">'
        +'<div class="cs-row-intro"><span class="cs-eyebrow">'+D.eyebrow+'</span><div class="cs-headline">'+D.title+'</div><p class="cs-p">'+D.body+'</p></div>'
        +'<div class="cs-row"><span class="cs-rlabel">Numbers</span><div class="cs-mets">'+mets('cs-metv','cs-metl')+'</div></div>'
        +'<div class="cs-row"><span class="cs-rlabel">Translation</span><p class="cs-p">'+D.translation+'</p></div>'
        +'<div class="cs-row"><span class="cs-rlabel">Brand DNA</span><div class="cs-dna">'+D.dna.map(function(d){return '<div><span class="cs-dnak">'+d.k+'</span><span class="cs-dnav">'+d.v+'</span></div>';}).join('')+'</div></div>'
        +'<div class="cs-row" style="border-bottom:none"><span class="cs-rlabel">The Result</span><p class="cs-p">'+D.result+'</p></div>'
        +'</div>'
        +'<div class="cs-right">'+imgCol('','','brightness(.84)','brightness(.8)')+'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 03 — DOUBLE BORDER FRAME
    // Two concentric borders (outer dark, inner gold hairline) framing
    // the whole card. Dense header strip. Content 3-col below hero.
    // Images in right col with gap and caption labels.
    // ─────────────────────────────────────────────────────────────
    3: { name: '03 \u2014 Double Border Frame', build: function() {
      var css = [
        '.csw{background:#1c1712;padding:40px}',
        '.cs-outer{border:3px solid rgba(10,10,10,.7);padding:6px;max-width:1220px;margin:0 auto}',
        '.cs-inner{border:1px solid rgba(138,110,58,.3);background:#f2ede4}',
        '.cs-head{background:#e8e3d9;border-bottom:1px solid rgba(138,110,58,.2);padding:16px 32px;display:grid;grid-template-columns:1fr auto auto;gap:24px;align-items:center}',
        '.cs-htag{font-family:'+DS+';font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300}',
        '.cs-hname{font-family:'+BN+';font-size:1.1rem;letter-spacing:.16em;color:rgba(10,10,10,.72)}',
        '.cs-hdate{font-family:'+DS+';font-size:.46rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300}',
        '.cs-hero-strip{position:relative}',
        '.cs-hero-img{width:100%;aspect-ratio:21/7;object-fit:cover;display:block;filter:brightness(.55) saturate(.7)}',
        '.cs-hero-ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:32px;gap:8px;background:linear-gradient(to right,rgba(242,237,228,.92) 0%,rgba(242,237,228,.6) 55%,transparent 100%)}',
        '.cs-hov-eye{font-family:'+DS+';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.7);font-weight:300}',
        '.cs-hov-title{font-family:'+BN+';font-size:clamp(2.8rem,5vw,6rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(10,10,10,.82);line-height:.88}',
        '.cs-hov-body{font-family:'+DS+';font-size:.88rem;line-height:1.75;color:rgba(10,10,10,.48);font-weight:300;max-width:480px}',
        '.cs-mets-row{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(138,110,58,.15);border-bottom:1px solid rgba(138,110,58,.15);background:#ece7dc}',
        '.cs-met{padding:18px 28px;border-right:1px solid rgba(138,110,58,.1)}',
        '.cs-metv{font-family:'+BN+';font-size:2.2rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.3);display:block;margin-top:2px;font-weight:300}',
        '.cs-cols{display:grid;grid-template-columns:1fr 300px}',
        '.cs-colL{padding:32px;border-right:1px solid rgba(138,110,58,.12)}',
        '.cs-colR{background:#e8e3d9;padding:20px}',
        '.cs-section{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid rgba(138,110,58,.1)}',
        '.cs-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}',
        '.cs-sl{font-family:'+DS+';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-p{font-family:'+DS+';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-dna{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px}',
        '.cs-dnak{font-family:'+DS+';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-dnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.44);font-weight:300}',
        '.cs-rimglbl{font-family:'+DS+';font-size:.4rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300;text-align:center;padding:5px 0 10px}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-outer"><div class="cs-inner">'
        +'<div class="cs-head"><span class="cs-htag">Case Study \u2014 Silent Foundry</span><span class="cs-hname">Marshall Amplification</span><span class="cs-hdate">2024</span></div>'
        +'<div class="cs-hero-strip"><img class="cs-hero-img" src="'+D.heroImg+'" alt="Marshall"/>'
        +'<div class="cs-hero-ov"><span class="cs-hov-eye">'+D.eyebrow+'</span><div class="cs-hov-title">'+D.title+'</div><p class="cs-hov-body">'+D.body+'</p></div></div>'
        +'<div class="cs-mets-row">'+D.metrics.map(function(m){return '<div class="cs-met"><span class="cs-metv">'+m.val+'</span><span class="cs-metl">'+m.lbl+'</span></div>';}).join('')+'</div>'
        +'<div class="cs-cols">'
        +'<div class="cs-colL">'
        +'<div class="cs-section"><span class="cs-sl">Translation</span><p class="cs-p">'+D.translation+'</p></div>'
        +'<div class="cs-section"><span class="cs-sl">Brand DNA</span><div class="cs-dna">'+dnaRows('','cs-dnak','cs-dnav')+'</div></div>'
        +'<div class="cs-section"><span class="cs-sl">The Result</span><p class="cs-p">'+D.result+'</p></div>'
        +'</div>'
        +'<div class="cs-colR">'
        +'<img src="'+D.imgs[0]+'" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.82)"/>'
        +'<div class="cs-rimglbl">Original Amplifier</div>'
        +'<img src="'+D.imgs[1]+'" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.8)"/>'
        +'<div class="cs-rimglbl">Headphone Series</div>'
        +'<img src="'+D.imgs[3]+'" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.8)"/>'
        +'<div class="cs-rimglbl">Acton III</div>'
        +'</div>'
        +'</div>'
        +'</div></div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 04 — CORNER STAMP / PORTFOLIO PAGE
    // Full cream, no outer border but strong internal ruled grid.
    // Large decorative CS number stamp top-right. Wide image right col
    // takes full height with hero + product below as portrait stack.
    // ─────────────────────────────────────────────────────────────
    4: { name: '04 \u2014 Corner Stamp / Portfolio', build: function() {
      var css = [
        '.csw{background:#f0ebe0;border-top:4px solid rgba(10,10,10,.75)}',
        '.cs-phead{padding:28px 52px;display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;border-bottom:1px solid rgba(138,110,58,.18)}',
        '.cs-ph-left{}',
        '.cs-ph-tag{font-family:'+DS+';font-size:.5rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;display:block;margin-bottom:6px}',
        '.cs-ph-name{font-family:'+BN+';font-size:1.6rem;letter-spacing:.14em;color:rgba(10,10,10,.75)}',
        '.cs-ph-sub{font-family:'+DS+';font-size:.48rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,10,.3);font-weight:300;margin-top:3px}',
        '.cs-ph-stamp{font-family:'+BN+';font-size:7rem;letter-spacing:.04em;color:rgba(138,110,58,.08);line-height:.9;text-align:right}',
        '.cs-body{display:grid;grid-template-columns:1fr 360px}',
        '.cs-left{padding:40px 52px;border-right:1px solid rgba(138,110,58,.14)}',
        '.cs-right{background:#e8e3d8}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2.5rem,4vw,5rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.9;margin-bottom:16px}',
        '.cs-p{font-family:'+DS+';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-divider{height:1px;background:rgba(138,110,58,.14);margin:28px 0}',
        '.cs-label{font-family:'+DS+';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-mets{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-bottom:28px}',
        '.cs-met{padding-right:16px}',
        '.cs-metv{font-family:'+BN+';font-size:2rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.4rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.28);display:block;margin-top:2px;font-weight:300}',
        '.cs-dna{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px}',
        '.cs-dnak{font-family:'+DS+';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-dnav{font-family:'+DS+';font-size:.86rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-phead">'
        +'<div class="cs-ph-left"><span class="cs-ph-tag">Silent Foundry \u2014 Case Study Collection</span><span class="cs-ph-name">Marshall Amplification</span><div class="cs-ph-sub">Brand DNA Translation \u00b7 2024</div></div>'
        +'<div class="cs-ph-stamp">01</div>'
        +'</div>'
        +'<div class="cs-body">'
        +'<div class="cs-left">'
        +'<span class="cs-eyebrow">'+D.eyebrow+'</span>'
        +'<div class="cs-headline">'+D.title+'</div>'
        +'<p class="cs-p">'+D.body+'</p>'
        +'<div class="cs-divider"></div>'
        +'<span class="cs-label">Key Numbers</span>'
        +'<div class="cs-mets">'+mets('cs-metv','cs-metl')+'</div>'
        +'<span class="cs-label">Translation</span>'
        +'<p class="cs-p" style="margin-bottom:24px">'+D.translation+'</p>'
        +'<span class="cs-label">Brand DNA</span>'
        +'<div class="cs-dna" style="margin-bottom:24px">'+D.dna.map(function(d){return '<div><span class="cs-dnak">'+d.k+'</span><span class="cs-dnav">'+d.v+'</span></div>';}).join('')+'</div>'
        +'<span class="cs-label">The Result</span>'
        +'<p class="cs-p">'+D.result+'</p>'
        +'</div>'
        +'<div class="cs-right">'+imgCol('','','brightness(.82)','brightness(.78)')+'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 05 — SPLIT HEADER FULL BLEED
    // Hero image spans full top half. Below splits left content /
    // right image col. Outer background is slightly darker cream.
    // Thin perimeter border around entire section.
    // ─────────────────────────────────────────────────────────────
    5: { name: '05 \u2014 Split Header Full Bleed', build: function() {
      var css = [
        '.csw{background:#f0ebe0;border:2px solid rgba(138,110,58,.28);margin:40px}',
        '.cs-fullhero{position:relative}',
        '.cs-fhimg{width:100%;aspect-ratio:21/8;object-fit:cover;display:block;filter:brightness(.5) saturate(.75)}',
        '.cs-fhov{position:absolute;inset:0;background:linear-gradient(to top,rgba(240,235,224,.95) 0%,rgba(240,235,224,.3) 60%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:36px 44px;gap:6px}',
        '.cs-fhstrip{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}',
        '.cs-fhtag{font-family:'+DS+';font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300}',
        '.cs-fhref{font-family:'+DS+';font-size:.46rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,10,.3);font-weight:300}',
        '.cs-fhey{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300}',
        '.cs-fht{font-family:'+BN+';font-size:clamp(3rem,6vw,7rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(10,10,10,.82);line-height:.88}',
        '.cs-mets{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(138,110,58,.2);border-bottom:1px solid rgba(138,110,58,.2);background:#e8e3d8}',
        '.cs-met{padding:18px 28px;border-right:1px solid rgba(138,110,58,.1)}',
        '.cs-metv{font-family:'+BN+';font-size:2.2rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.3);display:block;margin-top:2px;font-weight:300}',
        '.cs-lower{display:grid;grid-template-columns:1fr 360px}',
        '.cs-lL{padding:36px 44px;border-right:1px solid rgba(138,110,58,.14)}',
        '.cs-lR{background:#ebe6dd;padding:20px}',
        '.cs-section{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid rgba(138,110,58,.1)}',
        '.cs-section:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0}',
        '.cs-sl{font-family:'+DS+';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-p{font-family:'+DS+';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-introbody{font-family:'+DS+';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300;margin-bottom:24px}',
        '.cs-dna{display:grid;grid-template-columns:1fr 1fr;gap:7px 18px}',
        '.cs-dnak{font-family:'+DS+';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-dnav{font-family:'+DS+';font-size:.86rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-fullhero"><img class="cs-fhimg" src="'+D.heroImg+'" alt="Marshall"/>'
        +'<div class="cs-fhov"><div class="cs-fhstrip"><span class="cs-fhtag">Silent Foundry \u2014 Case Study 01</span><span class="cs-fhref">Marshall Amplification</span></div>'
        +'<span class="cs-fhey">'+D.eyebrow+'</span><div class="cs-fht">'+D.title+'</div></div></div>'
        +'<div class="cs-mets">'+D.metrics.map(function(m){return '<div class="cs-met"><span class="cs-metv">'+m.val+'</span><span class="cs-metl">'+m.lbl+'</span></div>';}).join('')+'</div>'
        +'<div class="cs-lower">'
        +'<div class="cs-lL">'
        +'<p class="cs-introbody">'+D.body+'</p>'
        +'<div class="cs-section"><span class="cs-sl">Translation</span><p class="cs-p">'+D.translation+'</p></div>'
        +'<div class="cs-section"><span class="cs-sl">Brand DNA</span><div class="cs-dna">'+D.dna.map(function(d){return '<div><span class="cs-dnak">'+d.k+'</span><span class="cs-dnav">'+d.v+'</span></div>';}).join('')+'</div></div>'
        +'<div class="cs-section"><span class="cs-sl">The Result</span><p class="cs-p">'+D.result+'</p></div>'
        +'</div>'
        +'<div class="cs-lR">'+imgCol('','','brightness(.82)','brightness(.78)')+'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 06 — TRIPTYCH PANELS
    // Three equal-width vertical panels. Left = identity card with
    // headline + metrics. Centre = text content. Right = image stack.
    // All separated by thin gold rules. Outer thin border.
    // ─────────────────────────────────────────────────────────────
    6: { name: '06 \u2014 Triptych Panels', build: function() {
      var css = [
        '.csw{background:#f2ede4;border:1px solid rgba(138,110,58,.3);margin:36px}',
        '.cs-thead{border-bottom:1px solid rgba(138,110,58,.2);padding:14px 28px;display:flex;justify-content:space-between;align-items:center;background:#ece7dc}',
        '.cs-thl{font-family:'+BN+';font-size:.78rem;letter-spacing:.2em;color:rgba(138,110,58,.7)}',
        '.cs-thr{font-family:'+DS+';font-size:.46rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300}',
        '.cs-triptych{display:grid;grid-template-columns:1fr 1fr 1fr;min-height:600px}',
        '.cs-tripA{padding:36px 28px;border-right:1px solid rgba(138,110,58,.18);background:#ece7dc;display:flex;flex-direction:column;justify-content:space-between}',
        '.cs-tripB{padding:36px 28px;border-right:1px solid rgba(138,110,58,.18)}',
        '.cs-tripC{background:#e5e0d6;padding:20px;display:flex;flex-direction:column;gap:0}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2rem,3vw,3.5rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.9;margin-bottom:16px}',
        '.cs-pbody{font-family:'+DS+';font-size:.88rem;line-height:1.82;color:rgba(10,10,10,.46);font-weight:300;margin-bottom:20px}',
        '.cs-mets{display:flex;flex-direction:column;gap:0}',
        '.cs-met{padding:10px 0;border-top:1px solid rgba(138,110,58,.12);display:flex;justify-content:space-between;align-items:baseline}',
        '.cs-metv{font-family:'+BN+';font-size:1.8rem;letter-spacing:.06em;color:rgba(138,110,58,.72)}',
        '.cs-metl{font-family:'+DS+';font-size:.42rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300}',
        '.cs-bl{font-family:'+DS+';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-bp{font-family:'+DS+';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.46);font-weight:300;margin-bottom:24px}',
        '.cs-dna{display:flex;flex-direction:column;gap:5px;margin-bottom:24px}',
        '.cs-dnarow{display:flex;gap:10px;align-items:baseline;padding:5px 0;border-bottom:1px solid rgba(138,110,58,.08)}',
        '.cs-dnak{font-family:'+DS+';font-size:.44rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(138,110,58,.5);font-weight:300;width:70px;flex-shrink:0}',
        '.cs-dnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-thead"><span class="cs-thl">Case Study 01 \u2014 Marshall Amplification</span><span class="cs-thr">Silent Foundry \u00b7 Brand Translation \u00b7 2024</span></div>'
        +'<div class="cs-triptych">'
        +'<div class="cs-tripA">'
        +'<div><span class="cs-eyebrow">'+D.eyebrow+'</span><div class="cs-headline">'+D.title+'</div><p class="cs-pbody">'+D.body+'</p></div>'
        +'<div class="cs-mets">'+D.metrics.map(function(m){return '<div class="cs-met"><span class="cs-metv">'+m.val+'</span><span class="cs-metl">'+m.lbl+'</span></div>';}).join('')+'</div>'
        +'</div>'
        +'<div class="cs-tripB">'
        +'<span class="cs-bl">Translation</span><p class="cs-bp">'+D.translation+'</p>'
        +'<span class="cs-bl">Brand DNA</span><div class="cs-dna">'+dnaRows('cs-dnarow','cs-dnak','cs-dnav')+'</div>'
        +'<span class="cs-bl">The Result</span><p class="cs-bp">'+D.result+'</p>'
        +'</div>'
        +'<div class="cs-tripC">'+imgCol('','','brightness(.82)','brightness(.78)')+'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 07 — LEDGER / ANNUAL REPORT
    // Very structured, ruled rows like a financial statement.
    // Left labels in narrow column. Content right. Outer ruled border.
    // Images right sidebar: hero portrait + single product below.
    // ─────────────────────────────────────────────────────────────
    7: { name: '07 \u2014 Ledger / Annual Report', build: function() {
      var css = [
        '.csw{background:#f4f0e8;border:2px solid rgba(10,10,10,.65);margin:36px}',
        '.cs-lhdr{background:#1a1612;padding:18px 36px;display:flex;justify-content:space-between;align-items:center}',
        '.cs-lhL{font-family:'+BN+';font-size:.85rem;letter-spacing:.22em;color:rgba(240,235,224,.75)}',
        '.cs-lhR{font-family:'+DS+';font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,235,224,.28);font-weight:300}',
        '.cs-lbody{display:grid;grid-template-columns:1fr 320px}',
        '.cs-lL{border-right:2px solid rgba(10,10,10,.12)}',
        '.cs-lR{background:#ece7dc}',
        '.cs-lrow{display:grid;grid-template-columns:140px 1fr;border-bottom:1px solid rgba(10,10,10,.08)}',
        '.cs-lrow-intro{padding:36px;border-bottom:2px solid rgba(10,10,10,.12)}',
        '.cs-lrlabel{font-family:'+DS+';font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;padding:20px 20px 20px 28px;border-right:1px solid rgba(10,10,10,.06);display:flex;align-items:flex-start;padding-top:22px}',
        '.cs-lrcontent{padding:20px 28px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2rem,3.5vw,4rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.9;margin-bottom:10px}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:6px}',
        '.cs-p{font-family:'+DS+';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.46);font-weight:300}',
        '.cs-mets{display:grid;grid-template-columns:1fr 1fr;gap:0}',
        '.cs-met{padding:8px 0 8px;border-bottom:1px solid rgba(10,10,10,.06)}',
        '.cs-metv{font-family:'+BN+';font-size:1.8rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.4rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.28);display:block;margin-top:2px;font-weight:300}',
        '.cs-dna{display:flex;flex-direction:column;gap:4px}',
        '.cs-dnarow{display:flex;gap:10px;padding:5px 0;border-bottom:1px solid rgba(10,10,10,.05)}',
        '.cs-dnak{font-family:'+DS+';font-size:.42rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(138,110,58,.5);font-weight:300;width:68px;flex-shrink:0}',
        '.cs-dnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-lhdr"><span class="cs-lhL">Case Study \u2014 01</span><span class="cs-lhR">Silent Foundry \u00b7 Marshall Amplification \u00b7 Brand DNA Translation</span></div>'
        +'<div class="cs-lbody">'
        +'<div class="cs-lL">'
        +'<div class="cs-lrow-intro"><span class="cs-eyebrow">'+D.eyebrow+'</span><div class="cs-headline">'+D.title+'</div><p class="cs-p">'+D.body+'</p></div>'
        +'<div class="cs-lrow"><span class="cs-lrlabel">Numbers</span><div class="cs-lrcontent"><div class="cs-mets">'+mets('cs-metv','cs-metl')+'</div></div></div>'
        +'<div class="cs-lrow"><span class="cs-lrlabel">Translation</span><div class="cs-lrcontent"><p class="cs-p">'+D.translation+'</p></div></div>'
        +'<div class="cs-lrow"><span class="cs-lrlabel">Brand DNA</span><div class="cs-lrcontent"><div class="cs-dna">'+dnaRows('cs-dnarow','cs-dnak','cs-dnav')+'</div></div></div>'
        +'<div class="cs-lrow" style="border-bottom:none"><span class="cs-lrlabel">The Result</span><div class="cs-lrcontent"><p class="cs-p">'+D.result+'</p></div></div>'
        +'</div>'
        +'<div class="cs-lR">'
        +'<img src="'+D.heroImg+'" style="width:100%;aspect-ratio:2/3;object-fit:cover;display:block;filter:brightness(.78) saturate(.85)"/>'
        +'<img src="'+D.imgs[3]+'" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.75) saturate(.8);margin-top:3px"/>'
        +'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 08 — WIDE CARD INSET / DARK SURROUND
    // Dark outer wrap. Wide cream card fully inset with generous
    // internal padding. Content flows in open two-col layout with
    // large right image taking portrait proportion.
    // ─────────────────────────────────────────────────────────────
    8: { name: '08 \u2014 Wide Card / Dark Surround', build: function() {
      var css = [
        '.csw{background:#0f0d0a;padding:56px}',
        '.cs-card{background:#f2ede4;max-width:1160px;margin:0 auto}',
        '.cs-chtop{border-bottom:3px solid rgba(10,10,10,.12);padding:22px 40px;display:flex;justify-content:space-between;align-items:center;background:#e8e3d8}',
        '.cs-chl{display:flex;flex-direction:column;gap:2px}',
        '.cs-chtag{font-family:'+DS+';font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300}',
        '.cs-chname{font-family:'+BN+';font-size:1.3rem;letter-spacing:.14em;color:rgba(10,10,10,.75)}',
        '.cs-chnum{font-family:'+BN+';font-size:5rem;letter-spacing:.04em;color:rgba(138,110,58,.09);line-height:1}',
        '.cs-cbody{display:grid;grid-template-columns:1fr 380px}',
        '.cs-cL{padding:40px;border-right:1px solid rgba(138,110,58,.14)}',
        '.cs-cR{background:#ebe6dd}',
        '.cs-intro{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(138,110,58,.12)}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2.5rem,4vw,5rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.9;margin-bottom:14px}',
        '.cs-p{font-family:'+DS+';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-mstrip{display:grid;grid-template-columns:repeat(4,1fr);margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(138,110,58,.12)}',
        '.cs-metv{font-family:'+BN+';font-size:2rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.4rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.28);display:block;margin-top:2px;font-weight:300}',
        '.cs-section{margin-bottom:22px}',
        '.cs-sl{font-family:'+DS+';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-dna{display:grid;grid-template-columns:1fr 1fr;gap:6px 16px}',
        '.cs-dnak{font-family:'+DS+';font-size:.42rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(138,110,58,.5);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-dnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-card">'
        +'<div class="cs-chtop"><div class="cs-chl"><span class="cs-chtag">Silent Foundry \u2014 Case Study</span><span class="cs-chname">Marshall Amplification</span></div><span class="cs-chnum">01</span></div>'
        +'<div class="cs-cbody">'
        +'<div class="cs-cL">'
        +'<div class="cs-intro"><span class="cs-eyebrow">'+D.eyebrow+'</span><div class="cs-headline">'+D.title+'</div><p class="cs-p">'+D.body+'</p></div>'
        +'<div class="cs-mstrip">'+mets('cs-metv','cs-metl')+'</div>'
        +'<div class="cs-section"><span class="cs-sl">Translation</span><p class="cs-p">'+D.translation+'</p></div>'
        +'<div class="cs-section"><span class="cs-sl">Brand DNA</span><div class="cs-dna">'+D.dna.map(function(d){return '<div><span class="cs-dnak">'+d.k+'</span><span class="cs-dnav">'+d.v+'</span></div>';}).join('')+'</div></div>'
        +'<div class="cs-section"><span class="cs-sl">The Result</span><p class="cs-p">'+D.result+'</p></div>'
        +'</div>'
        +'<div class="cs-cR">'+imgCol('','','brightness(.82)','brightness(.78)')+'</div>'
        +'</div></div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 09 — COVER + INSIDE PAGE
    // Top half is a "cover" with big headline and hero image side by side.
    // Bottom half is the "inside spread" with content + image col.
    // Perimeter border gives it a booklet/report feel.
    // ─────────────────────────────────────────────────────────────
    9: { name: '09 \u2014 Cover + Inside Page', build: function() {
      var css = [
        '.csw{background:#f2ede4;border:2px solid rgba(10,10,10,.6);margin:36px}',
        '.cs-cover{display:grid;grid-template-columns:1fr 1fr;min-height:400px;border-bottom:2px solid rgba(10,10,10,.1)}',
        '.cs-cover-text{background:#1a1612;padding:48px 40px;display:flex;flex-direction:column;justify-content:space-between}',
        '.cs-ctop{}',
        '.cs-ctag{font-family:'+DS+';font-size:.48rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,169,110,.5);font-weight:300;display:block;margin-bottom:16px}',
        '.cs-cbot{}',
        '.cs-cey{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,169,110,.6);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-ct{font-family:'+BN+';font-size:clamp(3rem,5vw,6rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(244,241,236,.88);line-height:.88}',
        '.cs-cbody{font-family:'+DS+';font-size:.88rem;line-height:1.8;color:rgba(244,241,236,.35);font-weight:300;margin-top:14px}',
        '.cs-cover-img{position:relative}',
        '.cs-cimg{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.72) saturate(.82)}',
        '.cs-mets-over{position:absolute;bottom:0;left:0;right:0;background:rgba(242,237,228,.92);display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(138,110,58,.2)}',
        '.cs-met{padding:14px 16px;border-right:1px solid rgba(138,110,58,.1)}',
        '.cs-metv{font-family:'+BN+';font-size:1.8rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.4rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.3);display:block;margin-top:2px;font-weight:300}',
        '.cs-inside{display:grid;grid-template-columns:1fr 340px}',
        '.cs-iL{padding:36px 40px;border-right:1px solid rgba(138,110,58,.14)}',
        '.cs-iR{background:#ebe6dd;padding:20px}',
        '.cs-isec{margin-bottom:22px;padding-bottom:22px;border-bottom:1px solid rgba(138,110,58,.1)}',
        '.cs-isec:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0}',
        '.cs-isl{font-family:'+DS+';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;display:block;margin-bottom:9px}',
        '.cs-ip{font-family:'+DS+';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-idna{display:grid;grid-template-columns:1fr 1fr;gap:6px 16px}',
        '.cs-idnak{font-family:'+DS+';font-size:.42rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(138,110,58,.5);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-idnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-cover">'
        +'<div class="cs-cover-text">'
        +'<div class="cs-ctop"><span class="cs-ctag">Silent Foundry \u2014 Case Study 01</span></div>'
        +'<div class="cs-cbot"><span class="cs-cey">'+D.eyebrow+'</span><div class="cs-ct">'+D.title+'</div><p class="cs-cbody">'+D.body+'</p></div>'
        +'</div>'
        +'<div class="cs-cover-img"><img class="cs-cimg" src="'+D.heroImg+'" alt="Marshall"/>'
        +'<div class="cs-mets-over">'+D.metrics.map(function(m){return '<div class="cs-met"><span class="cs-metv">'+m.val+'</span><span class="cs-metl">'+m.lbl+'</span></div>';}).join('')+'</div>'
        +'</div></div>'
        +'<div class="cs-inside">'
        +'<div class="cs-iL">'
        +'<div class="cs-isec"><span class="cs-isl">Translation</span><p class="cs-ip">'+D.translation+'</p></div>'
        +'<div class="cs-isec"><span class="cs-isl">Brand DNA</span><div class="cs-idna">'+D.dna.map(function(d){return '<div><span class="cs-idnak">'+d.k+'</span><span class="cs-idnav">'+d.v+'</span></div>';}).join('')+'</div></div>'
        +'<div class="cs-isec"><span class="cs-isl">The Result</span><p class="cs-ip">'+D.result+'</p></div>'
        +'</div>'
        +'<div class="cs-iR">'+imgCol('','','brightness(.82)','brightness(.78)')+'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }},

    // ─────────────────────────────────────────────────────────────
    // 10 — RULED NOTEBOOK / FIELD REPORT
    // Cream bg with faint horizontal ruled lines texture.
    // Strong outer border + header tab at top left like a report cover.
    // Content tight left-label grid rows. Images right col: hero top +
    // tall product portrait below. Very structured, research feel.
    // ─────────────────────────────────────────────────────────────
    10: { name: '10 \u2014 Field Report / Ruled', build: function() {
      var css = [
        '.csw{background:#f0ebe0;background-image:repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(138,110,58,.07) 27px,rgba(138,110,58,.07) 28px);border:2px solid rgba(10,10,10,.55);margin:36px}',
        '.cs-tab{background:#1a1612;display:inline-block;padding:10px 28px;margin-left:32px;margin-top:-2px}',
        '.cs-tab-txt{font-family:'+BN+';font-size:.75rem;letter-spacing:.2em;color:rgba(240,235,224,.6)}',
        '.cs-frhead{padding:20px 36px;border-bottom:2px solid rgba(10,10,10,.12);display:flex;justify-content:space-between;align-items:center;background:rgba(240,235,224,.85)}',
        '.cs-frhl{font-family:'+BN+';font-size:1.4rem;letter-spacing:.14em;color:rgba(10,10,10,.72)}',
        '.cs-frhr{font-family:'+DS+';font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300}',
        '.cs-frbody{display:grid;grid-template-columns:1fr 340px}',
        '.cs-frL{border-right:1px solid rgba(138,110,58,.18)}',
        '.cs-frR{background:rgba(236,231,220,.7)}',
        '.cs-frrow{display:grid;grid-template-columns:130px 1fr;border-bottom:1px solid rgba(138,110,58,.12);align-items:start}',
        '.cs-frrow-intro{padding:32px 36px;border-bottom:2px solid rgba(138,110,58,.15)}',
        '.cs-frrL{font-family:'+DS+';font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.52);font-weight:300;padding:20px 16px 20px 28px;border-right:1px solid rgba(138,110,58,.1);align-self:stretch;display:flex;align-items:flex-start;padding-top:22px}',
        '.cs-frrR{padding:18px 28px}',
        '.cs-eyebrow{font-family:'+DS+';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:7px}',
        '.cs-headline{font-family:'+BN+';font-size:clamp(2.2rem,3.5vw,4rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.9;margin-bottom:12px}',
        '.cs-p{font-family:'+DS+';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.46);font-weight:300}',
        '.cs-mets{display:grid;grid-template-columns:1fr 1fr;gap:0}',
        '.cs-met{padding:8px 0;border-bottom:1px solid rgba(138,110,58,.08)}',
        '.cs-metv{font-family:'+BN+';font-size:1.8rem;letter-spacing:.06em;color:rgba(138,110,58,.7);display:block;line-height:1}',
        '.cs-metl{font-family:'+DS+';font-size:.4rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.28);display:block;margin-top:2px;font-weight:300}',
        '.cs-dna{display:flex;flex-direction:column;gap:4px}',
        '.cs-dnarow{display:flex;gap:10px;padding:5px 0;border-bottom:1px solid rgba(138,110,58,.07)}',
        '.cs-dnak{font-family:'+DS+';font-size:.42rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(138,110,58,.5);font-weight:300;width:64px;flex-shrink:0}',
        '.cs-dnav{font-family:'+DS+';font-size:.84rem;color:rgba(10,10,10,.44);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        +'<div class="cs-tab"><span class="cs-tab-txt">Case Study \u2014 01</span></div>'
        +'<div class="cs-frhead"><span class="cs-frhl">Marshall Amplification</span><span class="cs-frhr">Silent Foundry \u00b7 Brand DNA Translation \u00b7 2024</span></div>'
        +'<div class="cs-frbody">'
        +'<div class="cs-frL">'
        +'<div class="cs-frrow-intro"><span class="cs-eyebrow">'+D.eyebrow+'</span><div class="cs-headline">'+D.title+'</div><p class="cs-p">'+D.body+'</p></div>'
        +'<div class="cs-frrow"><span class="cs-frrL">Numbers</span><div class="cs-frrR"><div class="cs-mets">'+mets('cs-metv','cs-metl')+'</div></div></div>'
        +'<div class="cs-frrow"><span class="cs-frrL">Translation</span><div class="cs-frrR"><p class="cs-p">'+D.translation+'</p></div></div>'
        +'<div class="cs-frrow"><span class="cs-frrL">Brand DNA</span><div class="cs-frrR"><div class="cs-dna">'+dnaRows('cs-dnarow','cs-dnak','cs-dnav')+'</div></div></div>'
        +'<div class="cs-frrow" style="border-bottom:none"><span class="cs-frrL">The Result</span><div class="cs-frrR"><p class="cs-p">'+D.result+'</p></div></div>'
        +'</div>'
        +'<div class="cs-frR">'
        +'<img src="'+D.heroImg+'" style="width:100%;aspect-ratio:2/3;object-fit:cover;display:block;filter:brightness(.78) saturate(.85)"/>'
        +'<img src="'+D.imgs[0]+'" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.75) saturate(.8);margin-top:3px"/>'
        +'</div>'
        +'</div></section>';
      return { css: css, html: html };
    }}
  };

  // ── ENGINE ──
  function apply(id) {
    var f = FORMATS[id];
    if (!f) return;
    var cs = document.querySelector('.case-study');
    if (!cs) return;
    if (originalHTML === null) originalHTML = cs.outerHTML;
    var old = document.getElementById('cs-style');
    if (old) old.parentNode.removeChild(old);
    if (id === 0) {
      var t = document.createElement('div');
      t.innerHTML = originalHTML;
      cs.parentNode.replaceChild(t.firstChild, cs);
    } else {
      var built = f.build();
      var t2 = document.createElement('div');
      t2.innerHTML = built.html;
      cs.parentNode.replaceChild(t2.firstChild, cs);
      var s = document.createElement('style');
      s.id = 'cs-style';
      s.textContent = built.css;
      document.head.appendChild(s);
    }
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(/\bisel-active\b/g,'').trim();
      if (parseInt(btns[i].getAttribute('data-id')) === id) btns[i].className += ' isel-active';
    }
    var n = document.getElementById('isel-name');
    if (n && FORMATS[id]) n.textContent = FORMATS[id].name;
    try { localStorage.setItem('cs-format', id); } catch(e) {}
  }

  function init() {
    var cs = document.querySelector('.case-study');
    if (cs) originalHTML = cs.outerHTML;
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn){
        btn.addEventListener('click', function(){ apply(parseInt(btn.getAttribute('data-id'))); });
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
  } else { init(); }

})();
// ══ END CASE STUDY FORMAT SWITCHER ══
