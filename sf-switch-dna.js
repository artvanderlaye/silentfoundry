/* SWITCH DNA THESIS LAB — iframe-side mechanism library.
   Runs inside index.html. Every mechanism is idempotent; reset() returns the
   page to BASE (the live page) before a variant is applied. Nothing here
   touches the page's own scripts; the page's section is only decorated. */
(function(){
'use strict';
if(window.__LAB) return;
var R=document.documentElement;
var L={orig:{}, io:null, ro:null, vid:'BASE', texts:[]};
function $(s,c){ return (c||document).querySelector(s); }
function $$(s,c){ return [].slice.call((c||document).querySelectorAll(s)); }
function sec(){ return $('#sf-lab-mount .fd'); }
function el(tag,cls,html){ var e=document.createElement(tag); if(cls) e.className=cls; e.setAttribute('data-sflab','1'); if(html!=null) e.innerHTML=html; return e; }
function before(ref,node){ ref.parentNode.insertBefore(node,ref); return node; }
function after(ref,node){ ref.parentNode.insertBefore(node,ref.nextSibling); return node; }
function setText(node,html){ if(!node) return; if(!node.hasAttribute('data-lab-orig')){ node.setAttribute('data-lab-orig',node.innerHTML); L.texts.push(node);} node.innerHTML=html; }
function reduced(){ try{ return window.matchMedia('(prefers-reduced-motion:reduce)').matches; }catch(e){ return false; } }

/* ---------------------------------------------------------------- data */
var NINE=['PRIMARY STRUCTURES','HORIZONTAL STANCE','RUBBER RIBBING','BATTERY ENCLOSURE','RIB STRUCTURE','SEPARATED VOLUMES','TANK PANEL','REPEATED RADII','EXPOSED FASTENERS'];
var KEYS=['sil','stnc','whl','encl','ribs','mod','axis','rad','fast'];
var RULES={sil:'STRUCTURE IS SHOWN',stnc:'ONE HORIZONTAL DATUM',whl:'GRIP IS RIBBED',encl:'THE CELL IS THE BODY',ribs:'HEAT IS DRAWN AS LINES',mod:'ONE FUNCTION, ONE VOLUME',axis:'A PANEL COVERS, NEVER HIDES',rad:'ONE RADIUS FAMILY',fast:'JOINTS STAY VISIBLE'};
var WHERE={sil:'frame · swingarm',stnc:'seat line · tank line',whl:'tyre tread',encl:'battery box',ribs:'battery fins',mod:'tank · cell · motor',axis:'tank panel',rad:'enclosure corners',fast:'swingarm · box'};
var ESS={sil:1,encl:1,ribs:1,mod:1,rad:1,fast:1};
var CMF=[
  {c:'#B8BCB6',n:'Raw aluminium', m:'Aluminium',      f:'Brushed · clear anodised', fn:'Structure — frame, swingarm, fork',
   fx:'Aluminium · Brushed · Clear anodised'},
  {c:'#14171B',n:'Structural black',m:'Coated steel · rubber',f:'Matte · textured',  fn:'Mass — enclosure, seat, tyre',
   fx:'Coated steel · Rubber · Matte · Textured'},
  {c:'#00B4D8',n:'SWITCH blue',   m:'Anodised accent',f:'Satin',                     fn:'Identity — the one brand mark',
   fx:'Anodised accent · Satin'},
  {c:'#E43C00',n:'HV orange',     m:'Sleeved cable',  f:'Gloss',                     fn:'Signal — the high-voltage path',
   fx:'Sleeved cable · Gloss'}];
var TERR=[
  {n:'ENERGY', c:'hand-carried · mains-free', r:['sil','encl','ribs','rad','fast']},
  {n:'MOTION', c:'ridden · terrain',           r:['sil','stnc','whl','mod','axis','rad','fast']},
  {n:'SIGNAL', c:'heard · connected',          r:['ribs','mod','rad','fast']},
  {n:'UTILITY',c:'held · worked',              r:['sil','whl','mod','rad','fast']}];

/* line studies of the new objects — one stroke, round joins, drawn from
   the nine motifs (ribs, radii, fastener dots, separated volumes) */
var STUDY={
  speaker:'<svg viewBox="0 0 96 64" fill="none"><path d="M10 22h64a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z"/><path d="M14 30h30M14 34h30M14 38h30M14 42h30M14 46h30"/><circle cx="62" cy="40" r="7"/><circle cx="62" cy="40" r="2"/><path d="M72 22V6"/><circle cx="10" cy="26" r="1.2"/><circle cx="74" cy="26" r="1.2"/><circle cx="10" cy="50" r="1.2"/><circle cx="74" cy="50" r="1.2"/></svg>',
  pack:'<svg viewBox="0 0 96 64" fill="none"><path d="M18 18h52a5 5 0 0 1 5 5v26a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5V23a5 5 0 0 1 5-5z"/><path d="M24 26h40M24 31h40M24 36h40M24 41h40M24 46h40"/><path d="M36 18v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5"/><path d="M75 30c8 0 10 6 10 12v10"/><circle cx="18" cy="23" r="1.2"/><circle cx="70" cy="23" r="1.2"/><circle cx="18" cy="49" r="1.2"/><circle cx="70" cy="49" r="1.2"/></svg>',
  light:'<svg viewBox="0 0 96 64" fill="none"><path d="M30 14h26a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"/><path d="M60 18h6v18h-6"/><path d="M30 20h24M30 25h24M30 30h24M30 35h24"/><path d="M43 40v6"/><path d="M28 58l15-12 15 12"/><circle cx="43" cy="46" r="2"/><circle cx="28" cy="58" r="1.2"/><circle cx="58" cy="58" r="1.2"/></svg>',
  bracket:'<svg viewBox="0 0 96 64" fill="none"><path d="M12 24h20v-8h44a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H32v-8H12a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z"/><path d="M14 30h10a2 2 0 0 1 0 4H14a2 2 0 0 1 0-4z"/><path d="M40 22h32M40 27h32M40 32h32M40 37h32"/><circle cx="48" cy="44" r="1.8"/><circle cx="64" cy="44" r="1.8"/></svg>',
  corner:'<svg viewBox="0 0 96 64" fill="none"><path d="M20 56V22a10 10 0 0 1 10-10h46"/><path d="M36 56V32a4 4 0 0 1 4-4h36"/><path d="M52 56V44a2 2 0 0 1 2-2h22"/></svg>',
  grid9:'<svg viewBox="0 0 96 64" fill="none"><circle cx="30" cy="16" r="2"/><circle cx="48" cy="16" r="2"/><circle cx="66" cy="16" r="2"/><circle cx="30" cy="32" r="2"/><circle cx="48" cy="32" r="2"/><circle cx="66" cy="32" r="2"/><circle cx="30" cy="48" r="2"/><circle cx="48" cy="48" r="2"/><circle cx="66" cy="48" r="2"/></svg>'
};
function parentSvg(k){ var s=$('#sf-lab-mount .nt_'+k); if(!s) return ''; var c=s.cloneNode(true); c.removeAttribute('class'); c.setAttribute('class','lab-psvg'); c.removeAttribute('style'); c.setAttribute('preserveAspectRatio','xMidYMid meet'); return c.outerHTML; }
var LEDGER=[
  {k:'ribs',rule:'RIB STRUCTURE',   say:'The fins that cool a battery become the grille that lets a speaker breathe.', con:'hand-held · indoors', st:'speaker',app:'SPEAKER GRILLE', t:'SIGNAL'},
  {k:'fast',rule:'EXPOSED FASTENERS',say:'Joints stay visible so the object can be opened on a bench.',              con:'serviced · not sealed', st:'light',  app:'LIGHT PIVOT',    t:'UTILITY'},
  {k:'rad', rule:'REPEATED RADII',  say:'One radius family, taken to a new scale.',                                  con:'sits on a desk',       st:'corner', app:'PACK CORNERS',   t:'ENERGY'},
  {k:'encl',rule:'BATTERY ENCLOSURE',say:'The cell is the body, not something hidden inside it.',                     con:'carried · not ridden', st:'pack',   app:'BATTERY PACK',   t:'ENERGY'}];

/* ---------------------------------------------------------------- reset */
L.reset=function(){
  $$('[data-sflab]').forEach(function(n){ if(n.parentNode) n.parentNode.removeChild(n); });
  L.texts.forEach(function(n){ if(n.hasAttribute('data-lab-orig')){ n.innerHTML=n.getAttribute('data-lab-orig'); n.removeAttribute('data-lab-orig'); } });
  L.texts=[];
  $$('.lab-inc,.lab-go,.lab-ess-on,[class*="lab-m-"]').forEach(function(n){ n.className=n.className.replace(/\blab-[\w-]+/g,'').replace(/\s+/g,' ').trim(); });
  $$('.fslide[data-lab-hidden]').forEach(function(n){ n.removeAttribute('data-lab-hidden'); });
  ['--lab-qh','--lab-swh','--lab-rh','--lab-qg','--lab-qp','--lab-tgt','--lab-slideh','--lab-r46h'].forEach(function(p){ R.style.removeProperty(p); });
  R.removeAttribute('data-sfdna'); R.classList.remove('lab-lv1','lab-lv2','lab-lv3');
  (L.mo||[]).forEach(function(f){ try{ f(); }catch(e){} }); L.mo=[];
  $$('#sf-lab-mount .dna9 .d9, #sf-lab-mount .dna9 .nw').forEach(function(nd){ nd.style.removeProperty('opacity'); });
  if(L.io){ try{L.io.disconnect();}catch(e){} L.io=null; }
  if(L.ro){ try{L.ro.disconnect();}catch(e){} L.ro=null; }
  L.vid='BASE';
};

/* ------------------------------------------------------------ mechanisms */
var M={};

/* chapter notation on the three cards. names[0] hero, [1] board, [2] cream */
M.chapters=function(o){
  var s=sec(); if(!s) return;
  var names=o.names||['THE PARENT','THE EXTRACTION','THE TRANSLATION'];
  var nums=o.nums||['01','02','03'];
  var mk=function(i){ var t=(o.style==='bare')?names[i]:(nums[i]+' <i>—</i> '+names[i]); return el('span','lab-ch lab-ch-'+o.style+' lab-ch'+i,t); };
  var h=$('.ofcopy',s), b=$('.dnai',s), c=$('.fcats .bhead',s);
  if(h&&o.hero!==false) before(h.firstChild,mk(0));
  if(b){ var bh=$('h4',b); if(bh) before(bh,mk(1)); }
  if(c&&o.cream!==false) before(c.firstChild,mk(2));
};

/* the intro block copy and its type */
M.intro=function(o){
  var s=sec(); var d=$('.dnai',s); if(!d) return;
  if(o.h4) setText($('h4',d),o.h4);
  if(o.p) setText($('p',d),o.p);
  if(o.type) d.className+=' lab-m-it-'+o.type;
};

/* the board grid: CSS-drawn, canvas hidden by CSS */
M.grid=function(o){ var s=sec(); var sp=$('.split',s); if(sp) sp.className+=' lab-m-grid-'+o.mode; if(o.cream){ var f=$('.fcats',s); if(f) f.className+=' lab-m-cgrid-'+o.cream; } };

/* register marks: corners on the board (and cream), column brackets, ticks */
M.register=function(o){
  var s=sec(); var sp=$('.split',s), fc=$('.fcats',s), of=$('.oneframe',s);
  function corners(h,cls){ ['tl','tr','bl','br'].forEach(function(p){ h.appendChild(el('i','lab-reg lab-reg-'+(o.kind||'cross')+' lab-reg-'+p+(cls||''))); }); }
  if(sp&&o.board!==false) corners(sp);
  if(fc&&o.cream) corners(fc,' lab-reg-cream');
  if(of&&o.hero) corners(of,' lab-reg-hero');
  if(o.frame){
    /* 08's corner brackets, extended: one hairline down each side of the board
       and continued through the bridge, so the two read as one frame around the
       whole extraction. Capped top and bottom, in the grid's own colour. */
    var host=[sp, $('.lab-bridge',s)];
    host.forEach(function(h,j){ if(!h) return;
      ['l','r'].forEach(function(side){
        h.appendChild(el('i','lab-frame lab-frame-'+side+(j===0?' lab-frame-t':' lab-frame-b'))); }); });
  }
  if(o.cols){ ['.lft','.rgt'].forEach(function(c){ var n=$(c,s); if(n){ n.appendChild(el('i','lab-colmark lab-colmark-t')); n.appendChild(el('i','lab-colmark lab-colmark-b')); } }); }
};

/* CMF vocabulary: material / finish / colour / function */
M.cmf=function(o){
  var s=sec(); var mb=$('.mblk',s); if(!mb) return;
  mb.className+=' lab-m-cmf-'+o.mode;
  if(o.head){ var mh=$('.bhead .bey',mb); if(mh) setText(mh,o.head); }
  if(o.minimal) mb.className+=' lab-m-cmf-minimal';
  var msw=$('.msw',mb), mnm=$('.mnm',mb);
  if(o.mode==='bars') { /* keep the bars, rewrite the legend as vocabulary */
    if(mnm) setText(mnm, CMF.map(function(c){ return '<i><b style="background:'+c.c+'"></b><span class="lab-cn">'+c.n+'</span><span class="lab-cf">'+c.f+'</span><span class="lab-cu">'+c.fn+'</span></i>'; }).join(''));
    return;
  }
  var h='';
  if(o.mode==='table'){
    /* the table has a Material column, so the material belongs in it — only the
       duplicated sub-line under the colour name is dropped */
    h='<div class="lab-cmf lab-cmf-table"><div class="lab-cr lab-crh"><span></span><span>Material</span><span>Finish</span><span>Function</span></div>'+
      CMF.map(function(c){ return '<div class="lab-cr"><span class="lab-chip" style="background:'+c.c+'"></span><span class="lab-cn">'+c.n+'<em>'+c.m+'</em></span><span class="lab-cf">'+c.f+'</span><span class="lab-cu">'+c.fn+'</span></div>'; }).join('')+'</div>';
  } else if(o.mode==='rows'){
    h='<div class="lab-cmf lab-cmf-rows">'+CMF.map(function(c){ return '<div class="lab-cr"><span class="lab-chip" style="background:'+c.c+'"></span><span class="lab-cn">'+c.n+'</span><span class="lab-cf">'+c.m+' · '+c.f+'</span><span class="lab-cu">'+c.fn+'</span></div>'; }).join('')+'</div>';
  } else if(o.mode==='specimen'){
    h='<div class="lab-cmf lab-cmf-spec"><div class="lab-spec">'+CMF.map(function(c,i){ return '<i style="flex:0 0 '+[46,34,12,8][i]+'%;background:'+c.c+'"></i>'; }).join('')+'</div>'+
      '<div class="lab-specl">'+CMF.map(function(c){ return '<div><span class="lab-chip" style="background:'+c.c+'"></span><span class="lab-cn">'+c.n+'</span><span class="lab-cf">'+(o.exact?c.fx:(c.m+' · '+c.f))+'</span><span class="lab-cu">'+c.fn+'</span></div>'; }).join('')+'</div></div>';
  } else if(o.mode==='chip'){
    /* compact one-line blocks: the colour carries its own name, nothing else */
    h='<div class="lab-cmf lab-cmf-chip"><div class="lab-spec">'+CMF.map(function(c,i){
        return '<i style="background:'+c.c+'"><b>'+((o.labels&&o.labels[i])||c.n)+'</b></i>'; }).join('')+'</div></div>';
  } else if(o.mode==='inset'){
    /* the four blocks carry their own name and material; nothing is printed
       underneath them */
    h='<div class="lab-cmf lab-cmf-inset"><div class="lab-spec">'+CMF.map(function(c){
        return '<i style="background:'+c.c+'"><b>'+c.n+'</b><em>'+c.m+'</em></i>'; }).join('')+'</div></div>';
  } else if(o.mode==='stack'){
    h='<div class="lab-cmf lab-cmf-stack">'+CMF.map(function(c){ return '<div class="lab-cr"><span class="lab-bar" style="background:'+c.c+'"></span><span class="lab-cn">'+c.n+'</span><span class="lab-cf">'+c.m+' · '+c.f+'</span><span class="lab-cu">'+c.fn+'</span></div>'; }).join('')+'</div>';
  }
  if(h){ var n=el('div','lab-cmfwrap',h); after(mnm||msw,n); }
};

/* construction language: de-blocked treatments are CSS classes on .cblk */
M.construction=function(o){
  var s=sec(); var c=$('.cblk',s); if(!c) return;
  c.className+=' lab-m-cx-'+o.mode;
  if(o.short){
    /* one term per study, kept from the words the page already prints */
    $$('.qz .sl2',c).forEach(function(n,i){
      var segs=n.textContent.split('\u00b7').map(function(t){ return t.trim(); }).filter(Boolean);
      setText(n, segs[Math.min(i,segs.length-1)]||segs[0]);
    });
  }
  if(o.mode==='absorb'){
    /* the four construction cards are a second drawing system beside the nine.
       The strongest three principles move into the material column as plain
       rows — their own words, no drawings, no card. */
    var keep=[0,1,3], rows=$$('.qz',c), mb=$('.mblk',s);
    if(!mb||rows.length<4) return;
    var h=keep.map(function(i){ var z=rows[i];
      return '<div class="lab-pr"><b>'+($('.sl1',z)||{}).textContent+'</b><em>'+($('.sl2',z)||{}).textContent+'</em></div>'; }).join('');
    mb.appendChild(el('div','lab-princ',h));
  }
};
M.rhythm=function(o){ var s=sec(); var r=$('.rgt',s); if(r) r.className+=' lab-m-rh-'+o.mode; };

/* essential vs incidental on the nine */
M.essential=function(o){
  var s=sec(); var cells=$$('.dna9 .d9',s); if(cells.length!==9) return;
  cells.forEach(function(c,i){ var k=KEYS[i], e=!!ESS[k];
    if(o.mode==='dim'&&!e) c.className+=' lab-inc';
    if(o.mode==='tag'&&!e){ c.className+=' lab-inc'; c.appendChild(el('i','lab-ess lab-ess-f','FEATURE')); }
    if(o.mode==='num'){ c.appendChild(el('i','lab-ess lab-ess-n','0'+(i+1))); }
    if(o.mode==='bracket'){ c.className+=(e?' lab-m-essb':' lab-inc'); }
  });
};

/* rules, not shapes */
M.rules=function(o){
  var s=sec(); var ls=$$('.dna9 .d9 .dl',s); if(ls.length!==9) return;
  ls.forEach(function(l,i){ var k=KEYS[i];
    if(o.mode==='replace') setText(l,RULES[k]);
    if(o.mode==='sub') setText(l,l.innerHTML+'<span class="lab-rule">'+RULES[k]+'</span>');
    if(o.mode==='where') setText(l,l.innerHTML+'<span class="lab-rule lab-where">↳ '+WHERE[k]+'</span>');
  });
};

/* the receipt: where each reading was taken from the parent */
M.receipt=function(o){
  var s=sec();
  if(o.mode==='strip'||o.mode==='both'){ var d9=$('.dna9',s); if(d9) before(d9,el('div','lab-rcpt','<span>Read from</span> eSCRAMBLER · side elevation · 2025')); }
  if(o.mode==='hero'||o.mode==='both'){ var oc=$('.ofcopy',s); if(oc){ var t=el('span','lab-hcount','NINE READINGS <i>↓</i>'); oc.appendChild(t); } }
  if(o.mode==='crops'){ /* photo crops at the reading anchors, under the board eyebrow */
    var lft=$('.lft',s), img=$('.pvphoto',s); if(!lft||!img) return;
    var src=img.currentSrc||img.src; var cells=$$('.dna9 .d9',s);
    cells.forEach(function(c,i){ var a=$('.anch.a_'+KEYS[i],s); var x=a?parseFloat(a.style.left):50, y=a?parseFloat(a.style.top):50;
      var r=el('i','lab-crop'); r.style.backgroundImage='url("'+src+'")'; r.style.backgroundPosition=x+'% '+y+'%'; c.appendChild(r); });
  }
};

/* physical → behaviour / meaning */
M.meaning=function(o){
  var s=sec(); var sp=$('.split',s); if(!sp) return;
  var P=[['MECHANICAL HONESTY','What is structural is shown. Nothing is dressed.'],['ELECTRIC ARCHITECTURE','The cell is the body. The object is built around its energy.'],['SERVICEABILITY','Every joint can be opened. Every part can be replaced.']];
  if(o.mode==='band'){ sp.appendChild(el('div','lab-mean lab-mean-band',P.map(function(p){ return '<div><span class="lab-mn">'+p[0]+'</span><span class="lab-md">'+p[1]+'</span></div>'; }).join(''))); }
  if(o.mode==='line'){ sp.appendChild(el('div','lab-mean lab-mean-line','<span>What it means</span>'+P.map(function(p){ return '<b>'+p[0]+'</b>'; }).join('<i>·</i>'))); }
  if(o.mode==='rgt'){ var r=$('.rgt',s); if(r) r.appendChild(el('div','lab-mean lab-mean-rgt','<span class="lab-ey">Character &amp; principles</span>'+P.map(function(p){ return '<b>'+p[0]+'</b>'; }).join('<i>·</i>'))); }
};

/* ENERGY / MOTION / SIGNAL / UTILITY reframed as territories */
M.territories=function(o){
  var s=sec(); var tcs=$$('.crow .tc',s); if(tcs.length!==4) return;
  var cr=$('.crow',s); if(cr&&o.mode==='typo') cr.className+=' lab-m-tt'+(o.scale?'-'+o.scale:'');
  tcs.forEach(function(t,i){ var T=TERR[i];
    if(o.mode==='constraint'||o.mode==='typo'){ setText($('.cd',t),T.c); }
  });
};

/* the cream's background drawing — reduced or taken out so it can never
   compete with the product photographs */
M.creamArt=function(o){ var s=sec(); var f=$('.fcats',s); if(f) f.className+=' lab-m-art-'+o.mode; };
/* the horizontal rules that only separate content groups */
M.dividers=function(o){ var s=sec(); if(s) s.className+=' lab-m-div-'+o.mode; };
/* air, not more content, where graphics were removed */
M.space=function(o){ var s=sec(); if(s) s.className+=' lab-m-sp2-'+o.mode; };
/* the analysis board itself: compacted, or quietened on its own grid */
M.board=function(o){ var s=sec(); if(s) s.className+=' lab-m-bd2-'+o.mode; };
/* ===== 47A-47E: right-column interaction, seam, colour mapping ========== */

/* the four source colours, exactly as the extraction swatches establish them,
   plus the reading each one takes when it lands on cream */
var TCOL=[
  {n:'energy', hex:'#E43C00', ink:'rgba(228,60,0,.92)',  rgb:'228,60,0'},
  {n:'motion', hex:'#14171B', ink:'rgba(20,23,27,.88)',  rgb:'20,23,27'},
  {n:'signal', hex:'#00B4D8', ink:'#0a7f99',             rgb:'10,127,153'},
  {n:'utility',hex:'#B8BCB6', ink:'rgba(10,10,10,.44)',  rgb:'150,152,146'}
];
/* the existing product categories, read onto the territory they belong to */
var FEY={audio:2,energy:0,professional:3,workspace:3,lifestyle:1,mobility:1};

/* ---- colour mapping ---------------------------------------------------- */
M.tcolor=function(o){
  var s=sec(); if(!s) return; s.className+=' lab-m-tc-'+o.mode;
  var touched=[];
  $$('.crow .tc',s).forEach(function(t,i){ var c=TCOL[i]; if(!c) return;
    t.className+=' lab-t lab-t'+i;
    t.style.setProperty('--tc',c.ink); t.style.setProperty('--tcr',c.rgb); touched.push(t); });
  $$('.fstrip .fslide',s).forEach(function(sl){
    var fe=$('.fey',sl); if(!fe) return;
    var k=(fe.textContent||'').trim().toLowerCase(); var idx=FEY[k];
    if(idx===undefined) return; var c=TCOL[idx];
    sl.className+=' lab-p lab-p'+idx;
    sl.style.setProperty('--tc',c.ink); sl.style.setProperty('--tcr',c.rgb);
    sl.style.setProperty('--tch',c.hex); touched.push(sl); });
  L.mo.push(function(){ touched.forEach(function(n){
    n.style.removeProperty('--tc'); n.style.removeProperty('--tcr'); n.style.removeProperty('--tch'); }); });
};

/* ---- black -> cream ---------------------------------------------------- */
M.seam=function(o){ var s=sec(); if(s) s.className+=' lab-m-sm-'+o.mode; };

/* ===== 47A1-47A5: the drawer bank ====================================== */

/* two further DNA drawers, built from linework the board already carries */
var XG={
  sd:{cls:'sd', head:'Signature details', keys:['whl','rad','fast']},
  al:{cls:'al', head:'Assembly logic',    keys:['mod','sil','encl']}
};
M.extra=function(o){
  var s=sec(); var rg=$('.rgt',s), br=$('.lab-bridge',s); if(!rg) return;
  (o.groups||[]).forEach(function(k){
    var g=XG[k]; if(!g) return;
    var frags=g.keys.map(function(kk){
      var i=KEYS.indexOf(kk); if(i<0) return '';
      return '<div class="lab-xf"><i class="lab-xs">'+MID.nsvg(kk)+'</i><b>'+NINE[i]+'</b></div>';
    }).join('');
    var n=el('div','lab-xg lab-xg-'+g.cls,
      '<div class="bhead"><span class="bey">'+g.head+'</span></div>'+
      '<div class="lab-xc">'+frags+'</div>');
    if(br&&br.parentNode===rg) rg.insertBefore(n,br); else rg.appendChild(n);
  });
};

/* the drawer's own design: index, pull, and how the bank behaves */
M.drawer=function(o){
  var s=sec(); if(!s) return;
  s.className+=' lab-m-dr-'+o.style;
  if(o.hit) s.className+=' lab-m-drhit';
  if(o.num){
    var i=0;
    $$('.lab-rh',s).forEach(function(h){ i++;
      var n=el('i','lab-dnum'); n.textContent=(i<10?'0':'')+i;
      h.insertBefore(n,h.firstChild); });
  }
};

/* the one cyan rule above the territories */
M.crule=function(o){ var s=sec(); if(s) s.className+=' lab-m-cr2-'+o.mode; };

/* ---- the right column's interaction ------------------------------------ */
M.rint=function(o){
  var s=sec(); var rg=$('.rgt',s); if(!rg) return;
  s.className+=' lab-m-ri-'+o.mode;
  var pool=[[$('.mblk .bhead',s),$('.lab-cmfwrap',s),$('.mblk',s)],
            [$('.cblk .bhead',s),$('.q22',s),$('.cblk',s)]];
  $$('.lab-xg',s).forEach(function(x){ pool.push([$('.bhead',x),$('.lab-xc',x),x]); });
  pool.push([$('.lab-bridge .lab-ey',s),$('.lab-one',s),$('.lab-bridge',s)]);
  var G=pool.filter(function(g){ return g[0]&&g[1]&&g[2]; });
  if(G.length<3) return;
  /* keep them in the order they stand in the column */
  G.sort(function(a,b){ return (a[2].compareDocumentPosition(b[2])&4)?-1:1; });
  /* the wrappers are PLAIN nodes: reset strips every [data-sflab] node, and
     .q22 belongs to the page — it must not be carried out with a wrapper */
  var D=$('.rgt',s).ownerDocument;
  function plain(cls){ var n=D.createElement('div'); n.className=cls; return n; }
  /* remember each host's original child order once, and rebuild it verbatim */
  var undo=[], orig=[];
  function park(node,host){ var p=node.parentNode;
    if(p&&!orig.some(function(o){ return o.p===p; })) orig.push({p:p,kids:[].slice.call(p.childNodes)});
    host.appendChild(node); }
  function restore(){ orig.forEach(function(o){ o.kids.forEach(function(k){
    /* anything reset already took out (an injected [data-sflab] node) stays out */
    if(k.isConnected!==false) o.p.appendChild(k); }); }); }
  var groups=G.map(function(g,i){
    var w=plain('lab-rcw');
    g[1].parentNode.insertBefore(w,g[1]); park(g[1],w);
    undo.push(function(){ if(w.parentNode) w.parentNode.removeChild(w); });
    g[0].className+=' lab-rh'; g[2].className+=' lab-rg lab-rg'+i;
    g[0].setAttribute('tabindex','0'); g[0].setAttribute('role','button');
    return {h:g[0], w:w, g:g[2], i:i};
  });
  var start=(o.start===undefined?0:o.start), locked=start, shown=start, off=[];
  function on(n,ev,fn,opt){ n.addEventListener(ev,fn,opt); off.push(function(){ n.removeEventListener(ev,fn,opt); }); }

  function paintOne(i){                       /* one open at a time */
    shown=i;
    groups.forEach(function(x){
      x.w.className='lab-rcw'+(x.i===i?' lab-open':'');
      x.g.className=x.g.className.replace(/ lab-(act|dim)\b/g,'')+(x.i===i?' lab-act':' lab-dim');
      x.h.setAttribute('aria-expanded',x.i===i?'true':'false'); });
  }
  function paintFocus(i){                     /* everything stays, focus moves */
    shown=i;
    groups.forEach(function(x){
      x.w.className='lab-rcw lab-open';
      x.g.className=x.g.className.replace(/ lab-(act|dim)\b/g,'')+(x.i===i?' lab-act':' lab-dim'); });
  }
  var paint=(o.mode==='focus'||o.mode==='prox')?paintFocus:paintOne;

  if(o.mode==='display'){
    /* three compact headings over one shared field */
    /* the three GROUPS move into one field — their own ancestors travel with
       them, so every existing .cblk / .lab-bridge rule keeps resolving */
    var rgn=$('.rgt',s), hs=plain('lab-dhs'), disp=plain('lab-disp');
    rgn.insertBefore(hs,rgn.firstChild);
    groups.forEach(function(x){ park(x.h,hs); });
    rgn.appendChild(disp);
    groups.forEach(function(x){ park(x.g,disp); });
    undo.push(function(){ if(hs.parentNode) hs.parentNode.removeChild(hs);
                          if(disp.parentNode) disp.parentNode.removeChild(disp); });
  }

  function choose(i){ locked=(o.toggle&&locked===i)?-1:i; paint(locked); }
  groups.forEach(function(x){
    on(x.h,'click',function(){ choose(x.i); });
    on(x.h,'keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); choose(x.i); } });
    if(o.mode==='hover'||o.mode==='focus'){
      on(x.h,'mouseenter',function(){ paint(x.i); });
    }
  });
  if(o.mode==='hover'||o.mode==='focus'){
    on(rg,'mouseleave',function(){ paint(locked); });
  }
  if(o.mode==='prox'){
    var raf=0, W=rg.defaultView||window;
    var move=function(e){ if(raf) return; var y=e.clientY;
      raf=requestAnimationFrame(function(){ raf=0;
        var best=0, bd=1e9;
        groups.forEach(function(x){ var r=x.g.getBoundingClientRect();
          var d=Math.abs((r.top+r.bottom)/2-y); if(d<bd){ bd=d; best=x.i; } });
        if(best!==shown) paint(best); }); };
    on(rg,'pointermove',move);
    on(rg,'pointerleave',function(){ paint(locked); });
    L.mo.push(function(){ if(raf) cancelAnimationFrame(raf); });
  }
  paint(start);
  L.mo.push(function(){ off.forEach(function(f){ f(); });
    /* put every page node back in its original order, then drop the shells */
    try{ restore(); }catch(e){}
    for(var i=undo.length-1;i>=0;i--){ try{ undo[i](); }catch(e){} }
    $$('#sf-lab-mount .lab-rcw,#sf-lab-mount .lab-dhs,#sf-lab-mount .lab-disp').forEach(function(n){
      while(n.firstChild) n.parentNode.insertBefore(n.firstChild,n);
      if(n.parentNode) n.parentNode.removeChild(n); });
  });
};

/* one alignment grid for the whole right-hand column */
M.rgrid=function(o){ var s=sec(); if(!s) return; s.className+=' lab-m-rg-'+o.mode;
  if(o.mode==='free') s.className+=' lab-m-rg-two'; };

/* the cream's own composition */
M.cream=function(o){ var s=sec(); if(s) s.className+=' lab-m-cr-'+o.mode; };

M.creamHead=function(o){ var s=sec(); var h=$('.fcats-h',s); if(h&&o.html) setText(h,o.html); if(o.ey){ setText($('.fcats .bey',s),o.ey); } };

/* THE BRIDGE — mandatory. type × place. */
M.bridge=function(o){
  var s=sec(); var sp=$('.split',s), fc=$('.fcats',s); if(!sp||!fc) return;
  var rows=(o.rows||[0,1,2]).map(function(i){ return LEDGER[i]; });
  var head=(o.head===undefined)?'How a rule travels':o.head;
  /* the reading's number prints ONLY where the hero and the board carry the same
     number, so it reads as a reference rather than as decoration */
  function idx(k){ return o.num?('<i class="lab-ln">0'+(KEYS.indexOf(k)+1)+'</i>'):''; }
  var inner='';
  var ey=head?('<span class="lab-ey lab-bey">'+head+'</span>'):'';
  if(o.type==='ledger'){
    inner=ey+'<div class="lab-ledger"><div class="lab-lr lab-lrh"><span>From the parent</span><span>New constraint</span><span>Applied</span></div>'+
      rows.map(function(r){ return '<div class="lab-lr"><span class="lab-lp"><i class="lab-lsvg">'+parentSvg(r.k)+'</i><b>'+idx(r.k)+r.rule+'</b></span><span class="lab-lc"><i class="lab-arrow"></i><b>'+r.con+'</b><em>'+r.say+'</em></span><span class="lab-la"><i class="lab-lsvg lab-study">'+STUDY[r.st]+'</i><b>'+r.app+'</b></span></div>'; }).join('')+'</div>';
  } else if(o.type==='equation'){
    inner=ey+'<div class="lab-eq">'+rows.map(function(r){ return '<div class="lab-eqi"><span class="lab-eqp"><i class="lab-lsvg">'+parentSvg(r.k)+'</i><b>'+r.rule+'</b></span><i class="lab-op">+</i><span class="lab-eqc"><b>'+r.con+'</b></span><i class="lab-op">=</i><span class="lab-eqa"><i class="lab-lsvg lab-study">'+STUDY[r.st]+'</i><b>'+r.app+'</b></span></div>'; }).join('')+'</div>';
  } else if(o.type==='statement'){
    inner='<div class="lab-stmt"><h4>'+(o.big||'Nothing is copied.<br><span>The rules are carried.</span>')+'</h4><p>'+(o.text||'A new SWITCH object never borrows the motorcycle’s shape. It inherits the decisions behind it — and answers a new constraint with them.')+'</p></div>'+
      '<div class="lab-stmt-rows">'+rows.map(function(r){ return '<div><b>'+r.rule+'</b><i class="lab-arrow"></i><span>'+r.app+'</span><em>'+r.con+'</em></div>'; }).join('')+'</div>';
  } else if(o.type==='matrix'){
    inner=ey+'<div class="lab-mx"><div class="lab-mxr lab-mxh"><span></span>'+TERR.map(function(t){ return '<span>'+t.n+'</span>'; }).join('')+'</div>'+
      KEYS.map(function(k,i){ return '<div class="lab-mxr"><span class="lab-mxn">'+NINE[i]+'</span>'+TERR.map(function(t){ return '<span class="lab-mxd'+(t.r.indexOf(k)>=0?' on':'')+'"><i></i></span>'; }).join('')+'</div>'; }).join('')+'</div>';
  } else if(o.type==='walk'){
    inner=ey+'<div class="lab-walk"><div class="lab-ws"><i class="lab-wn">01</i><i class="lab-lsvg">'+parentSvg('stnc')+'</i><b>Read</b><em>The parent, traced. Nine readings, four materials, one way of building.</em></div><i class="lab-arrow lab-warrow"></i>'+
      '<div class="lab-ws"><i class="lab-wn">02</i><i class="lab-lsvg lab-study">'+STUDY.grid9+'</i><b>Reduce</b><em>Readings become rules. Shapes are left behind; decisions are kept.</em></div><i class="lab-arrow lab-warrow"></i>'+
      '<div class="lab-ws"><i class="lab-wn">03</i><i class="lab-lsvg lab-study">'+STUDY.speaker+'</i><b>Reapply</b><em>The same rules answer a new constraint. A new object, recognisably SWITCH.</em></div></div>';
  } else if(o.type==='strip'){
    var ST=[{st:'pack',n:'Battery pack',t:'ENERGY',r:['encl','ribs','rad','fast']},{st:'bracket',n:'Carry bracket',t:'UTILITY',r:['sil','mod','fast']},{st:'speaker',n:'Speaker',t:'SIGNAL',r:['ribs','mod','rad']},{st:'light',n:'Task light',t:'MOTION',r:['axis','rad','fast']}];
    inner=ey+'<div class="lab-strip">'+ST.map(function(x){ return '<div class="lab-ss"><i class="lab-lsvg lab-study">'+STUDY[x.st]+'</i><b>'+x.n+'</b><em>'+x.t+'</em></div>'; }).join('')+'</div>';
  } else if(o.type==='pairs'){
    var img=$('.pvphoto',s); var src=img?(img.currentSrc||img.src):'';
    inner=ey+'<div class="lab-pairs">'+rows.map(function(r){ var a=$('.anch.a_'+r.k,s); var x=a?parseFloat(a.style.left):50, y=a?parseFloat(a.style.top):50;
      return '<div class="lab-pair"><i class="lab-crop lab-crop-big" style="background-image:url(&quot;'+src+'&quot;);background-position:'+x+'% '+y+'%"></i><i class="lab-arrow"></i><i class="lab-lsvg lab-study">'+STUDY[r.st]+'</i><b>'+idx(r.k)+r.rule+'</b><em>'+r.con+'</em><span>'+r.app+'</span></div>'; }).join('')+'</div>';
  } else if(o.type==='words'){
    /* the walk, stripped to type: the three names and the three sentences that
       already exist, no drawings, no arrows, no numerals */
    inner=(ey||'')+'<div class="lab-words">'+
      [['Read','The parent, traced. Nine readings, four materials, one way of building.'],
       ['Reduce','Readings become rules. Shapes are left behind; decisions are kept.'],
       ['Reapply','The same rules answer a new constraint. A new object, recognisably SWITCH.']]
      .map(function(w){ return '<div class="lab-wd"><b>'+w[0]+'</b><em>'+w[1]+'</em></div>'; }).join('')+'</div>';
  } else if(o.type==='line'){
    /* one line of type on the datum: the move named, nothing drawn */
    inner='<div class="lab-oneline"><b>Read</b> <i>·</i> <b>Reduce</b> <i>·</i> <b>Reapply</b></div>';
  } else if(o.type==='sentence'){
    inner='<div class="lab-sent"><em>The same rules answer a new constraint. A new object, recognisably SWITCH.</em></div>';
  } else if(o.type==='one'){
    /* a single receipt: one reading off the parent, one application */
    var r0=LEDGER[o.row||0];
    inner=(ey||'')+'<div class="lab-one">'+
      '<span class="lab-onep"><i class="lab-lsvg">'+parentSvg(r0.k)+'</i><b>'+r0.rule+'</b></span>'+
      '<i class="lab-arrow"></i>'+
      '<span class="lab-onea"><i class="lab-lsvg lab-study">'+STUDY[r0.st]+'</i><b>'+r0.app+'</b></span>'+
      '<em class="lab-onesay">'+r0.say+'</em></div>';
  } else if(o.type==='cross'){
    /* the parent reading stays on the black, the application lands on the
       cream, and the connection is what crosses the boundary */
    var rc=LEDGER[o.row||0];
    inner='<span class="lab-crp"><i class="lab-lsvg">'+parentSvg(rc.k)+'</i><b>'+rc.rule+'</b></span>'+
      '<i class="lab-arrow lab-crossarrow"></i>'+
      '<span class="lab-cra"><i class="lab-lsvg lab-study">'+STUDY[rc.st]+'</i><b>'+rc.app+'</b></span>'+
      '<em class="lab-crsay">'+rc.say+'</em>';
  } else if(o.type==='spine'){
    inner='<div class="lab-spinebr"><i class="lab-spline"></i>'+rows.map(function(r,i){ return '<div class="lab-pin"><i></i><b>'+r.rule+'</b><span>'+r.con+'</span><em>→ '+r.app+'</em></div>'; }).join('')+'</div>';
  }
  var b=el('div','lab-bridge lab-br-'+o.type+' lab-bp-'+(o.place||'between')+' lab-an-'+(o.anim||'none'),'<div class="lab-brin">'+inner+'</div>');
  if(o.place==='rgt'){ var rg=$('.rgt',s); (rg||sp).appendChild(b); }
  else if(o.place==='black-foot') sp.appendChild(b);
  else if(o.place==='cream-head') before($('.bhead',fc)||fc.firstChild,b);
  else before(fc,b);
  if(o.hold){}                      /* the motion driver decides when it lands */
  else if(o.anim&&o.anim!=='none') L.animate(b);
  else b.className+=' lab-go';
};

/* one-time scroll-triggered animation on the bridge — the active variant only */
L.animate=function(b){
  if(reduced()||!window.MOTION){ b.className+=' lab-go lab-nomotion'; return; }
  if(L.played[L.vid]){ b.className+=' lab-go lab-nomotion'; return; }
  try{ L.io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ b.className+=' lab-go'; L.played[L.vid]=1; L.io.disconnect(); L.io=null; } }); },{threshold:0.35}); L.io.observe(b); }
  catch(e){ b.className+=' lab-go'; }
  setTimeout(function(){ if(b.className.indexOf('lab-go')<0) b.className+=' lab-go'; },12000);
};

