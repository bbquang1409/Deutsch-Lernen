/* ============================================================
   MITEINANDER B1 – Shared Wortschatz Exercise Engine
   Dùng chung cho Lektion 05–12 (và retrograde 01–04)
   
   Required globals (set BEFORE loading this script):
     LEKTION_NUM    e.g. "05"
     LEKTION_TITLE  e.g. "Zofia – Vielfalt in Neuberg"
     WORDS          array from LXX_data.js
     DIALOGS        array from LXX_data.js
   ============================================================ */

(function(){
"use strict";

/* ── helpers ── */
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function shuffle(a){let b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function pick(arr,n){return shuffle(arr).slice(0,n);}
function normVI(s){return s.toLowerCase().normalize('NFC').replace(/[.!?,;]/g,'').trim();}
function checkVI(inp,word){
  const v=normVI(inp);
  if(!v) return false;
  const alts=[word.vi,...(word.vi_alts||[])].map(normVI);
  return alts.some(a=>v===a||a.includes(v)||v.includes(a));
}
function normDE(s){return s.toLowerCase().normalize('NFC').replace(/[.!?,;]/g,'').trim();}
function tts(text){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='de-DE'; u.rate=0.9;
  window.speechSynthesis.speak(u);
}

/* ── state ── */
let studentName='';
let timerStart=null, timerInterval=null;
let tabScores={};   // {tabId: {got, total}}

/* ── pick words for exercises ── */
const W = WORDS;
const D = DIALOGS;

/* 7 exercise type labels */
const TAB_LABELS = [
  {id:'de-vi',   icon:'🇩🇪→🇻🇳', label:'DE → VI'},
  {id:'vi-de',   icon:'🇻🇳→🇩🇪', label:'VI → DE'},
  {id:'def',     icon:'📖',       label:'Definition'},
  {id:'mc',      icon:'🎯',       label:'Multiple Choice'},
  {id:'dialog',  icon:'💬',       label:'Dialog'},
  {id:'anagram', icon:'🔤',       label:'Anagramm'},
  {id:'bank',    icon:'🏦',       label:'Wortbank'},
];

/* ── render tabs ── */
function renderTabs(){
  const wrap=$('#tabs');
  wrap.innerHTML='';
  TAB_LABELS.forEach((t,i)=>{
    const b=document.createElement('button');
    b.className='tab'+(i===0?' active':'');
    b.dataset.tab=t.id;
    b.textContent=t.icon+' '+t.label;
    b.onclick=()=>switchTab(t.id);
    wrap.appendChild(b);
  });
}

function switchTab(id){
  $$('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  $$('.section').forEach(s=>s.classList.toggle('active', s.id==='sec-'+id));
}

/* ── build sections ── */
function buildAll(){
  const main=$('#main');
  main.innerHTML='';
  buildDeVi(main);
  buildViDe(main);
  buildDef(main);
  buildMC(main);
  buildDialog(main);
  buildAnagram(main);
  buildBank(main);
}

/* ─── 1. DE→VI ─── */
function buildDeVi(main){
  const words=pick(W,10);
  const sec=mkSec('de-vi');
  const card=mkCard('🇩🇪→🇻🇳','DE → VI','8 Pkt.','t-vok');
  const body=mkBody('Schreiben Sie die vietnamesische Bedeutung.');
  const grid=el('div','wgrid');
  words.forEach((w,i)=>{
    const item=el('div','witem');
    const lbl=el('div','wlabel'); lbl.textContent=(i+1)+'. '+(w.art?w.art+' ':'')+w.de;
    const inp=el('input','inp'); inp.type='text'; inp.placeholder='Tiếng Việt…'; inp.dataset.i=i;
    item.append(lbl,inp);
    grid.appendChild(item);
  });
  body.appendChild(grid);
  card.appendChild(body);
  const [btn,res,panel]=mkFooter('de-vi',words,checkDeVi.bind(null,words,grid));
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}
function checkDeVi(words,grid,btn,res,panel){
  let got=0;
  $$('#sec-de-vi .inp').forEach((inp,i)=>{
    const ok=checkVI(inp.value,words[i]);
    inp.classList.toggle('ok',ok); inp.classList.toggle('no',!ok);
    if(ok) got++;
    inp.disabled=true;
  });
  finalizeTab('de-vi',got,words.length,btn,res,panel,words.map(w=>({de:(w.art?w.art+' ':'')+w.de,vi:w.vi,ex:w.ex})));
}

/* ─── 2. VI→DE ─── */
function buildViDe(main){
  const words=pick(W,10);
  const sec=mkSec('vi-de');
  const card=mkCard('🇻🇳→🇩🇪','VI → DE','8 Pkt.','t-vok');
  const body=mkBody('Schreiben Sie das deutsche Wort (mit Artikel).');
  const grid=el('div','wgrid');
  words.forEach((w,i)=>{
    const item=el('div','witem');
    const lbl=el('div','wlabel'); lbl.textContent=(i+1)+'. '+w.vi;
    const row=el('div','def-input-row');
    if(w.art){
      const art=el('input','inp def-art'); art.type='text'; art.placeholder='der/die/das'; art.dataset.art=i;
      row.appendChild(art);
    }
    const inp=el('input','inp'); inp.type='text'; inp.placeholder='Deutsch…'; inp.dataset.i=i;
    row.appendChild(inp);
    item.append(lbl,row);
    grid.appendChild(item);
  });
  body.appendChild(grid);
  card.appendChild(body);
  const [btn,res,panel]=mkFooter('vi-de',words,checkViDe.bind(null,words,grid));
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}
function checkViDe(words,grid,btn,res,panel){
  let got=0;
  const inps=[...$$('#sec-vi-de .inp')];
  let ii=0;
  words.forEach((w,i)=>{
    let artOk=true;
    if(w.art){
      const artInp=inps[ii++];
      artOk=normDE(artInp.value)===w.art.toLowerCase();
      artInp.classList.toggle('ok',artOk); artInp.classList.toggle('no',!artOk);
      artInp.disabled=true;
    }
    const wordInp=inps[ii++];
    const wordOk=normDE(wordInp.value)===normDE(w.de.replace(/^(der|die|das)\s+/i,''));
    wordInp.classList.toggle('ok',wordOk); wordInp.classList.toggle('no',!wordOk);
    wordInp.disabled=true;
    if(artOk&&wordOk) got++;
  });
  finalizeTab('vi-de',got,words.length,btn,res,panel,words.map(w=>({de:(w.art?w.art+' ':'')+w.de,vi:w.vi,ex:w.ex})));
}

/* ─── 3. Definition ─── */
function buildDef(main){
  const words=pick(W.filter(w=>w.ex),8);
  const sec=mkSec('def');
  const card=mkCard('📖','Definition','8 Pkt.','t-def');
  const body=mkBody('Welches Wort passt zur Erklärung?');
  words.forEach((w,i)=>{
    const item=el('div','def-item');
    const tag=el('div','def-tag'); tag.textContent='Wort '+(i+1);
    const txt=el('div','def-text'); txt.textContent=w.ex;
    const row=el('div','def-input-row');
    if(w.art){
      const art=el('input','inp def-art'); art.type='text'; art.placeholder='der/die/das'; art.dataset.art=i;
      row.appendChild(art);
    }
    const inp=el('input','inp def-word'); inp.type='text'; inp.placeholder='Wort eingeben…'; inp.dataset.i=i;
    row.appendChild(inp);
    item.append(tag,txt,row);
    body.appendChild(item);
  });
  card.appendChild(body);
  const [btn,res,panel]=mkFooter('def',words,checkDef.bind(null,words));
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}
function checkDef(words,btn,res,panel){
  let got=0;
  const inps=[...$$('#sec-def .inp')];
  let ii=0;
  words.forEach((w,i)=>{
    let artOk=true;
    if(w.art){
      const artInp=inps[ii++];
      artOk=normDE(artInp.value)===w.art.toLowerCase();
      artInp.classList.toggle('ok',artOk); artInp.classList.toggle('no',!artOk);
      artInp.disabled=true;
    }
    const wordInp=inps[ii++];
    const wordOk=normDE(wordInp.value)===normDE(w.de.replace(/^(der|die|das)\s+/i,''));
    wordInp.classList.toggle('ok',wordOk); wordInp.classList.toggle('no',!wordOk);
    wordInp.disabled=true;
    if(artOk&&wordOk) got++;
  });
  finalizeTab('def',got,words.length,btn,res,panel,words.map(w=>({de:(w.art?w.art+' ':'')+w.de,vi:w.vi,ex:w.ex})));
}

/* ─── 4. Multiple Choice ─── */
function buildMC(main){
  const base=pick(W,8);
  const sec=mkSec('mc');
  const card=mkCard('🎯','Multiple Choice','8 Pkt.','t-mc');
  const body=mkBody('Wählen Sie die richtige Bedeutung.');
  const states=[];
  base.forEach((w,i)=>{
    const wrong=shuffle(W.filter(x=>x.de!==w.de)).slice(0,3);
    const opts=shuffle([w,...wrong]);
    const item=el('div','mc-item');
    const prompt=el('div','mc-prompt'); prompt.textContent=(i+1)+'. '+(w.art?w.art+' ':'')+w.de;
    const grid=el('div','mc-opts');
    const st={answered:false,correct:false};
    opts.forEach(o=>{
      const btn=el('button','mc-opt'); btn.textContent=o.vi;
      btn.onclick=()=>{
        if(st.answered) return;
        st.answered=true;
        const isOk=(o.de===w.de);
        st.correct=isOk;
        btn.classList.add(isOk?'ok':'no');
        if(!isOk){
          [...grid.children].forEach(b=>{
            if(b.textContent===w.vi) b.classList.add('reveal');
            else b.classList.add('locked');
          });
        } else {
          [...grid.children].forEach(b=>{ if(b!==btn) b.classList.add('locked'); });
        }
      };
      grid.appendChild(btn);
    });
    states.push(st);
    item.append(prompt,grid);
    body.appendChild(item);
  });
  card.appendChild(body);
  const [btn,res,panel]=mkFooter('mc',base,()=>{
    const got=states.filter(s=>s.correct).length;
    finalizeTab('mc',got,base.length,btn,res,panel,base.map(w=>({de:(w.art?w.art+' ':'')+w.de,vi:w.vi,ex:w.ex})));
  });
  btn.textContent='✓ Auswerten';
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}

/* ─── 5. Dialog ─── */
function buildDialog(main){
  const pairs=pick(D,8);
  const allVI=shuffle(pairs.map(p=>p.vi));
  const sec=mkSec('dialog');
  const card=mkCard('💬','Dialog','8 Pkt.','t-dialog');
  const body=mkBody('Wählen Sie die passende Übersetzung.');
  const grid=el('div','dialog-grid');
  pairs.forEach((p,i)=>{
    const row=el('div','dialog-row');
    const left=el('div','dialog-left'); left.textContent=(i+1)+'. '+p.de;
    const arr=el('div','dialog-arr'); arr.textContent='→';
    const selWrap=el('div','dialog-sel');
    const sel=el('select','sel'); sel.dataset.i=i;
    sel.innerHTML='<option value="">– wählen –</option>';
    allVI.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; sel.appendChild(o); });
    selWrap.appendChild(sel);
    row.append(left,arr,selWrap);
    grid.appendChild(row);
  });
  body.appendChild(grid);
  card.appendChild(body);
  const [btn,res,panel]=mkFooter('dialog',pairs,checkDialog.bind(null,pairs,allVI));
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}
function checkDialog(pairs,allVI,btn,res,panel){
  let got=0;
  $$('#sec-dialog .sel').forEach((sel,i)=>{
    const ok=(sel.value===pairs[i].vi);
    sel.classList.toggle('ok',ok); sel.classList.toggle('no',!ok);
    sel.disabled=true;
    if(ok) got++;
  });
  finalizeTab('dialog',got,pairs.length,btn,res,panel,pairs.map(p=>({de:p.de,vi:p.vi,ex:''})));
}

/* ─── 6. Anagram ─── */
function buildAnagram(main){
  const words=pick(W.filter(w=>w.de.length>4),8);
  const sec=mkSec('anagram');
  const card=mkCard('🔤','Anagramm','8 Pkt.','t-anagram');
  const body=mkBody('Ordnen Sie die Buchstaben. Schreiben Sie das Wort mit Artikel.');
  const grid=el('div','anagram-grid');
  words.forEach((w,i)=>{
    const base=w.de.replace(/^(der|die|das)\s+/i,'');
    const scrambled=shuffle([...base]).join('').toUpperCase();
    const item=el('div','anagram-item');
    const sc=el('div','anagram-scrambled'); sc.textContent=scrambled;
    const hint=el('div','wex'); hint.textContent=w.vi;
    const row=el('div','anagram-inputs');
    if(w.art){
      const art=el('input','inp anagram-art'); art.type='text'; art.placeholder='Art.'; art.dataset.art=i;
      row.appendChild(art);
    }
    const inp=el('input','inp anagram-word'); inp.type='text'; inp.placeholder='Wort…'; inp.dataset.i=i;
    row.appendChild(inp);
    item.append(sc,hint,row);
    grid.appendChild(item);
  });
  body.appendChild(grid);
  card.appendChild(body);
  const [btn,res,panel]=mkFooter('anagram',words,checkAnagram.bind(null,words));
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}
function checkAnagram(words,btn,res,panel){
  let got=0;
  const inps=[...$$('#sec-anagram .inp')];
  let ii=0;
  words.forEach((w,i)=>{
    let artOk=true;
    if(w.art){
      const artInp=inps[ii++];
      artOk=normDE(artInp.value)===w.art.toLowerCase();
      artInp.classList.toggle('ok',artOk); artInp.classList.toggle('no',!artOk);
      artInp.disabled=true;
    }
    const wordInp=inps[ii++];
    const wordOk=normDE(wordInp.value)===normDE(w.de.replace(/^(der|die|das)\s+/i,''));
    wordInp.classList.toggle('ok',wordOk); wordInp.classList.toggle('no',!wordOk);
    wordInp.disabled=true;
    if(artOk&&wordOk) got++;
  });
  finalizeTab('anagram',got,words.length,btn,res,panel,words.map(w=>({de:(w.art?w.art+' ':'')+w.de,vi:w.vi,ex:w.ex})));
}

/* ─── 7. Wortbank ─── */
function buildBank(main){
  const sentences=pick(W.filter(w=>w.ex&&w.ex.length>10),8);
  const bankWords=shuffle(sentences.map(w=>w.de.replace(/^(der|die|das)\s+/i,'')));
  const used=new Set();
  const sec=mkSec('bank');
  const card=mkCard('🏦','Wortbank','8 Pkt.','t-bank');
  const body=mkBody('Wählen Sie das passende Wort aus der Wortbank.');
  // pool
  const pool=el('div','wordbank-pool');
  const poolLbl=el('div','wb-label'); poolLbl.textContent='Wortbank:';
  pool.appendChild(poolLbl);
  bankWords.forEach(bw=>{
    const chip=el('span','wb-chip'); chip.textContent=bw; chip.dataset.word=bw;
    chip.onclick=()=>handleChipClick(chip,bw);
    pool.appendChild(chip);
  });
  body.appendChild(pool);
  // rows
  const inputs=[];
  sentences.forEach((w,i)=>{
    const base=w.de.replace(/^(der|die|das)\s+/i,'');
    const masked=w.ex.replace(new RegExp(escRE(base),'i'),'________');
    const row=el('div','wb-fill-row');
    row.innerHTML=(i+1)+'. '+masked.replace('________','<input class="blank" data-i="'+i+'" readonly placeholder="Wort…">');
    body.appendChild(row);
    inputs.push({word:base,idx:i});
  });
  card.appendChild(body);
  let currentTarget=null;
  // click blank → set target
  body.addEventListener('click',e=>{
    if(e.target.classList.contains('blank')){
      $$('.blank').forEach(b=>b.style.borderColor='');
      e.target.style.borderColor='#2563eb';
      currentTarget=e.target;
    }
  });
  function handleChipClick(chip,word){
    if(chip.classList.contains('used')) return;
    if(!currentTarget) return;
    currentTarget.value=word;
    currentTarget.dataset.chosen=word;
    currentTarget.style.borderColor='';
    chip.classList.add('used');
    currentTarget=null;
  }
  const [btn,res,panel]=mkFooter('bank',sentences,checkBank.bind(null,sentences,inputs));
  sec.append(card,btn,res,panel);
  main.appendChild(sec);
}
function escRE(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function checkBank(sentences,inputs,btn,res,panel){
  let got=0;
  $$('#sec-bank .blank').forEach((blank,i)=>{
    const base=sentences[i].de.replace(/^(der|die|das)\s+/i,'');
    const ok=normDE(blank.value)===normDE(base);
    blank.classList.toggle('ok',ok); blank.classList.toggle('no',!ok);
    if(ok) got++;
  });
  finalizeTab('bank',got,sentences.length,btn,res,panel,sentences.map(w=>({de:(w.art?w.art+' ':'')+w.de,vi:w.vi,ex:w.ex})));
}

/* ── shared footer builder ── */
function mkFooter(id,items,checkFn){
  const btn=el('button','btn-check-tab'); btn.textContent='✓ Auswerten';
  const res=el('div','tab-result');
  res.innerHTML='<div class="tab-res-emoji">⭐</div><div><div class="tab-res-score"></div><div class="tab-res-msg"></div></div>';
  const panel=el('div','answer-panel');
  btn.onclick=()=>{ btn.disabled=true; checkFn(btn,res,panel); };
  return [btn,res,panel];
}
function finalizeTab(id,got,total,btn,res,panel,answers){
  tabScores[id]={got,total};
  const pct=Math.round(got/total*100);
  const emoji=pct>=80?'🏆':pct>=60?'⭐':'💪';
  res.querySelector('.tab-res-score').textContent=got+'/'+total+' ('+pct+'%)';
  res.querySelector('.tab-res-msg').textContent=pct>=80?'Ausgezeichnet!':pct>=60?'Gut gemacht!':'Weiter üben!';
  res.querySelector('.tab-res-emoji').textContent=emoji;
  res.classList.add('show');
  // answer panel
  panel.innerHTML='<div class="ans-title">✅ Lösungen</div>';
  answers.forEach((a,i)=>{
    const row=el('div','ans-row');
    const num=el('span','ans-num'); num.textContent=(i+1)+'.';
    const info=el('div','');
    const de=el('div','ans-de'); de.textContent=a.de;
    const vi=el('div','ans-vi'); vi.textContent=a.vi;
    const ex=el('div','ans-ex'); if(a.ex) ex.textContent=a.ex;
    info.append(de,vi,ex);
    row.append(num,info);
    panel.appendChild(row);
  });
  panel.classList.add('show');
  // tab done
  $$('.tab').forEach(t=>{ if(t.dataset.tab===id) t.classList.add('done'); });
  // check all done
  if(Object.keys(tabScores).length===TAB_LABELS.length) showGlobalResult();
}

/* ── global summary ── */
function showGlobalResult(){
  let totalGot=0,totalMax=0;
  const chip_data=[];
  TAB_LABELS.forEach(t=>{
    const s=tabScores[t.id]||{got:0,total:0};
    totalGot+=s.got; totalMax+=s.total;
    chip_data.push({label:t.icon+' '+t.label, score:s.got+'/'+s.total});
  });
  const pct=Math.round(totalGot/totalMax*100);
  const res=$('#globalResult');
  res.querySelector('.result-emoji').textContent=pct>=80?'🏆':pct>=60?'⭐':'💪';
  res.querySelector('.result-score').textContent=totalGot+'/'+totalMax+' ('+pct+'%)';
  res.querySelector('.result-msg').textContent=pct>=80?'Ausgezeichnet! Sie beherrschen den Wortschatz!':pct>=60?'Gut gemacht! Weiter so!':'Üben Sie noch einmal!';
  const strip=res.querySelector('.score-strip');
  strip.innerHTML='';
  chip_data.forEach(c=>{
    const d=el('div','score-chip');
    d.textContent=c.label+': '+c.score;
    strip.appendChild(d);
  });
  res.classList.add('show');
  showSummaryCard(totalGot,totalMax,pct);
}

/* ── summary card (screenshot) ── */
function showSummaryCard(got,max,pct){
  if(!studentName) return;
  const card=$('#summaryCard');
  card.querySelector('.sc-student').textContent=studentName;
  card.querySelector('.sc-meta').textContent=new Date().toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'});
  const tbody=card.querySelector('.sc-rows');
  tbody.innerHTML='';
  TAB_LABELS.forEach(t=>{
    const s=tabScores[t.id]||{got:0,total:0};
    const row=el('div','sc-row');
    const lbl=el('div','sc-lbl'); lbl.textContent=t.icon+' '+t.label;
    const sc=el('div','sc-score'); sc.textContent=s.got+'/'+s.total;
    row.append(lbl,sc);
    tbody.appendChild(row);
  });
  card.querySelector('.sc-total-val').textContent=got+'/'+max+' ('+pct+'%)';
  const elapsed=timerStart?Math.floor((Date.now()-timerStart)/1000):0;
  const mm=String(Math.floor(elapsed/60)).padStart(2,'0');
  const ss=String(elapsed%60).padStart(2,'0');
  card.querySelector('.sc-total-time').textContent='⏱ '+mm+':'+ss;
  card.classList.add('show');
}

/* ── timer ── */
function startTimer(){
  timerStart=Date.now();
  timerInterval=setInterval(()=>{
    const elapsed=Math.floor((Date.now()-timerStart)/1000);
    const mm=String(Math.floor(elapsed/60)).padStart(2,'0');
    const ss=String(elapsed%60).padStart(2,'0');
    $('#sbTimer').textContent=mm+':'+ss;
  },1000);
}

/* ── DOM helper ── */
function el(tag,cls){const e=document.createElement(tag);if(cls)e.className=cls;return e;}
function mkSec(id){const s=el('div','section'+(id==='de-vi'?' active':''));s.id='sec-'+id;return s;}
function mkCard(icon,title,pts,type){
  const c=el('div','card '+type);
  const h=el('div','card-head');
  const ic=el('div','card-icon'); ic.textContent=icon;
  const ti=el('div','card-title'); ti.textContent=title;
  const p=el('div','card-pts'); p.textContent=pts;
  h.append(ic,ti,p); c.appendChild(h); return c;
}
function mkBody(instr){
  const b=el('div','card-body');
  if(instr){const i=el('p','instr');i.textContent=instr;b.appendChild(i);}
  return b;
}

/* ── modal + student bar ── */
function initModal(){
  const modal=$('#nameModal');
  const inp=$('#nameInput');
  const submitBtn=$('#nameSubmit');
  submitBtn.disabled=true;
  inp.addEventListener('input',()=>{ submitBtn.disabled=inp.value.trim().length<2; });
  submitBtn.addEventListener('click',()=>{
    studentName=inp.value.trim();
    modal.classList.add('hidden');
    const bar=$('#studentBar');
    bar.classList.add('show');
    $('#sbName').textContent=studentName;
    $('#sbLektion').textContent='Lektion '+LEKTION_NUM+' – '+LEKTION_TITLE;
    startTimer();
    renderTabs();
    buildAll();
  });
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!submitBtn.disabled) submitBtn.click(); });
}

/* ── init ── */
document.addEventListener('DOMContentLoaded',()=>{
  // inject header
  $('header .hd-tag').textContent='LEKTION '+LEKTION_NUM;
  $('header h1').textContent=LEKTION_TITLE;
  initModal();
});

})();
