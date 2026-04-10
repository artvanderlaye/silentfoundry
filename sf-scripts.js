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

  var FORMATS = {
    0: { name: '00 \u2014 Original', build: null },

    // ────────────────────────────────────────────────────────────
    // 03 — DOSSIER / INVESTMENT MEMO
    // White/cream bg. Left: numbered sections. Right: large images.
    // Hero image full-width sidebar top (3/2), two products below.
    // ────────────────────────────────────────────────────────────
    3: { name: '03 \u2014 Dossier / Investment Memo', build: function() {
      var css = [
        '.csw { background: #f4f2ee; }',
        /* top bar */
        '.cs-dtop { display:grid; grid-template-columns:1fr auto; gap:32px; padding:36px 48px; border-bottom:2px solid rgba(10,10,10,.14); background:#ece8e0; }',
        '.cs-dmeta { display:flex; flex-direction:column; gap:5px; }',
        '.cs-dfrom { font-family:'+DS+'; font-size:.5rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(10,10,10,.35); font-weight:300; }',
        '.cs-dname { font-family:'+BN+'; font-size:1.7rem; letter-spacing:.14em; color:rgba(10,10,10,.78); }',
        '.cs-dref  { font-family:'+DS+'; font-size:.5rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(138,110,58,.65); font-weight:300; margin-top:3px; }',
        '.cs-dstamp { display:flex; flex-direction:column; align-items:flex-end; }',
        '.cs-dstamp-lbl { font-family:'+DS+'; font-size:.46rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(10,10,10,.22); font-weight:300; }',
        '.cs-dstamp-num { font-family:'+BN+'; font-size:5.5rem; letter-spacing:.06em; color:rgba(138,110,58,.1); line-height:1; }',
        /* body: left content + right images */
        '.cs-dbody { display:grid; grid-template-columns:1fr 340px; }',
        '.cs-dmain { padding:40px 48px; border-right:1px solid rgba(10,10,10,.08); }',
        /* numbered sections */
        '.cs-dsec { margin-bottom:36px; padding-bottom:36px; border-bottom:1px solid rgba(10,10,10,.07); }',
        '.cs-dsec:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }',
        '.cs-dslabel { font-family:'+DS+'; font-size:.5rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(10,10,10,.35); font-weight:300; margin-bottom:14px; display:flex; align-items:center; gap:8px; }',
        '.cs-dnum { font-family:'+BN+'; font-size:.75rem; letter-spacing:.12em; color:rgba(138,110,58,.5); }',
        '.cs-dh { font-family:'+BN+'; font-size:clamp(2.2rem,3.8vw,4.5rem); letter-spacing:.08em; text-transform:uppercase; color:rgba(10,10,10,.78); line-height:.92; margin-bottom:14px; }',
        '.cs-dey { font-family:'+DS+'; font-size:.5rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(138,110,58,.65); font-weight:300; display:block; margin-bottom:7px; }',
        '.cs-dp { font-family:'+DS+'; font-size:.92rem; line-height:1.85; color:rgba(10,10,10,.48); font-weight:300; }',
        /* metrics table */
        '.cs-dtable { width:100%; border-collapse:collapse; margin-top:6px; }',
        '.cs-dtable td { padding:9px 0; border-bottom:1px solid rgba(10,10,10,.06); font-family:'+DS+'; font-weight:300; vertical-align:top; }',
        '.cs-dtable td:first-child { font-size:.44rem; letter-spacing:.18em; text-transform:uppercase; color:rgba(138,110,58,.6); width:110px; padding-right:14px; font-weight:300; }',
        '.cs-dtable td:last-child { font-size:.88rem; color:rgba(10,10,10,.45); }',
        /* dna grid */
        '.cs-ddna { display:grid; grid-template-columns:1fr 1fr; gap:7px 20px; }',
        '.cs-ddna-k { font-family:'+DS+'; font-size:.44rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(138,110,58,.6); font-weight:300; display:block; margin-bottom:2px; }',
        '.cs-ddna-v { font-family:'+DS+'; font-size:.88rem; color:rgba(10,10,10,.45); font-weight:300; }',
        /* right image sidebar — large */
        '.cs-dside { background:#e8e3d8; display:flex; flex-direction:column; }',
        '.cs-dside-main { width:100%; aspect-ratio:3/2; object-fit:cover; display:block; filter:brightness(.86) saturate(.88); flex-shrink:0; }',
        '.cs-dside-grid { display:grid; grid-template-columns:1fr 1fr; gap:3px; margin-top:3px; padding:0 0; flex:1; }',
        '.cs-dside-grid img { width:100%; aspect-ratio:1/1; object-fit:cover; display:block; filter:brightness(.82) saturate(.85); }'
      ].join('\n');

      var html = '<section class="case-study csw">'
        /* header */
        + '<div class="cs-dtop">'
        +   '<div class="cs-dmeta">'
        +     '<span class="cs-dfrom">Silent Foundry \u2014 Brand Translation Division</span>'
        +     '<span class="cs-dname">Marshall Amplification</span>'
        +     '<span class="cs-dref">Reference CS-001 \u00b7 Brand DNA Translation \u00b7 2024</span>'
        +   '</div>'
        +   '<div class="cs-dstamp"><span class="cs-dstamp-lbl">Case Study</span><span class="cs-dstamp-num">01</span></div>'
        + '</div>'
        /* body */
        + '<div class="cs-dbody">'
        +   '<div class="cs-dmain">'
        /* 01 overview */
        +     '<div class="cs-dsec">'
        +       '<div class="cs-dslabel"><span class="cs-dnum">01</span>Overview</div>'
        +       '<span class="cs-dey">'+D.eyebrow+'</span>'
        +       '<div class="cs-dh">'+D.title+'</div>'
        +       '<p class="cs-dp">'+D.body+'</p>'
        +     '</div>'
        /* 02 key numbers */
        +     '<div class="cs-dsec">'
        +       '<div class="cs-dslabel"><span class="cs-dnum">02</span>Key Numbers</div>'
        +       '<table class="cs-dtable"><tbody>'
        + D.metrics.map(function(m){ return '<tr><td>'+m.lbl+'</td><td>'+m.val+'</td></tr>'; }).join('')
        +       '</tbody></table>'
        +     '</div>'
        /* 03 translation */
        +     '<div class="cs-dsec">'
        +       '<div class="cs-dslabel"><span class="cs-dnum">03</span>Translation</div>'
        +       '<p class="cs-dp">'+D.translation+'</p>'
        +     '</div>'
        /* 04 brand dna */
        +     '<div class="cs-dsec">'
        +       '<div class="cs-dslabel"><span class="cs-dnum">04</span>Brand DNA</div>'
        +       '<div class="cs-ddna">'
        + D.dna.map(function(d){ return '<div><span class="cs-ddna-k">'+d.k+'</span><span class="cs-ddna-v">'+d.v+'</span></div>'; }).join('')
        +       '</div>'
        +     '</div>'
        /* 05 result */
        +     '<div class="cs-dsec">'
        +       '<div class="cs-dslabel"><span class="cs-dnum">05</span>The Result</div>'
        +       '<p class="cs-dp">'+D.result+'</p>'
        +     '</div>'
        +   '</div>'
        /* right sidebar images */
        +   '<div class="cs-dside">'
        +     '<img class="cs-dside-main" src="'+D.heroImg+'" alt="Marshall"/>'
        +     '<div class="cs-dside-grid">'
        +       '<img src="'+D.imgs[0]+'" alt=""/>'
        +       '<img src="'+D.imgs[3]+'" alt=""/>'
        +     '</div>'
        +   '</div>'
        + '</div>'
        + '</section>';

      return { css: css, html: html };
    }},

    // ────────────────────────────────────────────────────────────
    // 04 — TIMELINE / CHAPTER
    // White/cream bg. Left: vertical timeline with dot+line nodes.
    // Right: tall image sidebar — hero portrait + one product below.
    // ────────────────────────────────────────────────────────────
    4: { name: '04 \u2014 Timeline / Chapter', build: function() {
      var css = [
        '.csw { background: #f2ede4; }',
        /* header */
        '.cs-tlhdr { padding:44px 48px 36px; border-bottom:1px solid rgba(138,110,58,.18); display:grid; grid-template-columns:1fr auto; gap:40px; align-items:end; }',
        '.cs-tltag { font-family:'+DS+'; font-size:.5rem; letter-spacing:.28em; text-transform:uppercase; color:rgba(138,110,58,.5); font-weight:300; display:block; margin-bottom:12px; }',
        '.cs-tlh   { font-family:'+BN+'; font-size:clamp(3rem,6vw,8rem); letter-spacing:.06em; text-transform:uppercase; color:rgba(10,10,10,.82); line-height:.88; }',
        /* metrics stacked right in header */
        '.cs-tlnums { display:flex; flex-direction:column; align-items:flex-end; gap:0; }',
        '.cs-tlnv   { font-family:'+BN+'; font-size:2.2rem; letter-spacing:.06em; color:rgba(138,110,58,.7); line-height:1; }',
        '.cs-tlnl   { font-family:'+DS+'; font-size:.42rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(10,10,10,.3); font-weight:300; text-align:right; margin-bottom:8px; }',
        /* body */
        '.cs-tlbody { display:grid; grid-template-columns:1fr 360px; }',
        /* timeline column */
        '.cs-tlmain { padding:0 48px; border-right:1px solid rgba(138,110,58,.15); }',
        '.cs-tlnode { display:grid; grid-template-columns:28px 1fr; gap:20px; padding:36px 0; border-bottom:1px solid rgba(10,10,10,.06); }',
        '.cs-tlnode:last-child { border-bottom:none; }',
        /* dot + line */
        '.cs-tldotcol { display:flex; flex-direction:column; align-items:center; padding-top:4px; }',
        '.cs-tldot  { width:8px; height:8px; border-radius:50%; background:rgba(138,110,58,.55); flex-shrink:0; }',
        '.cs-tlline { flex:1; width:1px; background:rgba(138,110,58,.18); margin-top:8px; }',
        /* node text */
        '.cs-tnnlbl { font-family:'+DS+'; font-size:.5rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(138,110,58,.55); font-weight:300; display:block; margin-bottom:8px; }',
        '.cs-tnntext { font-family:'+DS+'; font-size:.92rem; line-height:1.85; color:rgba(10,10,10,.48); font-weight:300; }',
        /* dna grid inside node */
        '.cs-tldna { display:grid; grid-template-columns:1fr 1fr; gap:8px 20px; margin-top:8px; }',
        '.cs-tldna-k { font-family:'+DS+'; font-size:.44rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(138,110,58,.55); font-weight:300; display:block; margin-bottom:2px; }',
        '.cs-tldna-v { font-family:'+DS+'; font-size:.86rem; color:rgba(10,10,10,.45); font-weight:300; }',
        /* right image sidebar — tall */
        '.cs-tlside { background:#ece7dc; display:flex; flex-direction:column; }',
        '.cs-tlside-hero { width:100%; flex:1; min-height:0; object-fit:cover; display:block; filter:brightness(.84) saturate(.88); }',
        '.cs-tlside-prod { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; filter:brightness(.8) saturate(.85); margin-top:3px; flex-shrink:0; }'
      ].join('\n');

      var html = '<section class="case-study csw">'
        /* header */
        + '<div class="cs-tlhdr">'
        +   '<div>'
        +     '<span class="cs-tltag">Case Study 01 \u2014 Silent Foundry</span>'
        +     '<div class="cs-tlh">'+D.title+'</div>'
        +   '</div>'
        +   '<div class="cs-tlnums">'
        + D.metrics.map(function(m){
            return '<span class="cs-tlnv">'+m.val+'</span><span class="cs-tlnl">'+m.lbl+'</span>';
          }).join('')
        +   '</div>'
        + '</div>'
        /* body */
        + '<div class="cs-tlbody">'
        +   '<div class="cs-tlmain">'
        /* node 1 — overview */
        +     '<div class="cs-tlnode">'
        +       '<div class="cs-tldotcol"><div class="cs-tldot"></div><div class="cs-tlline"></div></div>'
        +       '<div><span class="cs-tnnlbl">Overview</span><p class="cs-tnntext">'+D.body+'</p></div>'
        +     '</div>'
        /* node 2 — translation */
        +     '<div class="cs-tlnode">'
        +       '<div class="cs-tldotcol"><div class="cs-tldot"></div><div class="cs-tlline"></div></div>'
        +       '<div><span class="cs-tnnlbl">Translation</span><p class="cs-tnntext">'+D.translation+'</p></div>'
        +     '</div>'
        /* node 3 — brand dna */
        +     '<div class="cs-tlnode">'
        +       '<div class="cs-tldotcol"><div class="cs-tldot"></div><div class="cs-tlline"></div></div>'
        +       '<div><span class="cs-tnnlbl">Brand DNA</span>'
        +         '<div class="cs-tldna">'
        + D.dna.map(function(d){ return '<div><span class="cs-tldna-k">'+d.k+'</span><span class="cs-tldna-v">'+d.v+'</span></div>'; }).join('')
        +         '</div>'
        +       '</div>'
        +     '</div>'
        /* node 4 — result */
        +     '<div class="cs-tlnode">'
        +       '<div class="cs-tldotcol"><div class="cs-tldot"></div></div>'
        +       '<div><span class="cs-tnnlbl">The Result</span><p class="cs-tnntext">'+D.result+'</p></div>'
        +     '</div>'
        +   '</div>'
        /* right sidebar */
        +   '<div class="cs-tlside" style="min-height:700px">'
        +     '<img class="cs-tlside-hero" src="'+D.heroImg+'" alt="Marshall" style="flex:1;width:100%;object-fit:cover;display:block;filter:brightness(.84) saturate(.88)"/>'
        +     '<img class="cs-tlside-prod" src="'+D.imgs[3]+'" alt=""/>'
        +   '</div>'
        + '</div>'
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
      btns[i].className = btns[i].className.replace(/\bisel-active\b/g, '').trim();
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