/* black → cream boundary */
M.boundary=function(o){ var s=sec(); var fc=$('.fcats',s), sp=$('.split',s); if(fc) fc.className+=' lab-m-bd-'+o.mode; if(sp) sp.className+=' lab-m-bds-'+o.mode; };

/* imagery honesty */
M.imagery=function(o){
  var s=sec(); var slides=$$('.fslide',s);
  if(o.mode==='off'){ var f0=$('.fstrip',s); if(f0) f0.className+=' lab-m-hidden'; return; }
  function kind(sl){ var im=$('img',sl); var src=(im&&(im.getAttribute('src')||''))||''; if(/snowboard|guitar/.test(src)) return 'REFERENCE'; return 'CONCEPT STUDY'; }
  if(o.mode==='tags'||o.mode==='mono'||o.mode==='hide-refs'){
    slides.forEach(function(sl){ var k=kind(sl); if(o.mode==='hide-refs'&&k==='REFERENCE'){ sl.setAttribute('data-lab-hidden','1'); return; }
      var t=el('i','lab-img '+(k==='REFERENCE'?'lab-img-ref':'lab-img-cs'),(k==='REFERENCE'?'REFERENCE · NOT A SWITCH PRODUCT':'CONCEPT STUDY')); sl.appendChild(t); if(o.mode==='mono'&&k==='REFERENCE') sl.className+=' lab-m-mono'; });
  }
  if(o.mode==='drawn'){
    var fs=$('.fstrip',s); if(!fs) return; fs.className+=' lab-m-hidden';
    var ST=[{st:'pack',n:'Battery pack',t:'ENERGY'},{st:'light',n:'Task light',t:'UTILITY'},{st:'speaker',n:'Speaker',t:'SIGNAL'},{st:'bracket',n:'Carry bracket',t:'UTILITY'}];
    before(fs,el('div','lab-studies','<span class="lab-ey lab-sey">Studies · not products</span><div class="lab-sgrid">'+ST.map(function(x){ return '<div><i class="lab-lsvg lab-study">'+STUDY[x.st]+'</i><b>'+x.n+'</b><em>'+x.t+'</em></div>'; }).join('')+'</div>'));
  }
  if(o.mode==='big'){
    /* the slide box is sized per breakpoint by the page, so the new height is
       measured rather than assumed, and re-measured on resize */
    var fs2=$('.fstrip',s); if(fs2) fs2.className+=' lab-m-img-big';
    L.bigSlides();
  }
  if(o.note){ var fc=$('.fcats',s); if(fc) fc.appendChild(el('span','lab-imgnote',o.note)); }
};

