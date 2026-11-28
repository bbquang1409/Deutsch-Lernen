/* ============================================================
   DEUTSCH-LERNEN · Shared Schreibwerkstatt Engine (A1 / A2 / B1)
   Features:
   - Guide Lernkarten with progress bar
   - Formular transfer mode (A1 Teil 1)
   - Guided Writing mode (01 Analyse -> 02 VI->DE Ideen with
     Leitpunkt-Tags + Wort-Hilfe + smart German checker ->
     03 Selbst schreiben + Redemittel + Mustertext -> 04 Check)
   - Prüfungsmodus toggle (hides step 01/02 & starts countdown)
   - Floating Umlaut bar + Lernpass + TXT export + _dlLog
   ============================================================ */
(function () {
  'use strict';

  if (typeof window._dlLog !== 'function') window._dlLog = function () {};

  const CFG = window.SCHREIBEN_CONFIG;
  if (!CFG || !Array.isArray(CFG.parts)) return;

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const LEVEL = CFG.level || 'B1';
  const STORAGE_KEY = CFG.storageKey || ('dl_schreiben_' + LEVEL.toLowerCase() + '_v1');
  const PARTS = CFG.parts; // [{ id, label, shortLabel, icon, type:'form'|'writing', examMinutes, minWords, items:[...] }]

  // Apply dynamic tab count for mobile bottom nav
  const tabCount = PARTS.length + 2; // Start + parts + Lernpass
  document.documentElement.style.setProperty('--tab-count', String(tabCount));

  // State & Storage
  let state = { tab: 'guide', idx: 0, examMode: false };
  let timerSec = 0, timerInt = null, timerRunning = false;

  let store = {};
  try { store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { store = {}; }
  store.guide = store.guide || {};
  PARTS.forEach(p => { store[p.id] = store[p.id] || {}; });

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  function partById(id) { return PARTS.find(p => p.id === id); }
  function currentPart() { return partById(state.tab); }
  function currentItem() { const p = currentPart(); return p ? p.items[state.idx] : null; }
  function currentRec() {
    const bag = store[state.tab] || {};
    if (!bag[state.idx]) bag[state.idx] = { answers: {}, checked: {}, feedback: {}, self: {}, fullEmail: '' };
    return bag[state.idx];
  }

  /* ============================================================
     GERMAN SENTENCE EVALUATOR (A1 / A2 / B1)
     ============================================================ */
  function norm(s) {
    return String(s || '')
      .normalize('NFC')
      .toLocaleLowerCase('de')
      .replace(/[„“”"'’.,!?;:()–—]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/ß/g, 'ss')
      .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
      .replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u');
  }

  function lev(a, b) {
    const x = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let p = i - 1; x[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const old = x[j];
        x[j] = Math.min(x[j] + 1, x[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1));
        p = old;
      }
    }
    return x[b.length];
  }

  const PR = ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'man'];
  const CJ = ['und', 'oder', 'aber'];
  const SUB = ['weil', 'da', 'dass', 'obwohl', 'wenn', 'ob', 'damit', 'falls'];
  const AX = [
    'habe', 'haben', 'hast', 'hat', 'hatte', 'hatten', 'hattest',
    'bin', 'bist', 'ist', 'sind', 'war', 'waren', 'ware',
    'kann', 'kannst', 'konnen', 'konnte', 'konnten',
    'muss', 'musst', 'mussen', 'musste',
    'will', 'willst', 'wollen', 'mochte', 'mochten',
    'soll', 'sollst', 'sollte', 'sollten',
    'darf', 'darfst', 'durfen', 'werde', 'wird', 'werden', 'wurde', 'wurden'
  ];
  const OP = ['bitte', 'gern', 'gerne', 'sehr', 'wirklich', 'mal', 'ja', 'doch', 'eigentlich', 'naturlich', 'leider', 'vielleicht', 'auch', 'schon', 'noch', 'dort', 'hier'];
  const TS = ['gestern', 'heute', 'morgen', 'jetzt', 'dann', 'danach', 'leider', 'hoffentlich', 'spater', 'bald', 'zuerst', 'fruher', 'am', 'um', 'im', 'vor', 'letzte', 'letzten', 'letztes', 'nachste', 'nachsten', 'diese', 'diesen', 'dieses', 'seit', 'bis', 'erstens', 'zweitens', 'ausserdem', 'deshalb', 'trotzdem', 'einerseits', 'andererseits'];
  const EQ = {
    darf: 'kann', darfst: 'kannst', durfen: 'konnen', durft: 'konnt',
    deswegen: 'deshalb', daher: 'deshalb', darum: 'deshalb',
    dennoch: 'trotzdem', jedoch: 'aber',
    da: 'weil',
    mochte: 'will', mochten: 'wollen',
    konnte: 'kann', konnten: 'konnen',
    wurde: 'mochte',
    super: 'sehr', toll: 'gut', klasse: 'gut', prima: 'gut',
    etwa: 'ungefahr', circa: 'ungefahr', ca: 'ungefahr',
    bereits: 'schon', aktuell: 'derzeit', momentan: 'derzeit', gerade: 'derzeit',
    senden: 'schicken', zusenden: 'schicken', mitteilen: 'sagen',
    erhalten: 'bekommen'
  };
  const ART = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'mein', 'meine', 'meinen', 'meinem', 'meiner', 'dein', 'deine', 'deinen', 'deinem', 'deiner', 'ihr', 'ihre', 'ihren', 'ihrem', 'sein', 'seine', 'seinen', 'unser', 'unsere', 'kein', 'keine', 'keinen'];
  const PRN = ['mich', 'dich', 'ihn', 'sie', 'es', 'uns', 'euch', 'mir', 'dir', 'ihm', 'ihr', 'ihnen', 'sich'];
  const PREP = ['zu', 'zur', 'zum', 'in', 'im', 'ins', 'an', 'am', 'auf', 'bei', 'beim', 'mit', 'von', 'vom', 'nach', 'aus', 'fur', 'um', 'uber'];

  const W_ = t => String(t || '').replace(/[„“”"'’.,!?;:()–—]/g, ' ').split(/\s+/).filter(Boolean);

  function canon(t) {
    t = t.replace(/\be mail\b/g, 'email').replace(/\b(\d{1,2}) 00\b/g, '$1');
    const w = t.split(' ').filter(x => x && !OP.includes(x)).map(x => EQ[x] || x);
    for (let i = 1; i < w.length - 1; i++) {
      if (!CJ.includes(w[i])) continue;
      const k = i + 1;
      let ok = false;
      if (PR.includes(w[k]) && w.slice(0, i).includes(w[k])) { w.splice(k, 1); ok = true; }
      else if (AX.includes(w[k])) ok = true;
      if (ok && AX.includes(w[k]) && w.slice(0, i).includes(w[k])) w.splice(k, 1);
    }
    return w.join(' ');
  }

  function variantsOf(t) {
    const c = canon(t), out = new Set([c]), w = c.split(' ');
    if (TS.includes(w[0])) {
      for (let k = 1; k <= 4 && k + 1 < w.length; k++) {
        if (PR.includes(w[k + 1])) out.add([w[k + 1], w[k], ...w.slice(0, k), ...w.slice(k + 2)].join(' '));
      }
    }
    if (PR.includes(w[0]) && w.length > 3 && TS.includes(w[2])) {
      for (let j = 1; j <= 3 && 2 + j <= w.length; j++) {
        out.add([...w.slice(2, 2 + j), w[1], w[0], ...w.slice(2 + j)].join(' '));
      }
    }
    return [...out];
  }

  function lenhint(w) {
    const n = w.length, k = n <= 3 ? 1 : 2;
    return '‚' + w.slice(0, k) + '…‘ (' + n + ' Buchstaben)';
  }

  function caseNote(value, src) {
    const out = [];
    const sw = W_(value), rw = W_(src);
    if (sw.length === rw.length) {
      sw.forEach((w, i) => {
        if (norm(w) === norm(rw[i]) && w[0] !== rw[i][0] && w[0].toLowerCase() === rw[i][0].toLowerCase()) {
          out.push(rw[i]);
        }
      });
    }
    return out.length ? '\nTipp zur Großschreibung: Schreibe groß: ' + out.join(', ') + '.' : '';
  }

  function checkNebensatzVerbOrder(value) {
    const clauses = String(value || '').split(/[.,!?;]+/);
    for (const cl of clauses) {
      const words = W_(cl);
      const nw = words.map(norm);
      const subIdx = nw.findIndex(x => SUB.includes(x));
      if (subIdx < 0) continue;
      const tail = nw.slice(subIdx + 1);
      if (tail.length < 3) continue;
      if (AX.includes(tail[0])) {
        return 'Nebensatz-Wortstellung: Nach „' + words[subIdx] + '“ steht das konjugierte Verb („' + words[subIdx + 1] + '“) am Ende des Nebensatzes, nicht direkt danach.';
      }
      const lastWord = tail[tail.length - 1];
      const earlyAx = tail.slice(1, Math.min(4, tail.length - 1)).findIndex(x => AX.includes(x));
      if (earlyAx >= 0 && !AX.includes(lastWord)) {
        const verbWord = words[subIdx + 2 + earlyAx];
        return 'Nebensatz-Wortstellung: Nach „' + words[subIdx] + '“ wandert das konjugierte Verb („' + verbWord + '“) ans Ende des Nebensatzes.';
      }
    }
    return '';
  }

  function diagnose(value, src) {
    const sw = W_(value), rw = W_(src);
    const sn = sw.map(x => EQ[norm(x)] || norm(x));
    const rn = rw.map(x => EQ[norm(x)] || norm(x));
    const tips = [];

    const nsErr = checkNebensatzVerbOrder(value);
    if (nsErr) tips.push(nsErr);

    let miss = rw.map((w, i) => ({ w, n: rn[i] })).filter(o => !sn.includes(o.n) && !OP.includes(o.n));
    let extra = sw.map((w, i) => ({ w, n: sn[i] })).filter(o => !rn.includes(o.n) && !OP.includes(o.n));
    const pairs = [];
    const cp = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };

    extra = extra.filter(e => {
      const k = miss.findIndex(m => lev(e.n, m.n) <= 2 || cp(e.n, m.n) >= 3);
      if (k < 0) return true;
      pairs.push([e, miss[k]]);
      miss.splice(k, 1);
      return false;
    });

    pairs.forEach(([e, m]) => {
      if (PRN.includes(e.n) && PRN.includes(m.n)) {
        tips.push('Pronomen: „' + e.w + '“ passt hier nicht. Prüfe den Kasus (Akk./Dat.). Gesucht: ' + lenhint(m.w) + '.');
      } else if (PREP.includes(e.n) && PREP.includes(m.n)) {
        tips.push('Präposition: Prüfe „' + e.w + '“. Gesucht: ' + lenhint(m.w) + '.');
      } else if (ART.includes(e.n) && ART.includes(m.n)) {
        tips.push('Artikel/Possessiv: „' + e.w + '“ passt nicht. Prüfe Genus und Kasus. Gesucht: ' + lenhint(m.w) + '.');
      } else {
        tips.push('Wortform/Schreibweise: Prüfe „' + e.w + '“. Gesucht: ' + lenhint(m.w) + '.');
      }
    });

    if (!miss.length && !extra.length && !pairs.length && !tips.length) {
      tips.push('Alle wichtigen Wörter sind da – prüfe die Wortstellung (Hauptsatz: Verb auf Position 2 · Nebensatz nach weil/dass/obwohl/wenn: Verb am Ende).');
    } else {
      miss.slice(0, 3).forEach(m => tips.push('Es fehlt noch ein Schlüsselwort: ' + lenhint(m.w) + '.'));
      extra.slice(0, 2).forEach(e => tips.push('„' + e.w + '“ passt hier nicht oder wird nicht gebraucht.'));
    }
    return tips.slice(0, 4);
  }

  function evalSentence(value, variants, register) {
    const s = norm(value);
    if (!s) return { status: 'bad', msg: 'Bitte schreibe zuerst einen deutschen Satz.' };

    const exact = variants.find(v => norm(v) === s);
    if (exact) return { status: 'good', msg: 'Richtig! Dein Satz passt perfekt zur Musterlösung.' + caseNote(value, exact) };

    const sv = variantsOf(s);
    const rv = variants.flatMap(v => variantsOf(norm(v)).map(k => ({ k, src: v })));
    const hit = rv.find(o => sv.includes(o.k));
    if (hit) {
      return { status: 'good', msg: 'Richtig! Das ist eine sehr gute Variante.' + caseNote(value, hit.src) };
    }

    // du / Sie register check
    const r0 = variants[0];
    const reg = String(register || '').toLowerCase();
    const duW = /\b(du|dich|dir|dein\w*|kannst|möchtest|hast|bist)\b/i;
    const sieW = /\b(Ihnen|Ihre\w*|Ihr|Sie)\b/;
    const sieS = /\s(Sie|Ihnen|Ihre\w*)\b/.test(' ' + value);
    if ((reg.includes('formell') && !reg.includes('informell')) && sieW.test(r0) && duW.test(value) && !sieS) {
      return { status: 'bad', msg: 'Achte auf das Register: In dieser E-Mail schreibst du mit „Sie“ (nicht „du“).' };
    }
    if (reg.includes('informell') && duW.test(r0) && !sieW.test(r0) && sieS && !duW.test(value)) {
      return { status: 'bad', msg: 'Achte auf das Register: In dieser persönlichen Nachricht schreibst du mit „du“ (nicht „Sie“).' };
    }

    // Nebensatz verb-order check BEFORE fuzzy pass
    const nsErr = checkNebensatzVerbOrder(value);
    if (nsErr) {
      return { status: 'warn', msg: 'Fast richtig, aber prüfe die Satzstellung:\n• ' + nsErr };
    }

    const c0 = sv[0];
    const scored = rv.map(o => {
      const distRatio = lev(c0, o.k) / Math.max(c0.length, o.k.length, 1);
      const swSet = new Set(c0.split(' '));
      const rwArr = o.k.split(' ');
      const overlap = rwArr.filter(x => swSet.has(x)).length / Math.max(rwArr.length, 1);
      return { o, ratio: distRatio, overlap };
    }).sort((a, b) => a.ratio - b.ratio);

    const best = scored[0];
    if (best.overlap >= 0.85 && best.ratio <= 0.16) {
      return { status: 'good', msg: 'Gut gelöst! Dein Satz trifft Inhalt und Struktur der Musterlösung.' + caseNote(value, best.o.src) };
    }

    const tips = diagnose(value, best.o.src);
    const st = (best.ratio <= 0.34 || best.overlap >= 0.55) ? 'warn' : 'bad';
    const head = best.ratio <= 0.15
      ? 'Fast richtig! Prüfe noch ein Detail:'
      : st === 'warn'
        ? 'Gute Richtung – vergleiche deinen Satz mit diesen Hinweisen:'
        : 'Noch nicht passend. Nutze die 🔑 Wort-Hilfe oder öffne die Musterlösung.';

    return { status: st, msg: head + (tips.length ? '\n• ' + tips.join('\n• ') : '') };
  }

  /* ============================================================
     TIMER (PRÜFUNGSMODUS)
     ============================================================ */
  function stopTimer() {
    if (timerInt) { clearInterval(timerInt); timerInt = null; }
    timerRunning = false;
  }
  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function startExamTimer(minutes) {
    stopTimer();
    timerSec = (minutes || 20) * 60;
    timerRunning = true;
    const tv = $('timerVal');
    if (tv) tv.textContent = fmtTime(timerSec);
    timerInt = setInterval(() => {
      if (timerSec <= 0) {
        stopTimer();
        const tv2 = $('timerVal');
        if (tv2) tv2.textContent = '00:00';
        alert('⏰ Zeit abgelaufen! Du kannst deinen Text jetzt mit der Checkliste prüfen.');
        return;
      }
      timerSec--;
      const tv2 = $('timerVal');
      if (tv2) tv2.textContent = fmtTime(timerSec);
    }, 1000);
  }

  /* ============================================================
     SCORING
     ============================================================ */
  function partStats(part) {
    let solved = 0, max = 0;
    part.items.forEach((it, i) => {
      const len = part.type === 'form' ? it.fields.length : it.sentences.length;
      max += len;
      const r = store[part.id]?.[i];
      if (!r || !r.checked) return;
      for (let j = 0; j < len; j++) {
        if (r.checked[j] === 'good') solved++;
      }
    });
    return { solved, max };
  }

  function updateGlobalCount() {
    let s = 0, m = 0;
    PARTS.forEach(p => { const st = partStats(p); s += st.solved; m += st.max; });
    const el = $('globalCount');
    if (el) el.textContent = s + ' / ' + m;
  }

  /* ============================================================
     TABS & SIDEBAR
     ============================================================ */
  function buildTabs() {
    const nav = $('tabsNav');
    if (!nav) return;
    const btns = [{ id: 'guide', icon: '📖', label: 'Start' }]
      .concat(PARTS.map(p => ({ id: p.id, icon: p.icon || '✍️', label: p.shortLabel || p.label })))
      .concat([{ id: 'report', icon: '📊', label: 'Lernpass' }]);

    nav.innerHTML = btns.map(b =>
      '<button type="button" class="tab' + (state.tab === b.id ? ' active' : '') + '" data-tab="' + esc(b.id) + '">' +
        '<span class="tab-ico">' + b.icon + '</span><span>' + esc(b.label) + '</span>' +
      '</button>'
    ).join('');

    nav.querySelectorAll('.tab').forEach(btn => {
      btn.onclick = () => {
        state.tab = btn.dataset.tab;
        state.idx = 0;
        state.examMode = false;
        stopTimer();
        render();
      };
    });
  }

  function renderSide() {
    const part = currentPart();
    if (!part) { $('sidebar').innerHTML = ''; return; }
    const arr = part.items;
    const cur = arr[state.idx];
    const perTask = part.type === 'form' ? cur.fields.length : cur.sentences.length;

    $('sidebar').innerHTML =
      '<h3>Aufgabe wählen</h3>' +
      '<div class="pickrow">' +
        '<button type="button" class="pnav" data-step="-1" aria-label="Vorherige Aufgabe">‹</button>' +
        '<button type="button" class="pickbtn" id="pickbtn" aria-expanded="false">' +
          '<span class="pn">' + (state.idx + 1) + ' / ' + arr.length + '</span>' +
          '<span class="pt">' + esc(cur.title) + '</span>' +
          '<span>▾</span>' +
        '</button>' +
        '<button type="button" class="pnav" data-step="1" aria-label="Nächste Aufgabe">›</button>' +
      '</div>' +
      '<div class="exercise-list">' +
      arr.map((x, i) => {
        const r = store[part.id]?.[i];
        const total = part.type === 'form' ? x.fields.length : x.sentences.length;
        const done = r ? Object.values(r.checked || {}).filter(v => v === 'good').length : 0;
        const hasDraft = part.type !== 'form' && r && r.fullEmail && r.fullEmail.trim().split(/\s+/).length >= 20;
        return '<button type="button" class="ex-item ' + (state.idx === i ? 'active' : '') + '" data-idx="' + i + '">' +
          '<strong>' + String(i + 1).padStart(2, '0') + ' · ' + esc(x.title) + '</strong>' +
          '<span>' + esc(x.theme) + ' · ' + done + '/' + total + ' ✓' + (hasDraft ? ' · ✍️' : '') + '</span>' +
        '</button>';
      }).join('') +
      '</div>';

    const pb = $('pickbtn');
    if (pb) {
      pb.onclick = () => {
        const s = $('sidebar');
        s.classList.toggle('open');
        pb.setAttribute('aria-expanded', s.classList.contains('open'));
      };
    }
    $('sidebar').querySelectorAll('[data-step]').forEach(b => {
      b.onclick = () => { state.idx = (state.idx + Number(b.dataset.step) + arr.length) % arr.length; state.examMode = false; stopTimer(); render(); };
    });
    $('sidebar').querySelectorAll('[data-idx]').forEach(b => {
      b.onclick = () => {
        state.idx = Number(b.dataset.idx);
        state.examMode = false;
        stopTimer();
        $('sidebar').classList.remove('open');
        render();
        if (window.innerWidth <= 760) $('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    });
  }

  /* ============================================================
     RENDER FORMULAR (A1 TEIL 1)
     ============================================================ */
  function renderForm(part) {
    const x = currentItem();
    const r = currentRec();
    $('main').innerHTML =
      '<div class="kicker">' + esc(part.label) + '</div>' +
      '<h2>' + esc(x.title) + '</h2>' +
      '<p class="sub">' + esc(x.theme) + ' · ' + x.fields.length + ' Informationen im Dokument finden und genau übertragen</p>' +
      '<div class="prompt"><strong>AUFGABE</strong><p>' + esc(x.instruction) + '</p></div>' +
      '<div class="source">' +
        '<h3>📄 ' + esc(x.doctitle || 'Bestätigung') + '</h3>' +
        '<div class="realistic-paper">' +
          '<div class="doc-masthead"><span>' + esc(x.brand || 'Servicecenter') + '</span><small>' + esc(x.sub || 'Kundenservice') + '</small></div>' +
          '<div class="doc-rule"></div>' +
          '<p class="doc-greeting">' + esc(x.intro || 'Ihre Daten:') + '</p>' +
          '<p class="doc-body">' + esc((x.narrative || '') + (x.extra ? ' ' + x.extra : '')) + '</p>' +
          '<div class="doc-foot"><span>Referenz: ' + esc(x.ref || 'DL-2026') + '</span><span>Ausgestellt: ' + esc(x.issued || '') + '</span></div>' +
        '</div>' +
      '</div>' +
      '<h3 style="margin:12px 0 8px;color:var(--navy)">Formular ausfüllen</h3>' +
      '<div class="formgrid">' +
        x.fields.map((f, j) =>
          '<div class="field">' +
            '<label for="a' + j + '">' + esc(f.key === 'Straße' ? 'Straße und Hausnummer' : f.key) + '</label>' +
            '<input id="a' + j + '" autocomplete="off" spellcheck="false" value="' + esc(r.answers?.[j] || '') + '" placeholder="Eintragen …">' +
            '<div id="f' + j + '">' + (r.checked?.[j] ? '<div class="feedback ' + r.checked[j] + '">' + esc(r.feedback?.[j] || '') + '</div>' : '') + '</div>' +
          '</div>'
        ).join('') +
      '</div>' +
      '<div class="actions" style="margin-top:18px">' +
        '<button type="button" class="btn primary" id="checkAll">Formular prüfen</button>' +
        '<button type="button" class="btn soft bignext" id="nextTask">Nächste Aufgabe →</button>' +
      '</div>' +
      '<p class="notice">Achte auf genaue Namen, Daten, Uhrzeiten und Zahlen. Im Dokument stehen oft Zusatzinformationen, die nicht ins Formular gehören.</p>';

    x.fields.forEach((f, j) => {
      $('a' + j).oninput = e => {
        r.answers[j] = e.target.value;
        if (r.checked[j]) {
          delete r.checked[j];
          $('f' + j).innerHTML = '';
          updateGlobalCount();
          renderSide();
        }
        persist();
      };
    });

    $('checkAll').onclick = () => {
      let okCount = 0;
      x.fields.forEach((f, j) => {
        const val = norm($('a' + j).value), cor = norm(f.value);
        const ok = val === cor;
        if (ok) okCount++;
        r.checked[j] = ok ? 'good' : 'bad';
        r.feedback = r.feedback || {};
        r.feedback[j] = ok ? 'Richtig übertragen.' : 'Bitte mit dem Dokument vergleichen. Richtige Angabe: ' + f.value;
        $('f' + j).innerHTML = '<div class="feedback ' + r.checked[j] + '">' + esc(r.feedback[j]) + '</div>';
      });
      persist();
      updateGlobalCount();
      renderSide();
      window._dlLog(LEVEL + ' Formular · ' + x.title, okCount, x.fields.length);
    };

    $('nextTask').onclick = () => {
      state.idx = (state.idx + 1) % part.items.length;
      render();
    };
  }

  /* ============================================================
     RENDER WRITING TASK (A1 T2, A2 T1/2, B1 T1/2/3)
     ============================================================ */
  function renderWriting(part) {
    const x = currentItem();
    const r = currentRec();
    const solved = Object.values(r.checked || {}).filter(v => v === 'good').length;
    const isForum = String(x.register || '').toLowerCase().includes('forum');
    const rm = (CFG.redemittel && CFG.redemittel[part.id]) || {};
    const mins = part.examMinutes || 20;

    const rmHtml = Object.keys(rm).map(cat =>
      '<div class="rm-cat">' + esc(cat) + '</div>' +
      '<div class="rm-chips">' + rm[cat].map(ph => '<button type="button" class="rm-chip" data-phrase="' + esc(ph) + '">' + esc(ph) + '</button>').join('') + '</div>'
    ).join('');

    const selfItems = isForum
      ? [
          'Eigene Meinung klar am Anfang genannt',
          'Alle Leitpunkte (Argumente, Beispiel) bearbeitet',
          'Passende Konnektoren verwendet (weil, obwohl, deshalb, einerseits …)',
          'Kurzes Fazit am Ende formuliert',
          'Verbposition & Großschreibung geprüft'
        ]
      : [
          'Passende Anrede gewählt (' + x.anrede + ')',
          'Alle Leitpunkte vollständig beantwortet',
          'Register (' + x.register + ') konsequent durchgehalten',
          'Passender Gruß (' + x.gruss + ') am Ende',
          'Verbposition, Großschreibung und Satzzeichen geprüft'
        ];

    $('main').classList.toggle('exam-mode', state.examMode);
    $('main').innerHTML =
      '<div class="mode-bar' + (state.examMode ? ' exam-on' : '') + '" id="modeBar">' +
        '<div class="mode-left">' +
          '<button type="button" class="mode-toggle-btn" id="btnExamMode">' + (state.examMode ? '📚 Zurück zum Lernmodus' : '⏱ Prüfungsmodus starten') + '</button>' +
          '<span class="mode-desc">' + (state.examMode ? 'Hilfen ausgeblendet — schreibe frei wie in der Prüfung!' : 'Lernmodus: Mit 4-Schritte-Anleitung & Ideen-Training') + '</span>' +
        '</div>' +
        '<div class="timer-group">' +
          '<span class="timer-val" id="timerVal">' + fmtTime(timerSec || mins * 60) + '</span>' +
          '<button type="button" class="timer-btn" id="btnTimerPause">' + (timerRunning ? 'Pause' : 'Start') + '</button>' +
          '<button type="button" class="timer-btn" id="btnTimerReset">Reset</button>' +
        '</div>' +
      '</div>' +

      '<div class="kicker">' + esc(part.label) + ' · ' + esc(x.register) + '</div>' +
      '<h2>' + esc(x.title) + '</h2>' +
      '<p class="sub">' + esc(x.theme) + ' · Niveau ' + esc(LEVEL) + ' · Richtwert: ' + esc(x.wordTarget || part.wordTarget || 'ca. 40–80 Wörter') + '</p>' +

      '<div class="prompt">' +
        '<strong>PRÜFUNGSAUFGABE · SITUATION</strong>' +
        '<p>' + esc(x.scenario) + '</p>' +
        '<p style="margin-top:10px"><strong>Bearbeite alle Inhaltspunkte:</strong></p>' +
        '<ol class="exam-points">' + x.points.map(p => '<li>' + esc(p) + '</li>').join('') + '</ol>' +
        '<p class="mini">Richtwert: ' + esc(x.wordTarget || part.wordTarget || '') + '. ' + (isForum ? 'Kein Brief-Anfang nötig – starte direkt mit deiner Meinung.' : 'Vergiss Anrede und Gruß nicht.') + '</p>' +
      '</div>' +

      '<section class="analysis-box">' +
        '<h3>01 · Aufgabe verstehen</h3>' +
        '<p class="mini">Beantworte diese Leitfragen zuerst für dich:</p>' +
        '<ol>' + (x.analysis || []).map(a => '<li>' + esc(a) + '</li>').join('') + '</ol>' +
        '<div class="analysis-check"><strong>Struktur-Rahmen:</strong> ' + esc(x.anrede) + ' … → … ' + esc(x.gruss) + '</div>' +
      '</section>' +

      '<div class="training-section">' +
        '<section class="training-head">' +
          '<h3>02 · Ideen sammeln &amp; Sätze übersetzen (Việt → Đức)</h3>' +
          '<p class="mini">Jede Idee gehört zu einem Leitpunkt der Aufgabe. Übersetze zuerst selbst, nutze bei Bedarf <b>🔑 Wort-Hilfe</b> und prüfe deinen Satz.</p>' +
        '</section>' +
        '<div class="progress"><div id="pbar" style="width:' + (solved / x.sentences.length * 100) + '%"></div></div>' +
        '<p class="mini" id="ptxt">' + solved + ' / ' + x.sentences.length + ' Ideen-Sätze gelöst. Andere korrekte Varianten sind möglich.</p>' +
        x.sentences.map((ss, j) => {
          const kwList = Array.isArray(ss.keywords) ? ss.keywords : [];
          return '<section class="sentence ' + (r.checked?.[j] === 'good' ? 'done' : '') + '" id="s' + j + '">' +
            '<div class="shead">' +
              '<div class="shead-left">' +
                '<span class="num">IDEE ' + (j + 1) + ' / ' + x.sentences.length + '</span>' +
                (ss.pointTag ? '<span class="ptag">' + esc(ss.pointTag) + '</span>' : '') +
              '</div>' +
              (ss.hint ? '<span class="hint-tag">💡 ' + esc(ss.hint) + '</span>' : '') +
            '</div>' +
            '<div class="vi" lang="vi">' + esc(ss.vi) + '</div>' +
            (kwList.length ? '<div class="kw-box" id="kw' + j + '"><b>🔑 Schlüsselwörter (Grundform):</b> ' + kwList.map(k => '<span class="kw-chip">' + esc(k) + '</span>').join('') + '</div>' : '') +
            '<textarea class="answer" id="a' + j + '" aria-label="Satz ' + (j + 1) + ' auf Deutsch" lang="de" spellcheck="false" placeholder="Übersetze diese Idee ins Deutsche …">' + esc(r.answers?.[j] || '') + '</textarea>' +
            '<div class="actions">' +
              '<button type="button" class="btn primary" data-check="' + j + '">Prüfen</button>' +
              (kwList.length ? '<button type="button" class="btn kw" data-kw="' + j + '">🔑 Wort-Hilfe</button>' : '') +
              '<button type="button" class="btn soft" data-hint="' + j + '">Musterlösung</button>' +
            '</div>' +
            '<div id="f' + j + '">' + (r.checked?.[j] ? '<div class="feedback ' + r.checked[j] + '">' + esc(r.feedback?.[j] || '').replace(/\n/g, '<br>') + '</div>' : '') + '</div>' +
          '</section>';
        }).join('') +
      '</div>' +

      '<section class="free-write">' +
        '<h3>03 · Jetzt selbst schreiben (' + esc(x.wordTarget || part.wordTarget || '') + ')</h3>' +
        '<p class="mini">' + (state.examMode ? 'Prüfungsmodus aktiv: Schreibe deinen vollständigen Text jetzt frei ohne Satzhilfen.' : 'Verbinde deine Ideen aus Schritt 02 zu einem eigenen, flüssigen Text. Du musst nicht alle Sätze wörtlich übernehmen.') + '</p>' +
        '<details class="translated-ref" id="refDrawer"><summary>👀 Meine übersetzten Sätze aus Schritt 02 ansehen</summary><ol class="ref-list" id="refList"></ol></details>' +
        (rmHtml ? '<details class="rm-details"><summary>💡 Redemittel-Hilfe (zum Einfügen anklicken)</summary>' + rmHtml + '</details>' : '') +
        '<textarea id="fullEmail" class="answer full-email" aria-label="Mein Text" lang="de" spellcheck="false" placeholder="' + (isForum ? 'Ich bin der Meinung, dass …' : esc(x.anrede) + '\n\nDein Text …\n\n' + esc(x.gruss) + '\n[Dein Name]') + '">' + esc(r.fullEmail || '') + '</textarea>' +
        '<div class="wordcount" id="wordcount"></div>' +
        '<div class="actions">' +
          (x.muster ? '<button type="button" class="btn soft" id="btnMuster">📄 Mustertext anzeigen</button>' : '') +
          '<button type="button" class="btn" id="btnCopyText">📋 Meinen Text kopieren</button>' +
          '<button type="button" class="btn" id="btnCopyPrompt">🤖 Text + KI-Korrektur-Prompt kopieren</button>' +
        '</div>' +
        (x.muster ? '<div class="muster-box" id="musterBox"><h4>✅ Mustertext (' + esc(LEVEL) + ') zum Vergleichen</h4><div class="muster-text">' + esc(x.muster) + '</div></div>' : '') +
        '<div class="selfcheck"><strong>04 · Selbstkontrolle</strong>' +
          selfItems.map((label, i) => '<label><input type="checkbox" data-self="' + i + '" ' + (r.self?.[i] ? 'checked' : '') + '> <span>' + esc(label) + '</span></label>').join('') +
        '</div>' +
      '</section>' +

      '<div class="actions"><button type="button" class="btn primary bignext" id="nextTask">Nächste Aufgabe →</button></div>' +
      '<p class="notice">Hinweis: Der lokale Satzabgleich prüft gegen hinterlegte Muster und typische ' + esc(LEVEL) + '-Strukturen. Für detailliertes individuelles Feedback nutze „Text + KI-Korrektur-Prompt kopieren“.</p>';

    // Populate "Meine übersetzten Sätze" drawer
    function refreshRefList() {
      const rl = $('refList');
      if (!rl) return;
      const filled = x.sentences.map((ss, j) => ({ j, txt: (r.answers?.[j] || '').trim(), ok: r.checked?.[j] === 'good' })).filter(o => o.txt);
      rl.innerHTML = filled.length
        ? filled.map(o => '<li>' + (o.ok ? '✅ ' : '✏️ ') + esc(o.txt) + '</li>').join('')
        : '<li class="mini">Noch keine Sätze in Schritt 02 eingetragen.</li>';
    }
    refreshRefList();

    // Prüfungsmodus toggle & timer
    $('btnExamMode').onclick = () => {
      state.examMode = !state.examMode;
      if (state.examMode) startExamTimer(mins);
      else stopTimer();
      renderWriting(part);
    };
    const bPause = $('btnTimerPause');
    if (bPause) {
      bPause.onclick = () => {
        if (timerRunning) { stopTimer(); bPause.textContent = 'Weiter'; }
        else {
          timerRunning = true;
          bPause.textContent = 'Pause';
          timerInt = setInterval(() => {
            if (timerSec <= 0) { stopTimer(); return; }
            timerSec--;
            const tv = $('timerVal'); if (tv) tv.textContent = fmtTime(timerSec);
          }, 1000);
        }
      };
    }
    const bReset = $('btnTimerReset');
    if (bReset) bReset.onclick = () => startExamTimer(mins);

    // Sentence cards
    x.sentences.forEach((ss, j) => {
      const ta = $('a' + j);
      ta.oninput = () => {
        r.answers[j] = ta.value;
        if (r.checked[j]) {
          delete r.checked[j];
          if (r.feedback) delete r.feedback[j];
          $('f' + j).innerHTML = '';
          syncProgress(r, x.sentences.length);
          updateGlobalCount();
          renderSide();
        }
        persist();
        refreshRefList();
      };
      const kwBtn = $('main').querySelector('[data-kw="' + j + '"]');
      if (kwBtn) {
        kwBtn.onclick = () => {
          const box = $('kw' + j);
          if (box) box.classList.toggle('show');
        };
      }
      $('main').querySelector('[data-check="' + j + '"]').onclick = () => {
        const res = evalSentence(ta.value, ss.answers, x.register);
        r.checked[j] = res.status;
        r.feedback = r.feedback || {};
        r.feedback[j] = res.msg;
        persist();
        $('f' + j).innerHTML = '<div class="feedback ' + res.status + '">' + esc(res.msg).replace(/\n/g, '<br>') + '</div>';
        syncProgress(r, x.sentences.length);
        updateGlobalCount();
        renderSide();
        refreshRefList();
        const nowSolved = Object.values(r.checked).filter(v => v === 'good').length;
        window._dlLog(LEVEL + ' · ' + x.title, nowSolved, x.sentences.length);
      };
      $('main').querySelector('[data-hint="' + j + '"]').onclick = () => {
        if (!ta.value.trim()) {
          $('f' + j).innerHTML = '<div class="feedback warn">Versuche zuerst eine eigene Übersetzung (oder nutze 🔑 Wort-Hilfe). Danach kannst du die Musterlösung öffnen.</div>';
          return;
        }
        $('f' + j).innerHTML = '<div class="feedback"><strong>Musterlösung:</strong> ' + esc(ss.answers[0]) +
          (ss.answers.length > 1 ? '<div class="mini" style="margin-top:4px">Weitere Variante: ' + ss.answers.slice(1).map(esc).join(' · ') + '</div>' : '') +
        '</div>';
      };
    });

    // Free write
    const full = $('fullEmail');
    const wc = $('wordcount');
    const minW = part.minWords || 30;
    function updateWordCount() {
      const words = full.value.trim() ? full.value.trim().split(/\s+/).length : 0;
      wc.textContent = words + ' Wörter · Richtwert: ' + (x.wordTarget || part.wordTarget || '');
      wc.className = 'wordcount' + (words >= minW ? ' ok' : '');
    }
    full.oninput = () => { r.fullEmail = full.value; persist(); updateWordCount(); };
    updateWordCount();

    $('main').querySelectorAll('.rm-chip').forEach(ch => {
      ch.onclick = () => {
        const phrase = ch.dataset.phrase + ' ';
        const pos = full.selectionStart || full.value.length;
        full.value = full.value.slice(0, pos) + phrase + full.value.slice(pos);
        full.selectionStart = full.selectionEnd = pos + phrase.length;
        full.focus();
        r.fullEmail = full.value;
        persist();
        updateWordCount();
      };
    });

    const bm = $('btnMuster');
    if (bm) {
      bm.onclick = () => {
        const words = full.value.trim() ? full.value.trim().split(/\s+/).length : 0;
        const mb = $('musterBox');
        if (!mb.classList.contains('show') && words < 12) {
          if (!confirm('Du hast noch kaum eigenen Text geschrieben. Möchtest du den Mustertext trotzdem anzeigen?')) return;
        }
        mb.classList.toggle('show');
      };
    }

    $('btnCopyText').onclick = () => {
      const txt = full.value.trim();
      if (!txt) { alert('Schreibe zuerst deinen eigenen Text in Feld 03.'); return; }
      copyText(txt, 'Dein Text wurde kopiert.');
    };

    $('btnCopyPrompt').onclick = () => {
      const txt = full.value.trim();
      if (!txt) { alert('Schreibe zuerst deinen eigenen Text in Feld 03.'); return; }
      const prompt =
        'Du bist Deutschlehrer und korrigierst eine Schreibaufgabe auf Niveau ' + LEVEL + ' (Goethe-Zertifikat).\n\n' +
        'Teil: ' + part.label + ' (' + x.register + ')\n' +
        'Aufgabe: ' + x.title + '\n' +
        'Situation: ' + x.scenario + '\n' +
        'Leitpunkte:\n- ' + x.points.join('\n- ') + '\n\n' +
        'Mein Text:\n"""\n' + txt + '\n"""\n\n' +
        'Bitte bewerte meinen Text nach ' + LEVEL + '-Kriterien (Leitpunkte, Aufbau/Konnektoren, Wortschatz, Grammatik/Rechtschreibung), erkläre Fehler kurz auf Deutsch und gib eine korrigierte ' + LEVEL + '-Version.';
      copyText(prompt, 'Text + KI-Korrektur-Prompt kopiert! Jetzt einfach in ChatGPT, Gemini oder Claude einfügen.');
    };

    $('main').querySelectorAll('[data-self]').forEach(cb => {
      cb.onchange = () => {
        r.self = r.self || {};
        r.self[cb.dataset.self] = cb.checked;
        persist();
      };
    });

    $('nextTask').onclick = () => {
      state.idx = (state.idx + 1) % part.items.length;
      state.examMode = false;
      stopTimer();
      render();
    };
  }

  function syncProgress(r, total) {
    const n = Object.values(r.checked || {}).filter(v => v === 'good').length;
    const pb = $('pbar'), pt = $('ptxt');
    if (pb) pb.style.width = (n / total * 100) + '%';
    if (pt) pt.textContent = n + ' / ' + total + ' Ideen-Sätze gelöst. Andere korrekte Varianten sind möglich.';
    for (let j = 0; j < total; j++) {
      const s = $('s' + j);
      if (s) s.classList.toggle('done', r.checked?.[j] === 'good');
    }
  }

  /* ============================================================
     GUIDE & LERNPASS
     ============================================================ */
  function renderGuide() {
    const lessons = CFG.guides || [];
    const done = lessons.filter((_, i) => store.guide[i]).length;
    const firstPart = PARTS[0];

    $('main').classList.remove('exam-mode');
    $('main').innerHTML =
      '<div class="kicker">Schreibtraining · Strategie ' + esc(LEVEL) + '</div>' +
      '<h2>' + esc(CFG.guideHeading || ('Von der Aufgabe zum eigenen ' + LEVEL + '-Text')) + '</h2>' +
      '<p class="sub">Lies jede Lernkarte und bestätige, wenn du das Prinzip sicher verstanden hast.</p>' +
      '<section class="lesson-progress">' +
        '<div class="lesson-progress-head"><strong>Theorie-Fortschritt</strong><strong>' + done + ' / ' + lessons.length + '</strong></div>' +
        '<div class="progress"><div style="width:' + (lessons.length ? done / lessons.length * 100 : 0) + '%"></div></div>' +
        '<p class="mini">' + (done === lessons.length ? 'Alle Lernkarten abgeschlossen! Starte jetzt mit ' + esc(firstPart.label) + '.' : 'Noch ' + (lessons.length - done) + ' Lernkarten offen.') + '</p>' +
      '</section>' +
      '<div class="guide">' +
        lessons.map(([title, desc], i) =>
          '<section class="lesson-tile ' + (store.guide[i] ? 'understood' : '') + '">' +
            '<div class="lesson-title"><h3>' + title + '</h3>' + (store.guide[i] ? '<span class="lesson-check">✓</span>' : '') + '</div>' +
            '<p>' + desc + '</p>' +
            '<button type="button" class="btn lesson-button ' + (store.guide[i] ? 'completed' : 'primary') + '" data-understood="' + i + '">' + (store.guide[i] ? '✓ Verstanden' : 'Verstanden') + '</button>' +
          '</section>'
        ).join('') +
      '</div>' +
      '<div class="lesson-finish">' +
        (done === lessons.length ? '<div class="lesson-success">✓ Stark! Alle Grundlagen sitzen.</div>' : '') +
        '<button type="button" class="btn primary" id="goFirst">Weiter zu ' + esc(firstPart.label) + ' →</button>' +
      '</div>';

    $('main').querySelectorAll('[data-understood]').forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.understood;
        store.guide[i] = !store.guide[i];
        persist();
        renderGuide();
      };
    });
    $('goFirst').onclick = () => { state.tab = firstPart.id; state.idx = 0; render(); };
  }

  function renderReport() {
    const gDone = (CFG.guides || []).filter((_, i) => store.guide[i]).length;
    const gMax = (CFG.guides || []).length;
    let drafts = 0, totalWritingTasks = 0;
    const cards = [
      { val: gDone + ' / ' + gMax, lbl: 'Lernkarten' }
    ];
    PARTS.forEach(p => {
      const st = partStats(p);
      cards.push({ val: st.solved + ' / ' + st.max, lbl: p.shortLabel || p.label });
      if (p.type !== 'form') {
        totalWritingTasks += p.items.length;
        Object.values(store[p.id] || {}).forEach(r => {
          if (r && r.fullEmail && r.fullEmail.trim().split(/\s+/).length >= 20) drafts++;
        });
      }
    });

    $('main').classList.remove('exam-mode');
    $('main').innerHTML =
      '<div class="kicker">Lernpass · lokal gespeichert</div>' +
      '<h2>Dein ' + esc(LEVEL) + '-Schreibfortschritt</h2>' +
      '<p class="sub">Alle Eingaben bleiben automatisch auf diesem Gerät gespeichert.</p>' +
      '<div class="results">' +
        cards.map(c => '<div class="result"><strong>' + c.val + '</strong><span>' + esc(c.lbl) + '</span></div>').join('') +
      '</div>' +
      '<div class="prompt"><strong>EIGENE GESAMTTEXTE (SCHRITT 03)</strong><p>Du hast bisher <strong>' + drafts + ' von ' + totalWritingTasks + '</strong> vollständige ' + esc(LEVEL) + '-Texte (≥ 20 Wörter) selbst verfasst.</p></div>' +
      '<div class="actions">' +
        '<button type="button" class="btn primary" id="exportTxt">Lernpass als TXT exportieren</button>' +
        '<button type="button" class="btn" id="resetAll">Alle Eingaben löschen</button>' +
      '</div>';

    $('exportTxt').onclick = () => {
      const lines = [
        'Deutsch-Lernen · Schreibwerkstatt ' + LEVEL,
        'Datum: ' + new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        'Lernkarten verstanden: ' + gDone + '/' + gMax
      ].concat(PARTS.map(p => {
        const st = partStats(p);
        return p.label + ': ' + st.solved + '/' + st.max;
      })).concat([
        'Selbst geschriebene Gesamttexte: ' + drafts + '/' + totalWritingTasks
      ]);
      const url = URL.createObjectURL(new Blob([lines.join('\n') + '\n'], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url; a.download = 'Schreibwerkstatt-' + LEVEL + '-Lernpass.txt'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    };

    $('resetAll').onclick = () => {
      if (confirm('Alle Antworten und Fortschritte in der Schreibwerkstatt ' + LEVEL + ' wirklich löschen?')) {
        store = { guide: {} };
        PARTS.forEach(p => { store[p.id] = {}; });
        persist();
        render();
      }
    };
  }

  /* ============================================================
     HELPERS & UMLAUT BAR
     ============================================================ */
  function copyText(txt, okMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => alert(okMsg)).catch(() => fallbackCopy(txt, okMsg));
    } else {
      fallbackCopy(txt, okMsg);
    }
  }
  function fallbackCopy(txt, okMsg) {
    const a = document.createElement('textarea');
    a.value = txt; document.body.appendChild(a); a.select();
    document.execCommand('copy'); a.remove();
    alert(okMsg);
  }

  let lastF = null;
  const umbar = $('umbar');
  if (umbar) {
    document.addEventListener('focusin', e => {
      if (e.target.matches('textarea,.field input')) { lastF = e.target; umbar.classList.add('show'); }
    });
    document.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.matches('textarea,.field input')) umbar.classList.remove('show');
      }, 180);
    });
    umbar.querySelectorAll('button').forEach(b => {
      b.addEventListener('pointerdown', e => e.preventDefault());
      b.onclick = () => {
        if (!lastF) return;
        lastF.focus();
        lastF.setRangeText(b.textContent, lastF.selectionStart, lastF.selectionEnd, 'end');
        lastF.dispatchEvent(new Event('input', { bubbles: true }));
      };
    });
  }

  function render() {
    const part = currentPart();
    document.querySelector('.layout').classList.toggle('single-column', !part);
    buildTabs();
    renderSide();
    if (state.tab === 'guide') renderGuide();
    else if (state.tab === 'report') renderReport();
    else if (part.type === 'form') renderForm(part);
    else renderWriting(part);
    updateGlobalCount();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  render();
})();
