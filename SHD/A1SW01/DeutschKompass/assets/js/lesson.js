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
function speak(t, r, btn) {
  if (!('speechSynthesis' in window)) { alert('Dein Browser hat keine Sprachausgabe. Nutze den ganzen Text mit der Originalaufnahme.'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t); u.lang = 'de-DE'; u.rate = r; if (deVoice) u.voice = deVoice;
  if (btn) { btn.classList.add('go'); u.onend = u.onerror = () => btn.classList.remove('go'); }
  speechSynthesis.speak(u);
}

/* ================= state ================= */
const qs = d.questions || [];
const S = {
  order: qs.map((q, i) => i), pos: 0, answers: {}, checked: {}, done: false,        // lesen / hören
  steps: [], step: 0, dict: {}, dictOk: {}, hints: {}, full: '', fullDone: false, textOpen: true, rate: 1, marked: null   // diktat
};
if (!IS_Q) {
  d.sentences.forEach((s, i) => S.steps.push({ t: 'sent', i }));
  if (d.fullText) S.steps.push({ t: 'full' });
}
let prev = DK.store.get(MID);

/* ================= shell (built once, so audio keeps playing) ================= */
function shell() {
  const total = IS_Q ? qs.length : S.steps.length;
  app.innerHTML = `<div class="shell">
    <div class="topbar"><a class="icon-btn" href="../index.html" aria-label="Zur Übersicht" title="Übersicht">✕</a><div class="dots" id="dots">${Array.from({ length: total }, () => '<i></i>').join('')}</div><span class="count" id="count"></span></div>
    <div><span class="tag">${MODE}</span><span class="lvl">${esc(d.level || 'A1+')}</span></div>
    <h1 class="title">${esc(d.title)}</h1>
    <div class="stage ${d.mode === 'lesen' ? 'two' : ''}" id="stage"><div id="pane"></div><div id="qwrap"></div></div>
    <div class="dock"><div><button class="btn" id="go"></button></div></div></div>`;
  const pane = document.getElementById('pane');
  if (d.mode === 'lesen') pane.innerHTML = `<div class="panel sticky"><details class="txt" id="txt" ${innerWidth > 820 ? 'open' : ''}><summary>📖 Text</summary><div class="textbody" id="textbody">${esc(d.text)}</div>${d.source ? `<div class="src">Quelle: ${esc(d.source)}</div>` : ''}</details></div>`;
  else if (d.mode === 'hoeren') pane.innerHTML = `<div class="panel audio"><span class="tag">Hörtext</span><audio id="aud" controls preload="metadata" src="${esc(d.audio)}"></audio><div class="speed"><button class="chipbtn" data-skip="-10">⏪ 10 s</button><button class="chipbtn" data-skip="10">10 s ⏩</button>${[.75, 1, 1.25].map(r => `<button class="chipbtn ${r === 1 ? 'on' : ''}" data-rate="${r}">${r}×</button>`).join('')}</div></div>`;
  else pane.remove();
  if (d.mode === 'lesen' && innerWidth <= 820) document.getElementById('txt').open = true;
  document.getElementById('go').onclick = act;
  app.addEventListener('click', onClick);
  app.addEventListener('input', e => { if (e.target.matches('textarea')) { onType(e.target); } });
  app.addEventListener('keydown', e => { if (e.target.matches('textarea.one') && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); act(); } });
}

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
  if (IS_Q) {
    const i = S.order[S.pos], q = qs[i], chk = !!S.checked[i], a = S.answers[i];
    let h = `<div class="panel q ${chk ? 'locked' : ''}" id="card"><span class="tag">Aufgabe ${S.pos + 1}</span><h3>${esc(q.q)}</h3>`;
    if (q.type === 'mc') h += q.options.map((op, j) => {
      const cls = chk ? (j === q.answer ? 'correct' : a === j ? 'wrong' : '') : a === j ? 'sel' : '';
      return `<button class="opt ${cls}" data-mc="${j}"><span class="k">${'ABCD'[j]}</span><span>${esc(op)}</span></button>`;
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
    setGo(chk ? (last ? 'Ergebnis ansehen →' : 'Weiter →') : 'Prüfen', chk || answered(q, a));
    return;
  }
  /* ---- diktat ---- */
  const st = S.steps[S.step];
  if (st.t === 'sent') {
    const i = st.i, s = d.sentences[i], chk = i in S.dictOk;
    let h = `<div class="panel q ${chk ? 'locked' : ''}" id="card"><span class="tag">Satz ${i + 1} von ${d.sentences.length}</span>
      <div class="say"><button class="play" data-say="${i}" aria-label="Satz anhören">▶</button><div style="display:grid;gap:8px"><b>Hör zu und schreibe.</b><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="chipbtn" data-slow="${i}">🐢 Langsam</button>${chk ? '' : `<button class="chipbtn" data-hint="${i}">💡 Tipp</button>`}</div></div></div>
      ${S.hints[i] ? `<p class="hint">Tipp: ${toks(s).length} Wörter · beginnt mit „${esc(toks(s)[0])}“</p>` : ''}
      <textarea class="one" data-w="${i}" aria-label="Satz ${i + 1}" placeholder="Schreibe den Satz hier …" ${chk ? 'readonly' : ''}>${esc(S.dict[i] || '')}</textarea>
      <div class="hint" id="voice-note" ${deVoice || !('speechSynthesis' in window) ? 'hidden' : ''}>Keine deutsche Stimme gefunden – installiere eine deutsche Stimme auf deinem Gerät.</div>`;
    if (chk) { const df = diff(S.dict[i] || '', s), um = df.some(x => x.t === 'umlaut'), ok = S.dictOk[i]; h += `<div class="fb ${ok ? 'ok' : 'no'}"><span>${ok ? '✅' : '✏️'}</span><div><b>${ok ? (um ? 'Richtig – achte auf ä/ö/ü/ß.' : 'Richtig!') : 'Vergleiche genau:'}</b>${diffHTML(df)}${ok ? '' : `<div style="margin-top:8px"><b>Lösung:</b> ${esc(s)}</div>`}</div></div>`; }
    h += '</div>';
    wrap.innerHTML = h;
    setGo(chk ? (S.step === S.steps.length - 1 ? 'Ergebnis ansehen →' : 'Weiter →') : 'Prüfen', chk || !!(S.dict[i] || '').trim());
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

function markText(sent) {
  const tb = $('textbody'); if (!tb || S.marked === sent) return; S.marked = sent;
  tb.innerHTML = sent && d.text.includes(sent) ? esc(d.text).replace(esc(sent), `<mark style="background:var(--gold);color:#3a2500;border-radius:6px;padding:1px 3px">${esc(sent)}</mark>`) : esc(d.text);
  if (sent && innerWidth <= 820) { const t = $('txt'); if (t) t.open = true; }
}

/* ================= actions ================= */
function act() {
  const b = $('go'); if (b.disabled) return;
  if (S.done) return;
  if (IS_Q) {
    const i = S.order[S.pos];
    if (!S.checked[i]) { S.checked[i] = true; renderStep(); if (innerWidth <= 820) $('card').querySelector('.fb')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return; }
    if (S.pos < S.order.length - 1) { S.pos++; renderStep(); scrollTo({ top: 0, behavior: 'smooth' }); } else finish();
  } else {
    const st = S.steps[S.step];
    if (st.t === 'sent' && !(st.i in S.dictOk)) { S.dictOk[st.i] = fold(S.dict[st.i]) === fold(d.sentences[st.i]); renderStep(); return; }
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
  const i = IS_Q ? S.order[S.pos] : null;
  if (t.dataset.mc != null && !S.checked[i]) { S.answers[i] = +t.dataset.mc; renderStep(); }
  else if (t.dataset.tf != null && !S.checked[i]) { S.answers[i] = t.dataset.tf === 'true'; renderStep(); }
  else if (t.dataset.ord != null && !S.checked[i]) {
    const q = qs[i], n = q.options.length, a = S.answers[i] = S.answers[i] || new Array(n).fill(null), j = +t.dataset.ord;
    if (a[j]) a[j] = null; else for (let k = 1; k <= n; k++) if (!a.includes(k)) { a[j] = k; break; }
    renderStep();
  }
  else if (t.dataset.say != null) speak(d.sentences[+t.dataset.say], .86, t);
  else if (t.dataset.slow != null) speak(d.sentences[+t.dataset.slow], .55, document.querySelector('.play'));
  else if (t.dataset.hint != null) { S.hints[+t.dataset.hint] = true; const v = document.querySelector('textarea')?.value; renderStep(); if (v != null) document.querySelector('textarea').value = v; }
  else if (t.dataset.skip != null) { const a = $('aud'); a.currentTime = Math.max(0, a.currentTime + +t.dataset.skip); }
  else if (t.dataset.rate != null) { S.rate = +t.dataset.rate; const a = $('aud'); a.playbackRate = S.rate; t.parentElement.querySelectorAll('[data-rate]').forEach(b => b.classList.toggle('on', b === t)); }
  else if (t.id === 'retry') retry();
  else if (t.id === 'again') again();
}
addEventListener('keydown', e => {
  if (S.done || e.target.matches('textarea,input,button,a,audio') || e.metaKey || e.ctrlKey) return;
  if (e.key === 'Enter') { act(); return; }
  if (!IS_Q) return; const i = S.order[S.pos], q = qs[i]; if (S.checked[i]) return;
  const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase());
  if (q.type === 'mc' && k >= 0 && k < q.options.length) { S.answers[i] = k; renderStep(); }
  else if (q.type === 'tf' && (e.key === 'r' || e.key === 'f')) { S.answers[i] = e.key === 'r'; renderStep(); }
});

/* ================= result ================= */
function score() {
  if (IS_Q) { const ok = qs.filter((q, i) => valid(q, S.answers[i])).length; return { n: ok, total: qs.length, pct: Math.round(ok / qs.length * 100) }; }
  const n = d.sentences.filter((s, i) => S.dictOk[i]).length, sp = n / d.sentences.length;
  const acc = d.fullText ? accuracy(diff(S.full, d.fullText)) : null;
  return { n, total: d.sentences.length, acc: acc == null ? null : Math.round(acc * 100), pct: Math.round((acc == null ? sp : (sp + acc) / 2) * 100) };
}
function nextModule() {
  const list = MODS.filter(m => m.mode === d.mode), k = list.findIndex(m => m.id === MID), rec = DK.store.all();
  const after = list.slice(k + 1).concat(list.slice(0, k));
  return after.find(m => !rec[m.id]) || after[0] || null;
}
function finish() {
  S.done = true; const sc = score(), old = DK.store.get(MID) || {};
  DK.store.set(MID, { last: sc.pct, best: Math.max(old.best ?? 0, sc.pct), tries: (old.tries || 0) + 1, date: Date.now(), mode: d.mode });
  prev = old; renderStep(); scrollTo({ top: 0 });
  $('go').style.display = 'none';
  if (sc.pct >= 80) setTimeout(() => DK.confetti(sc.pct === 100 ? 1.5 : .9), 350);
}
function renderResult() {
  $('pane')?.setAttribute('hidden', ''); $('aud')?.pause?.();
  $('stage').classList.remove('two');
  const sc = score(), nx = nextModule();
  const msg = sc.pct === 100 ? 'Perfekt! Kein einziger Fehler.' : sc.pct >= 80 ? 'Sehr gut! Fast alles richtig.' : sc.pct >= 60 ? 'Gut gemacht – noch ein bisschen Übung.' : 'Nicht aufgeben! Versuch es noch einmal.';
  const wrongs = IS_Q ? qs.map((q, i) => ({ q, i })).filter(x => !valid(x.q, S.answers[x.i])) : [];
  const line = IS_Q ? `${sc.n} / ${sc.total} richtig` : `${sc.n} / ${sc.total} Sätze${sc.acc != null ? ' · Text ' + sc.acc + '%' : ''}`;
  const best = prev && prev.best != null && prev.best > sc.pct ? `<p>Dein Rekord: ${prev.best}%</p>` : '';
  $('qwrap').innerHTML = `<div class="result"><div class="medal-host" id="medal"><div class="ring">${sc.pct}%</div></div><h2>${line}</h2><p>${msg}</p>${best}
    <div class="acts">${nx ? `<a class="btn" href="${nx.url}">Nächste Übung →</a>` : ''}${wrongs.length ? '<button class="btn ghost" id="retry">Fehler wiederholen</button>' : !IS_Q ? '<button class="btn ghost" id="again">Nochmal</button>' : ''}<a class="btn ghost" href="../index.html">Übersicht</a></div>
    ${wrongs.length ? `<details class="review"><summary style="cursor:pointer;font-weight:800;list-style:none;text-align:center">Fehler ansehen (${wrongs.length})</summary>${wrongs.map(x => `<div><b>${esc(x.q.q)}</b><br>Richtig: ${esc(solutionText(x.q))}</div>`).join('')}</details>` : ''}</div>`;
  const mh = $('medal'); if (mh && DK.medal && DK.medal(mh, sc.pct)) mh.firstElementChild.remove();
}
function retry() {
  const wrong = qs.map((q, i) => i).filter(i => !valid(qs[i], S.answers[i]));
  wrong.forEach(i => { delete S.answers[i]; delete S.checked[i]; });
  S.order = wrong; S.pos = 0; S.done = false; $('stage').classList.toggle('two', d.mode === 'lesen'); $('pane')?.removeAttribute('hidden'); $('go').style.display = ''; S.marked = null;
  renderStep(); scrollTo({ top: 0 });
}
function again() {
  S.dict = {}; S.dictOk = {}; S.hints = {}; S.full = ''; S.fullDone = false; S.step = 0; S.done = false; $('go').style.display = ''; renderStep(); scrollTo({ top: 0 });
}

shell();
renderStep();