/* hero → extraction hand-off */
M.hero=function(o){
  var s=sec(); var of=$('.oneframe',s), oc=$('.ofcopy',s); if(!of) return;
  if(o.mode==='ruler'||o.mode==='both'){ var r=el('i','lab-ruler'); var h=''; for(var i=0;i<9;i++) h+='<b style="left:'+(6+i*11)+'%"><span>0'+(i+1)+'</span></b>'; r.innerHTML=h; of.appendChild(r); }
  if(o.mode==='tag'){ if(oc) oc.appendChild(el('span','lab-hcount','THE PARENT · READ BELOW <i>↓</i>')); }
  if(o.edge){ of.appendChild(el('i','lab-hedge')); }
};

/* extraction-side hand-off: the nine first paint in the hero's gold */
M.handoff=function(o){
  var s=sec(); var d9=$('.dna9',s); if(!d9) return;
  d9.className+=' lab-m-ho-'+o.mode;
  if(o.mode==='gold'){ if(reduced()||!window.MOTION){ d9.className+=' lab-go'; return; }
    try{ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ d9.className+=' lab-go'; io.disconnect(); } }); },{threshold:0.4}); io.observe(d9); }catch(e){ d9.className+=' lab-go'; }
    setTimeout(function(){ if(d9.className.indexOf('lab-go')<0) d9.className+=' lab-go'; },10000); }
  if(o.mode==='ticks'){ $$('.d9',d9).forEach(function(c,i){ c.appendChild(el('i','lab-tick','0'+(i+1))); }); }
};

