/* ============================================================
   DESIGNED DNA — put on the TEAM PAGE'S rule, not its own.

   Measured side by side, the two blocks do not disagree about the
   column width. They disagree about the MECHANISM, which is why
   they drift apart as the window narrows.

     team page      .tm-ctr   max-width:1024px; margin-inline:auto
                    .tm-pair  464px 464px; gap:96px

     designed dna   an asymmetric inline padding on the grid —
                    168/152 at 1440, 56/40 from 1024 to 1200 —
                    with the same 464 464 / 96 inside it

   Same at 1440 (8px apart), different everywhere else:

            width     team              designed dna
            1440      464+464 @ 208     464+464 @ 216
            1200      464+464 @  88     472+472 @ 104
            1024      440+440 @  51     392+392 @ 104

   So DESIGNED DNA is given the team's block verbatim — a centred
   1024 — and its columns then equal the team's by construction
   rather than by coincidence.

   Two things fall out of that:
     - the eyebrow rule ran the full 48 -> 1392 while the text
       stopped at 1240. It now ends where the text ends.
     - the paragraph was 16px on `normal` leading against the
       team's 13.6/27.2 — same 464 column, ~62 characters a line
       against ~75. It is put on the team's type.

   Below the point where the PAGE ITSELF chooses two columns, none
   of this applies; the phone layout is handled separately.
   ============================================================ */
