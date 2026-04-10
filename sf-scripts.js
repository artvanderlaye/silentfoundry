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
// CASE STUDY FORMAT SWITCHER v3
// Completely rebuilds .case-study section HTML for each format.
// Fonts: Bebas Neue (display) + DM Sans 300 (body) always.
// 00 = original preserved. 01-15 = full section rebuilds.
// SF site completely untouched throughout.
// ══════════════════════════════════════════════════════════════
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
      { val: '60+', lbl: 'Years of Heritage' },
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

  function metrics(cls_wrap, cls_v, cls_l) {
    return D.metrics.map(function(m) {
      return '<div class="' + cls_wrap + '"><span class="' + cls_v + '">' + m.val + '</span><span class="' + cls_l + '">' + m.lbl + '</span></div>';
    }).join('');
  }

  function imgs(cls, aspect) {
    aspect = aspect || '1/1';
    return D.imgs.map(function(s) {
      return '<img class="' + cls + '" src="' + s + '" style="aspect-ratio:' + aspect + ';"/>';
    }).join('');
  }

  function dnaGrid(cls_wrap, cls_k, cls_v) {
    return D.dna.map(function(d) {
      return '<div class="' + cls_wrap + '"><span class="' + cls_k + '">' + d.k + '</span><span class="' + cls_v + '">' + d.v + '</span></div>';
    }).join('');
  }

  var BN = "'Bebas Neue',sans-serif";
  var DS = "'DM Sans',sans-serif";

  var FORMATS = {

    0: { name: '00 \u2014 Original', build: null },

    // 01 NOIR EDITORIAL — black bg, desaturated images, gold hairlines, metrics strip
    1: { name: '01 \u2014 Noir Editorial', build: function() {
      var css = [
        '.csw{background:#080808}',
        '.cs-hero-img{width:100%;aspect-ratio:21/8;object-fit:cover;display:block;filter:brightness(0.28) grayscale(0.5)}',
        '.cs-tag{position:absolute;top:20px;right:20px;font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.75);font-weight:300;background:rgba(8,8,8,.85);border:1px solid rgba(200,169,110,.3);padding:7px 14px}',
        '.cs-hw{position:relative}',
        '.cs-mstrip{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(200,169,110,.1);border-bottom:1px solid rgba(200,169,110,.1)}',
        '.cs-ms-item{padding:28px 36px;border-right:1px solid rgba(255,255,255,.04)}',
        '.cs-ms-v{font-family:' + BN + ';font-size:3rem;letter-spacing:.06em;color:#c8a96e;display:block;line-height:1}',
        '.cs-ms-l{font-family:' + DS + ';font-size:.46rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.22);display:block;margin-top:5px;font-weight:300}',
        '.cs-panels{display:grid;grid-template-columns:1fr 1fr;gap:2px}',
        '.cs-p1{grid-column:1/-1;background:#0a0a0a;padding:48px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}',
        '.cs-pb{background:#0d0d0d;padding:44px}',
        '.cs-eyebrow{font-family:' + DS + ';font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.6);font-weight:300;display:block;margin-bottom:12px}',
        '.cs-title{font-family:' + BN + ';font-size:clamp(2.5rem,5vw,6.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(244,241,236,.88);line-height:.88}',
        '.cs-plabel{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.5);font-weight:300;display:block;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(200,169,110,.1)}',
        '.cs-ptext{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(244,241,236,.38);font-weight:300}',
        '.cs-dnagrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
        '.cs-dna-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,169,110,.4);font-weight:300;display:block;margin-bottom:3px}',
        '.cs-dna-v{font-family:' + DS + ';font-size:.82rem;color:rgba(244,241,236,.32);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:grayscale(1) brightness(.65) contrast(1.1)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-hw"><img class="cs-hero-img" src="' + D.heroImg + '" alt="Marshall"/><div class="cs-tag">Case Study \u2014 01 / Silent Foundry</div></div>'
        + '<div class="cs-mstrip">' + metrics('cs-ms-item','cs-ms-v','cs-ms-l') + '</div>'
        + '<div class="cs-panels">'
        + '<div class="cs-p1"><div><span class="cs-eyebrow">' + D.eyebrow + '</span><div class="cs-title">' + D.title + '</div></div><p class="cs-ptext">' + D.body + '</p></div>'
        + '<div class="cs-pb"><span class="cs-plabel">Translation</span><p class="cs-ptext">' + D.translation + '</p></div>'
        + '<div class="cs-pb"><span class="cs-plabel">Brand DNA</span><div class="cs-dnagrid">' + dnaGrid('','cs-dna-k','cs-dna-v') + '</div></div>'
        + '<div class="cs-pb" style="background:#101010"><span class="cs-plabel">The Result</span><p class="cs-ptext">' + D.result + '</p></div>'
        + '</div>'
        + '<div class="cs-imgrow">' + imgs('', '4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 02 MAGAZINE SPREAD — warm off-white, dark text, editorial
    2: { name: '02 \u2014 Magazine Spread', build: function() {
      var css = [
        '.csw{background:#f2ede4}',
        '.cs-mhead{padding:18px 48px;border-bottom:2px solid rgba(10,10,10,.12);display:flex;justify-content:space-between;align-items:center;background:#ece7dc}',
        '.cs-mh-l{font-family:' + BN + ';font-size:.82rem;letter-spacing:.22em;color:rgba(138,110,58,.75)}',
        '.cs-mh-r{font-family:' + DS + ';font-size:.5rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,10,10,.3);font-weight:300}',
        '.cs-spread{display:grid;grid-template-columns:1fr 1fr}',
        '.cs-simg{width:100%;height:100%;min-height:480px;object-fit:cover;display:block;filter:brightness(.88)}',
        '.cs-sintro{background:#f5f0e5;padding:56px 48px;display:flex;flex-direction:column;justify-content:center;gap:18px;border-left:4px solid rgba(138,110,58,.25)}',
        '.cs-eyebrow{font-family:' + DS + ';font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.7);font-weight:300}',
        '.cs-title{font-family:' + BN + ';font-size:clamp(2.5rem,4.5vw,5.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(10,10,10,.82);line-height:.9}',
        '.cs-ptext-l{font-family:' + DS + ';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-smets{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:6px}',
        '.cs-smet{border-top:1px solid rgba(138,110,58,.2);padding-top:10px}',
        '.cs-smet-v{font-family:' + BN + ';font-size:2rem;letter-spacing:.06em;color:rgba(138,110,58,.75);display:block;line-height:1}',
        '.cs-smet-l{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.3);display:block;margin-top:3px;font-weight:300}',
        '.cs-bsec{padding:44px 48px;border-top:1px solid rgba(10,10,10,.08)}',
        '.cs-bsec:nth-child(odd){background:#ede8df}',
        '.cs-blabel{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300;display:block;margin-bottom:14px}',
        '.cs-dna3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px 28px}',
        '.cs-dna3-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:3px}',
        '.cs-dna3-v{font-family:' + DS + ';font-size:.88rem;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.88) saturate(.9)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-mhead"><span class="cs-mh-l">Case Study \u2014 01 / Brand DNA Translation</span><span class="cs-mh-r">Silent Foundry \u00b7 2024</span></div>'
        + '<div class="cs-spread"><img class="cs-simg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-sintro"><span class="cs-eyebrow">' + D.eyebrow + '</span><div class="cs-title">' + D.title + '</div><p class="cs-ptext-l">' + D.body + '</p>'
        + '<div class="cs-smets">' + D.metrics.map(function(m){return '<div class="cs-smet"><span class="cs-smet-v">'+m.val+'</span><span class="cs-smet-l">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '</div></div>'
        + '<div class="cs-bsec"><span class="cs-blabel">Translation</span><p class="cs-ptext-l">' + D.translation + '</p></div>'
        + '<div class="cs-bsec"><span class="cs-blabel">Brand DNA</span><div class="cs-dna3">' + D.dna.map(function(d){return '<div><span class="cs-dna3-k">'+d.k+'</span><span class="cs-dna3-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-bsec"><span class="cs-blabel">The Result</span><p class="cs-ptext-l">' + D.result + '</p></div>'
        + '<div class="cs-imgrow">' + imgs('','4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 03 DOSSIER — off-white, numbered sections, sidebar images + stats
    3: { name: '03 \u2014 Dossier / Investment Memo', build: function() {
      var css = [
        '.csw{background:#f4f2ee}',
        '.cs-dtop{display:grid;grid-template-columns:1fr auto;gap:32px;padding:36px 48px;border-bottom:2px solid rgba(10,10,10,.12);background:#ece8e0}',
        '.cs-dmeta{display:flex;flex-direction:column;gap:5px}',
        '.cs-dfrom{font-family:' + DS + ';font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(10,10,10,.35);font-weight:300}',
        '.cs-dname{font-family:' + BN + ';font-size:1.6rem;letter-spacing:.14em;color:rgba(10,10,10,.78)}',
        '.cs-dref{font-family:' + DS + ';font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300;margin-top:3px}',
        '.cs-dstamp{display:flex;flex-direction:column;align-items:flex-end}',
        '.cs-dstamp-lbl{font-family:' + DS + ';font-size:.46rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(10,10,10,.25);font-weight:300}',
        '.cs-dstamp-num{font-family:' + BN + ';font-size:5rem;letter-spacing:.06em;color:rgba(138,110,58,.1);line-height:1}',
        '.cs-dbody{display:grid;grid-template-columns:1fr 260px}',
        '.cs-dmain{padding:36px 48px;border-right:1px solid rgba(10,10,10,.08)}',
        '.cs-dsec{margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid rgba(10,10,10,.07)}',
        '.cs-dsec:last-child{border-bottom:none;margin-bottom:0}',
        '.cs-dslabel{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(10,10,10,.35);font-weight:300;margin-bottom:12px;display:flex;align-items:center;gap:8px}',
        '.cs-dnum{font-family:' + BN + ';font-size:.72rem;letter-spacing:.12em;color:rgba(138,110,58,.5)}',
        '.cs-dh{font-family:' + BN + ';font-size:clamp(2rem,3.5vw,4rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(10,10,10,.78);line-height:.92;margin-bottom:16px}',
        '.cs-dp{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-dtable{width:100%;border-collapse:collapse;margin-top:6px}',
        '.cs-dtable td{padding:8px 0;border-bottom:1px solid rgba(10,10,10,.06);font-family:' + DS + ';font-weight:300;vertical-align:top}',
        '.cs-dtable td:first-child{font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(138,110,58,.6);width:100px;padding-right:14px}',
        '.cs-dtable td:last-child{font-size:.86rem;color:rgba(10,10,10,.45)}',
        '.cs-dside{padding:28px 24px;background:#ece8e0;display:flex;flex-direction:column;gap:2px}',
        '.cs-dsimg-main{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.86);margin-bottom:2px}',
        '.cs-dsgrid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:20px}',
        '.cs-dsgrid img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:brightness(.82)}',
        '.cs-dsstats{display:flex;flex-direction:column}',
        '.cs-dsstat{padding:12px 0;border-bottom:1px solid rgba(10,10,10,.07);display:flex;justify-content:space-between;align-items:baseline}',
        '.cs-dsv{font-family:' + BN + ';font-size:1.8rem;letter-spacing:.06em;color:rgba(138,110,58,.7)}',
        '.cs-dsl{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.3);font-weight:300}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-dtop"><div class="cs-dmeta"><span class="cs-dfrom">Silent Foundry \u2014 Brand Translation Division</span><span class="cs-dname">Marshall Amplification</span><span class="cs-dref">Reference CS-001 \u00b7 Brand DNA Translation \u00b7 2024</span></div><div class="cs-dstamp"><span class="cs-dstamp-lbl">Case Study</span><span class="cs-dstamp-num">01</span></div></div>'
        + '<div class="cs-dbody"><div class="cs-dmain">'
        + '<div class="cs-dsec"><div class="cs-dslabel"><span class="cs-dnum">01</span>Overview</div><div class="cs-dh">' + D.title + '</div><p class="cs-dp">' + D.body + '</p></div>'
        + '<div class="cs-dsec"><div class="cs-dslabel"><span class="cs-dnum">02</span>Translation</div><p class="cs-dp">' + D.translation + '</p></div>'
        + '<div class="cs-dsec"><div class="cs-dslabel"><span class="cs-dnum">03</span>Brand DNA Analysis</div><table class="cs-dtable">' + D.dna.map(function(d){return '<tr><td>'+d.k+'</td><td>'+d.v+'</td></tr>';}).join('') + '</table></div>'
        + '<div class="cs-dsec"><div class="cs-dslabel"><span class="cs-dnum">04</span>The Result</div><p class="cs-dp">' + D.result + '</p></div>'
        + '</div><div class="cs-dside">'
        + '<img class="cs-dsimg-main" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-dsgrid">' + D.imgs.map(function(s){return '<img src="'+s+'"/>';}).join('') + '</div>'
        + '<div class="cs-dsstats">' + D.metrics.map(function(m){return '<div class="cs-dsstat"><span class="cs-dsv">'+m.val+'</span><span class="cs-dsl">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '</div></div></section>';
      return { css: css, html: html };
    }},

    // 04 TIMELINE — dark bg, vertical timeline left, images sidebar right
    4: { name: '04 \u2014 Timeline / Chapter', build: function() {
      var css = [
        '.csw{background:#0a0a0a}',
        '.cs-tlhdr{padding:48px;border-bottom:1px solid rgba(200,169,110,.1);display:grid;grid-template-columns:1fr auto;gap:32px;align-items:end}',
        '.cs-tltag{font-family:' + DS + ';font-size:.5rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;display:block;margin-bottom:14px}',
        '.cs-tlh{font-family:' + BN + ';font-size:clamp(3rem,6vw,8rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(244,241,236,.85);line-height:.88}',
        '.cs-tlnums{display:flex;flex-direction:column;align-items:flex-end;gap:0}',
        '.cs-tlnv{font-family:' + BN + ';font-size:2.2rem;letter-spacing:.06em;color:rgba(200,169,110,.65);line-height:1}',
        '.cs-tlnl{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(244,241,236,.2);font-weight:300;text-align:right;margin-bottom:6px}',
        '.cs-tlbody{display:grid;grid-template-columns:1fr 280px}',
        '.cs-tlmain{padding:0 48px;border-right:1px solid rgba(200,169,110,.08)}',
        '.cs-tlnode{display:grid;grid-template-columns:28px 1fr;gap:20px;padding:36px 0;border-bottom:1px solid rgba(255,255,255,.03)}',
        '.cs-tlnode:last-child{border-bottom:none}',
        '.cs-tldot-col{display:flex;flex-direction:column;align-items:center;padding-top:3px}',
        '.cs-tldot{width:7px;height:7px;border-radius:50%;background:rgba(200,169,110,.55);flex-shrink:0}',
        '.cs-tlline{flex:1;width:1px;background:rgba(200,169,110,.12);margin-top:7px}',
        '.cs-tln-lbl{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;display:block;margin-bottom:8px}',
        '.cs-tln-text{font-family:' + DS + ';font-size:.9rem;line-height:1.8;color:rgba(244,241,236,.38);font-weight:300}',
        '.cs-tldna{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}',
        '.cs-tldna-k{font-family:' + DS + ';font-size:.42rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,169,110,.38);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-tldna-v{font-family:' + DS + ';font-size:.82rem;color:rgba(244,241,236,.32);font-weight:300}',
        '.cs-tlside{padding:28px;display:flex;flex-direction:column;gap:2px}',
        '.cs-tlsimg{width:100%;object-fit:cover;display:block;filter:brightness(.6) grayscale(.15)}',
        '.cs-tlsgrid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:2px}',
        '.cs-tlsgrid img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:brightness(.55) grayscale(.15)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-tlhdr"><div><span class="cs-tltag">Case Study 01 \u2014 Silent Foundry</span><div class="cs-tlh">' + D.title + '</div></div>'
        + '<div class="cs-tlnums">' + D.metrics.map(function(m){return '<div><span class="cs-tlnv">'+m.val+'</span><span class="cs-tlnl">'+m.lbl+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-tlbody"><div class="cs-tlmain">'
        + '<div class="cs-tlnode"><div class="cs-tldot-col"><div class="cs-tldot"></div><div class="cs-tlline"></div></div><div><span class="cs-tln-lbl">Overview</span><p class="cs-tln-text">' + D.body + '</p></div></div>'
        + '<div class="cs-tlnode"><div class="cs-tldot-col"><div class="cs-tldot"></div><div class="cs-tlline"></div></div><div><span class="cs-tln-lbl">Translation</span><p class="cs-tln-text">' + D.translation + '</p></div></div>'
        + '<div class="cs-tlnode"><div class="cs-tldot-col"><div class="cs-tldot"></div><div class="cs-tlline"></div></div><div><span class="cs-tln-lbl">Brand DNA</span><div class="cs-tldna">' + D.dna.map(function(d){return '<div><span class="cs-tldna-k">'+d.k+'</span><span class="cs-tldna-v">'+d.v+'</span></div>';}).join('') + '</div></div></div>'
        + '<div class="cs-tlnode"><div class="cs-tldot-col"><div class="cs-tldot"></div></div><div><span class="cs-tln-lbl">The Result</span><p class="cs-tln-text">' + D.result + '</p></div></div>'
        + '</div><div class="cs-tlside"><img class="cs-tlsimg" src="' + D.heroImg + '" style="aspect-ratio:3/2" alt="Marshall"/>'
        + '<div class="cs-tlsgrid">' + D.imgs.map(function(s){return '<img src="'+s+'"/>';}).join('') + '</div>'
        + '</div></div></section>';
      return { css: css, html: html };
    }},

    // 05 FULL BLEED GRID — dark bg, O7-style left label column rows
    5: { name: '05 \u2014 Full Bleed Grid', build: function() {
      var css = [
        '.csw{background:#090909}',
        '.cs-fbhero{position:relative}',
        '.cs-fbhimg{width:100%;aspect-ratio:16/7;object-fit:cover;display:block;filter:brightness(.3)}',
        '.cs-fbov{position:absolute;inset:0;display:grid;grid-template-columns:200px 1fr;padding:48px;align-items:end;gap:40px}',
        '.cs-fblabel{font-family:' + DS + ';font-size:.5rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;align-self:end;padding-bottom:6px}',
        '.cs-fbey{font-family:' + DS + ';font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.6);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-fbt{font-family:' + BN + ';font-size:clamp(3rem,6vw,7.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(244,241,236,.88);line-height:.88}',
        '.cs-fbrow{display:grid;grid-template-columns:200px 1fr;gap:40px;padding:44px 48px;border-top:1px solid rgba(255,255,255,.04);align-items:start}',
        '.cs-fbrow:nth-child(even){background:#0e0e0e}',
        '.cs-fbrl{font-family:' + DS + ';font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;padding-top:3px}',
        '.cs-fbp{font-family:' + DS + ';font-size:.92rem;line-height:1.85;color:rgba(244,241,236,.38);font-weight:300}',
        '.cs-fbmets{display:flex;gap:44px;flex-wrap:wrap}',
        '.cs-fbmv{font-family:' + BN + ';font-size:2.8rem;letter-spacing:.06em;color:#c8a96e;display:block;line-height:1}',
        '.cs-fbml{font-family:' + DS + ';font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,241,236,.22);display:block;margin-top:4px;font-weight:300}',
        '.cs-fbdna{display:grid;grid-template-columns:repeat(3,1fr);gap:0}',
        '.cs-fbdna-item{padding:12px 0;border-bottom:1px solid rgba(255,255,255,.03);padding-right:20px}',
        '.cs-fbdna-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,169,110,.4);font-weight:300;margin-bottom:5px}',
        '.cs-fbdna-v{font-family:' + DS + ';font-size:.84rem;color:rgba(244,241,236,.34);font-weight:300;line-height:1.4}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.65)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-fbhero"><img class="cs-fbhimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-fbov"><span class="cs-fblabel">Case Study 01\nSilent Foundry</span><div><span class="cs-fbey">' + D.eyebrow + '</span><div class="cs-fbt">' + D.title + '</div></div></div></div>'
        + '<div class="cs-fbrow"><span class="cs-fbrl">Overview</span><p class="cs-fbp">' + D.body + '</p></div>'
        + '<div class="cs-fbrow"><span class="cs-fbrl">Numbers</span><div class="cs-fbmets">' + D.metrics.map(function(m){return '<div><span class="cs-fbmv">'+m.val+'</span><span class="cs-fbml">'+m.lbl+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-fbrow"><span class="cs-fbrl">Translation</span><p class="cs-fbp">' + D.translation + '</p></div>'
        + '<div class="cs-fbrow"><span class="cs-fbrl">Brand DNA</span><div class="cs-fbdna">' + D.dna.map(function(d){return '<div class="cs-fbdna-item"><div class="cs-fbdna-k">'+d.k+'</div><div class="cs-fbdna-v">'+d.v+'</div></div>';}).join('') + '</div></div>'
        + '<div class="cs-fbrow"><span class="cs-fbrl">The Result</span><p class="cs-fbp">' + D.result + '</p></div>'
        + '<div class="cs-imgrow">' + imgs('','4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 06 BLUEPRINT — deep navy bg, grid texture, cold image filter, technical
    6: { name: '06 \u2014 Blueprint / Technical', build: function() {
      var css = [
        '.csw{background:#070f1c;background-image:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(74,140,200,.06) 39px,rgba(74,140,200,.06) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(74,140,200,.06) 39px,rgba(74,140,200,.06) 40px)}',
        '.cs-bptag{padding:12px 48px;border-bottom:1px solid rgba(74,144,200,.1);font-family:' + DS + ';font-size:.46rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(74,144,200,.45);font-weight:300}',
        '.cs-bptop{display:grid;grid-template-columns:1fr 1fr}',
        '.cs-bpimg{width:100%;height:100%;min-height:400px;object-fit:cover;display:block;filter:brightness(.5) saturate(.2) hue-rotate(200deg)}',
        '.cs-bpintro{padding:48px;display:flex;flex-direction:column;justify-content:center;gap:14px}',
        '.cs-bpey{font-family:' + DS + ';font-size:.5rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(74,144,200,.65);font-weight:300}',
        '.cs-bpt{font-family:' + BN + ';font-size:clamp(2.5rem,4.5vw,5.5rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(200,225,248,.85);line-height:.9}',
        '.cs-bpp{font-family:' + DS + ';font-size:.88rem;line-height:1.8;color:rgba(200,225,248,.38);font-weight:300}',
        '.cs-bptable{width:100%;border-collapse:collapse;margin-top:8px}',
        '.cs-bptable th{font-family:' + DS + ';font-size:.44rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(74,144,200,.5);text-align:left;padding:6px 0;border-bottom:1px solid rgba(74,144,200,.12);font-weight:300}',
        '.cs-bptable td{font-family:' + DS + ';font-size:.84rem;color:rgba(200,225,248,.38);padding:8px 0;border-bottom:1px solid rgba(74,144,200,.08);font-weight:300;vertical-align:top}',
        '.cs-bptable td:first-child{font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(74,144,200,.5);width:110px;padding-right:12px}',
        '.cs-bpsecs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;border-top:1px solid rgba(74,144,200,.08)}',
        '.cs-bpsec{padding:32px 28px;background:rgba(7,15,28,.8)}',
        '.cs-bpsl{font-family:' + DS + ';font-size:.46rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(74,144,200,.55);font-weight:300;display:block;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(74,144,200,.1)}',
        '.cs-bpst{font-family:' + DS + ';font-size:.86rem;line-height:1.78;color:rgba(200,225,248,.35);font-weight:300}',
        '.cs-bpmets{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(74,144,200,.1)}',
        '.cs-bpmet{padding:22px 28px;border-right:1px solid rgba(74,144,200,.07)}',
        '.cs-bpmv{font-family:' + BN + ';font-size:2.2rem;letter-spacing:.06em;color:rgba(74,144,200,.7);display:block;line-height:1}',
        '.cs-bpml{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,225,248,.22);display:block;margin-top:3px;font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.45) saturate(.15) hue-rotate(200deg)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-bptag">Silent Foundry \u2014 Case Study 01 / Marshall Amplification / Brand DNA Translation</div>'
        + '<div class="cs-bptop"><img class="cs-bpimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-bpintro"><span class="cs-bpey">' + D.eyebrow + '</span><div class="cs-bpt">' + D.title + '</div><p class="cs-bpp">' + D.body + '</p>'
        + '<table class="cs-bptable"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>' + D.metrics.map(function(m){return '<tr><td>'+m.lbl+'</td><td>'+m.val+'</td></tr>';}).join('') + '</tbody></table>'
        + '</div></div>'
        + '<div class="cs-bpsecs"><div class="cs-bpsec"><span class="cs-bpsl">Translation</span><p class="cs-bpst">' + D.translation + '</p></div>'
        + '<div class="cs-bpsec"><span class="cs-bpsl">Brand DNA</span>' + D.dna.map(function(d){return '<div style="margin-bottom:8px"><div style="font-family:'+DS+';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(74,144,200,.45);font-weight:300;margin-bottom:2px">'+d.k+'</div><div style="font-family:'+DS+';font-size:.82rem;color:rgba(200,225,248,.32);font-weight:300">'+d.v+'</div></div>';}).join('') + '</div>'
        + '<div class="cs-bpsec"><span class="cs-bpsl">The Result</span><p class="cs-bpst">' + D.result + '</p></div></div>'
        + '<div class="cs-bpmets">' + D.metrics.map(function(m){return '<div class="cs-bpmet"><span class="cs-bpmv">'+m.val+'</span><span class="cs-bpml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-imgrow">' + imgs('','4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 07 MUSEUM EXHIBIT — very dark, generous padding, exhibit labels, framed images
    7: { name: '07 \u2014 Museum Exhibit', build: function() {
      var css = [
        '.csw{background:#0c0c0c}',
        '.cs-mxtag{padding:12px 56px;border-bottom:1px solid rgba(200,169,110,.12);display:flex;justify-content:space-between;align-items:center}',
        '.cs-mxtl{font-family:' + DS + ';font-size:.48rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,169,110,.4);font-weight:300}',
        '.cs-mxtr{font-family:' + DS + ';font-size:.48rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,241,236,.18);font-weight:300}',
        '.cs-mxhero{padding:56px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}',
        '.cs-mximg{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;filter:brightness(.7);outline:1px solid rgba(200,169,110,.12);outline-offset:-1px}',
        '.cs-mxblock{display:flex;flex-direction:column;gap:18px}',
        '.cs-mxnum{font-family:' + BN + ';font-size:7rem;letter-spacing:.06em;color:rgba(200,169,110,.07);line-height:1}',
        '.cs-mxey{font-family:' + DS + ';font-size:.52rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,169,110,.5);font-weight:300}',
        '.cs-mxt{font-family:' + BN + ';font-size:clamp(2.5rem,4.5vw,5.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(244,241,236,.85);line-height:.9}',
        '.cs-mxb{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(244,241,236,.35);font-weight:300}',
        '.cs-mxpanels{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;border-top:1px solid rgba(200,169,110,.08)}',
        '.cs-mxp{padding:36px 32px;background:#101010}',
        '.cs-mxpl{font-family:' + DS + ';font-size:.48rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,169,110,.42);font-weight:300;display:block;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(200,169,110,.08)}',
        '.cs-mxpt{font-family:' + DS + ';font-size:.88rem;line-height:1.8;color:rgba(244,241,236,.35);font-weight:300}',
        '.cs-mxdna{display:flex;flex-direction:column;gap:7px}',
        '.cs-mxdna-row{display:flex;justify-content:space-between;padding-bottom:7px;border-bottom:1px solid rgba(255,255,255,.03)}',
        '.cs-mxdna-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,169,110,.38);font-weight:300}',
        '.cs-mxdna-v{font-family:' + DS + ';font-size:.8rem;color:rgba(244,241,236,.32);font-weight:300;text-align:right;max-width:55%}',
        '.cs-mxmets{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(200,169,110,.08)}',
        '.cs-mxmet{padding:24px 32px;border-right:1px solid rgba(200,169,110,.06)}',
        '.cs-mxmv{font-family:' + BN + ';font-size:2.2rem;letter-spacing:.06em;color:rgba(200,169,110,.6);display:block;line-height:1}',
        '.cs-mxml{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(244,241,236,.2);display:block;margin-top:4px;font-weight:300}',
        '.cs-mximgs{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:44px 56px}',
        '.cs-mximgs img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:brightness(.72);outline:1px solid rgba(200,169,110,.1);outline-offset:-1px}',
        '.cs-mximglbl{font-family:' + DS + ';font-size:.44rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,241,236,.18);font-weight:300;margin-top:7px;text-align:center}'
      ].join('\n');
      var labels = ['Original Amplifier','Headphone Series','Home Audio','Acton III'];
      var html = '<section class="case-study csw">'
        + '<div class="cs-mxtag"><span class="cs-mxtl">Silent Foundry \u2014 Case Study Collection</span><span class="cs-mxtr">Exhibit 01 of 03 \u2014 Marshall Amplification</span></div>'
        + '<div class="cs-mxhero"><img class="cs-mximg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-mxblock"><div class="cs-mxnum">01</div><span class="cs-mxey">' + D.eyebrow + '</span><div class="cs-mxt">' + D.title + '</div><p class="cs-mxb">' + D.body + '</p></div></div>'
        + '<div class="cs-mxpanels"><div class="cs-mxp"><span class="cs-mxpl">Translation</span><p class="cs-mxpt">' + D.translation + '</p></div>'
        + '<div class="cs-mxp"><span class="cs-mxpl">Brand DNA</span><div class="cs-mxdna">' + D.dna.map(function(d){return '<div class="cs-mxdna-row"><span class="cs-mxdna-k">'+d.k+'</span><span class="cs-mxdna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-mxp"><span class="cs-mxpl">The Result</span><p class="cs-mxpt">' + D.result + '</p></div></div>'
        + '<div class="cs-mxmets">' + D.metrics.map(function(m){return '<div class="cs-mxmet"><span class="cs-mxmv">'+m.val+'</span><span class="cs-mxml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-mximgs">' + D.imgs.map(function(s,i){return '<div><img src="'+s+'"/><div class="cs-mximglbl">'+(labels[i]||'')+'</div></div>';}).join('') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 08 HERITAGE ARCHIVE — warm sepia bg, amber tones, sepia images
    8: { name: '08 \u2014 Heritage Archive', build: function() {
      var css = [
        '.csw{background:#1a1008}',
        '.cs-hrbanner{background:#120c04;border-bottom:2px solid rgba(180,140,60,.18);padding:18px 48px;display:flex;justify-content:space-between;align-items:center}',
        '.cs-hrbl{font-family:' + BN + ';font-size:.82rem;letter-spacing:.22em;color:rgba(200,160,80,.65)}',
        '.cs-hrbr{font-family:' + DS + ';font-size:.48rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,220,180,.25);font-weight:300}',
        '.cs-hrhero{position:relative}',
        '.cs-hrimg{width:100%;aspect-ratio:16/6;object-fit:cover;display:block;filter:brightness(.58) sepia(.85) contrast(1.1)}',
        '.cs-hrov{position:absolute;inset:0;background:linear-gradient(to right,rgba(18,10,2,.92) 0%,rgba(18,10,2,.55) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:44px;gap:10px}',
        '.cs-hrey{font-family:' + DS + ';font-size:.5rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,160,80,.6);font-weight:300}',
        '.cs-hrt{font-family:' + BN + ';font-size:clamp(2.8rem,5.5vw,7rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(240,220,180,.88);line-height:.88}',
        '.cs-hrb{font-family:' + DS + ';font-size:.88rem;line-height:1.75;color:rgba(240,220,180,.38);font-weight:300;max-width:460px}',
        '.cs-hrmets{display:grid;grid-template-columns:repeat(4,1fr);background:#140e06;border-bottom:1px solid rgba(180,140,60,.1)}',
        '.cs-hrmet{padding:24px 32px;border-right:1px solid rgba(180,140,60,.08)}',
        '.cs-hrmv{font-family:' + BN + ';font-size:2.5rem;letter-spacing:.06em;color:rgba(200,160,80,.65);display:block;line-height:1}',
        '.cs-hrml{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,220,180,.25);display:block;margin-top:4px;font-weight:300}',
        '.cs-hrcontent{display:grid;grid-template-columns:1fr 1fr;gap:2px}',
        '.cs-hrp{padding:44px;background:#1a1008}',
        '.cs-hrp:nth-child(even){background:#160d06}',
        '.cs-hrfull{grid-column:1/-1}',
        '.cs-hrpl{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,160,80,.5);font-weight:300;display:block;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid rgba(180,140,60,.14)}',
        '.cs-hrpt{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(240,220,180,.35);font-weight:300}',
        '.cs-hrdna{display:grid;grid-template-columns:1fr 1fr;gap:10px 20px}',
        '.cs-hrdna-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,160,80,.45);font-weight:300;display:block;margin-bottom:3px}',
        '.cs-hrdna-v{font-family:' + DS + ';font-size:.84rem;color:rgba(240,220,180,.32);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.62) sepia(.8) contrast(1.1)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-hrbanner"><span class="cs-hrbl">Silent Foundry \u2014 Case Study Archive</span><span class="cs-hrbr">No. 01 \u2014 Marshall Amplification \u2014 Brand Translation</span></div>'
        + '<div class="cs-hrhero"><img class="cs-hrimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-hrov"><span class="cs-hrey">' + D.eyebrow + '</span><div class="cs-hrt">' + D.title + '</div><p class="cs-hrb">' + D.body + '</p></div></div>'
        + '<div class="cs-hrmets">' + D.metrics.map(function(m){return '<div class="cs-hrmet"><span class="cs-hrmv">'+m.val+'</span><span class="cs-hrml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-hrcontent">'
        + '<div class="cs-hrp"><span class="cs-hrpl">Translation</span><p class="cs-hrpt">' + D.translation + '</p></div>'
        + '<div class="cs-hrp"><span class="cs-hrpl">The Result</span><p class="cs-hrpt">' + D.result + '</p></div>'
        + '<div class="cs-hrp cs-hrfull"><span class="cs-hrpl">Brand DNA</span><div class="cs-hrdna">' + D.dna.map(function(d){return '<div><span class="cs-hrdna-k">'+d.k+'</span><span class="cs-hrdna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '</div>'
        + '<div class="cs-imgrow">' + imgs('','1/1') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 09 STARK WHITE — pure white, greyscale images, left nav, clinical
    9: { name: '09 \u2014 Stark White / Clinical', build: function() {
      var css = [
        '.csw{background:#fff}',
        '.cs-whhdr{padding:28px 56px;border-bottom:2px solid #000;display:flex;justify-content:space-between;align-items:center}',
        '.cs-whhl{display:flex;flex-direction:column;gap:3px}',
        '.cs-whtag{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(0,0,0,.35);font-weight:300}',
        '.cs-whn{font-family:' + BN + ';font-size:1.4rem;letter-spacing:.14em;color:rgba(0,0,0,.78)}',
        '.cs-whr{font-family:' + DS + ';font-size:.48rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(0,0,0,.25);font-weight:300;text-align:right}',
        '.cs-whhero{display:grid;grid-template-columns:1fr 1fr}',
        '.cs-whimg{width:100%;height:100%;min-height:420px;object-fit:cover;display:block;filter:grayscale(1) contrast(1.2) brightness(.84)}',
        '.cs-whintro{padding:52px;display:flex;flex-direction:column;justify-content:center;gap:18px;background:#f6f6f6;border-left:4px solid #000}',
        '.cs-whey{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(0,0,0,.38);font-weight:300}',
        '.cs-wht{font-family:' + BN + ';font-size:clamp(2.5rem,4.5vw,5.5rem);letter-spacing:.06em;text-transform:uppercase;color:#000;line-height:.9}',
        '.cs-whb{font-family:' + DS + ';font-size:.92rem;line-height:1.85;color:rgba(0,0,0,.48);font-weight:300}',
        '.cs-whmets{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1)}',
        '.cs-whmet{padding:22px 32px;border-right:1px solid rgba(0,0,0,.08)}',
        '.cs-whmv{font-family:' + BN + ';font-size:2.2rem;letter-spacing:.06em;color:rgba(0,0,0,.72);display:block;line-height:1}',
        '.cs-whml{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(0,0,0,.28);display:block;margin-top:3px;font-weight:300}',
        '.cs-whsecs{display:grid;grid-template-columns:180px 1fr}',
        '.cs-whnav{padding:36px 24px;border-right:1px solid rgba(0,0,0,.08);background:#f2f2f2;display:flex;flex-direction:column;gap:3px}',
        '.cs-whnav-item{font-family:' + DS + ';font-size:.48rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(0,0,0,.32);font-weight:300;padding:9px 0;border-bottom:1px solid rgba(0,0,0,.05)}',
        '.cs-whcontent{padding:36px 44px;display:flex;flex-direction:column;gap:28px}',
        '.cs-whsec{padding-bottom:28px;border-bottom:1px solid rgba(0,0,0,.06)}',
        '.cs-whsec:last-child{border-bottom:none}',
        '.cs-whsl{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(0,0,0,.32);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-whst{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(0,0,0,.48);font-weight:300}',
        '.cs-whdna{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
        '.cs-whdna-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(0,0,0,.32);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-whdna-v{font-family:' + DS + ';font-size:.86rem;color:rgba(0,0,0,.45);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:grayscale(1) brightness(.84) contrast(1.15)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-whhdr"><div class="cs-whhl"><span class="cs-whtag">Silent Foundry \u2014 Case Study 01</span><span class="cs-whn">Marshall Amplification</span></div><span class="cs-whr">Brand DNA Translation<br/>2024</span></div>'
        + '<div class="cs-whhero"><img class="cs-whimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-whintro"><span class="cs-whey">' + D.eyebrow + '</span><div class="cs-wht">' + D.title + '</div><p class="cs-whb">' + D.body + '</p></div></div>'
        + '<div class="cs-whmets">' + D.metrics.map(function(m){return '<div class="cs-whmet"><span class="cs-whmv">'+m.val+'</span><span class="cs-whml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-whsecs"><div class="cs-whnav">' + ['Translation','Brand DNA','The Result'].map(function(n){return '<span class="cs-whnav-item">'+n+'</span>';}).join('') + '</div>'
        + '<div class="cs-whcontent">'
        + '<div class="cs-whsec"><span class="cs-whsl">Translation</span><p class="cs-whst">' + D.translation + '</p></div>'
        + '<div class="cs-whsec"><span class="cs-whsl">Brand DNA</span><div class="cs-whdna">' + D.dna.map(function(d){return '<div><span class="cs-whdna-k">'+d.k+'</span><span class="cs-whdna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-whsec"><span class="cs-whsl">The Result</span><p class="cs-whst">' + D.result + '</p></div>'
        + '</div></div>'
        + '<div class="cs-imgrow">' + imgs('','4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 10 CINEMATIC SPOTLIGHT — pure black, tall hero, vignette, filmstrip
    10: { name: '10 \u2014 Cinematic Spotlight', build: function() {
      var css = [
        '.csw{background:#040404}',
        '.cs-cinhero{position:relative;height:70vh;min-height:500px;overflow:hidden}',
        '.cs-cinimg{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.35)}',
        '.cs-cinvig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,transparent 20%,rgba(0,0,0,.88) 100%)}',
        '.cs-cinov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:52px;text-align:center;gap:10px}',
        '.cs-cintag{font-family:' + DS + ';font-size:.48rem;letter-spacing:.32em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300}',
        '.cs-cint{font-family:' + BN + ';font-size:clamp(4rem,8vw,10rem);letter-spacing:.04em;text-transform:uppercase;color:rgba(255,255,255,.9);line-height:.85}',
        '.cs-cinb{font-family:' + DS + ';font-size:.95rem;line-height:1.72;color:rgba(255,255,255,.32);font-weight:300;max-width:520px}',
        '.cs-cinmets{display:grid;grid-template-columns:repeat(4,1fr);background:#070707;border-top:1px solid rgba(200,169,110,.1);border-bottom:1px solid rgba(200,169,110,.1)}',
        '.cs-cinmet{padding:26px 36px;border-right:1px solid rgba(255,255,255,.04);text-align:center}',
        '.cs-cinmv{font-family:' + BN + ';font-size:2.8rem;letter-spacing:.06em;color:rgba(200,169,110,.65);display:block;line-height:1}',
        '.cs-cinml{font-family:' + DS + ';font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.18);display:block;margin-top:5px;font-weight:300}',
        '.cs-cinpanels{display:grid;grid-template-columns:1fr 1fr;gap:2px}',
        '.cs-cinp{padding:44px;background:#070707}',
        '.cs-cinpfull{grid-column:1/-1;background:#050505}',
        '.cs-cinpl{font-family:' + DS + ';font-size:.48rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(200,169,110,.4);font-weight:300;display:block;margin-bottom:14px}',
        '.cs-cinpt{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(255,255,255,.3);font-weight:300}',
        '.cs-cindna{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
        '.cs-cindna-k{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,169,110,.35);font-weight:300;display:block;margin-bottom:3px}',
        '.cs-cindna-v{font-family:' + DS + ';font-size:.82rem;color:rgba(255,255,255,.28);font-weight:300}',
        '.cs-cinfilm{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:#000}',
        '.cs-cinfilm img{width:100%;object-fit:cover;display:block;filter:brightness(.45) contrast(1.2)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-cinhero"><img class="cs-cinimg" src="' + D.heroImg + '" alt="Marshall"/><div class="cs-cinvig"></div>'
        + '<div class="cs-cinov"><span class="cs-cintag">Case Study 01 \u2014 Silent Foundry \u2014 ' + D.eyebrow + '</span><div class="cs-cint">' + D.title + '</div><p class="cs-cinb">' + D.body + '</p></div></div>'
        + '<div class="cs-cinmets">' + D.metrics.map(function(m){return '<div class="cs-cinmet"><span class="cs-cinmv">'+m.val+'</span><span class="cs-cinml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-cinpanels">'
        + '<div class="cs-cinp"><span class="cs-cinpl">Translation</span><p class="cs-cinpt">' + D.translation + '</p></div>'
        + '<div class="cs-cinp"><span class="cs-cinpl">The Result</span><p class="cs-cinpt">' + D.result + '</p></div>'
        + '<div class="cs-cinp cs-cinpfull"><span class="cs-cinpl">Brand DNA</span><div class="cs-cindna">' + D.dna.map(function(d){return '<div><span class="cs-cindna-k">'+d.k+'</span><span class="cs-cindna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '</div>'
        + '<div class="cs-cinfilm">' + imgs('','4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 11 SPLIT SCREEN — dark left / light right throughout
    11: { name: '11 \u2014 Split Screen', build: function() {
      var css = [
        '.csw{background:#0a0a0a}',
        '.cs-sphero{display:grid;grid-template-columns:1fr 1fr;min-height:480px}',
        '.cs-spimg{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.45)}',
        '.cs-spintro{background:#ede8df;padding:52px 44px;display:flex;flex-direction:column;justify-content:center;gap:14px}',
        '.cs-sptag{font-family:' + DS + ';font-size:.5rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300}',
        '.cs-spt{font-family:' + BN + ';font-size:clamp(2.5rem,4.5vw,5.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(10,10,10,.82);line-height:.9}',
        '.cs-spb{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.46);font-weight:300}',
        '.cs-sprow{display:grid;grid-template-columns:1fr 1fr}',
        '.cs-spdark{padding:44px;background:#0d0d0d}',
        '.cs-splight{padding:44px;background:#e5e0d7}',
        '.cs-spld{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;display:block;margin-bottom:14px}',
        '.cs-spll{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;display:block;margin-bottom:14px}',
        '.cs-sptextd{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(244,241,236,.34);font-weight:300}',
        '.cs-sptextl{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.48);font-weight:300}',
        '.cs-spmets{display:grid;grid-template-columns:1fr 1fr;gap:0}',
        '.cs-spmet{padding:14px 0;border-top:1px solid rgba(255,255,255,.04)}',
        '.cs-spmv{font-family:' + BN + ';font-size:2rem;letter-spacing:.06em;color:rgba(200,169,110,.6);display:block;line-height:1}',
        '.cs-spml{font-family:' + DS + ';font-size:.42rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,241,236,.2);display:block;margin-top:2px;font-weight:300}',
        '.cs-spdna{display:flex;flex-direction:column;gap:7px}',
        '.cs-spdna-row{display:flex;gap:12px;align-items:baseline;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.03)}',
        '.cs-spdna-k{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,169,110,.38);font-weight:300;width:64px;flex-shrink:0}',
        '.cs-spdna-v{font-family:' + DS + ';font-size:.82rem;color:rgba(244,241,236,.3);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block}',
        '.cs-imgrow img:nth-child(odd){filter:brightness(.52) grayscale(.2)}',
        '.cs-imgrow img:nth-child(even){filter:brightness(.86) saturate(.7)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-sphero"><img class="cs-spimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-spintro"><span class="cs-sptag">Case Study 01 \u2014 Silent Foundry \u2014 Brand DNA Translation</span><div class="cs-spt">' + D.title + '</div><p class="cs-spb">' + D.body + '</p></div></div>'
        + '<div class="cs-sprow"><div class="cs-spdark"><span class="cs-spld">Numbers</span><div class="cs-spmets">' + D.metrics.map(function(m){return '<div class="cs-spmet"><span class="cs-spmv">'+m.val+'</span><span class="cs-spml">'+m.lbl+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-splight"><span class="cs-spll">Translation</span><p class="cs-sptextl">' + D.translation + '</p></div></div>'
        + '<div class="cs-sprow"><div class="cs-spdark"><span class="cs-spld">Brand DNA</span><div class="cs-spdna">' + D.dna.map(function(d){return '<div class="cs-spdna-row"><span class="cs-spdna-k">'+d.k+'</span><span class="cs-spdna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-splight"><span class="cs-spll">The Result</span><p class="cs-sptextl">' + D.result + '</p></div></div>'
        + '<div class="cs-imgrow">' + imgs('','1/1') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 12 INFOGRAPHIC DATA-FORWARD — huge metrics hero, dense panels
    12: { name: '12 \u2014 Infographic / Data Forward', build: function() {
      var css = [
        '.csw{background:#090909}',
        '.cs-inftop{padding:44px;border-bottom:1px solid rgba(200,169,110,.1);display:flex;justify-content:space-between;align-items:center;gap:32px}',
        '.cs-infh{font-family:' + BN + ';font-size:clamp(2rem,4vw,5rem);letter-spacing:.08em;text-transform:uppercase;color:rgba(244,241,236,.82);line-height:.9}',
        '.cs-inftag{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;display:block;margin-bottom:9px}',
        '.cs-infthumb{width:240px;height:160px;object-fit:cover;display:block;filter:brightness(.5) grayscale(.25)}',
        '.cs-infmets{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:2px solid rgba(200,169,110,.12)}',
        '.cs-infmet{padding:36px 36px 28px;border-right:1px solid rgba(255,255,255,.04);background:#0c0c0c}',
        '.cs-infmv{font-family:' + BN + ';font-size:4.5rem;letter-spacing:.04em;color:#c8a96e;display:block;line-height:1}',
        '.cs-infml{font-family:' + DS + ';font-size:.46rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,241,236,.22);display:block;margin-top:6px;font-weight:300}',
        '.cs-infbody{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px}',
        '.cs-infcell{padding:32px;background:#0d0d0d}',
        '.cs-infcell:nth-child(2){background:#0a0a0a}',
        '.cs-infcl{font-family:' + DS + ';font-size:.46rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.42);font-weight:300;display:block;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(200,169,110,.08)}',
        '.cs-infct{font-family:' + DS + ';font-size:.86rem;line-height:1.8;color:rgba(244,241,236,.35);font-weight:300}',
        '.cs-infdna{display:flex;flex-direction:column;gap:5px}',
        '.cs-infdna-row{display:flex;align-items:baseline;gap:10px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.03)}',
        '.cs-infdna-k{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,169,110,.38);font-weight:300;width:60px;flex-shrink:0}',
        '.cs-infdna-v{font-family:' + DS + ';font-size:.8rem;color:rgba(244,241,236,.3);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.62) grayscale(.18)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-inftop"><div><span class="cs-inftag">Case Study 01 \u2014 Silent Foundry \u2014 Brand DNA Translation</span><div class="cs-infh">' + D.title + '</div></div>'
        + '<img class="cs-infthumb" src="' + D.heroImg + '" alt="Marshall"/></div>'
        + '<div class="cs-infmets">' + D.metrics.map(function(m){return '<div class="cs-infmet"><span class="cs-infmv">'+m.val+'</span><span class="cs-infml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-infbody">'
        + '<div class="cs-infcell"><span class="cs-infcl">Translation</span><p class="cs-infct">' + D.translation + '</p></div>'
        + '<div class="cs-infcell"><span class="cs-infcl">Brand DNA</span><div class="cs-infdna">' + D.dna.map(function(d){return '<div class="cs-infdna-row"><span class="cs-infdna-k">'+d.k+'</span><span class="cs-infdna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-infcell"><span class="cs-infcl">The Result</span><p class="cs-infct">' + D.result + '</p></div>'
        + '</div>'
        + '<div class="cs-imgrow">' + imgs('','3/2') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 13 VERTICAL POSTER — full screen hero, huge title overlay, panels below
    13: { name: '13 \u2014 Vertical Poster', build: function() {
      var css = [
        '.csw{background:#0a0a0a}',
        '.cs-pohero{position:relative}',
        '.cs-poimg{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;filter:brightness(.28) grayscale(.25)}',
        '.cs-poov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:36px 44px}',
        '.cs-potop{display:flex;justify-content:space-between;align-items:flex-start}',
        '.cs-potag{font-family:' + DS + ';font-size:.48rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(200,169,110,.5);font-weight:300}',
        '.cs-ponum{font-family:' + BN + ';font-size:5.5rem;letter-spacing:.06em;color:rgba(200,169,110,.1);line-height:1}',
        '.cs-pobot{display:flex;flex-direction:column;gap:8px}',
        '.cs-poey{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.55);font-weight:300}',
        '.cs-pot{font-family:' + BN + ';font-size:clamp(4rem,8vw,11rem);letter-spacing:.04em;text-transform:uppercase;color:rgba(244,241,236,.9);line-height:.85}',
        '.cs-pomets{display:grid;grid-template-columns:repeat(4,1fr);background:rgba(8,8,8,.9);border-top:1px solid rgba(200,169,110,.12);border-bottom:1px solid rgba(200,169,110,.12)}',
        '.cs-pomet{padding:18px 32px;border-right:1px solid rgba(255,255,255,.04)}',
        '.cs-pomv{font-family:' + BN + ';font-size:2.2rem;letter-spacing:.06em;color:#c8a96e;display:block;line-height:1}',
        '.cs-poml{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(244,241,236,.2);display:block;margin-top:3px;font-weight:300}',
        '.cs-pointro{padding:44px}',
        '.cs-pob{font-family:' + DS + ';font-size:.95rem;line-height:1.85;color:rgba(244,241,236,.32);font-weight:300;max-width:700px}',
        '.cs-pocontent{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;border-top:1px solid rgba(255,255,255,.04)}',
        '.cs-pop{padding:36px 32px;background:#0d0d0d}',
        '.cs-popl{font-family:' + DS + ';font-size:.46rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.42);font-weight:300;display:block;margin-bottom:12px}',
        '.cs-popt{font-family:' + DS + ';font-size:.86rem;line-height:1.8;color:rgba(244,241,236,.32);font-weight:300}',
        '.cs-podna{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
        '.cs-podna-k{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,169,110,.38);font-weight:300;display:block;margin-bottom:2px}',
        '.cs-podna-v{font-family:' + DS + ';font-size:.8rem;color:rgba(244,241,236,.3);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.6) grayscale(.18)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-pohero"><img class="cs-poimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-poov"><div class="cs-potop"><span class="cs-potag">Case Study \u2014 01 / Silent Foundry</span><span class="cs-ponum">01</span></div>'
        + '<div class="cs-pobot"><span class="cs-poey">' + D.eyebrow + '</span><div class="cs-pot">' + D.title + '</div></div></div></div>'
        + '<div class="cs-pomets">' + D.metrics.map(function(m){return '<div class="cs-pomet"><span class="cs-pomv">'+m.val+'</span><span class="cs-poml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-pointro"><p class="cs-pob">' + D.body + '</p></div>'
        + '<div class="cs-pocontent">'
        + '<div class="cs-pop"><span class="cs-popl">Translation</span><p class="cs-popt">' + D.translation + '</p></div>'
        + '<div class="cs-pop"><span class="cs-popl">Brand DNA</span><div class="cs-podna">' + D.dna.map(function(d){return '<div><span class="cs-podna-k">'+d.k+'</span><span class="cs-podna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-pop"><span class="cs-popl">The Result</span><p class="cs-popt">' + D.result + '</p></div>'
        + '</div>'
        + '<div class="cs-imgrow">' + imgs('','4/3') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 14 DARK EDITORIAL GRID — wide image left, stacked metrics right, ruled columns
    14: { name: '14 \u2014 Dark Editorial Grid', build: function() {
      var css = [
        '.csw{background:#060606}',
        '.cs-egflag{padding:10px 44px;background:#0a0a0a;border-bottom:1px solid rgba(200,169,110,.1);display:flex;gap:20px;align-items:center}',
        '.cs-egft{font-family:' + BN + ';font-size:.75rem;letter-spacing:.18em;color:rgba(200,169,110,.6)}',
        '.cs-egfsep{width:1px;height:11px;background:rgba(200,169,110,.18)}',
        '.cs-egfs{font-family:' + DS + ';font-size:.48rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,241,236,.18);font-weight:300}',
        '.cs-egtop{display:grid;grid-template-columns:1.2fr .8fr;min-height:440px}',
        '.cs-egimg{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.42) grayscale(.12)}',
        '.cs-egright{background:#0a0a0a;padding:44px 36px;display:flex;flex-direction:column;justify-content:space-between;border-left:1px solid rgba(255,255,255,.04)}',
        '.cs-egey{font-family:' + DS + ';font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,169,110,.45);font-weight:300;display:block;margin-bottom:10px}',
        '.cs-egt{font-family:' + BN + ';font-size:clamp(2.5rem,4vw,4.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(244,241,236,.85);line-height:.9;margin-bottom:18px}',
        '.cs-egb{font-family:' + DS + ';font-size:.88rem;line-height:1.8;color:rgba(244,241,236,.32);font-weight:300;margin-bottom:28px}',
        '.cs-egmets{display:grid;grid-template-columns:1fr 1fr;gap:0}',
        '.cs-egmet{padding:12px 0;border-top:1px solid rgba(255,255,255,.05)}',
        '.cs-egmv{font-family:' + BN + ';font-size:1.8rem;letter-spacing:.06em;color:rgba(200,169,110,.6);display:block;line-height:1}',
        '.cs-egml{font-family:' + DS + ';font-size:.4rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(244,241,236,.18);display:block;margin-top:2px;font-weight:300}',
        '.cs-egcols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;border-top:1px solid rgba(255,255,255,.04)}',
        '.cs-egcol{padding:32px 28px;background:#0a0a0a}',
        '.cs-egcol:nth-child(2){background:#0c0c0c}',
        '.cs-egcl{font-family:' + DS + ';font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,169,110,.4);font-weight:300;display:block;margin-bottom:12px;border-bottom:1px solid rgba(200,169,110,.08);padding-bottom:8px}',
        '.cs-egct{font-family:' + DS + ';font-size:.84rem;line-height:1.78;color:rgba(244,241,236,.32);font-weight:300}',
        '.cs-egdna{display:flex;flex-direction:column;gap:5px}',
        '.cs-egdna-row{display:flex;gap:8px;align-items:baseline;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.03)}',
        '.cs-egdna-k{font-family:' + DS + ';font-size:.4rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(200,169,110,.35);font-weight:300;width:56px;flex-shrink:0}',
        '.cs-egdna-v{font-family:' + DS + ';font-size:.78rem;color:rgba(244,241,236,.28);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.58) grayscale(.1)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-egflag"><span class="cs-egft">Case Study \u2014 01</span><div class="cs-egfsep"></div><span class="cs-egfs">Silent Foundry \u2014 Marshall Amplification \u2014 Brand Translation 2024</span></div>'
        + '<div class="cs-egtop"><img class="cs-egimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-egright"><div><span class="cs-egey">' + D.eyebrow + '</span><div class="cs-egt">' + D.title + '</div><p class="cs-egb">' + D.body + '</p></div>'
        + '<div class="cs-egmets">' + D.metrics.map(function(m){return '<div class="cs-egmet"><span class="cs-egmv">'+m.val+'</span><span class="cs-egml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '</div></div>'
        + '<div class="cs-egcols"><div class="cs-egcol"><span class="cs-egcl">Translation</span><p class="cs-egct">' + D.translation + '</p></div>'
        + '<div class="cs-egcol"><span class="cs-egcl">Brand DNA</span><div class="cs-egdna">' + D.dna.map(function(d){return '<div class="cs-egdna-row"><span class="cs-egdna-k">'+d.k+'</span><span class="cs-egdna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-egcol"><span class="cs-egcl">The Result</span><p class="cs-egct">' + D.result + '</p></div></div>'
        + '<div class="cs-imgrow">' + imgs('','16/9') + '</div>'
        + '</section>';
      return { css: css, html: html };
    }},

    // 15 WARM LINEN LIGHT — full light flip, warm cream bg throughout
    15: { name: '15 \u2014 Warm Linen / Light Portfolio', build: function() {
      var css = [
        '.csw{background:#f0ebe0}',
        '.cs-lnhdr{padding:22px 52px;border-bottom:1px solid rgba(10,10,10,.09);display:flex;justify-content:space-between;align-items:center;background:#ece7dc}',
        '.cs-lnhl{font-family:' + BN + ';font-size:.82rem;letter-spacing:.2em;color:rgba(138,110,58,.7)}',
        '.cs-lnhr{font-family:' + DS + ';font-size:.48rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(10,10,10,.28);font-weight:300}',
        '.cs-lnhero{display:grid;grid-template-columns:1fr 1fr}',
        '.cs-lnimg{width:100%;height:100%;min-height:460px;object-fit:cover;display:block;filter:brightness(.88) saturate(.9)}',
        '.cs-lnintro{background:#f5f0e5;padding:52px 44px;display:flex;flex-direction:column;justify-content:center;gap:18px;border-left:4px solid rgba(138,110,58,.22)}',
        '.cs-lney{font-family:' + DS + ';font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(138,110,58,.65);font-weight:300}',
        '.cs-lnt{font-family:' + BN + ';font-size:clamp(2.5rem,4.5vw,5.5rem);letter-spacing:.06em;text-transform:uppercase;color:rgba(10,10,10,.82);line-height:.9}',
        '.cs-lnb{font-family:' + DS + ';font-size:.92rem;line-height:1.85;color:rgba(10,10,10,.46);font-weight:300}',
        '.cs-lnmets{display:grid;grid-template-columns:repeat(4,1fr);background:#e8e3d8;border-top:1px solid rgba(10,10,10,.07);border-bottom:1px solid rgba(10,10,10,.07)}',
        '.cs-lnmet{padding:22px 32px;border-right:1px solid rgba(10,10,10,.06)}',
        '.cs-lnmv{font-family:' + BN + ';font-size:2.2rem;letter-spacing:.06em;color:rgba(138,110,58,.72);display:block;line-height:1}',
        '.cs-lnml{font-family:' + DS + ';font-size:.42rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.28);display:block;margin-top:3px;font-weight:300}',
        '.cs-lncontent{display:grid;grid-template-columns:180px 1fr;border-top:1px solid rgba(10,10,10,.07)}',
        '.cs-lnnav{background:#ece7dc;padding:36px 24px;border-right:1px solid rgba(10,10,10,.07);display:flex;flex-direction:column;gap:3px}',
        '.cs-lnnav-item{font-family:' + DS + ';font-size:.48rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.32);font-weight:300;padding:9px 0;border-bottom:1px solid rgba(10,10,10,.05)}',
        '.cs-lnpanels{}',
        '.cs-lnp{padding:36px 44px;border-bottom:1px solid rgba(10,10,10,.07);background:#f0ebe0}',
        '.cs-lnp:last-child{border-bottom:none}',
        '.cs-lnpl{font-family:' + DS + ';font-size:.48rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(138,110,58,.6);font-weight:300;display:block;margin-bottom:12px}',
        '.cs-lnpt{font-family:' + DS + ';font-size:.9rem;line-height:1.85;color:rgba(10,10,10,.46);font-weight:300}',
        '.cs-lndna{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 28px}',
        '.cs-lndna-k{font-family:' + DS + ';font-size:.44rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(138,110,58,.55);font-weight:300;display:block;margin-bottom:3px}',
        '.cs-lndna-v{font-family:' + DS + ';font-size:.86rem;color:rgba(10,10,10,.46);font-weight:300}',
        '.cs-imgrow{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:#e0dbd0;padding:2px}',
        '.cs-imgrow img{width:100%;object-fit:cover;display:block;filter:brightness(.88) saturate(.85)}'
      ].join('\n');
      var html = '<section class="case-study csw">'
        + '<div class="cs-lnhdr"><span class="cs-lnhl">Silent Foundry \u2014 Case Study 01 \u2014 Marshall Amplification</span><span class="cs-lnhr">Brand DNA Translation \u2014 2024</span></div>'
        + '<div class="cs-lnhero"><img class="cs-lnimg" src="' + D.heroImg + '" alt="Marshall"/>'
        + '<div class="cs-lnintro"><span class="cs-lney">' + D.eyebrow + '</span><div class="cs-lnt">' + D.title + '</div><p class="cs-lnb">' + D.body + '</p></div></div>'
        + '<div class="cs-lnmets">' + D.metrics.map(function(m){return '<div class="cs-lnmet"><span class="cs-lnmv">'+m.val+'</span><span class="cs-lnml">'+m.lbl+'</span></div>';}).join('') + '</div>'
        + '<div class="cs-lncontent"><div class="cs-lnnav">' + ['Overview','Translation','Brand DNA','The Result'].map(function(n){return '<span class="cs-lnnav-item">'+n+'</span>';}).join('') + '</div>'
        + '<div class="cs-lnpanels">'
        + '<div class="cs-lnp"><span class="cs-lnpl">Translation</span><p class="cs-lnpt">' + D.translation + '</p></div>'
        + '<div class="cs-lnp"><span class="cs-lnpl">Brand DNA</span><div class="cs-lndna">' + D.dna.map(function(d){return '<div><span class="cs-lndna-k">'+d.k+'</span><span class="cs-lndna-v">'+d.v+'</span></div>';}).join('') + '</div></div>'
        + '<div class="cs-lnp"><span class="cs-lnpl">The Result</span><p class="cs-lnpt">' + D.result + '</p></div>'
        + '</div></div>'
        + '<div class="cs-imgrow">' + imgs('','4/3') + '</div>'
        + '</section>';
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
      var tmp = document.createElement('div');
      tmp.innerHTML = originalHTML;
      cs.parentNode.replaceChild(tmp.firstChild, cs);
    } else {
      var built = f.build();
      var tmp2 = document.createElement('div');
      tmp2.innerHTML = built.html;
      cs.parentNode.replaceChild(tmp2.firstChild, cs);
      var styleEl = document.createElement('style');
      styleEl.id = 'cs-style';
      styleEl.textContent = built.css;
      document.head.appendChild(styleEl);
    }

    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(/\bisel-active\b/g,'').trim();
      if (parseInt(btns[i].getAttribute('data-id')) === id) btns[i].className += ' isel-active';
    }
    var nameEl = document.getElementById('isel-name');
    if (nameEl && FORMATS[id]) nameEl.textContent = FORMATS[id].name;
    try { localStorage.setItem('cs-format', id); } catch(e) {}
  }

  function init() {
    var cs = document.querySelector('.case-study');
    if (cs) originalHTML = cs.outerHTML;
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() { apply(parseInt(btn.getAttribute('data-id'))); });
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