/* =======================================================================
   MOTION. One driver, several behaviours. Every mode is scroll-triggered,
   runs only for the variant currently on screen, and is torn down by reset().
   prefers-reduced-motion (and the page's own MOTION flag) resolves straight
   to the finished state — nothing is lost, it simply does not move.
   ======================================================================= */
M.motion=function(o){
  var s=sec(); if(!s) return;
  var d9=$('.dna9',s), cells=$$('.dna9 .d9',s), br=$('.lab-bridge',s)||$('.lab-cross',s);
  if(!d9) return;
  s.className+=' lab-mo-'+o.mode;
  L.mo=L.mo||[];
  var still=(reduced()||!window.MOTION);

  function settle(){                       /* the finished state, no movement */
    cells.forEach(function(c){ c.style.opacity=''; });
    if(br) br.className+=' lab-go';
    d9.className+=' lab-go';
  }
  if(still){ settle(); return; }

  var timers=[], raf=null, ios=[];
  function at(ms,fn){ timers.push(setTimeout(fn,ms)); }
  function stop(){ timers.forEach(clearTimeout); timers=[]; if(raf) cancelAnimationFrame(raf); raf=null;
    ios.forEach(function(i){ try{ i.disconnect(); }catch(e){} }); ios=[]; }
  L.mo.push(function(){ stop(); cells.forEach(function(c){ c.style.opacity=''; }); });

  function onceIn(node,thr,fn){
    try{ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ fn(); io.disconnect(); } }); },{threshold:thr});
      io.observe(node); ios.push(io); }catch(e){ fn(); }
    at(14000,fn);
  }
  function handoff(){ if(br && br.className.indexOf('lab-go')<0) br.className+=' lab-go'; }
  /* the proof also lands on its own arrival, so it is never held back by an
     ambient pass the viewer may have scrolled straight past */
  if(br) onceIn(br,0.3,handoff);

  /* ---- the emphasis walk: one or two of the nine at a time --------------
     RIB STRUCTURE is index 4 and is always the last thing emphasised, so the
     eye is on it when the proof arrives. */
  function walk(low,step,stopAt){
    var i=0, order=[0,3,6,1,7,2,5,8,4];
    function tick(){
      cells.forEach(function(c,j){ c.style.opacity = (j===order[i]||j===order[(i+1)%9]) ? '1' : String(low); });
      i++;
      if(i>=order.length){                 /* one pass, then rest and hand off */
        at(step, function(){ cells.forEach(function(c,j){ c.style.opacity = (j===4)?'1':String(low+0.06); });
          at(1100, function(){ cells.forEach(function(c){ c.style.opacity=''; }); handoff(); }); });
        return;
      }
      at(step,tick);
    }
    onceIn(d9, 0.25, function(){ at(stopAt||600,tick); });
  }

  if(o.mode==='breathe')  walk(0.88, 900, 500);
  if(o.mode==='ambient')  walk(0.9, 1050, 700);
  if(o.mode==='sweep'){                    /* one slow pass of light, L to R */
    onceIn(d9,0.2,function(){ d9.className+=' lab-go'; at(1900,handoff); });
  }
  if(o.mode==='trace'){                    /* a short segment travels the line */
    onceIn(d9,0.2,function(){ d9.className+=' lab-go'; at(2600,handoff); });
  }
  if(o.mode==='shimmer'){
    var hd=$('.fcats-h',s);
    onceIn(d9,0.2,function(){ handoff(); });
    if(hd) onceIn(hd,0.4,function(){ hd.className+=' lab-go'; });
  }
  if(o.mode==='focus'){                    /* the row nearest the eye stays up */
    var rows=[[0,1,2],[3,4,5],[6,7,8]];
    function pick(){
      raf=null;
      var vh=window.innerHeight, best=0, bd=1e9;
      rows.forEach(function(r,ri){
        var c=cells[r[1]]; if(!c) return; var b=c.getBoundingClientRect();
        var dist=Math.abs((b.top+b.height/2)-vh*0.46);
        if(dist<bd){ bd=dist; best=ri; } });
      cells.forEach(function(c,j){ c.style.opacity = (rows[best].indexOf(j)>=0) ? '1' : '0.93'; });
    }
    function onScroll(){ if(!raf) raf=requestAnimationFrame(pick); }
    window.addEventListener('scroll',onScroll,{passive:true}); pick();
    L.mo.push(function(){ window.removeEventListener('scroll',onScroll); });
    onceIn(d9,0.35,function(){ at(900,handoff); });
  }
  if(o.mode==='cross'){                    /* rib brightens, line crosses, app lands */
    onceIn(d9,0.3,function(){
      cells.forEach(function(c,j){ c.style.opacity=(j===4)?'1':'0.9'; });
      at(700,function(){ handoff(); });
      at(2400,function(){ cells.forEach(function(c){ c.style.opacity=''; }); });
    });
  }
  if(o.mode==='datumflow'){                /* the spine warms and cools by section */
    var marks=$$('.lab-datum',s);
    function flow(){
      raf=null; var vh=window.innerHeight;
      marks.forEach(function(m){ var b=m.getBoundingClientRect();
        var vis=Math.max(0,Math.min(b.bottom,vh)-Math.max(b.top,0))/Math.max(1,Math.min(b.height,vh));
        m.style.opacity=String(0.35+0.65*Math.min(1,vis*1.4)); });
    }
    function onS(){ if(!raf) raf=requestAnimationFrame(flow); }
    window.addEventListener('scroll',onS,{passive:true}); flow();
    L.mo.push(function(){ window.removeEventListener('scroll',onS); marks.forEach(function(m){ m.style.removeProperty('opacity'); }); });
    onceIn(d9,0.3,function(){ at(800,handoff); });
  }
};