(function(){
 var SEL='.dl-s204.dl-cols';

 function grid(){ return document.querySelector(SEL); }

 /* WHICH LAYOUT IS THE PAGE ACTUALLY IN?

    The first version assumed "901 and up = two columns". It is not. The page
    keeps DESIGNED DNA in ONE column until about 1000 and only then splits it.
    Forcing two tracks at 901 produced the broken hybrid seen on a 941-wide
    window: the eyebrow rule stopped half way, the list sat in the right-hand
    column, and the paragraph wrapped underneath it with a screen of dead space
    between them.

    So nothing is assumed. The page's own grid is read first — with our
    overrides taken off, so we are reading the page and not ourselves — and the
    widening is applied ONLY when the page has already chosen two columns. */
 function trackCount(v){
  if(!v||v==='none')return 0;
  return v.trim().split(/\s+(?![^(]*\))/).length;
 }

 /* Everything this script writes onto the grid, split in two.

    PROBE are ours alone — removing them reveals the page's own layout, which
    is how the track count is read without guessing a breakpoint.

    The PADDING is NOT ours. The page writes it inline and rewrites it at every
    width (168/152 at 1440, 56/40 at 1024, 48/48 at 900, none on a phone).
    Removing it to "read the page" threw the page's own value away: between 769
    and 999 the content jumped 48px outward and the eyebrow bled to the very
    edge of the screen. So the padding is saved before it is overwritten and
    handed back verbatim. */
 var PROBE=['max-width','margin-left','margin-right',
            'column-gap','grid-template-columns'];
 var owns=false, pagePad=['',''];
 var lastW=-1, wide=false, eyebrow=null;

 function findEyebrow(g){
  /* The DESIGNED DNA eyebrow row cancels the grid's padding with matching
     NEGATIVE margins so it can sit at the section edge while the two columns
     stay inset. Take the padding away and those margins have nothing left to
     cancel: the eyebrow ran 120px off BOTH sides of a 1440 screen. They have
     to come off together. */
  var hit=null;
  [].forEach.call(g.children,function(c){
   if(hit)return;
   var cs=getComputedStyle(c);
   if(parseFloat(cs.marginLeft)<-1||parseFloat(cs.marginRight)<-1)hit=c;
  });
  return hit;
 }

 function apply(){
  var g=grid();
  if(!g)return false;
  remember(g);

  if(innerWidth!==lastW){
   lastW=innerWidth;
   /* Read the PAGE, not our own handiwork — but read it without wiping the
      page's inline padding, which it rewrites itself on every resize. Only
      the properties we author are taken off; grid-template-columns comes
      from a stylesheet, so removing our inline copy reveals the page's. */
   PROBE.forEach(function(k){g.style.removeProperty(k);});
   if(eyebrow)restore(eyebrow);
   eyebrow=findEyebrow(g);
   if(eyebrow)remember(eyebrow);
   wide=innerWidth>=901&&trackCount(getComputedStyle(g).gridTemplateColumns)>=2;
  }
  if(!eyebrow)eyebrow=findEyebrow(g);
  if(eyebrow)remember(eyebrow);

  if(!wide){
   /* one column — the page's own layout stands, and anything we wrote on a
      wider screen has to come off or the block stays pinned at 1024.
      padding included: the page owns it inline and rewrites it per width. */
   PROBE.forEach(function(k){g.style.removeProperty(k);});
   if(owns){
    owns=false;
    if(pagePad[0])g.style.setProperty('padding-left',pagePad[0]);
    else g.style.removeProperty('padding-left');
    if(pagePad[1])g.style.setProperty('padding-right',pagePad[1]);
    else g.style.removeProperty('padding-right');
   }
   return true;
  }

  if(eyebrow){
   /* the eyebrow row cancels the grid's padding with matching NEGATIVE
      margins so it can reach the section edge while the columns stay inset.
      Take the padding away and those margins have nothing left to cancel —
      the eyebrow ran 120px off BOTH sides of a 1440 screen. They come off
      together, and the rule then ends where the text ends. */
   eyebrow.style.setProperty('margin-left','0px','important');
   eyebrow.style.setProperty('margin-right','0px','important');
  }
  /* the team page's block, verbatim. The padding is inline and so beats any
     stylesheet — it has to be cleared here, not overridden in CSS. Its value
     is pocketed first so it can be handed straight back. */
  if(!owns){ owns=true; pagePad=[g.style.paddingLeft,g.style.paddingRight]; }
  g.style.setProperty('padding-left','0px','important');
  g.style.setProperty('padding-right','0px','important');
  /* Above the site's 1600 frame a 1024 block floats: every other section on
     this page starts its content at the frame edge (480 at 2560) while
     DESIGNED DNA started at 768 — 288px further in, which is what reads as
     off-centre. Past the frame it takes the frame, like everything else. */
  g.style.setProperty('max-width',(innerWidth>1601?'none':'1024px'),'important');
  g.style.setProperty('margin-left','auto','important');
  g.style.setProperty('margin-right','auto','important');
  /* the team page's own breakpoint, copied rather than approximated:
       above 1090   464px 464px, gap 96
       to 1090      1fr 1fr,     gap clamp(24px,4vw,56px)
     Hard-coding 464/96 all the way down pushed the right-hand column 48px
     off a 1024 screen, because that is exactly the width at which the team
     page stops using fixed tracks. */
  if(innerWidth>1601){
   g.style.setProperty('grid-template-columns','1fr 1fr','important');
   g.style.setProperty('column-gap','96px','important');
  }else if(innerWidth>1090){
   g.style.setProperty('grid-template-columns','464px 464px','important');
   g.style.setProperty('column-gap','96px','important');
  }else{
   g.style.setProperty('grid-template-columns','1fr 1fr','important');
   g.style.setProperty('column-gap','clamp(24px,4vw,56px)','important');
  }
  return true;
 }

 /* ---------- THE LEFT COLUMN IS PROSE NOW -----------------------------
    The eight name/definition pairs are replaced by three paragraphs. The list
    element is hidden rather than emptied, so whatever builds it can keep doing
    so without fighting this, and the group hairlines go with it — there is no
    longer a group to divide. */
 var PROSE=[
  'SWITCH DNA is an industrial design language built around honest engineering '+
  'rather than decoration. Products use simple rectilinear forms, balanced '+
  'proportions and exposed structure, with functional components becoming part '+
  'of the visual identity rather than being hidden.',

  'Materials are presented honestly: brushed metal looks like metal, polymers '+
  'remain matte and functional, fasteners and welds stay visible, and details '+
  'such as ribbing, fins, tubes, clamps and hardware come directly from '+
  'engineering requirements. Products are designed around straightforward '+
  'manufacturing and assembly, with modular components that can be replaced, '+
  'serviced and recombined.',

  'The result is a distinctive, engineered aesthetic that can be recognised '+
  'across different product categories without relying on a logo.'
 ];

 function prose(){
  var t=table(); if(!t)return;
  t.style.setProperty('display','none','important');
  /* the hairlines that divided Intangible from Tangible */
  var g=grid(); if(g)[].forEach.call(g.querySelectorAll('.dl-tr'),function(r){
   r.style.setProperty('display','none','important');});

  var box=document.getElementById('sf-ddna-prose');
  if(!box){
   box=document.createElement('div');
   box.id='sf-ddna-prose';
   PROSE.forEach(function(txt,i){
    var q=document.createElement('p');
    q.textContent=txt;
    q.style.cssText='margin:0 0 '+(i===PROSE.length-1?'0':'18px')+' 0;';
    box.appendChild(q);
   });
   t.parentNode.insertBefore(box,t);
  }
  /* the same type as the right-hand column, and the site's measure */
  [].forEach.call(box.querySelectorAll('p'),function(q){
   q.style.setProperty('font-family',DM,'important');
   q.style.setProperty('font-size','13.6px','important');
   q.style.setProperty('line-height','27.2px','important');
   q.style.setProperty('font-weight','300','important');
   q.style.setProperty('color','rgba(10,10,10,0.55)','important');
   q.style.setProperty('max-width','min(100%,680px)','important');
   /* the FIRST paragraph came out wide-tracked: the section styles the first
      child of this column as a label. Everything the label rule sets has to be
      named explicitly, not just the font. */
   q.style.setProperty('letter-spacing','normal','important');
   q.style.setProperty('text-transform','none','important');
   q.style.setProperty('font-style','normal','important');
  });
 }

 /* ---------- THE EYEBROW PAIR (study option 2) ------------------------
    The Foundry puts one eyebrow over each column and no rule under either:
    DM Sans 10.88px · 0.25em · weight 400 · uppercase · gold · 34px below.

    DESIGNED DNA carried ONE eyebrow spanning both columns, in teal at weight
    300, with a 0.5px rule across the whole block underneath. It becomes a
    pair, the rule goes, and INTANGIBLE / TANGIBLE go with it — they were set
    at the same 10.88px as the eyebrow and read as its equal. Their hairlines
    stay, so the break between the two groups is still marked. */
 var GOLD='rgb(200,169,110)';
 var DM="'DM Sans',sans-serif";
 var RIGHT='The Platform';

 function ebStyle(e){
  var set=function(x){
   x.style.setProperty('font-family',DM,'important');
   x.style.setProperty('font-size','10.88px','important');
   x.style.setProperty('letter-spacing','0.25em','important');
   x.style.setProperty('font-weight','400','important');
   x.style.setProperty('text-transform','uppercase','important');
   x.style.setProperty('color',GOLD,'important');};
  set(e);
  [].forEach.call(e.querySelectorAll('*'),set);
  e.style.setProperty('margin-bottom','34px','important');
 }

 function eyebrows(){
  var g=grid(); if(!g)return;
  var row=g.children[0]; if(!row)return;
  row.id='sf-ddna-row';

  var text=null;
  /* EVERY textless child of the row goes, not the first one found. The row
     holds two: a 12px spacer and the 0.5px rule. Hiding "the first textless
     child" hid the spacer and left the rule drawing. Neither is wanted here,
     and hiding both is re-asserted every pass because the section rebuilds
     itself and a fresh, unhidden rule reappears. */
  [].forEach.call(row.children,function(c){
   if(c.id==='sf-ddna-eb2')return;
   if((c.textContent||'').trim()){ if(!text)text=c; return; }
   c.style.setProperty('display','none','important');
  });
  if(!text)return;

  var eb2=document.getElementById('sf-ddna-eb2');
  if(!eb2){
   eb2=text.cloneNode(true);
   eb2.id='sf-ddna-eb2';
   text.parentNode.insertBefore(eb2,text.nextSibling);
  }
  var leaf=eb2; while(leaf.children.length===1)leaf=leaf.children[0];
  if((leaf.textContent||'').trim()!==RIGHT)leaf.textContent=RIGHT;

  if(innerWidth<=900||!wide){
   /* one column — the second eyebrow has nothing to sit over */
   eb2.style.setProperty('display','none','important');
   row.style.removeProperty('display');
   row.style.removeProperty('grid-template-columns');
   row.style.removeProperty('column-gap');
  }else{
   var gc=getComputedStyle(g);
   eb2.style.removeProperty('display');
   row.style.setProperty('display','grid','important');
   row.style.setProperty('grid-template-columns',gc.gridTemplateColumns,'important');
   row.style.setProperty('column-gap',gc.columnGap,'important');
   row.style.setProperty('align-items','end','important');
  }
  /* the row's own negative margins used to cancel the block's padding; with the
     padding gone they would throw the eyebrows off the left edge. */
  row.style.setProperty('margin-left','0px','important');
  row.style.setProperty('margin-right','0px','important');
  ebStyle(text); ebStyle(eb2);

  /* INTANGIBLE / TANGIBLE step aside */
  [].forEach.call(g.querySelectorAll('*'),function(e){
   if(e.children.length)return;
   if(!/^(intangible|tangible)$/i.test((e.textContent||'').trim()))return;
   e.parentElement.style.setProperty('display','none','important');
  });
 }

 /* ---------- THE PARAGRAPH ---------------------------------------
    The copy was NOT set at a different size — that was a red herring from
    measuring the wrapper. The real difference is a cap on the copy itself:

        the wrapper   464px wide, font-size 16px   (never used for text)
        the copy      max-width: min(100%, 340px), 13.6px

    So the paragraph drew 340px of text inside a 464px column and stopped —
    124px short of the column it lives in, while the team page's paragraph
    fills its 464 completely. That is the width difference you can see.

    The cap is lifted to the full column and the leading put on the team's
    27.2px. Applied to the copy AND its wrapper, since the cap sits on the
    inner element. */
 function paraEl(){
  var g=grid(); if(!g)return null;
  var para=null;
  [].forEach.call(g.querySelectorAll('*'),function(e){
   if(para||e.children.length>2)return;
   if(/^These principles/.test((e.textContent||'').trim()))para=e;});
  return para;
 }

 /* The paragraph started 19px ABOVE the first principle, because the list
    carries a group hairline the paragraph column does not. Rather than guess a
    number, the two tops are measured and the difference put on the paragraph's
    wrapper — so it stays aligned whatever the type does. */
 function topAlign(){
  var g=grid(); if(!g)return;
  var t=table(); if(!t)return;
  var box=document.getElementById('sf-ddna-prose');
  var first=box?box.querySelector('p'):t.querySelector('.dl-tk');
  var para=paraEl();
  if(!first||!para)return;
  /* the wrapper is the grid's DIRECT CHILD, not the paragraph's immediate
     parent — which is the grid itself. Padding the grid moved both columns
     down together, so the gap never closed and the block simply grew: the
     value had crept to 129.5px while the paragraph was still 18px high. */
  var wrap=para;
  while(wrap.parentElement&&wrap.parentElement!==g)wrap=wrap.parentElement;
  if(!wrap||wrap===g)return;
  g.style.removeProperty('padding-top');
  if(innerWidth<=900||!wide){ wrap.style.removeProperty('padding-top'); return; }
  /* Compare where the TEXT sits, not where the boxes sit. The paragraph is the
     grid's direct child, so padding it moves its text but leaves its box top
     exactly where it was — the measured gap never closed and the padding ran
     away to 173px while the paragraph still sat 18px high. A Range gives the
     first line's real top on both sides, so this converges in one pass. */
  function textTop(el){
   var r=document.createRange(); r.selectNodeContents(el);
   var rects=r.getClientRects();
   return rects.length?rects[0].top:el.getBoundingClientRect().top;
  }
  var pad=parseFloat(getComputedStyle(wrap).paddingTop)||0;
  var d=textTop(first)-textTop(para);
  if(Math.abs(d)<0.5)return;
  var want=Math.max(0,Math.round((pad+d)*100)/100);
  wrap.style.setProperty('padding-top',want+'px','important');
 }

 function table(){ return document.querySelector('.dl-tbl-s204'); }

 function paraType(){
  var g=grid(); if(!g)return;
  var para=null;
  [].forEach.call(g.querySelectorAll('*'),function(e){
   if(para)return;
   if(e.children.length>2)return;
   if(/^These principles/.test((e.textContent||'').trim()))para=e;
  });
  if(!para)return;
  var set=function(e){
   /* min(100%,680px) rather than a flat 100%: below 1601 the column is 464 so
      the cap never bites and the paragraph fills it exactly as the team page
      does, but once the block takes the 1600 frame the column is 752 and the
      line ran to about 105 characters. 680 is the site's measure. */
   e.style.setProperty('max-width','min(100%,680px)','important');
   e.style.setProperty('font-size','13.6px','important');
   e.style.setProperty('line-height','27.2px','important');
  };
  set(para);
  [].forEach.call(para.querySelectorAll('span,p,div'),set);
 }


 /* ---------- MOBILE ----------------------------------------------
    Measured on a 390 phone: the section ran 2,284px — 2.7 full screens.
    Three causes, all addressed here.

    1  Each principle took TWO lines. The list is a grid of alternating
       .dl-tk (the name) and .dl-tv (the description); collapsed to one
       column every one of them got its own row — sixteen rows, 625px,
       and each pair looks identical so it reads as a wall. Two columns
       puts each principle on ONE line. The group headings (Intangible /
       Tangible) and their rules span both, so the structure still reads.

    2  102px of dead air between "Built to be opened." and the paragraph
       — the outer grid's 48px row gap plus the list's own spacing.

    3  The paragraph arrived AFTER the list, so you scrolled a wall of
       names before being told what they were for. It goes first now,
       and the eight principles read as the summary.
    ---------------------------------------------------------------- */
 var MOB='sf-ddna-mob';
 /* the page's own phone rules win the cascade against anything reasonable
    here, so the two-column list is written INLINE with !important — the one
    thing no stylesheet can outrank. Cleared again above 900. */
 /* The width of the name column, measured rather than guessed.

    Three CSS spellings were tried first and each failed for its own reason:
      52% 1fr                    gave the names a 374px column at 768 — three
                                 times the widest name — and squeezed the
                                 descriptions into three lines at 320.
      fit-content(46%) 1fr       Chrome let the track fall BELOW the longest
                                 unbreakable word, so MANUFACTURING and
                                 SERVICEABILITY drew straight over their
                                 descriptions.
      minmax(min-content,
             fit-content(46%))   invalid — minmax() does not accept
                                 fit-content(), so the whole declaration was
                                 dropped and the list silently fell back to one
                                 column below 768.

    So it is measured: ask the browser for the two intrinsic widths, then take
      max( longest unbreakable word , min( widest name , 46% of the row ) )
    — never narrower than a word can be, never wider than the longest name,
    and it yields to the descriptions on a small screen. */
 function track(t){
  var row=t.getBoundingClientRect().width||320;
  function widest(kind){
   t.style.setProperty('grid-template-columns',kind+' 1fr','important');
   var w=0;
   [].forEach.call(t.querySelectorAll('.dl-tk'),function(k){
    var r=document.createRange(); r.selectNodeContents(k);
    var b=r.getBoundingClientRect();
    if(b.width>w)w=b.width;});
   return w;
  }
  var mx=widest('max-content');      /* the longest name, unwrapped   */
  var mn=widest('min-content');      /* the longest single WORD       */
  return Math.round(Math.max(mn,Math.min(mx,row*0.46)));
 }

 /* Leaving mobile RESTORES, it does not delete.

    The first version called removeProperty() to undo itself above 900. That
    removed the page builder's OWN inline styles as well as mine — the list is
    given its display:grid and its two tracks inline by the builder — so every
    desktop width came back as a single column and the list grew from 345 to
    427. Nothing on desktop was supposed to change at all.

    So the original style attribute is photographed once, before anything is
    touched, and put back verbatim. */
 function remember(el){
  if(el.__sfOrig===undefined)el.__sfOrig=el.getAttribute('style')||'';
  return el;
 }
 function restore(el){
  if(el.__sfOrig===undefined)return;
  if(el.__sfOrig)el.setAttribute('style',el.__sfOrig);
  else el.removeAttribute('style');
 }

 function twoCol(){
  var t=document.querySelector('.dl-tbl-s204');
  if(!t)return;
  var on=innerWidth<=900;
  remember(t);
  [].forEach.call(t.children,function(c){
   remember(c);
   [].forEach.call(c.querySelectorAll('span'),remember);
  });

  if(!on){
   restore(t);
   [].forEach.call(t.children,function(c){
    restore(c);
    [].forEach.call(c.querySelectorAll('span'),restore);
   });
   return;
  }

  t.style.setProperty('display','grid','important');
  t.style.setProperty('grid-template-columns',track(t)+'px 1fr','important');
  t.style.setProperty('column-gap','12px','important');
  t.style.setProperty('row-gap','0px','important');
  t.style.setProperty('align-items','baseline','important');

  [].forEach.call(t.children,function(c){
   var isCell=/\bdl-tk\b|\bdl-tv\b/.test((c.className||'').toString());
   if(!isCell){ c.style.setProperty('grid-column','1/-1','important'); return; }
   /* the page's own phone rules span the cells across BOTH columns below 768 —
      which is why the two-column list first appeared at 768 and not at 390.
      Un-spanned explicitly, inline. */
   c.style.setProperty('grid-column','auto','important');
   c.style.setProperty('white-space','normal','important');
   c.style.setProperty('min-width','0','important');
   c.style.setProperty('height','auto','important');
   c.style.setProperty('min-height','0','important');
   c.style.setProperty('padding','7px 0','important');
   /* the name is not the cell — it is a <span> inside it carrying an inline
      white-space:nowrap. Setting the cell alone left SIGNATURE DETAILS
      overflowing its column silently: the box measured 125px while the text
      drew 175px, so a bounding-box check saw no collision while the eye did. */
   [].forEach.call(c.querySelectorAll('span'),function(s){
    s.style.setProperty('white-space','normal','important');});
  });
 }

 function mobile(){
  var st=document.getElementById(MOB);
  if(!st){ st=document.createElement('style'); st.id=MOB; document.body.appendChild(st); }
  var G='html body '+SEL;
  st.textContent=
   '@media(max-width:900px){'+
    /* each principle on one line */
    'html body .dl-tbl-s204{display:grid !important;'+
     'grid-template-columns:46% 1fr !important;'+
     'column-gap:12px !important;row-gap:0 !important;align-items:baseline !important;}'+
    /* the headings and rules keep the full width */
    'html body .dl-tbl-s204 > div:not(.dl-tk):not(.dl-tv){grid-column:1/-1 !important;}'+
    'html body .dl-tbl-s204 .dl-tk,html body .dl-tbl-s204 .dl-tv{'+
     'height:auto !important;min-height:0 !important;padding:7px 0 !important;}'+
    /* the dead air */
    G+'{row-gap:40px !important;}'+
    /* the explanation first, the principles second */
    G+' > *:nth-child(2){order:3 !important;}'+
    G+' > *:nth-child(3){order:2 !important;}'+
   '}';
 }

 var n=0;
 (function poll(){ var ok=apply(); mobile(); paraType(); eyebrows(); prose(); topAlign(); if(++n<80)setTimeout(poll,ok?500:120); })();
 addEventListener('resize',function(){ apply(); paraType(); eyebrows(); prose(); topAlign(); });
})();
