/* DeutschKompass v4 – focused exercise flow (one step at a time, one main button)
   lesen / hoeren : text|audio stays on screen, 10 questions one by one, instant feedback
   diktat         : sentence by sentence (voice), then the whole original text, word-by-word correction */
const d = JSON.parse(document.querySelector('#lesson-data').textContent);
const app = document.getElementById('app');
const MID = location.pathname.split('/').pop().replace('.html', '');
const MODS = window.DK_MODULES || [];
const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const IS_Q = d.mode !== 'diktat';
const MODE = { lesen: '📖 Lesen', hoeren: '🎧 Hören', diktat: '✍️ Diktat' }[d.mode];
const MODE_NAME = { lesen: 'Lesen', hoeren: 'Hören', diktat: 'Diktat' }[d.mode];
const P = new URLSearchParams(location.search);
const DM = d.mode === 'diktat' && ['luecke', 'tempo'].includes(P.get('m')) ? P.get('m') : null;   // Lückendiktat | Tempo
const EXAM0 = IS_Q && (!!d.exam || P.get('exam') === '1');                                         // Prüfungstraining
let EXAM = EXAM0;
const SID = MID + (EXAM0 && !d.exam ? '~exam' : '') + (DM ? '~' + DM : '');
const SUF = EXAM0 && !d.exam ? '?exam=1' : DM ? '?m=' + DM : '';
const MAXPLAY = 2;

/* ================= text helpers ================= */
const PUNCT = /[.,!?;:„“”"'‚‘’()\-–]/g;
const clean = x => String(x || '').toLocaleLowerCase('de').normalize('NFC').replace(PUNCT, ' ').replace(/\s+/g, ' ').trim();
const fold = x => clean(x).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
const toks = x => String(x || '').normalize('NFC').replace(PUNCT, ' ').split(/\s+/).filter(Boolean);
const lc = x => x.toLocaleLowerCase('de');
function diff(user, ref) {                       // word diff via LCS; ä/ae etc. counted as "umlaut" (accepted, flagged)
  const a = toks(user), b = toks(ref), n = a.length, m = b.length;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    L[i][j] = fold(a[i]) === fold(b[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < n && j < m) {
    if (fold(a[i]) === fold(b[j])) { out.push({ w: b[j], t: lc(a[i]) === lc(b[j]) ? 'ok' : 'umlaut', u: a[i] }); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) { out.push({ w: a[i], t: 'x' }); i++; }
    else { out.push({ w: b[j], t: 'm' }); j++; }
  }
  while (i < n) out.push({ w: a[i++], t: 'x' });
  while (j < m) out.push({ w: b[j++], t: 'm' });
  return out;
}
const diffHTML = df => `<div class="diff">${df.map(x => x.t === 'ok' ? `<span class="w">${esc(x.w)}</span>` : x.t === 'umlaut' ? `<span class="w m" title="geschrieben: ${esc(x.u)}">${esc(x.w)}</span>` : x.t === 'x' ? `<span class="w x" title="zu viel / falsch">${esc(x.w)}</span>` : `<span class="w m" title="fehlt">${esc(x.w)}</span>`).join('')}</div>`;
const accuracy = df => { const good = df.filter(x => x.t === 'ok' || x.t === 'umlaut').length, tot = df.filter(x => x.t !== 'x').length + df.filter(x => x.t === 'x').length; return tot ? good / tot : 0; };

/* ================= question logic ================= */
function valid(q, a) {
  if (q.type === 'mc' || q.type === 'tf') return a === q.answer;
  if (!Array.isArray(a) || a.length !== q.options.length || a.some(v => !v) || new Set(a).size !== q.options.length) return false;
  return q.options.every((o, j) => q.answer[a[j] - 1] === o);
}
const answered = (q, a) => q.type === 'order' ? Array.isArray(a) && a.filter(Boolean).length === q.options.length : a !== undefined;
function answerText(q, a) {
  if (!answered(q, a)) return '— keine Antwort —';
  return q.type === 'mc' ? q.options[a] : q.type === 'tf' ? (a ? 'Richtig' : 'Falsch') : q.options.map((o, j) => ({ o, n: a[j] })).sort((x, y) => x.n - y.n).map((x, k) => `${k + 1}. ${x.o}`).join('  ·  ');
}
function solutionText(q) {
  return q.type === 'mc' ? q.options[q.answer] : q.type === 'tf' ? (q.answer ? 'Richtig' : 'Falsch') : q.answer.map((s, k) => `${k + 1}. ${s}`).join('  ·  ');
}

/* "Im Text:" – find the sentence that answers the question (simple word overlap) */
const sentences = d.text ? d.text.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean) : [];
const STOP = new Set('welche welcher welches wieviele wie viele wann wohin woher womit warum wofür sein seine ihre ihren einen einem eine einer wird werden haben nicht sehr auch noch oder aber dass dann dort lieber gerne'.split(' '));
const stem = w => lc(w).slice(0, 5);
function evidence(q) {
  if (!sentences.length || q.type === 'order') return null;
  const key = new Set(toks(q.q + ' ' + (q.type === 'mc' ? q.options[q.answer] : '')).filter(w => w.length > 3 && !STOP.has(lc(w))).map(stem));
  let best = null, bs = 0;
  sentences.forEach(s => { const sc = toks(s).filter(w => key.has(stem(w))).length; if (sc > bs) { bs = sc; best = s; } });
  return bs >= 2 ? best : null;
}

/* ================= speech (diktat) ================= */
let deVoice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('de'));
  deVoice = vs.find(v => /de[-_]DE/i.test(v.lang) && /natural|neural|google|online/i.test(v.name)) || vs.find(v => /de[-_]DE/i.test(v.lang)) || vs[0] || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.addEventListener?.('voiceschanged', () => { pickVoice(); const n = document.getElementById('voice-note'); if (n) n.hidden = !!deVoice; }); }