/* shared spine / datum through all three cards */
M.spine=function(o){ var s=sec(); if(s) s.className+=' lab-m-sp-'+o.mode; ['.oneframe','.split','.lab-bridge','.fcats'].forEach(function(c){ var n=$(c,s); if(n&&(o.mode==='datum'||o.mode==='sync'||o.mode==='line')) n.appendChild(el('i','lab-datum')); }); };

/* the product strip grows by a measured factor; base height differs per
   breakpoint, so it is read from the page rather than hard-coded */
L.bigSlides=function(){
  var s=sec(); if(!s) return; var st=$('.fstrip',s), sl=$('.fslide',s); if(!st||!sl) return;
  if(st.className.indexOf('lab-m-img-big')<0){ R.style.removeProperty('--lab-slideh'); return; }
  /* the page sizes the slide per breakpoint, so the base height is read with
     the class off and the growth applied to that */
  R.style.removeProperty('--lab-slideh');
  st.classList.remove('lab-m-img-big');
  var h=sl.getBoundingClientRect().height;
  st.classList.add('lab-m-img-big');
  if(h<80) return;
  R.style.setProperty('--lab-slideh', Math.round(h*1.24)+'px');
};

/* ---------------------------------------------------- the baseline solver */
function textBottom(e){ try{ var r=document.createRange(); r.selectNodeContents(e); var b=r.getBoundingClientRect(); if(b&&b.height) return b.bottom; }catch(x){} return e.getBoundingClientRect().bottom; }
L.solve=function(){
  if(L.vid==='BASE') return;
  var s=sec(); if(!s) return; var q=$('.q22',s), ls=$$('.dna9 .d9 .dl',s); if(!q||ls.length!==9) return;
  var props=['--lab-qh','--lab-swh','--lab-rh','--lab-qg','--lab-qp','--lab-tgt','--lab-r46h'];
  /* when the construction block is absorbed or cut to two there is nothing to
     align to the last label — the right column simply ends early, which is the
     safe direction */
  if(/lab-m-rg-free/.test(s.className)){
    props.forEach(function(p){ R.style.removeProperty(p); });
    R.classList.remove('lab-lv1','lab-lv2','lab-lv3'); return;
  }
  if(/lab-m-rg-/.test(s.className)){
    /* ONE COLUMN: the right side is given exactly the height of the left
       board and distributes its three groups inside it, so materials,
       construction language and the proof finish on the same bottom datum
       as TANK PANEL / REPEATED RADII / EXPOSED FASTENERS. */
    props.forEach(function(p){ R.style.removeProperty(p); });
    R.classList.remove('lab-lv1','lab-lv2','lab-lv3');
    R.style.removeProperty('--lab-r46h');
    if(window.innerWidth<=900) return;
    var rg=$('.rgt',s); if(!rg) return;
    var b=-Infinity; ls.slice(6).forEach(function(l){ var t=textBottom(l); if(t>b) b=t; });
    if(!isFinite(b)) return;
    var top=rg.getBoundingClientRect().top;
    var hgt=Math.round(b-top); if(hgt>120) R.style.setProperty('--lab-r46h',hgt+'px');
    return;
  }
  if($('.cblk.lab-m-cx-absorb',s)||$('.cblk.lab-m-cx-two',s)){ props.forEach(function(p){ R.style.removeProperty(p); }); R.classList.remove('lab-lv1','lab-lv2','lab-lv3'); return; }
  if(window.innerWidth<=900){ props.forEach(function(p){ R.style.removeProperty(p); }); R.classList.remove('lab-lv1','lab-lv2','lab-lv3'); return; }
  props.forEach(function(p){ R.style.removeProperty(p); });
  R.style.setProperty('--lab-qh','auto');
  function labBot(){ var b=-Infinity; ls.slice(6).forEach(function(l){ var t=textBottom(l); if(t>b) b=t; }); return b; }
  function gap(){ var r=q.getBoundingClientRect(); return {need:labBot()-r.top, nat:r.height}; }
  var g=gap(); if(!isFinite(g.need)) return;
  /* not enough room: four levers, in order — the swatch strip (to 40px),
     the right column's rhythm (to -12px), the construction drawings (to 26px),
     then the compaction levels */
  var sw=$('.msw',s); if(sw&&getComputedStyle(sw).display==='none') sw=$('.lab-spec',s);
  var swH=sw?sw.getBoundingClientRect().height:0, rh=0, qg=38, n=0, lv=0;
  R.classList.remove('lab-lv1','lab-lv2','lab-lv3');
  /* the shrinking mode answers the same gap by taking the cards down instead,
     so the material specimen above them is left at its designed height */
  var shrink=!!$('.cblk.lab-m-cx-quiet',s);
  while(!shrink && g.need<g.nat-0.5 && n<40){ n++;
    if(sw&&swH>40){ swH=Math.max(40,swH-8); R.style.setProperty('--lab-swh',swH+'px'); }
    else if(rh<12){ rh+=2; R.style.setProperty('--lab-rh',rh+'px'); }
    else if(qg>26){ qg-=2; R.style.setProperty('--lab-qg',qg+'px'); }
    else if(lv<3){ lv++; R.classList.add('lab-lv'+lv); }
    else break;
    g=gap();
  }
  /* TOO MUCH room is the other failure, and the live page has it: the cards
     hang below the last label because sf-q22-js gives up under its own
     minimum. A shrinking mode takes the height down to the label and then
     lets the drawing and the card padding out of the way so nothing clips. */
  if(shrink && g.need < g.nat-0.5){
    R.style.setProperty('--lab-qh',Math.round(g.need)+'px');
    var qg2=34, qp=9, m=0;
    function spill(){ var v=0; $$('.qz',q).forEach(function(z){ v=Math.max(v, z.scrollHeight-z.clientHeight); }); return v; }
    while(spill()>1 && m<24){ m++;
      if(qg2>20){ qg2-=2; R.style.setProperty('--lab-qg',qg2+'px'); }
      else if(qp>4){ qp-=1; R.style.setProperty('--lab-qp',qp+'px'); }
      else break;
    }
    R.style.setProperty('--lab-tgt','0');
    return;
  }
  R.style.setProperty('--lab-qh',Math.max(g.need,g.nat)+'px');
  R.style.setProperty('--lab-tgt',Math.round(g.need-g.nat)+'');
};

/* ----------------------------------------------------------------- apply */
L.cur=null; L.lastSec=null; L.played={};
/* The page builds .cblk .dlr .q22 a second or so after the board itself, and
   re-mounts the section several times while it does. Applying to a half-built
   section wires only the groups that exist yet — which is how CONSTRUCTION
   LANGUAGE ended up outside the drawer system: never collapsed, never
   clickable. Nothing is applied until the section is whole. */
L.ready=function(){ var s=sec();
  return !!(s && $('.split',s) && $('.cblk .dlr .q22',s) && $$('.crow .tc',s).length===4); };
L.applyWhenReady=function(v,n){ n=n||0;
  if(L.ready()){ L.apply(v); return; }
  if(n<300) setTimeout(function(){ L.applyWhenReady(v,n+1); },100); };
L.apply=function(v){
  L.reset(); L.cur=v; L.lastSec=sec(); if(!v||v.id==='BASE') return;
  var s=sec(); if(!s) return;
  L.vid=v.id; R.setAttribute('data-sfdna',v.id);
  (v.m||[]).forEach(function(m){ var fn=M[m[0]]; if(fn) try{ fn(m[1]||{}); }catch(e){ console.warn('LAB mech',m[0],e); } });
  L.solve(); L.bigSlides(); [80,300,900,2000].forEach(function(t){ setTimeout(L.solve,t); setTimeout(L.bigSlides,t); });
  try{ L.ro=new ResizeObserver(function(){ L.solve(); }); L.ro.observe(s); }catch(e){}
};
/* the page rebuilds this section on its own timers for ~9s after load (its
   lab engine re-mounts the KEEP concept). When the section node changes
   identity, the current variant is re-applied to the new one. */