function speak(t, r, btn, cb) {
  if (!('speechSynthesis' in window)) { alert('Dein Browser hat keine Sprachausgabe. Nutze den ganzen Text mit der Originalaufnahme.'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t); u.lang = 'de-DE'; u.rate = r; if (deVoice) u.voice = deVoice;
  if (btn) btn.classList.add('go'); u.onend = u.onerror = () => { btn?.classList.remove('go'); cb?.(); };
  speechSynthesis.speak(u);
}

/* ================= Lückendiktat: choose the important words ================= */
const FUNC = new Set('der die das den dem des ein eine einen einem einer eines und oder aber auch nicht sehr wir ihr sie ich du er es ist sind war waren hat haben wird werden mit von zu im in am an auf für über unter bei nach aus um dass wenn weil dann noch nur schon mein meine meinen meinem meiner dein deine sein seine ihre ihren ihrem unser unsere euer eure zum zur vom beim ins ans aufs mir mich dir dich ihm ihn uns euch ihnen sich wie was wer wo wann warum wohin woher kann können muss müssen will wollen soll sollen darf dürfen mag mögen jetzt heute immer oft gern gerne viel viele'.split(' '));
const PRE = /^[„“"'(]*/, SUFX = /[.,!?;:„“"')]*$/;
const wcore = w => w.replace(PRE, '').replace(SUFX, '');
function gapIdx(sent) {
  const t = sent.split(/\s+/).filter(Boolean);
  const cand = t.map((w, i) => ({ i, c: wcore(w) })).filter(x => x.c.length >= 4 && !FUNC.has(lc(x.c)));
  const noun = x => /^[A-ZÄÖÜ]/.test(x.c) && x.i > 0 ? 1 : 0;
  const k = Math.min(cand.length, Math.max(2, Math.min(5, Math.round(t.length * 0.35))));
  return cand.slice().sort((a, b) => noun(b) - noun(a) || b.c.length - a.c.length || a.i - b.i).slice(0, k).map(x => x.i).sort((a, b) => a - b);
}

/* ================= state ================= */
const qs = d.questions || [];
const S = {
  order: qs.map((q, i) => i), pos: 0, answers: {}, checked: {}, done: false,        // lesen / hören
  steps: [], step: 0, dict: {}, dictOk: {}, hints: {}, full: '', fullDone: false, textOpen: true, rate: 1, marked: null,   // diktat
  gapAns: {}, gapOk: {}, played: {}, plays: 0, xplays: {}, t0: 0, tleft: 0
};
const GAPS = DM === 'luecke' ? (d.sentences || []).map(gapIdx) : [];
const TRATE = i => +(1.15 + 0.35 * (i / Math.max(1, (d.sentences || []).length - 1))).toFixed(2);   // Tempo-Diktat: wird schneller
if (!IS_Q) {
  d.sentences.forEach((s, i) => S.steps.push({ t: 'sent', i }));
  if (d.fullText && d.audio && !DM) S.steps.push({ t: 'full' });
}
let prev = DK.store.get(SID);

/* ================= shell (built once, so audio keeps playing) ================= */
function shell() {
  const total = IS_Q ? qs.length : S.steps.length;
  app.innerHTML = `<div class="shell">
    <div class="topbar"><a class="back" href="../${d.mode}.html" aria-label="Zur Übersicht">← ${MODE_NAME}</a><div class="dots" id="dots">${Array.from({ length: total }, () => '<i></i>').join('')}</div><span class="timer" id="timer" hidden></span><span class="count" id="count"></span></div>
    <div><span class="tag">${MODE}</span>${EXAM0 ? '<span class="tag pill">Prüfungstraining</span>' : ''}${DM === 'luecke' ? '<span class="tag pill">Lückendiktat</span>' : ''}${DM === 'tempo' ? '<span class="tag pill">Tempo</span>' : ''}</div>
    <h1 class="title">${esc(d.title)}</h1>
    <div class="stage ${d.mode === 'lesen' ? 'two' : ''}" id="stage"><div id="pane"></div><div id="qwrap"></div></div>
    <div class="dock"><div><button class="btn" id="go"></button></div></div></div>`;
  document.querySelector('.shell').classList.toggle('exam', EXAM);
  const pane = document.getElementById('pane');
  if (d.mode === 'lesen') pane.innerHTML = `<div class="panel sticky"><details class="txt" id="txt" ${innerWidth > 820 ? 'open' : ''}><summary>📖 Text</summary><div class="textbody" id="textbody">${esc(d.text)}</div>${d.source ? `<div class="src">Quelle: ${esc(d.source)}</div>` : ''}</details></div>`;
  else if (d.mode === 'hoeren' && EXAM && !d.audio) pane.remove();
  else if (d.mode === 'hoeren' && EXAM) {
    pane.innerHTML = `<div class="panel audio"><span class="tag">Hörtext</span><div class="exaud"><button class="play sm" id="xplay" aria-label="Abspielen">▶</button><div style="flex:1"><b id="xtxt">Du hörst den Text ${MAXPLAY}×</b><div class="xbar"><i id="xbar"></i></div></div></div><audio id="aud" preload="metadata" src="${esc(d.audio)}"></audio></div>`;
    const a = document.getElementById('aud'), btn = document.getElementById('xplay');
    const upd = () => { const left = MAXPLAY - S.plays; document.getElementById('xtxt').textContent = left > 0 ? `Noch ${left}× hören` : 'Die Aufnahme ist zu Ende.'; btn.disabled = left <= 0; btn.textContent = a.paused ? '▶' : '⏸'; };
    btn.onclick = () => { if (a.paused) a.play(); else a.pause(); };
    a.addEventListener('play', upd); a.addEventListener('pause', upd);
    a.addEventListener('ended', () => { S.plays++; a.currentTime = 0; upd(); });
    a.addEventListener('timeupdate', () => { document.getElementById('xbar').style.width = (a.duration ? a.currentTime / a.duration * 100 : 0) + '%'; });
    upd();
  }
  else if (d.mode === 'hoeren') pane.innerHTML = `<div class="panel audio"><span class="tag">Hörtext</span><audio id="aud" controls preload="metadata" src="${esc(d.audio)}"></audio><div class="speed"><button class="chipbtn" data-skip="-10">⏪ 10 s</button><button class="chipbtn" data-skip="10">10 s ⏩</button>${[.75, 1, 1.25].map(r => `<button class="chipbtn ${r === 1 ? 'on' : ''}" data-rate="${r}">${r}×</button>`).join('')}</div></div>`;
  else pane.remove();
  if (d.mode === 'lesen' && innerWidth <= 820) document.getElementById('txt').open = true;
  document.getElementById('go').onclick = act;
  if (EXAM) startTimer();
  app.addEventListener('click', onClick);
  app.addEventListener('input', e => { if (e.target.matches('textarea')) onType(e.target); else if (e.target.matches('input.gap')) onGap(e.target); });
  app.addEventListener('keydown', e => {
    if (e.target.matches('textarea.one') && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); act(); }
    else if (e.target.matches('input.gap') && e.key === 'Enter') { e.preventDefault(); const all = [...document.querySelectorAll('input.gap')], k = all.indexOf(e.target); if (!e.target.readOnly && k < all.length - 1) all[k + 1].focus(); else act(); }
  });
}

/* ================= Prüfungstraining ================= */
let tick = null;
const fmt = sec => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
function startTimer() {
  const total = Math.round((d.minutes ? d.minutes * 60 : qs.length * (d.mode === 'hoeren' ? 75 : 60)));
  S.t0 = Date.now(); S.tleft = total; const el = document.getElementById('timer'); el.hidden = false;
  const draw = () => { el.textContent = '⏱ ' + fmt(Math.max(0, S.tleft)); el.classList.toggle('low', S.tleft <= 60); };
  draw(); clearInterval(tick);
  tick = setInterval(() => { S.tleft = total - Math.round((Date.now() - S.t0) / 1000); draw(); if (S.tleft <= 0) { clearInterval(tick); alert('Die Zeit ist um. Deine Antworten werden abgegeben.'); submitExam(); } }, 500);
}
function examPanel(i) {
  const q = qs[i], a = S.answers[i];
  let h = `<div class="panel q" id="eq${i}"><span class="tag">Aufgabe ${i + 1}${q.part ? ' · ' + esc(q.part) : ''}</span>`;
  if (q.say) { const left = MAXPLAY - (S.xplays[i] || 0); h += `<div class="say" style="margin:8px 0"><button class="play sm" data-xsay="${i}" ${left <= 0 ? 'disabled' : ''} aria-label="Anhören">▶</button><b>${left > 0 ? `Anhören – noch ${left}×` : 'Du hast den Text 2× gehört.'}</b></div>`; }
  h += `<h3>${esc(q.q)}</h3>`;
  if (q.type === 'mc') h += q.options.map((op, j) => `<button class="opt ${a === j ? 'sel' : ''}" data-mc="${j}" data-qi="${i}"><span class="k">${'ABCDEF'[j]}</span><span>${esc(op)}</span></button>`).join('');
  else if (q.type === 'tf') h += `<div class="tfgrid">${[['Richtig', true], ['Falsch', false]].map(([t, v]) => `<button class="opt ${a === v ? 'sel' : ''}" data-tf="${v}" data-qi="${i}">${v ? '✓' : '✕'} ${t}</button>`).join('')}</div>`;
  else h += `<p class="note" style="margin:-6px 0 12px">Tippe die Punkte in der richtigen Reihenfolge an.</p><div class="chips">${q.options.map((op, j) => { const n = a?.[j]; return `<button class="chip ${n ? 'set' : ''}" data-ord="${j}" data-qi="${i}"><span class="n">${n || ''}</span><span>${esc(op)}</span></button>`; }).join('')}</div>`;
  return h + '</div>';
}
function renderExam() {
  let h = '<p class="note" style="margin:0 2px 2px">Prüfungsmodus: Du siehst erst am Ende, was richtig war. Du kannst Antworten ändern.</p>';
  qs.forEach((q, i) => { h += examPanel(i); });
  $('qwrap').innerHTML = `<div class="examlist">${h}</div>`;
  examCount(); setGo('Abgeben ✓', true);
}
function examCount() { const n = qs.filter((q, i) => answered(q, S.answers[i])).length; $('count').textContent = `${n} / ${qs.length} beantwortet`; }
function examRefresh(i) { const el = document.getElementById('eq' + i); if (el) el.outerHTML = examPanel(i); examCount(); }
function submitExam() { clearInterval(tick); qs.forEach((q, i) => { S.checked[i] = true; }); $('timer').hidden = true; finish(); }

/* ================= rendering ================= */
const $ = id => document.getElementById(id);
function dots() {
  const total = IS_Q ? qs.length : S.steps.length;
  const el = $('dots').children;
  for (let k = 0; k < total; k++) {
    let c = '';
    if (IS_Q) { c = S.checked[k] ? (valid(qs[k], S.answers[k]) ? 'ok' : 'bad') : (!S.done && S.order[S.pos] === k ? 'cur' : ''); }
    else { const st = S.steps[k]; c = S.done ? (st.t === 'sent' ? (S.dictOk[st.i] ? 'ok' : 'bad') : (S.fullDone ? 'ok' : 'bad')) : (k < S.step ? (st.t === 'sent' ? (S.dictOk[st.i] ? 'ok' : 'bad') : 'ok') : k === S.step ? 'cur' : ''); }
    el[k].className = c;
  }
  $('count').textContent = S.done ? '' : IS_Q ? `${Math.min(S.pos + 1, S.order.length)} / ${S.order.length}` : `${S.step + 1} / ${S.steps.length}`;
}
function setGo(label, enabled) { const b = $('go'); b.textContent = label; b.disabled = !enabled; b.style.display = ''; }

function renderStep() {
  dots();
  const wrap = $('qwrap');
  if (S.done) return renderResult();
  if (EXAM) return renderExam();
  if (IS_Q) {
    const i = S.order[S.pos], q = qs[i], chk = !!S.checked[i], a = S.answers[i];
    let h = `<div class="panel q ${chk ? 'locked' : ''}" id="card"><span class="tag">Aufgabe ${S.pos + 1}</span>${q.say ? `<div class="say" style="margin:8px 0"><button class="play sm" data-sayq="${i}" aria-label="Anhören">▶</button><b>Anhören</b></div>` : ''}<h3>${esc(q.q)}</h3>`;
    if (q.type === 'mc') h += q.options.map((op, j) => {
      const cls = chk ? (j === q.answer ? 'correct' : a === j ? 'wrong' : '') : a === j ? 'sel' : '';
      return `<button class="opt ${cls}" data-mc="${j}"><span class="k">${'ABCDEF'[j]}</span><span>${esc(op)}</span></button>`;
    }).join('');
    else if (q.type === 'tf') h += `<div class="tfgrid">${[['Richtig', true], ['Falsch', false]].map(([t, v]) => {
      const cls = chk ? (v === q.answer ? 'correct' : a === v ? 'wrong' : '') : a === v ? 'sel' : '';
      return `<button class="opt ${cls}" data-tf="${v}">${v ? '✓' : '✕'} ${t}</button>`;
    }).join('')}</div>`;
    else h += `<p class="note" style="margin:-6px 0 12px">Tippe die Punkte in der richtigen Reihenfolge an – erst der erste, dann der zweite …</p><div class="chips">${q.options.map((op, j) => {
      const n = a?.[j], cls = chk ? (q.answer[n - 1] === op ? 'correct set' : 'wrong set') : n ? 'set' : '';
      return `<button class="chip ${cls}" data-ord="${j}"><span class="n">${n || ''}</span><span>${esc(op)}</span></button>`;
    }).join('')}</div>`;
    if (chk) {
      const ok = valid(q, a), ev = evidence(q);
      h += `<div class="fb ${ok ? 'ok' : 'no'}"><span>${ok ? '✅' : '❌'}</span><div><b>${ok ? ['Richtig!', 'Genau!', 'Stark!', 'Super!'][S.pos % 4] : 'Nicht ganz.'}</b>${!ok ? `Richtig: ${esc(solutionText(q))}` : ''}${ev ? `<div class="small" style="color:inherit;opacity:.85;margin-top:4px">Im Text: „${esc(ev)}“</div>` : ''}</div></div>`;
    }
    h += '</div>';
    wrap.innerHTML = h;
    if (chk && d.mode === 'lesen') markText(evidence(q));
    else if (d.mode === 'lesen') markText(null);
    const last = S.pos === S.order.length - 1;
    setGo(last ? 'Ergebnis ansehen →' : 'Weiter →', true); if (!chk) $('go').style.display = 'none'; else requestAnimationFrame(() => $('card').querySelector('.fb')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
    return;
  }
  /* ---- diktat ---- */
  const st = S.steps[S.step];
  if (st.t === 'sent') {
    const i = st.i, s = d.sentences[i], chk = i in S.dictOk;
    const played = DM === 'tempo' && S.played[i];
    const tools = DM === 'tempo'
      ? `<b>Hör gut zu – nur 1×!</b><span class="small">Tempo ${TRATE(i)}× · wird von Satz zu Satz schneller</span>`
      : `<b>${DM === 'luecke' ? 'Hör zu und fülle die Lücken.' : 'Hör zu und schreibe.'}</b><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="chipbtn" data-slow="${i}">🐢 Langsam</button><button class="chipbtn" data-fast="${i}">⚡ Schnell</button>${chk || DM ? '' : `<button class="chipbtn" data-hint="${i}">💡 Tipp</button>`}</div>`;
    let h = `<div class="panel q ${chk ? 'locked' : ''}" id="card"><span class="tag">Satz ${i + 1} von ${d.sentences.length}</span>
      <div class="say"><button class="play" data-say="${i}" ${played ? 'disabled' : ''} aria-label="Satz anhören">▶</button><div style="display:grid;gap:8px">${tools}</div></div>
      ${S.hints[i] ? `<p class="hint">Tipp: ${toks(s).length} Wörter · beginnt mit „${esc(toks(s)[0])}“</p>` : ''}
      ${DM === 'luecke' ? gapHTML(i, chk) : `<textarea class="one" data-w="${i}" aria-label="Satz ${i + 1}" placeholder="Schreibe den Satz hier …" ${chk ? 'readonly' : ''}>${esc(S.dict[i] || '')}</textarea>`}
      <div class="hint" id="voice-note" ${deVoice || !('speechSynthesis' in window) ? 'hidden' : ''}>Keine deutsche Stimme gefunden – installiere eine deutsche Stimme auf deinem Gerät.</div>`;
    if (chk && DM === 'luecke') { const ok = S.dictOk[i], n = S.gapOk[i]; h += `<div class="fb ${ok ? 'ok' : 'no'}"><span>${ok ? '✅' : '✏️'}</span><div><b>${ok ? 'Alle Lücken richtig!' : `${n} von ${GAPS[i].length} Lücken richtig`}</b>${ok ? '' : `<div style="margin-top:6px"><b>Ganzer Satz:</b> ${esc(s)}</div>`}</div></div>`; }
    else if (chk) { const df = diff(S.dict[i] || '', s), um = df.some(x => x.t === 'umlaut'), ok = S.dictOk[i]; h += `<div class="fb ${ok ? 'ok' : 'no'}"><span>${ok ? '✅' : '✏️'}</span><div><b>${ok ? (um ? 'Richtig – achte auf ä/ö/ü/ß.' : 'Richtig!') : 'Vergleiche genau:'}</b>${diffHTML(df)}${ok ? '' : `<div style="margin-top:8px"><b>Lösung:</b> ${esc(s)}</div>`}</div></div>`; }
    h += '</div>';
    wrap.innerHTML = h;
    const has = DM === 'luecke' ? Object.values(S.gapAns[i] || {}).some(v => (v || '').trim()) : !!(S.dict[i] || '').trim();
    setGo(chk ? (S.step === S.steps.length - 1 ? 'Ergebnis ansehen →' : 'Weiter →') : 'Prüfen', chk || has);
    if (DM === 'luecke' && !chk) document.querySelector('input.gap')?.focus({ preventScroll: true });
  } else {
    const chk = S.fullDone;
    let h = `<div class="panel q ${chk ? 'locked' : ''}" id="card"><span class="tag">Der ganze Text</span>
      <p class="note" style="margin:6px 0 10px">Hör die Aufnahme und schreibe den ganzen Text. Jeder Satz wird zweimal gelesen. Satzzeichen werden mitgesprochen („Komma“, „Punkt“) – schreibe sie als Zeichen. Pausiere so oft du willst.</p>
      <div class="audio"><audio id="aud" controls preload="metadata" src="${esc(d.audio)}"></audio><div class="speed"><button class="chipbtn" data-skip="-10">⏪ 10 s</button><button class="chipbtn" data-skip="10">10 s ⏩</button>${[.75, 1].map(r => `<button class="chipbtn ${r === S.rate ? 'on' : ''}" data-rate="${r}">${r}×</button>`).join('')}</div></div>
      <textarea class="big" data-full aria-label="Ganzer Text" placeholder="Schreibe hier den ganzen Text …" ${chk ? 'readonly' : ''} style="margin-top:12px">${esc(S.full)}</textarea>`;
    if (chk) { const df = diff(S.full, d.fullText), acc = Math.round(accuracy(df) * 100); h += `<div class="fb ${acc >= 85 ? 'ok' : 'no'}"><span>${acc >= 85 ? '✅' : '✏️'}</span><div><b>Wortgenauigkeit: ${acc}%</b>${diffHTML(df)}<div class="small" style="color:inherit;margin-top:8px">Rot durchgestrichen = zu viel/falsch · gelb gestrichelt = fehlt oder ä/ö/ü/ß</div></div></div>`; }
    h += '</div>';
    wrap.innerHTML = h;
    const a = $('aud'); if (a) a.playbackRate = S.rate;
    setGo(chk ? 'Ergebnis ansehen →' : 'Prüfen', chk || !!S.full.trim());
  }
}

function gapHTML(i, chk) {
  const t = d.sentences[i].split(/\s+/).filter(Boolean), g = new Set(GAPS[i]), A = S.gapAns[i] || {};
  return '<p class="gaps">' + t.map((w, k) => {
    if (!g.has(k)) return esc(w);
    const c = wcore(w), pre = w.match(PRE)[0], post = w.slice(pre.length + c.length), v = A[k] || '';
    const st = chk ? (fold(v) === fold(c) ? 'ok' : 'no') : '';
    return esc(pre) + `<span class="gw ${st}"><input class="gap" data-g="${i}:${k}" value="${esc(v)}" ${chk ? 'readonly' : ''} style="width:${Math.max(3.4, c.length * 0.68 + 1.4)}em" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Lücke">${chk && st === 'no' ? `<b class="fix">${esc(c)}</b>` : ''}</span>` + esc(post);
  }).join(' ') + '</p>';
}
function onGap(t) { const [i, k] = t.dataset.g.split(':').map(Number); (S.gapAns[i] = S.gapAns[i] || {})[k] = t.value; $('go').disabled = !Object.values(S.gapAns[i]).some(v => v.trim()); }

function markText(sent) {
  const tb = $('textbody'); if (!tb || S.marked === sent) return; S.marked = sent;
  tb.innerHTML = sent && d.text.includes(sent) ? esc(d.text).replace(esc(sent), `<mark style="background:var(--gold);color:#3a2500;border-radius:6px;padding:1px 3px">${esc(sent)}</mark>`) : esc(d.text);
  if (sent && innerWidth <= 820) { const t = $('txt'); if (t) t.open = true; }
}

/* ================= actions ================= */
function act() {
  const b = $('go'); if (b.disabled) return;
  if (S.done) return;
  if (EXAM) {
    const open = qs.filter((q, i) => !answered(q, S.answers[i])).length;
    if (open && !confirm(`${open} Aufgabe${open > 1 ? 'n sind' : ' ist'} noch offen. Trotzdem abgeben?`)) return;
    return submitExam();
  }
  if (IS_Q) {
    const i = S.order[S.pos];
    if (!S.checked[i]) { S.checked[i] = true; renderStep(); if (innerWidth <= 820) $('card').querySelector('.fb')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return; }
    if (S.pos < S.order.length - 1) { S.pos++; renderStep(); scrollTo({ top: 0, behavior: 'smooth' }); } else finish();
  } else {
    const st = S.steps[S.step];
    if (st.t === 'sent' && !(st.i in S.dictOk)) {
      if (DM === 'luecke') { const tk = d.sentences[st.i].split(/\s+/).filter(Boolean), A = S.gapAns[st.i] || {}; S.gapOk[st.i] = GAPS[st.i].filter(k => fold(A[k] || '') === fold(wcore(tk[k]))).length; S.dictOk[st.i] = S.gapOk[st.i] === GAPS[st.i].length; }
      else S.dictOk[st.i] = fold(S.dict[st.i]) === fold(d.sentences[st.i]);
      renderStep(); return;
    }
    if (st.t === 'full' && !S.fullDone) { S.fullDone = true; renderStep(); return; }
    if (S.step < S.steps.length - 1) { S.step++; renderStep(); scrollTo({ top: 0, behavior: 'smooth' }); } else finish();
  }
}
function onType(t) {
  if (t.dataset.w != null) S.dict[+t.dataset.w] = t.value;
  else S.full = t.value;
  const ok = IS_Q ? false : (S.steps[S.step].t === 'sent' ? !!(S.dict[S.steps[S.step].i] || '').trim() : !!S.full.trim());
  $('go').disabled = !ok;
}
function onClick(e) {
  const t = e.target.closest('button,a'); if (!t) return;
  const i = t.dataset.qi != null ? +t.dataset.qi : IS_Q ? S.order[S.pos] : null;
  const upd = () => EXAM ? examRefresh(i) : renderStep();
  if (t.dataset.mc != null && !S.checked[i]) { S.answers[i] = +t.dataset.mc; if (!EXAM) S.checked[i] = true; upd(); }
  else if (t.dataset.tf != null && !S.checked[i]) { S.answers[i] = t.dataset.tf === 'true'; if (!EXAM) S.checked[i] = true; upd(); }
  else if (t.dataset.ord != null && !S.checked[i]) {
    const q = qs[i], n = q.options.length, a = S.answers[i] = S.answers[i] || new Array(n).fill(null), j = +t.dataset.ord;
    if (a[j]) a[j] = null; else for (let k = 1; k <= n; k++) if (!a.includes(k)) { a[j] = k; break; }
    if (!EXAM && a.every(Boolean)) S.checked[i] = true;
    upd();
  }
  else if (t.dataset.xsay != null) {
    const k = +t.dataset.xsay; if ((S.xplays[k] || 0) >= MAXPLAY) return; S.xplays[k] = (S.xplays[k] || 0) + 1;
    const q = qs[k]; speak(q.say, q.rate || .9, t, () => { const el = document.getElementById('eq' + k); if (el && !S.done) { const y = scrollY; examRefresh(k); scrollTo(0, y); } });
    t.disabled = true; t.classList.add('go');
  }
  else if (t.dataset.say != null) {
    const k = +t.dataset.say;
    if (DM === 'tempo') { if (S.played[k]) return; S.played[k] = true; speak(d.sentences[k], TRATE(k), t); t.disabled = true; }
    else speak(d.sentences[k], .86, t);
  }
  else if (t.dataset.slow != null) speak(d.sentences[+t.dataset.slow], .55, document.querySelector('.play'));
  else if (t.dataset.fast != null) speak(d.sentences[+t.dataset.fast], 1.3, document.querySelector('.play'));
  else if (t.dataset.hint != null) { S.hints[+t.dataset.hint] = true; const v = document.querySelector('textarea')?.value; renderStep(); if (v != null) document.querySelector('textarea').value = v; }
  else if (t.dataset.skip != null) { const a = $('aud'); a.currentTime = Math.max(0, a.currentTime + +t.dataset.skip); }
  else if (t.dataset.rate != null) { S.rate = +t.dataset.rate; const a = $('aud'); a.playbackRate = S.rate; t.parentElement.querySelectorAll('[data-rate]').forEach(b => b.classList.toggle('on', b === t)); }
  else if (t.id === 'retry') retry();
  else if (t.id === 'again') again();
  else if (t.id === 'xagain') xagain();
  else if (t.dataset.sayq != null) speak(qs[+t.dataset.sayq].say, qs[+t.dataset.sayq].rate || .9, t);
}
addEventListener('keydown', e => {
  if (S.done || EXAM || e.target.matches('textarea,input,button,a,audio') || e.metaKey || e.ctrlKey) return;
  if (e.key === 'Enter') { act(); return; }
  if (!IS_Q) return; const i = S.order[S.pos], q = qs[i]; if (S.checked[i]) return;
  const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase());
  if (q.type === 'mc' && k >= 0 && k < q.options.length) { S.answers[i] = k; S.checked[i] = true; renderStep(); }
  else if (q.type === 'tf' && (e.key === 'r' || e.key === 'f')) { S.answers[i] = e.key === 'r'; S.checked[i] = true; renderStep(); }
});

/* ================= result ================= */
function score() {
  if (IS_Q) { const ok = qs.filter((q, i) => valid(q, S.answers[i])).length; return { n: ok, total: qs.length, pct: Math.round(ok / qs.length * 100) }; }
  if (DM === 'luecke') { const tot = GAPS.reduce((a, g) => a + g.length, 0), n = Object.values(S.gapOk).reduce((a, b) => a + b, 0); return { n, total: tot, unit: 'Lücken', pct: Math.round(n / tot * 100) }; }
  const n = d.sentences.filter((s, i) => S.dictOk[i]).length, sp = n / d.sentences.length;
  const acc = d.fullText ? accuracy(diff(S.full, d.fullText)) : null;
  return { n, total: d.sentences.length, acc: acc == null ? null : Math.round(acc * 100), pct: Math.round((acc == null ? sp : (sp + acc) / 2) * 100) };
}
function nextModule() {
  const list = MODS.filter(m => m.mode === d.mode && !!m.exam === !!d.exam), k = list.findIndex(m => m.id === MID), rec = DK.store.all();
  const key = m => m.id + (EXAM0 && !d.exam ? '~exam' : '') + (DM ? '~' + DM : '');
  const after = list.slice(k + 1).concat(list.slice(0, k));
  const nx = after.find(m => !rec[key(m)]) || after[0] || null;
  return nx && { ...nx, url: nx.url + SUF };
}
function finish() {
  S.done = true; clearInterval(tick); const sc = score(), old = DK.store.get(SID) || {};
  if (!(EXAM0 && !EXAM)) DK.store.set(SID, { last: sc.pct, best: Math.max(old.best ?? 0, sc.pct), tries: (old.tries || 0) + 1, date: Date.now(), mode: d.mode });   // Fehler-Wiederholung zählt nicht als Prüfung
  prev = old; renderStep(); scrollTo({ top: 0 });
  $('go').style.display = 'none';
  if (sc.pct >= 80) setTimeout(() => DK.confetti(sc.pct === 100 ? 1.5 : .9), 350);
}
function renderResult() {
  $('pane')?.setAttribute('hidden', ''); $('aud')?.pause?.();
  $('stage').classList.remove('two');
  const sc = score(), nx = nextModule();
  const pass = sc.pct >= 60;
  const msg = EXAM0 && !EXAM ? 'Fehler geübt – dein Prüfungsergebnis bleibt gespeichert.' : EXAM0 ? (pass ? 'Bestanden! ✅ (ab 60 % wie in der Prüfung)' : 'Noch nicht bestanden – ab 60 % ist es geschafft. Schau dir unten die Lösungen an.') : sc.pct === 100 ? 'Perfekt! Kein einziger Fehler.' : sc.pct >= 80 ? 'Sehr gut! Fast alles richtig.' : sc.pct >= 60 ? 'Gut gemacht – noch ein bisschen Übung.' : 'Nicht aufgeben! Versuch es noch einmal.';
  const wrongs = IS_Q ? qs.map((q, i) => ({ q, i })).filter(x => !valid(x.q, S.answers[x.i])) : [];
  const line = IS_Q ? `${sc.n} / ${sc.total} richtig` : `${sc.n} / ${sc.total} ${sc.unit || 'Sätze'}${sc.acc != null ? ' · Text ' + sc.acc + '%' : ''}`;
  const used = EXAM0 && S.t0 && !S.tUsed ? (S.tUsed = Math.round((Date.now() - S.t0) / 1000)) : S.tUsed;
  const best = prev && prev.best != null && prev.best > sc.pct ? `<p>Dein Rekord: ${prev.best}%</p>` : '';
  $('qwrap').innerHTML = `<div class="result"><div class="medal-host" id="medal"><div class="ring">${sc.pct}%</div></div><h2>${line}</h2><p>${msg}</p>${EXAM0 && used ? `<p>Zeit: ${fmt(used)}</p>` : ''}${best}
    <div class="acts">${nx ? `<a class="btn" href="${nx.url}">Nächste Übung →</a>` : ''}${wrongs.length ? '<button class="btn ghost" id="retry">Fehler wiederholen</button>' : ''}${EXAM0 && EXAM ? '<button class="btn ghost" id="xagain">Prüfung nochmal</button>' : !IS_Q ? '<button class="btn ghost" id="again">Nochmal</button>' : ''}<a class="btn ghost" href="../${d.mode}.html">Übersicht</a></div>
    ${EXAM0 && EXAM ? `<div class="examreview">${qs.map((q, i) => { const ok = valid(q, S.answers[i]), ev = d.mode === 'lesen' && !ok ? evidence(q) : null; return `<div class="rv ${ok ? 'ok' : 'no'}"><b>${ok ? '✅' : '❌'} Aufgabe ${i + 1}: ${esc(q.q)}</b>${q.say ? `<small>Text: „${esc(q.say)}“</small>` : ''}<span>Deine Antwort: ${esc(answerText(q, S.answers[i]))}</span>${ok ? '' : `<span>Richtig: <b>${esc(solutionText(q))}</b></span>`}${ev ? `<small>Im Text: „${esc(ev)}“</small>` : ''}</div>`; }).join('')}</div>` : wrongs.length ? `<details class="review"><summary style="cursor:pointer;font-weight:800;list-style:none;text-align:center">Fehler ansehen (${wrongs.length})</summary>${wrongs.map(x => `<div><b>${esc(x.q.q)}</b><br>Richtig: ${esc(solutionText(x.q))}</div>`).join('')}</details>` : ''}</div>`;
  const mh = $('medal'); if (mh && DK.medal && DK.medal(mh, sc.pct)) mh.firstElementChild.remove();
}
function retry() {
  if (EXAM) { EXAM = false; document.querySelector('.shell').classList.remove('exam'); $('timer').hidden = true; }
  const wrong = qs.map((q, i) => i).filter(i => !valid(qs[i], S.answers[i]));
  wrong.forEach(i => { delete S.answers[i]; delete S.checked[i]; });
  S.order = wrong; S.pos = 0; S.done = false; $('stage').classList.toggle('two', d.mode === 'lesen'); $('pane')?.removeAttribute('hidden'); $('go').style.display = ''; S.marked = null;
  renderStep(); scrollTo({ top: 0 });
}
function xagain() {
  S.answers = {}; S.checked = {}; S.xplays = {}; S.plays = 0; S.tUsed = 0; S.done = false; S.order = qs.map((q, i) => i);
  $('stage').classList.toggle('two', d.mode === 'lesen'); $('pane')?.removeAttribute('hidden'); $('go').style.display = '';
  const a = $('aud'); if (a) { a.currentTime = 0; a.dispatchEvent(new Event('pause')); }
  startTimer(); renderStep(); scrollTo({ top: 0 });
}
function again() {
  S.gapAns = {}; S.gapOk = {}; S.played = {};
  S.dict = {}; S.dictOk = {}; S.hints = {}; S.full = ''; S.fullDone = false; S.step = 0; S.done = false; $('go').style.display = ''; renderStep(); scrollTo({ top: 0 });
}

shell();
renderStep();