(function watch(){
  var m=document.getElementById('sf-lab-mount');
  if(!m){ setTimeout(watch,300); return; }
  try{ new MutationObserver(function(){
    if(L.cur&&L.cur.id!=='BASE'&&sec()&&sec()!==L.lastSec){ L.texts=[]; setTimeout(function(){ if(sec()!==L.lastSec) L.applyWhenReady(L.cur); },40); }
  }).observe(m,{childList:true}); }catch(e){}
})();
window.__SF_NOJUMP=true;
window.addEventListener('resize',function(){ setTimeout(L.solve,120); setTimeout(L.bigSlides,140); });
L.M=M; L.sec=sec;
window.__LAB=L;
})();

/* SWITCH / DRAWERS LAB — variant mechanisms.
   Injected into index.html by the lab shell. Adds mechanisms to the library
   the dev page already ships; nothing here runs on the dev page itself. */
(function(){
  if(!window.__LAB || window.__DEVLAB) return;
  window.__DEVLAB = 1;
  var L = window.__LAB, M = L.M;
  var D = document;
  function $(s,c){ return (c||D).querySelector(s); }
  function $$(s,c){ return [].slice.call((c||D).querySelectorAll(s)); }
  function sec(){ return $('#sf-lab-mount .fd'); }

  /* the library strips its own lab-* classes on reset; these are ours */
  function mark(node, cls){
    node.className += ' ' + cls;
    L.mo.push(function(){
      node.className = node.className.replace(/\bdl-[\w-]+/g,'').replace(/\s+/g,' ').trim();
    });
  }

  /* ---- the drawer bank's design ------------------------------------- */
  M.bank = function(o){
    var s = sec(); if(!s) return;
    mark(s, 'dl-bank ' + (o.v2 ? 'dl-b2 ' : '') + 'dl-bank-' + o.style);
    if(o.num){
      var i = 0;
      $$('.lab-rh', s).forEach(function(h){ i++;
        var n = D.createElement('i'); n.className = 'dl-num';
        n.setAttribute('data-sflab','1');
        n.textContent = (i<10?'0':'') + i;
        h.insertBefore(n, h.firstChild); });
    }
  };

  /* ---- the cream territories on a phone ------------------------------ */
  M.mterr = function(o){ var s = sec(); if(s) mark(s, (o.pre || 'dl-mt-') + o.mode); };

  /* ---- where the hero trace sits on a phone -------------------------- */
  M.squig = function(o){
    var s = sec(); var f = $('.oneframe', s); if(f) mark(f, 'dl-sq-' + o.mode);
  };

  /* ---- OWN / LICENSE / PARTNER ---------------------------------------
     One family per variant: same 48-unit box, same stroke, same optical
     weight. Drawn from the page's own line language, not an icon set. */
  var SYM = {
    /* 01 precision — tolerance: a form held, a form released, two forms met */
    s1: [
      '<path d="M8 12h32v24H8z"/><circle cx="24" cy="24" r="7"/>',
      '<path d="M8 12h23v24H8z"/><circle cx="34" cy="24" r="7"/>',
      '<circle cx="18" cy="24" r="9"/><circle cx="30" cy="24" r="9"/>'
    ],
    /* 02 assembly — fasteners: a fixed unit, a part drawn out, two parts joined */
    s2: [
      '<path d="M8 12h32v24H8z"/><circle cx="15" cy="19" r="2.8"/><circle cx="33" cy="29" r="2.8"/>',
      '<path d="M8 12h20v24H8z"/><circle cx="16" cy="24" r="2.8"/><path d="M34 14v20"/><path d="M28 24h12"/>',
      '<path d="M6 12h20v24H6z"/><path d="M22 12h20v24H22z"/><path d="M22 24h4"/>'
    ],
    /* 03 datum — axes: one origin, two datums apart, two datums shared */
    s3: [
      '<path d="M4 24h40"/><path d="M24 11v26"/>',
      '<path d="M4 24h40"/><path d="M15 13v22"/><path d="M35 18v12"/>',
      '<path d="M4 18h40"/><path d="M4 30h40"/><path d="M24 11v26"/>'
    ],
    /* 04 structural — frames: one divided, one carried out, two on a shared edge */
    s4: [
      '<path d="M8 12h32v24H8z"/><path d="M8 24h32"/><path d="M24 12v24"/>',
      '<path d="M8 12h19v24H8z"/><path d="M8 24h19"/><path d="M33 16h11v16H33z"/>',
      '<path d="M6 12h20v24H6z"/><path d="M22 12h20v24H22z"/>'
    ],
    /* 05 SF glyphs — brackets: a centre held, a centre propagated, a centre shared */
    s5: [
      '<path d="M13 11H6v26h7"/><path d="M35 11h7v26h-7"/><circle cx="24" cy="24" r="5"/>',
      '<path d="M13 11H6v26h7"/><circle cx="18" cy="24" r="3.6"/><circle cx="30" cy="24" r="3.6"/><circle cx="42" cy="24" r="3.6"/>',
      '<path d="M13 11H6v26h7"/><path d="M35 11h7v26h-7"/><path d="M24 13v22"/><path d="M15 24h18"/>'
    ]
    ,
    /* 06 datum / control — a datum held, transferred, shared */
    s6: [
      '<circle cx="24" cy="24" r="8.5"/><circle cx="24" cy="24" r="1.5"/>',
      '<path d="M8 12v24"/><path d="M40 12v24"/><path d="M13 24h13"/><circle cx="32" cy="24" r="3.4"/>',
      '<path d="M5 24h38"/><circle cx="17" cy="24" r="4.2"/><circle cx="31" cy="24" r="4.2"/>'
    ],
    /* 07 assembly / interface — one assembly, a module released, a shared joint */
    s7: [
      '<path d="M10 14h28v20H10z"/><path d="M10 24h28"/>',
      '<path d="M8 14h16v20H8z"/><path d="M8 24h16"/><path d="M30 18h12v12H30z"/><path d="M24 24h6"/>',
      '<path d="M8 14h16v20H8z"/><path d="M24 14h16v20H24z"/><path d="M24 14v20"/>'
    ],
    /* 08 section / component — one profile, propagated, combined */
    s8: [
      '<rect x="9" y="16" width="30" height="16" rx="6"/>',
      '<rect x="5" y="18" width="12" height="12" rx="4"/><rect x="20" y="18" width="12" height="12" rx="4"/><rect x="35" y="19.5" width="9" height="9" rx="3"/>',
      '<rect x="7" y="15" width="34" height="18" rx="6"/><path d="M24 15v18"/>'
    ],
    /* 09 geometry / relationship — a centre, a translation, an overlap */
    s9: [
      '<circle cx="24" cy="24" r="9.5"/><circle cx="24" cy="24" r="3.2"/>',
      '<circle cx="13" cy="24" r="7"/><circle cx="35" cy="24" r="7"/><path d="M24 13v22"/>',
      '<circle cx="18" cy="24" r="8.6"/><circle cx="30" cy="24" r="8.6"/>'
    ],
    /* 10 SF glyphs — contained, propagated, shared structure */
    s10: [
      '<path d="M12 13H7v22h5"/><path d="M36 13h5v22h-5"/><circle cx="24" cy="24" r="5"/><circle cx="24" cy="24" r="1.3"/>',
      '<path d="M12 13H7v22h5"/><circle cx="19" cy="24" r="4.2"/><circle cx="32" cy="24" r="4.2"/><path d="M41 17v14"/>',
      '<path d="M12 13H7v22h5"/><path d="M36 13h5v22h-5"/><circle cx="18" cy="24" r="4.2"/><circle cx="30" cy="24" r="4.2"/>'
    ]
  };
  M.vsym = function(o){
    var set = SYM[o.set]; if(!set) return;
    var syms = $$('.fund-tag .fund-sym svg');
    syms.forEach(function(sv, i){
      if(!sv.hasAttribute('data-lab-orig')){
        sv.setAttribute('data-lab-orig', sv.innerHTML);
        L.texts.push(sv);
      }
      sv.innerHTML = set[i % set.length];
      var host = sv.parentNode;
      host.className = 'fund-sym dl-sym dl-sym-' + o.set;
      L.mo.push(function(){ host.className = 'fund-sym'; });
    });
  };

  /* ---- the bespoke drawer pull ---------------------------------------
     One cue per drawer front, drawn in CSS. Never a chevron. */
  var CUE = {
    /* one family, four meanings. Cyan, drawn, never an icon set. */
    g11: [
      /* COLORS & MATERIALS — layered planes seen on the section */
      '<path d="M3 16h10"/><path d="M6.5 12h10"/><path d="M10 8h10"/>',
      /* CONSTRUCTION LANGUAGE — one tube bend on a controlled radius */
      '<path d="M3 20v-7a6 6 0 0 1 6-6h12"/>',
      /* SIGNATURE DETAILS — the same datum, recurring */
      '<path d="M4 12h16" opacity=".38"/><path d="M6 8.5v7"/><path d="M12 8.5v7"/><path d="M18 8.5v7"/>',
      /* TRANSLATION — one form carried into another */
      '<path d="M3 8h7v8H3z"/><path d="M17.5 8.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2"/>'
    ]
  };
  /* the CAPABILITIES glyph language, reused verbatim */
  var CAPG = ['\u25C7','\u2220','\u2234','\u21D5'];
  M.pull = function(o){
    var s = sec(); if(!s) return;
    var set = CUE[o.style];
    $$('.lab-rh', s).forEach(function(h, i){
      if($('.dl-cue', h)) return;
      var n = D.createElement('i');
      n.className = 'dl-cue dl-cue-' + o.style;
      n.setAttribute('data-sflab','1');
      n.setAttribute('aria-hidden','true');
      if(o.style === 'cap' || o.style === 'swb'){
        n.textContent = CAPG[i % CAPG.length];
      }else if(set){
        n.innerHTML = '<svg viewBox="0 0 24 24" focusable="false">' +
                      set[i % set.length] + '</svg>';
      }
      h.appendChild(n);
    });
  };

  /* ---- the blue sine squiggle in the SWITCH hero ----------------------
     #v11-sine-canvas is built by the page's own three.js hero script and
     parked in #fv-stage. On a phone we move that one node into the hero
     frame and place it; nothing else in the hero is touched. */
  M.sine = function(o){
    var s = sec(); var f = $('.oneframe', s); if(!f) return;
    mark(f, 'dl-sqh dl-sqh-' + o.mode);
    var W = f.ownerDocument.defaultView;
    var c = D.getElementById('v11-sine-canvas');
    if(!c) return;
    var home = c.parentNode, next = c.nextSibling;
    function phone(){ try{ return W.matchMedia('(max-width:767px)').matches; }catch(e){ return false; } }
    function place(){
      if(phone()){
        if(c.parentNode !== f){ f.appendChild(c); }
        if(c.className.indexOf('dl-sq2') < 0) c.className += ' dl-sq2';
      }else{
        if(c.parentNode === f && home){ try{ home.insertBefore(c, next); }catch(e){ home.appendChild(c); } }
        c.className = c.className.replace(/\bdl-sq2\b/g,'').trim();
      }
    }
    place();
    var rz = function(){ place(); };
    W.addEventListener('resize', rz);
    L.mo.push(function(){ W.removeEventListener('resize', rz);
      c.className = c.className.replace(/\bdl-sq2\b/g,'').trim();
      if(home && c.parentNode !== home){ try{ home.insertBefore(c, next); }catch(e){ home.appendChild(c); } } });
  };

  /* ---- the drawer bank sits on FORM & ARCHITECTURE --------------------
     Measured, not guessed: the first drawer label's text box is put on the
     same top as the left heading's, at whatever the row height is. */
  M.balign = function(){
    var s = sec(); if(!s) return;
    var rgt = $('.rgt', s); if(!rgt) return;
    var W = rgt.ownerDocument.defaultView;
    function wide(){ try{ return W.matchMedia('(min-width:1001px)').matches; }catch(e){ return true; } }
    function run(){
      rgt.style.removeProperty('margin-top');
      if(!wide()) return;                       /* stacked: nothing to align to */
      var lh = $('.lft .bhead', s) || $('.lft .bey', s);
      var rh = $('.lab-rh', s); if(!lh || !rh) return;
      var lb = lh.getBoundingClientRect(), rb = rh.getBoundingClientRect();
      if(Math.abs(lb.left - rb.left) < 40) return;   /* not side by side */
      var rt = $('.bey', rh) || rh;
      var cur = parseFloat(W.getComputedStyle(rgt).marginTop) || 0;
      var d = Math.round(lb.top - rt.getBoundingClientRect().top);
      if(d && Math.abs(d) < 120) rgt.style.setProperty('margin-top', (cur + d) + 'px', 'important');
    }
    W.requestAnimationFrame(function(){ W.requestAnimationFrame(run); });
    var t = setTimeout(run, 420);
    var rz = function(){ W.requestAnimationFrame(run); };
    W.addEventListener('resize', rz);
    L.mo.push(function(){ clearTimeout(t); W.removeEventListener('resize', rz);
      rgt.style.removeProperty('margin-top'); });
  };

  /* ---- one shared content datum --------------------------------------
     The open drawer's content starts on the top of the first FORM &
     ARCHITECTURE graphic, and every drawer uses that same gap. */
  M.cdatum = function(){
    var s = sec(); if(!s) return;
    var W = s.ownerDocument.defaultView;
    function run(){
      s.style.removeProperty('--dl-cgap');
      if(!W.matchMedia('(min-width:1001px)').matches) return;
      var g = $('.lft .nt', s) || $('.lft svg', s);
      var h = $('.lab-rh', s); if(!g || !h) return;
      var gap = Math.round(g.getBoundingClientRect().top - h.getBoundingClientRect().bottom);
      if(gap > 0 && gap < 120) s.style.setProperty('--dl-cgap', gap + 'px');
    }
    W.requestAnimationFrame(function(){ W.requestAnimationFrame(run); });
    var t = setTimeout(run, 480);
    var rz = function(){ W.requestAnimationFrame(run); };
    W.addEventListener('resize', rz);
    L.mo.push(function(){ clearTimeout(t); W.removeEventListener('resize', rz);
      s.style.removeProperty('--dl-cgap'); });
  };

  /* ---- OWN / LICENSE / PARTNER in the CAPABILITIES language ----------
     The drawn marks are hidden and the capability glyph is set in their
     place: same gold, same weight, same optical size, one fixed box. */
  M.gsym = function(){
    var G = ['\u2295','\u21A7','\u2225'];
    $$('.fund-tag .fund-sym').forEach(function(host, i){
      var sv = $('svg', host); if(!sv) return;
      sv.style.display = 'none';
      var n = D.createElement('i');
      n.className = 'dl-gsym';
      n.setAttribute('data-sflab','1');
      n.setAttribute('aria-hidden','true');
      n.textContent = G[i % G.length];
      host.appendChild(n);
      host.className = 'fund-sym dl-symhost';
      L.mo.push(function(){ sv.style.removeProperty('display');
        if(n.parentNode) n.parentNode.removeChild(n);
        host.className = 'fund-sym'; });
    });
  };

  /* ---- the drawer bank on the FORM & ARCHITECTURE datum, measured on
     the rendered text rather than on the boxes around it --------------- */
  M.balign2 = function(){
    var s = sec(); if(!s) return;
    var rgt = $('.rgt', s); if(!rgt) return;
    var W = rgt.ownerDocument.defaultView, DD = rgt.ownerDocument;
    function textTop(el){
      try{ var r = DD.createRange(); r.selectNodeContents(el);
        var b = r.getBoundingClientRect();
        return b.height ? b.top : el.getBoundingClientRect().top;
      }catch(e){ return el.getBoundingClientRect().top; }
    }
    function run(){
      rgt.style.removeProperty('margin-top');
      if(!W.matchMedia('(min-width:1001px)').matches) return;
      var lh = $('.lft .bhead .bey', s) || $('.lft .bhead', s);
      var rh = $('.lab-rh', s); if(!lh || !rh) return;
      if(Math.abs(lh.getBoundingClientRect().left - rh.getBoundingClientRect().left) < 40) return;
      var rt = $('.bey', rh) || rh;
      var cur = parseFloat(W.getComputedStyle(rgt).marginTop) || 0;
      var d = Math.round(textTop(lh) - textTop(rt));
      if(d && Math.abs(d) < 140) rgt.style.setProperty('margin-top', (cur + d) + 'px', 'important');
    }
    W.requestAnimationFrame(function(){ W.requestAnimationFrame(run); });
    var t = setTimeout(run, 460);
    var rz = function(){ W.requestAnimationFrame(run); };
    W.addEventListener('resize', rz);
    L.mo.push(function(){ clearTimeout(t); W.removeEventListener('resize', rz);
      rgt.style.removeProperty('margin-top'); });
  };
})();

/* =======================================================================
   SWITCH DNA — the live section.
   Applies the approved state to #sf-lab-mount once the page has built it,
   and re-applies if the page re-mounts the section on its own timers.
   Remove this file's two tags from index.html to return to the page as it
   was; nothing above is modified.
   ======================================================================= */
(function(){
  var V={"id": "11", "title": "FINAL TBC", "thesis": "One quiet row repeated four times: same surface, same rule, same bounds, open or closed. Selection is carried by the SWITCH blue title and the symbol, which rotates 45 degrees on its own centre exactly as CAPABILITIES does. Heading on the FORM & ARCHITECTURE line, swatches on the extraction graphics datum, one gap for every drawer.", "m": [["chapters", {"names": ["THE PARENT", "THE EXTRACTION", "THE TRANSLATION"], "style": "bare", "hero": false, "cream": false}], ["intro", {"h4": "ACQUIRED <span class=\"sw-cy\">ASSET.</span>", "p": "SWITCH was acquired in 2025 out of liquidation. A strong product with clear DNA — the opportunity was to preserve it and build a new business around it. This is the preservation, done as engineers do it: read, measured, recorded.", "type": "quiet"}], ["grid", {"mode": "m16"}], ["board", {"mode": "tight"}], ["cmf", {"mode": "chip", "exact": true, "minimal": true, "head": "Colors &amp; materials", "labels": ["Aluminium", "Rubber", "SWITCH blue", "HV orange"]}], ["construction", {"mode": "two"}], ["rhythm", {"mode": "tight"}], ["cream", {"mode": "syn47k"}], ["dividers", {"mode": "few"}], ["bridge", {"type": "one", "row": 0, "place": "rgt", "anim": "none", "hold": false, "head": "Translation"}], ["boundary", {"mode": "flush"}], ["territories", {"mode": "typo"}], ["creamHead", {"html": "SAME PRINCIPLES.<br>NEW <span class=\"dl-hi\">OBJECTS.</span>"}], ["creamArt", {"mode": "reduce"}], ["extra", {"groups": ["sd"]}], ["rgrid", {"mode": "free"}], ["rint", {"mode": "drawer", "start": 0, "toggle": true}], ["drawer", {"style": "foundry", "hit": true}], ["bank", {"style": "w11", "num": false, "v2": true}], ["pull", {"style": "swb"}], ["seam", {"mode": "fade"}], ["tcolor", {"mode": "type"}], ["crule", {"mode": "none"}], ["mterr", {"mode": "n11", "pre": "dl-mt2-"}], ["sine", {"mode": "h11"}], ["vsym", {"set": "s9"}], ["balign2", {}], ["cdatum", {}]], "notes": ""}, CLS="dl-cr-faint";
  if(window.self!==window.top) return;      /* the lab drives the section itself */
  function stamp(){
    var s=document.querySelector('#sf-lab-mount .fd');
    if(s && CLS && s.className.indexOf(CLS.split(' ')[0])<0) s.className+=' '+CLS;
  }
  function boot(n){
    if(!window.__LAB || !document.querySelector('#sf-lab-mount .fd .split')){
      if(n<300) setTimeout(function(){ boot(n+1); },120); return; }
    try{
      if(window.__LAB.applyWhenReady) window.__LAB.applyWhenReady(V);
      else window.__LAB.apply(V);
    }catch(e){ console.warn('SWITCH DNA',e); }
    [260,700,1400,2600].forEach(function(ms){ setTimeout(stamp,ms); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ boot(0); });
  else boot(0);
})();
