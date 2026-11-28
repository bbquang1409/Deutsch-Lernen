/* ============================================================
   DEUTSCH-LERNEN · C1 Wortschatz Interactive Engine
   Supports: lueckentext, wpn, mc, zuordnung, vokale, synonyme,
   plus Wortschatz (Liste + Flashcards + Quiz) & Schnelltest.
   ============================================================ */
(function () {
  'use strict';

  if (typeof window._dlLog !== 'function') { window._dlLog = function () {}; }
  if (typeof window._dlUser !== 'function') { window._dlUser = function () { return null; }; }

  const CFG = window.C1_CHAPTER;
  if (!CFG || !Array.isArray(CFG.lessons)) return;

  const LESSONS = CFG.lessons;
  const GROUPS = CFG.groups || LESSONS.map(function (l, i) {
    return { id: 'g' + (i + 1), label: l.id, ids: [l.id] };
  });
  const VOCAB_BY_LESSON = CFG.vocab || {};
  const ALL_VOCAB = [];
  LESSONS.forEach(function (l) {
    const items = VOCAB_BY_LESSON[l.id];
    if (Array.isArray(items)) {
      items.forEach(function (v) { ALL_VOCAB.push(v); });
    }
  });

  /* ---- HELPERS ---- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function norm(str) {
    return String(str == null ? '' : str)
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  function acceptedList(ans) {
    return Array.isArray(ans) ? ans : [ans];
  }

  function primaryAns(ans) {
    return Array.isArray(ans) ? ans[0] : ans;
  }

  function isCorrectAns(inputVal, ans) {
    const v = norm(inputVal);
    if (!v) return false;
    return acceptedList(ans).some(function (a) { return norm(a) === v; });
  }

  function vowelSkeleton(word) {
    return String(word || '').replace(/[aeiouäöüAEIOUÄÖÜ]/g, '_');
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'de-DE';
      msg.rate = 0.92;
      window.speechSynthesis.speak(msg);
    } catch (e) {}
  }

  function noteHTML(n) {
    if (!n) return '';
    const parts = [];
    if (n.form || n.grund) {
      parts.push((n.form ? '<b>' + esc(n.form) + '</b>' : '') + (n.form && n.grund ? ' — ' : '') + esc(n.grund || ''));
    }
    if (n.beispiel) {
      parts.push('<i>„' + esc(n.beispiel) + '“</i>');
    }
    return parts.join('<br>');
  }

  function feedbackMeta(ok, total) {
    const pct = total ? Math.round((ok / total) * 100) : 0;
    if (pct === 100) return { cls: 'great', msg: '🎉 Ausgezeichnet! ' + ok + '/' + total + ' – Du beherrschst diesen Abschnitt sicher.' };
    if (pct >= 80) return { cls: 'good', msg: '👏 Sehr gut! ' + ok + '/' + total + ' richtig. Nur noch wenige Details.' };
    if (pct >= 50) return { cls: 'ok', msg: '👍 Solide Leistung: ' + ok + '/' + total + '. Lies die Hinweise und versuche es noch einmal.' };
    return { cls: 'bad', msg: '💪 ' + ok + '/' + total + ' richtig. Nutze die Erklärungen und probiere es erneut.' };
  }

  function saveProgress(id, ok, total) {
    try {
      localStorage.setItem('wsc1-progress-' + id, JSON.stringify({ ok: ok, total: total, ts: Date.now() }));
    } catch (e) {}
    loadProgress(id);
  }

  function loadProgress(id) {
    const badge = document.getElementById('saved-' + id);
    if (!badge) return;
    try {
      const raw = localStorage.getItem('wsc1-progress-' + id);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d && typeof d.ok === 'number' && typeof d.total === 'number') {
        badge.textContent = 'Letztes Ergebnis: ' + d.ok + ' / ' + d.total + ' richtig';
      }
    } catch (e) {}
  }

  /* ---- TEMPLATE PARSER ---- */
  function parseTemplate(tpl) {
    const lines = String(tpl || '').replace(/\r/g, '').split('\n');
    const blocks = [];
    let buf = [];
    function flush() {
      const text = buf.join(' ').trim();
      if (text) blocks.push({ t: 'p', raw: text });
      buf = [];
    }
    lines.forEach(function (line) {
      const t = line.trim();
      if (t.startsWith('### ')) { flush(); blocks.push({ t: 'h4', v: t.slice(4).trim() }); }
      else if (t.startsWith('## ')) { flush(); blocks.push({ t: 'h3', v: t.slice(3).trim() }); }
      else if (t === '') { flush(); }
      else { buf.push(t); }
    });
    flush();
    return blocks;
  }

  function segmentsFromRaw(raw, answers) {
    const parts = [];
    const re = /\[\[([^\]]+)\]\]/g;
    let last = 0;
    let m;
    while ((m = re.exec(raw))) {
      if (m.index > last) parts.push(raw.slice(last, m.index));
      const inner = m[1];
      if (inner.includes('=')) {
        const eq = inner.indexOf('=');
        parts.push({ g: +inner.slice(0, eq), given: inner.slice(eq + 1) });
      } else {
        const num = +inner;
        parts.push({ g: num, ans: answers[num] });
      }
      last = re.lastIndex;
    }
    if (last < raw.length) parts.push(raw.slice(last));
    return parts;
  }

  function plainTextOfBlock(block, answers) {
    if (block.t === 'h4') return block.v;
    if (block.t !== 'p') return '';
    return segmentsFromRaw(block.raw, answers).map(function (s) {
      return typeof s === 'string' ? s : (s.given !== undefined ? s.given : primaryAns(s.ans));
    }).join('');
  }

  /* Track last focused blank per lesson so clicking a word-bank chip inserts smoothly */
  const lastFocusedInput = {};

  function updateChipUsed(lesson) {
    const wl = document.getElementById('wl-' + lesson.id);
    if (!wl) return;
    const typed = new Set();
    document.querySelectorAll('#lesson-' + lesson.id + ' input.blank').forEach(function (inp) {
      const v = norm(inp.value);
      if (v) typed.add(v);
    });
    wl.querySelectorAll('.chip').forEach(function (chip) {
      const baseUsed = chip.dataset.fixedUsed === '1';
      const w = norm(chip.dataset.word || chip.textContent);
      const isTyped = typed.has(w);
      chip.classList.toggle('used', baseUsed || isTyped);
    });
  }

  function renderWordBank(lesson) {
    const wl = document.getElementById('wl-' + lesson.id);
    if (!wl || !Array.isArray(lesson.bank)) return;
    wl.innerHTML = lesson.bank.map(function (w, i) {
      const fixed = lesson.usedIdx && lesson.usedIdx.includes(i);
      return '<button type="button" class="chip' + (fixed ? ' used' : '') + '" data-fixed-used="' + (fixed ? '1' : '0') + '" data-word="' + esc(w) + '">' + esc(w) + '</button>';
    }).join('');
    wl.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (chip.dataset.fixedUsed === '1') return;
        const target = lastFocusedInput[lesson.id] ||
          document.querySelector('#lesson-' + lesson.id + ' input.blank:placeholder-shown') ||
          Array.prototype.find.call(document.querySelectorAll('#lesson-' + lesson.id + ' input.blank'), function (i) { return !i.value.trim(); });
        if (target) {
          target.value = chip.dataset.word;
          target.focus();
          updateChipUsed(lesson);
        }
      });
    });
  }

  /* ---- 1. LÜCKENTEXT ---- */
  function renderLueckentext(lesson) {
    const blocks = parseTemplate(lesson.tpl);
    lesson._blocks = blocks;
    renderWordBank(lesson);

    const sectionText = [];
    let cur = -1;
    blocks.forEach(function (block) {
      if (block.t === 'h3') { cur = sectionText.length; sectionText.push(''); }
      else if (cur >= 0) {
        const pt = plainTextOfBlock(block, lesson.answers);
        if (pt) sectionText[cur] += (sectionText[cur] ? ' ' : '') + pt;
      }
    });
    lesson._sectionText = sectionText;

    let html = '';
    let hIdx = -1;
    blocks.forEach(function (block) {
      if (block.t === 'h3') {
        hIdx++;
        html += '<h3>' + esc(block.v) +
          '<button type="button" class="head-listen" data-l="' + esc(lesson.id) + '" data-h="' + hIdx + '">🔊 Klick zum Hören</button></h3>';
        return;
      }
      if (block.t === 'h4') {
        html += '<h4>' + esc(block.v) + '</h4>';
        return;
      }
      html += '<p>';
      segmentsFromRaw(block.raw, lesson.answers).forEach(function (seg) {
        if (typeof seg === 'string') {
          html += esc(seg);
        } else if (seg.given !== undefined) {
          html += '<span class="gap-num">' + seg.g + '</span><span class="blank given">' + esc(seg.given) + '</span>';
        } else {
          const pAns = primaryAns(seg.ans);
          const sz = Math.min(Math.max(pAns.length + 2, 7), 24);
          html += '<span class="gap-num">' + seg.g + '</span><input class="blank" type="text" autocomplete="off" spellcheck="false" id="b-' + esc(lesson.id) + '-' + seg.g + '" data-num="' + seg.g + '" style="width:' + Math.min(Math.max(pAns.length * 9 + 24, 98), 240) + 'px" size="' + sz + '">';
        }
      });
      html += '</p>';
    });
    const pg = document.getElementById('pg-' + lesson.id);
    pg.innerHTML = html;

    pg.querySelectorAll('.head-listen').forEach(function (btn) {
      btn.addEventListener('click', function () {
        speak(lesson._sectionText[+btn.dataset.h] || '');
      });
    });
    pg.querySelectorAll('input.blank').forEach(function (inp) {
      inp.addEventListener('focus', function () { lastFocusedInput[lesson.id] = inp; });
      inp.addEventListener('input', function () { updateChipUsed(lesson); });
    });

    buildAnsTable(lesson);
  }

  function buildAnsTable(lesson) {
    const tbb = document.getElementById('tbb-' + lesson.id);
    if (!tbb) return;
    const rows = [];
    if (lesson.type === 'synonyme') {
      lesson.items.forEach(function (it, idx) {
        const num = idx + 1;
        const ans = primaryAns(it.ans);
        const n = it.note || (lesson.notes && lesson.notes[num]);
        rows.push('<tr><td class="lk">' + num + '</td><td class="dap">' + esc(ans) + '</td><td>' + noteHTML(n) + '</td></tr>');
      });
    } else {
      const blocks = lesson._blocks || parseTemplate(lesson.tpl);
      blocks.forEach(function (block) {
        if (block.t !== 'p') return;
        segmentsFromRaw(block.raw, lesson.answers).forEach(function (seg) {
          if (typeof seg !== 'string' && seg.given === undefined) {
            const n = lesson.notes && lesson.notes[seg.g];
            rows.push('<tr><td class="lk">' + seg.g + '</td><td class="dap">' + esc(primaryAns(seg.ans)) + '</td><td>' + noteHTML(n) + '</td></tr>');
          }
        });
      });
    }
    tbb.innerHTML = rows.join('');
  }

  function checkGapBased(lesson) {
    const id = lesson.id;
    let total = 0;
    let ok = 0;
    document.querySelectorAll('#lesson-' + id + ' .hint').forEach(function (h) { h.remove(); });
    document.querySelectorAll('#lesson-' + id + ' .feedback-box').forEach(function (h) { h.remove(); });

    document.querySelectorAll('#lesson-' + id + ' input.blank').forEach(function (inp) {
      total++;
      const num = +inp.dataset.num;
      const ans = lesson.type === 'synonyme' ? lesson.items[num - 1].ans : lesson.answers[num];
      const note = lesson.type === 'synonyme'
        ? (lesson.items[num - 1].note || (lesson.notes && lesson.notes[num]))
        : (lesson.notes && lesson.notes[num]);

      inp.classList.remove('ok', 'no');
      const hint = document.createElement('span');
      if (isCorrectAns(inp.value, ans)) {
        inp.classList.add('ok');
        ok++;
        hint.className = 'hint correct';
        hint.innerHTML = '✅ <b>Richtig!</b> ' + (note ? noteHTML(note) : 'Gut gemacht.');
      } else {
        inp.classList.add('no');
        hint.className = 'hint wrong';
        hint.innerHTML = '❌ <b>Nicht ganz.</b> Richtig wäre <b>' + esc(primaryAns(ans)) + '</b>.' +
          (note ? '<br>' + noteHTML(note) : '');
      }
      const anchor = inp.closest('.vok-wrap') || inp.closest('.syn-input-row') || inp;
      anchor.insertAdjacentElement('afterend', hint);
    });

    const fb = feedbackMeta(ok, total);
    document.getElementById('sc-' + id).innerHTML = '<b>' + ok + '</b> / ' + total + ' richtig';
    const box = document.createElement('div');
    box.className = 'feedback-box ' + fb.cls;
    box.textContent = fb.msg;
    document.getElementById('sc-' + id).parentElement.appendChild(box);
    saveProgress(id, ok, total);
    window._dlLog(lesson.title, ok, total);
  }

  /* ---- 2. VOKALE ---- */
  function renderVokale(lesson) {
    const blocks = parseTemplate(lesson.tpl);
    lesson._blocks = blocks;

    const sectionText = [];
    let cur = -1;
    blocks.forEach(function (block) {
      if (block.t === 'h3') { cur = sectionText.length; sectionText.push(''); }
      else if (cur >= 0) {
        const pt = plainTextOfBlock(block, lesson.answers);
        if (pt) sectionText[cur] += (sectionText[cur] ? ' ' : '') + pt;
      }
    });
    lesson._sectionText = sectionText;

    let html = '';
    let hIdx = -1;
    blocks.forEach(function (block) {
      if (block.t === 'h3') {
        hIdx++;
        html += '<h3>' + esc(block.v) +
          '<button type="button" class="head-listen show" data-l="' + esc(lesson.id) + '" data-h="' + hIdx + '">🔊 Vorlesen</button></h3>';
        return;
      }
      if (block.t === 'h4') {
        html += '<h4>' + esc(block.v) + '</h4>';
        return;
      }
      html += '<p>';
      segmentsFromRaw(block.raw, lesson.answers).forEach(function (seg) {
        if (typeof seg === 'string') {
          html += esc(seg);
        } else if (seg.given !== undefined) {
          html += '<span class="gap-num">' + seg.g + '</span><span class="blank given">' + esc(seg.given) + '</span>';
        } else {
          const pAns = primaryAns(seg.ans);
          const skel = (lesson.hints && lesson.hints[seg.g]) || vowelSkeleton(pAns);
          const w = Math.min(Math.max(pAns.length * 9 + 26, 120), 260);
          html += '<span class="vok-wrap">' +
            '<span class="gap-num">' + seg.g + '</span>' +
            '<span class="vok-skel" title="Konsonanten-Gerüst">' + esc(skel) + '</span>' +
            '<input class="blank blank-vok" type="text" autocomplete="off" spellcheck="false" id="b-' + esc(lesson.id) + '-' + seg.g + '" data-num="' + seg.g + '" placeholder="' + esc(skel) + '" style="width:' + w + 'px">' +
            '</span>';
        }
      });
      html += '</p>';
    });
    const pg = document.getElementById('pg-' + lesson.id);
    pg.innerHTML = html;
    pg.querySelectorAll('.head-listen').forEach(function (btn) {
      btn.addEventListener('click', function () {
        speak(lesson._sectionText[+btn.dataset.h] || '');
      });
    });

    buildAnsTable(lesson);
  }

  /* ---- 3. SYNONYME ---- */
  function renderSynonyme(lesson) {
    renderWordBank(lesson);
    const pg = document.getElementById('pg-' + lesson.id);
    const html = '<div class="syn-list">' + lesson.items.map(function (it, idx) {
      const num = idx + 1;
      const sentenceHtml = esc(it.sentence).replace(/\*([^*]+)\*/g, '<span class="syn-target">$1</span>');
      return '<div class="syn-item">' +
        '<div class="syn-item-head"><span class="syn-num">' + num + '</span><span>' + sentenceHtml + '</span></div>' +
        '<div class="syn-input-row">' +
          '<span class="syn-arrow">→ Synonym:</span>' +
          '<input class="blank" type="text" autocomplete="off" spellcheck="false" id="b-' + esc(lesson.id) + '-' + num + '" data-num="' + num + '" placeholder="Passendes Wort / Ausdruck">' +
        '</div>' +
      '</div>';
    }).join('') + '</div>';
    pg.innerHTML = html;

    pg.querySelectorAll('input.blank').forEach(function (inp) {
      inp.addEventListener('focus', function () { lastFocusedInput[lesson.id] = inp; });
      inp.addEventListener('input', function () { updateChipUsed(lesson); });
    });

    buildAnsTable(lesson);
  }

  /* ---- 4. WAS PASST NICHT ---- */
  const wpnSel = {};
  function renderWpn(lesson) {
    const el = document.getElementById('pg-' + lesson.id);
    el.innerHTML = lesson.items.map(function (item, qi) {
      return '<div class="wpn-item">' +
        '<div class="wpn-q">' + (qi + 1) + '. ' + esc(item.q) + '</div>' +
        '<div class="wpn-opts">' +
        item.opts.map(function (o, oi) {
          return '<button type="button" class="wopt" data-l="' + esc(lesson.id) + '" data-q="' + qi + '" data-o="' + oi + '">' + esc(o) + '</button>';
        }).join('') +
        '</div>' +
        '<div class="wpn-note" id="wn-' + esc(lesson.id) + '-' + qi + '"></div>' +
      '</div>';
    }).join('');
    el.querySelectorAll('.wopt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.dataset.l;
        const qi = +btn.dataset.q;
        const oi = +btn.dataset.o;
        wpnSel[id + '-' + qi] = oi;
        el.querySelectorAll('.wopt[data-q="' + qi + '"]').forEach(function (b) {
          b.classList.toggle('sel', +b.dataset.o === oi);
        });
      });
    });
  }

  function checkWpn(lesson) {
    const id = lesson.id;
    let ok = 0;
    document.querySelectorAll('#lesson-' + id + ' .feedback-box').forEach(function (h) { h.remove(); });
    lesson.items.forEach(function (item, qi) {
      const noteEl = document.getElementById('wn-' + id + '-' + qi);
      document.querySelectorAll('.wopt[data-l="' + id + '"][data-q="' + qi + '"]').forEach(function (el) {
        const oi = +el.dataset.o;
        el.classList.remove('correct', 'wrong-sel');
        if (oi === item.wrong) el.classList.add('correct');
        else if (wpnSel[id + '-' + qi] === oi) el.classList.add('wrong-sel');
      });
      const isCorrect = wpnSel[id + '-' + qi] === item.wrong;
      if (isCorrect) {
        ok++;
        noteEl.innerHTML = '✅ <b>Richtig gestrichen!</b> ' + esc(item.note || '');
        noteEl.style.color = 'var(--ok)';
      } else {
        noteEl.innerHTML = '❌ <b>Nicht ganz.</b> Unpassend ist <b>„' + esc(item.opts[item.wrong]) + '“</b>. ' + esc(item.note || '');
        noteEl.style.color = 'var(--er)';
      }
      noteEl.classList.add('show');
    });
    const total = lesson.items.length;
    const fb = feedbackMeta(ok, total);
    document.getElementById('sc-' + id).innerHTML = '<b>' + ok + '</b> / ' + total + ' richtig';
    const box = document.createElement('div');
    box.className = 'feedback-box ' + fb.cls;
    box.textContent = fb.msg;
    document.getElementById('sc-' + id).parentElement.appendChild(box);
    saveProgress(id, ok, total);
    window._dlLog(lesson.title, ok, total);
  }

  /* ---- 5. MULTIPLE CHOICE / CHECKLIST ---- */
  const mcSel = {};
  function renderMc(lesson) {
    const el = document.getElementById('pg-' + lesson.id);
    mcSel[lesson.id] = {};
    el.innerHTML = lesson.items.map(function (item, qi) {
      const sub = item.hint || (lesson.multi ? 'Eine oder mehrere Antworten können richtig sein.' : 'Wählen Sie die passende Antwort.');
      return '<div class="mc-item">' +
        '<div class="mc-q">' + (lesson.items.length > 1 ? (qi + 1) + '. ' : '') + esc(item.q) + '</div>' +
        '<div class="mc-sub">' + esc(sub) + '</div>' +
        '<div class="mc-opts">' +
        item.opts.map(function (o, oi) {
          return '<button type="button" class="mc-opt" data-l="' + esc(lesson.id) + '" data-q="' + qi + '" data-o="' + oi + '">' +
            '<span class="mc-box"></span><span>' + esc(o) + '</span></button>';
        }).join('') +
        '</div>' +
        '<div class="mc-note" id="mcn-' + esc(lesson.id) + '-' + qi + '"></div>' +
      '</div>';
    }).join('');

    el.querySelectorAll('.mc-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const qi = +btn.dataset.q;
        const oi = +btn.dataset.o;
        if (!mcSel[lesson.id][qi]) mcSel[lesson.id][qi] = new Set();
        const set = mcSel[lesson.id][qi];
        if (lesson.multi) {
          if (set.has(oi)) set.delete(oi);
          else set.add(oi);
        } else {
          set.clear();
          set.add(oi);
        }
        el.querySelectorAll('.mc-opt[data-q="' + qi + '"]').forEach(function (b) {
          const isOn = set.has(+b.dataset.o);
          b.classList.toggle('sel', isOn);
          b.querySelector('.mc-box').textContent = isOn ? '✓' : '';
        });
      });
    });
  }

  function checkMc(lesson) {
    const id = lesson.id;
    let ok = 0;
    let total = 0;
    document.querySelectorAll('#lesson-' + id + ' .feedback-box').forEach(function (h) { h.remove(); });

    const checklistMode = lesson.items.length === 1 && lesson.mode === 'checklist';

    lesson.items.forEach(function (item, qi) {
      const selected = mcSel[id][qi] || new Set();
      const correctSet = new Set(item.correct);
      const noteEl = document.getElementById('mcn-' + id + '-' + qi);

      let itemWrong = false;
      document.querySelectorAll('#pg-' + id + ' .mc-opt[data-q="' + qi + '"]').forEach(function (btn) {
        const oi = +btn.dataset.o;
        btn.classList.remove('ok', 'missed', 'wrong');
        const isSel = selected.has(oi);
        const isCor = correctSet.has(oi);
        if (checklistMode) {
          total++;
          if (isSel === isCor) ok++;
        }
        if (isSel && isCor) {
          btn.classList.add('ok');
          btn.querySelector('.mc-box').textContent = '✓';
        } else if (isSel && !isCor) {
          btn.classList.add('wrong');
          btn.querySelector('.mc-box').textContent = '✕';
          itemWrong = true;
        } else if (!isSel && isCor) {
          btn.classList.add('missed');
          btn.querySelector('.mc-box').textContent = '!';
          itemWrong = true;
        }
      });

      if (!checklistMode) {
        total++;
        const exactMatch = !itemWrong && selected.size === correctSet.size;
        if (exactMatch) ok++;
        noteEl.innerHTML = (exactMatch ? '✅ <b>Richtig!</b> ' : '❌ <b>Nicht ganz.</b> ') + esc(item.note || '');
        noteEl.style.color = exactMatch ? 'var(--ok)' : 'var(--er)';
      } else {
        noteEl.innerHTML = '<b>Erläuterung:</b> ' + esc(item.note || '');
        noteEl.style.color = 'var(--ink2)';
      }
      noteEl.classList.add('show');
    });

    const fb = feedbackMeta(ok, total);
    document.getElementById('sc-' + id).innerHTML = '<b>' + ok + '</b> / ' + total + ' richtig';
    const box = document.createElement('div');
    box.className = 'feedback-box ' + fb.cls;
    box.textContent = fb.msg;
    document.getElementById('sc-' + id).parentElement.appendChild(box);
    saveProgress(id, ok, total);
    window._dlLog(lesson.title, ok, total);
  }

  /* ---- 6. ZUORDNUNG ---- */
  const zuState = {};
  function renderZuordnung(lesson) {
    const id = lesson.id;
    const left = lesson.left.map(function (t, i) { return { t: t, i: i }; });
    const right = shuffle(lesson.right.map(function (t, i) { return { t: t, i: i }; }));
    const rightLetterByOrig = {};
    right.forEach(function (x, pos) { rightLetterByOrig[x.i] = String.fromCharCode(97 + pos); });

    zuState[id] = { leftSel: null, rightSel: null, solved: {}, wrongCount: 0, rightLetterByOrig: rightLetterByOrig };

    const pg = document.getElementById('pg-' + id);
    pg.innerHTML =
      '<div class="zu2-solved" id="zs-' + esc(id) + '"></div>' +
      '<div class="zu2-cols">' +
        '<div class="zu2-col">' +
          '<div class="zu2-col-lbl left">' + esc(lesson.leftLabel || 'A · Ausdruck') + '</div>' +
          left.map(function (x) {
            return '<div class="zu2-item left" data-side="l" data-i="' + x.i + '"><span class="zu2-badge">' + (x.i + 1) + '</span><span>' + esc(x.t) + '</span></div>';
          }).join('') +
        '</div>' +
        '<div class="zu2-col">' +
          '<div class="zu2-col-lbl right">' + esc(lesson.rightLabel || 'B · Bedeutung') + '</div>' +
          right.map(function (x, pos) {
            return '<div class="zu2-item right" data-side="r" data-i="' + x.i + '" data-letter="' + String.fromCharCode(97 + pos) + '"><span class="zu2-badge">' + String.fromCharCode(97 + pos) + '</span><span>' + esc(x.t) + '</span></div>';
          }).join('') +
        '</div>' +
      '</div>';

    pg.querySelectorAll('.zu2-item').forEach(function (itemEl) {
      itemEl.addEventListener('click', function () {
        zuClick(lesson, itemEl.dataset.side, +itemEl.dataset.i);
      });
    });
  }

  function zuClick(lesson, side, i) {
    const id = lesson.id;
    const st = zuState[id];
    if (side === 'l' && st.solved[i] !== undefined) return;
    if (side === 'r' && Object.values(st.solved).includes(i)) return;

    const pg = document.getElementById('pg-' + id);
    pg.querySelectorAll('.zu2-item.' + (side === 'l' ? 'left' : 'right')).forEach(function (el) {
      el.classList.remove('active');
    });
    if (side === 'l') {
      st.leftSel = i;
      pg.querySelector('.zu2-item.left[data-i="' + i + '"]').classList.add('active');
    } else {
      st.rightSel = i;
      pg.querySelector('.zu2-item.right[data-i="' + i + '"]').classList.add('active');
    }

    if (st.leftSel !== null && st.rightSel !== null) {
      const lIdx = st.leftSel;
      const rIdx = st.rightSel;
      const letter = st.rightLetterByOrig[rIdx];
      const correct = lIdx === rIdx;
      const row = document.createElement('div');
      row.className = 'zu2-solved-row' + (correct ? '' : ' wrong');
      if (correct) {
        row.innerHTML = '✅ <strong>' + (lIdx + 1) + ' → ' + letter + '</strong>: ' + esc(lesson.left[lIdx]) + ' <em>↔</em> ' + esc(lesson.right[rIdx]);
        st.solved[lIdx] = rIdx;
        pg.querySelector('.zu2-item.left[data-i="' + lIdx + '"]').classList.add('used');
        pg.querySelector('.zu2-item.right[data-i="' + rIdx + '"]').classList.add('used');
      } else {
        row.innerHTML = '❌ <strong>' + (lIdx + 1) + ' → ' + letter + '</strong> passt nicht. Versuche eine andere Kombination.';
        st.wrongCount++;
      }
      document.getElementById('zs-' + id).appendChild(row);
      pg.querySelectorAll('.zu2-item').forEach(function (el) { el.classList.remove('active'); });
      st.leftSel = null;
      st.rightSel = null;

      if (Object.keys(st.solved).length === lesson.left.length) {
        checkZuordnung(lesson);
      }
    }
  }

  function checkZuordnung(lesson) {
    const id = lesson.id;
    const st = zuState[id];
    const total = lesson.left.length;
    const ok = Object.keys(st.solved).length;
    document.querySelectorAll('#lesson-' + id + ' .feedback-box').forEach(function (h) { h.remove(); });
    document.getElementById('sc-' + id).innerHTML = '<b>' + ok + '</b> / ' + total + ' zugeordnet' +
      (st.wrongCount ? ' (' + st.wrongCount + ' Fehlversuche)' : '');
    const fb = feedbackMeta(ok, total);
    const box = document.createElement('div');
    box.className = 'feedback-box ' + fb.cls;
    box.textContent = ok === total && st.wrongCount === 0
      ? '🎉 Perfekt! Alle ' + total + ' Paare ohne Fehlversuch zugeordnet!'
      : fb.msg;
    document.getElementById('sc-' + id).parentElement.appendChild(box);
    saveProgress(id, ok, total);
    window._dlLog(lesson.title, ok, total);
  }

  /* ---- CARD SHELL & DISPATCH ---- */
  function cardShell(lesson) {
    const typeLabels = {
      lueckentext: 'Lückentext',
      wpn: 'Was passt nicht?',
      mc: lesson.mode === 'checklist' ? 'Auswahl' : 'Redewendungen / Auswahl',
      zuordnung: 'Zuordnung',
      vokale: 'Fehlende Vokale',
      synonyme: 'Synonyme'
    };
    const defaultInstr = {
      lueckentext: 'Ergänzen Sie die Lücken. Achten Sie auf die korrekte grammatische Form.',
      wpn: 'Streichen Sie das Wort oder den Ausdruck, der inhaltlich oder sprachlich nicht passt.',
      mc: lesson.multi ? 'Kreuzen Sie an — auch mehrere Antworten können richtig sein.' : 'Kreuzen Sie die passende Bedeutung an.',
      zuordnung: 'Ordnen Sie zu. Klicken Sie links und rechts auf zwei zusammengehörige Elemente.',
      vokale: 'Ergänzen Sie die fehlenden Vokale (a, e, i, o, u, ä, ö, ü) und schreiben Sie das vollständige Wort.',
      synonyme: 'Ersetzen Sie den markierten Ausdruck durch ein passendes C1-Synonym aus der Wortliste.'
    };
    const hasBank = lesson.type === 'lueckentext' || lesson.type === 'synonyme';
    const hasTable = lesson.type === 'lueckentext' || lesson.type === 'vokale' || lesson.type === 'synonyme';
    const titleShort = lesson.title.includes('· ') ? lesson.title.split('· ').slice(1).join('· ') : lesson.title;

    const topHtml = hasBank ? (
      '<div class="opt-bubbles">' +
        '<button type="button" class="bubble bubble-left on" id="modeShow-' + esc(lesson.id) + '" data-mode="show" data-l="' + esc(lesson.id) + '">' +
          '<b>Option 1 — Mit Wortliste</b>Tippen Sie oder klicken Sie ein Wort aus der Liste an.' +
        '</button>' +
        '<button type="button" class="bubble bubble-right" id="modeHide-' + esc(lesson.id) + '" data-mode="hide" data-l="' + esc(lesson.id) + '">' +
          '<b>Option 2 — Ohne Wortliste</b>' + (lesson.type === 'lueckentext' ? 'Ohne Hilfe — optional Abschnitt anhören (🔊).' : 'Finden Sie die Synonyme frei aus dem Gedächtnis.') +
        '</button>' +
      '</div>' +
      '<div class="wortliste" id="wl-' + esc(lesson.id) + '"></div>'
    ) : '';

    return (
      '<div class="card">' +
        '<div class="card-eyebrow">' + esc(lesson.id) + ' · ' + esc(typeLabels[lesson.type] || '') + '</div>' +
        '<h2>' + esc(titleShort) + '</h2>' +
        '<div class="instr">' + esc(lesson.instr || defaultInstr[lesson.type] || '') + '</div>' +
        topHtml +
        '<span class="saved-badge" id="saved-' + esc(lesson.id) + '"></span>' +
        '<div id="pg-' + esc(lesson.id) + '" class="passage"></div>' +
        '<div class="actions">' +
          '<button type="button" class="btn" data-action="check" data-l="' + esc(lesson.id) + '">Überprüfen</button>' +
          (hasTable ? '<button type="button" class="btn ghost" data-action="table" data-l="' + esc(lesson.id) + '">Lösung anzeigen</button>' : '') +
          '<button type="button" class="btn ghost" data-action="reset" data-l="' + esc(lesson.id) + '">Neu starten</button>' +
          '<span class="score" id="sc-' + esc(lesson.id) + '"></span>' +
        '</div>' +
        (hasTable ? (
          '<div class="ans-table" id="tb-' + esc(lesson.id) + '">' +
            '<table><thead><tr><th>Nr.</th><th>Lösung</th><th>Struktur / Hinweis</th></tr></thead><tbody id="tbb-' + esc(lesson.id) + '"></tbody></table>' +
          '</div>'
        ) : '') +
      '</div>'
    );
  }

  function renderLesson(lesson) {
    if (lesson.type === 'lueckentext') renderLueckentext(lesson);
    else if (lesson.type === 'vokale') renderVokale(lesson);
    else if (lesson.type === 'synonyme') renderSynonyme(lesson);
    else if (lesson.type === 'wpn') renderWpn(lesson);
    else if (lesson.type === 'mc') renderMc(lesson);
    else if (lesson.type === 'zuordnung') renderZuordnung(lesson);
    loadProgress(lesson.id);
  }

  function resetLesson(lesson) {
    document.querySelectorAll('#lesson-' + lesson.id + ' .hint').forEach(function (h) { h.remove(); });
    document.querySelectorAll('#lesson-' + lesson.id + ' .feedback-box').forEach(function (h) { h.remove(); });
    const sc = document.getElementById('sc-' + lesson.id);
    if (sc) sc.innerHTML = '';
    const tb = document.getElementById('tb-' + lesson.id);
    if (tb) tb.classList.remove('show');
    if (lesson.type === 'wpn') {
      lesson.items.forEach(function (_, qi) { delete wpnSel[lesson.id + '-' + qi]; });
    }
    renderLesson(lesson);
  }

  function setMode(id, m) {
    const sBtn = document.getElementById('modeShow-' + id);
    const hBtn = document.getElementById('modeHide-' + id);
    const wl = document.getElementById('wl-' + id);
    if (sBtn) sBtn.classList.toggle('on', m === 'show');
    if (hBtn) hBtn.classList.toggle('on', m === 'hide');
    if (wl) wl.style.display = (m === 'hide') ? 'none' : 'flex';
    document.querySelectorAll('#lesson-' + id + ' .head-listen').forEach(function (b) {
      b.classList.toggle('show', m === 'hide');
    });
  }

  /* ---- WORTSCHATZ, FLASHCARDS, QUIZ, SCHNELLTEST ---- */
  let viOn = false;
  let flashIdx = 0;
  let flashBack = false;

  function renderVocab() {
    const el = document.getElementById('vocabList');
    if (!el) return;
    let gi = 0;
    el.innerHTML = LESSONS.map(function (l) {
      const items = VOCAB_BY_LESSON[l.id];
      if (!items || !items.length) return '';
      const cls = (gi++ % 2 === 0) ? 'even' : 'odd';
      return '<div class="vocab-group ' + cls + '">' +
        '<div class="vgroup-lbl">' + esc(l.title) + '</div>' +
        items.map(function (v) {
          return '<div class="vrow">' +
            '<span class="vde">' + esc(v[0]) + '</span>' +
            '<span class="vdd">' + esc(v[1]) + '</span>' +
            '<span class="vvi' + (viOn ? ' show' : '') + '">' + esc(v[2] || '') + '</span>' +
          '</div>';
        }).join('') +
      '</div>';
    }).join('');
  }

  function toggleVI() {
    viOn = !viOn;
    document.querySelectorAll('.vvi').forEach(function (el) {
      el.classList.toggle('show', viOn);
    });
    const btn = document.getElementById('viToggle');
    if (btn) {
      btn.classList.toggle('on', viOn);
      btn.textContent = viOn ? 'Vietnamesisch ausblenden' : 'Vietnamesisch anzeigen';
    }
    renderFlash();
  }

  function renderFlash() {
    const counter = document.getElementById('flashCounter');
    const el = document.getElementById('flashcardEl');
    if (!counter || !el || !ALL_VOCAB.length) return;
    const v = ALL_VOCAB[flashIdx];
    counter.textContent = (flashIdx + 1) + ' / ' + ALL_VOCAB.length;
    if (!flashBack) {
      el.innerHTML = '<div class="fc-word">' + esc(v[0]) + '</div><div class="fc-hint">Tippen zum Umdrehen</div>';
    } else {
      el.innerHTML = '<div class="fc-def">' + esc(v[1]) + '</div>' +
        (viOn && v[2] ? '<div class="fc-vi">' + esc(v[2]) + '</div>' : '') +
        '<div class="fc-hint">Tippen für das Wort</div>';
    }
  }

  function sampleVocabQuestions(n) {
    const pool = shuffle(ALL_VOCAB).slice(0, Math.min(n, ALL_VOCAB.length));
    return pool.map(function (v) {
      const seenDefs = new Set([v[1]]);
      const distractors = [];
      shuffle(ALL_VOCAB).forEach(function (x) {
        if (distractors.length < 3 && !seenDefs.has(x[1])) {
          seenDefs.add(x[1]);
          distractors.push(x[1]);
        }
      });
      const options = shuffle([v[1]].concat(distractors));
      return {
        tag: 'Wortschatz',
        prompt: v[0],
        options: options,
        correctIndex: options.indexOf(v[1])
      };
    });
  }

  function sampleContextQuestions(n) {
    const candidates = [];
    const allAnswers = [];

    LESSONS.forEach(function (l) {
      if (l.answers && l.notes) {
        Object.keys(l.answers).forEach(function (k) {
          const ans = primaryAns(l.answers[k]);
          allAnswers.push(ans);
          const note = l.notes[k];
          if (note && note.beispiel && ans && note.beispiel.toLowerCase().includes(ans.toLowerCase())) {
            candidates.push({ ans: ans, beispiel: note.beispiel, lessonId: l.id });
          }
        });
      }
      if (l.type === 'synonyme' && Array.isArray(l.items)) {
        l.items.forEach(function (it) {
          const ans = primaryAns(it.ans);
          allAnswers.push(ans);
          if (it.note && it.note.beispiel && ans && it.note.beispiel.toLowerCase().includes(ans.toLowerCase())) {
            candidates.push({ ans: ans, beispiel: it.note.beispiel, lessonId: l.id });
          }
        });
      }
    });

    const uniqueAns = Array.from(new Set(allAnswers.filter(Boolean)));
    const picked = shuffle(candidates).slice(0, Math.min(n, candidates.length));

    return picked.map(function (c) {
      const escaped = c.ans.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const prompt = c.beispiel.replace(new RegExp(escaped, 'i'), '________');
      const distractors = shuffle(uniqueAns.filter(function (a) { return norm(a) !== norm(c.ans); })).slice(0, 3);
      const options = shuffle([c.ans].concat(distractors));
      return {
        tag: 'Kontext · ' + c.lessonId,
        prompt: prompt,
        options: options,
        correctIndex: options.indexOf(c.ans)
      };
    });
  }

  function buildQuizUI(containerId, questions, logTitle, onRestart) {
    let idx = 0;
    let score = 0;
    let answered = false;

    function render() {
      const el = document.getElementById(containerId);
      if (!el) return;
      if (idx >= questions.length) {
        window._dlLog(logTitle, score, questions.length);
        const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
        el.innerHTML =
          '<div class="quiz-done">' +
            '<div class="quiz-score">' + score + ' / ' + questions.length + '</div>' +
            '<div class="quiz-sub">' + pct + ' % richtig beantwortet</div>' +
            '<button type="button" class="btn" id="restart-' + esc(containerId) + '">Neue Runde</button>' +
          '</div>';
        document.getElementById('restart-' + containerId).addEventListener('click', onRestart);
        return;
      }
      const q = questions[idx];
      el.innerHTML =
        '<div class="quiz-progress">' + (idx + 1) + ' / ' + questions.length + '</div>' +
        '<div style="text-align:center"><span class="quiz-tag">' + esc(q.tag || 'Frage') + '</span></div>' +
        '<div class="quiz-prompt">' + esc(q.prompt) + '</div>' +
        '<div class="quiz-opts">' +
          q.options.map(function (o, i) {
            return '<button type="button" class="qopt" data-i="' + i + '">' + esc(o) + '</button>';
          }).join('') +
        '</div>';

      el.querySelectorAll('.qopt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          const i = +btn.dataset.i;
          el.querySelectorAll('.qopt').forEach(function (b, bi) {
            if (bi === q.correctIndex) b.classList.add('correct');
            else if (bi === i) b.classList.add('wrong');
          });
          if (i === q.correctIndex) score++;
          setTimeout(function () {
            idx++;
            answered = false;
            render();
          }, 900);
        });
      });
    }
    render();
  }

  function startWsQuiz() {
    buildQuizUI('ws-quiz-body', sampleVocabQuestions(10), 'Wortschatz-Quiz Teil ' + CFG.letter, startWsQuiz);
  }

  function startSchnelltest() {
    const ctxQ = sampleContextQuestions(6);
    const vocQ = sampleVocabQuestions(Math.max(6, 12 - ctxQ.length));
    const mixed = shuffle(ctxQ.concat(vocQ)).slice(0, 12);
    buildQuizUI('schnelltest-body', mixed, 'Schnelltest Teil ' + CFG.letter, startSchnelltest);
  }

  /* ---- NAVIGATION ---- */
  function switchMain(name) {
    ['wortschatz', 'uebungen', 'schnelltest'].forEach(function (n) {
      const tab = document.getElementById('mt-' + n);
      const panel = document.getElementById('panel-' + n);
      if (tab) tab.classList.toggle('on', n === name);
      if (panel) {
        panel.style.display = (n === name) ? 'block' : 'none';
        panel.classList.toggle('on', n === name);
      }
    });
    if (name === 'schnelltest' && !document.getElementById('schnelltest-body').dataset.built) {
      document.getElementById('schnelltest-body').dataset.built = '1';
      startSchnelltest();
    }
  }

  function switchTab(gid) {
    document.querySelectorAll('.tab-sq').forEach(function (t) {
      t.classList.toggle('on', t.dataset.id === gid);
    });
    document.querySelectorAll('.lesson-group').forEach(function (g) {
      g.classList.toggle('on', g.id === 'view-' + gid);
    });
  }

  function wsView(v) {
    document.getElementById('ws-btn-liste').classList.toggle('on', v === 'liste');
    document.getElementById('ws-btn-training').classList.toggle('on', v === 'training');
    document.getElementById('ws-liste').style.display = (v === 'liste') ? 'block' : 'none';
    document.getElementById('ws-training').style.display = (v === 'training') ? 'block' : 'none';
  }

  function trainMode(m) {
    document.getElementById('tr-btn-flash').classList.toggle('on', m === 'flash');
    document.getElementById('tr-btn-quiz').classList.toggle('on', m === 'quiz');
    document.getElementById('train-flash').style.display = (m === 'flash') ? 'block' : 'none';
    document.getElementById('train-quiz').style.display = (m === 'quiz') ? 'block' : 'none';
    if (m === 'quiz' && !document.getElementById('ws-quiz-body').dataset.built) {
      document.getElementById('ws-quiz-body').dataset.built = '1';
      startWsQuiz();
    }
  }

  /* ---- BOOT ---- */
  function boot() {
    const subnav = document.getElementById('subnav');
    const wrap = document.getElementById('lessonsWrap');
    if (subnav && wrap) {
      subnav.innerHTML = GROUPS.map(function (g, gi) {
        return '<button type="button" class="tab-sq' + (gi === 0 ? ' on' : '') + '" data-id="' + esc(g.id) + '">' + esc(g.label) + '</button>';
      }).join('');

      wrap.innerHTML = GROUPS.map(function (g, gi) {
        const body = g.ids.map(function (lid) {
          const lesson = LESSONS.find(function (l) { return l.id === lid; });
          if (!lesson) return '';
          const lv = VOCAB_BY_LESSON[lesson.id];
          const localVocab = (lv && lv.length) ? (
            '<details class="vocab mini-vocab">' +
              '<summary>Wichtige Wörter — ' + esc(lesson.id) + ' (' + lv.length + ')</summary>' +
              '<div class="vgrid">' + lv.map(function (v) {
                return '<div class="vrow"><span class="vde">' + esc(v[0]) + '</span><span class="vdd">' + esc(v[1]) + '</span><span class="vvi' + (viOn ? ' show' : '') + '">' + esc(v[2] || '') + '</span></div>';
              }).join('') + '</div>' +
            '</details>'
          ) : '';
          return '<div class="lesson-block" id="lesson-' + esc(lesson.id) + '">' + cardShell(lesson) + localVocab + '</div>';
        }).join('');
        return '<div class="lesson-group' + (gi === 0 ? ' on' : '') + '" id="view-' + esc(g.id) + '">' + body + '</div>';
      }).join('');

      subnav.querySelectorAll('.tab-sq').forEach(function (btn) {
        btn.addEventListener('click', function () { switchTab(btn.dataset.id); });
      });

      wrap.addEventListener('click', function (e) {
        const modeBtn = e.target.closest('.bubble[data-mode]');
        if (modeBtn) {
          setMode(modeBtn.dataset.l, modeBtn.dataset.mode);
          return;
        }
        const actBtn = e.target.closest('button[data-action]');
        if (!actBtn) return;
        const lesson = LESSONS.find(function (l) { return l.id === actBtn.dataset.l; });
        if (!lesson) return;
        const act = actBtn.dataset.action;
        if (act === 'check') {
          if (lesson.type === 'lueckentext' || lesson.type === 'vokale' || lesson.type === 'synonyme') checkGapBased(lesson);
          else if (lesson.type === 'wpn') checkWpn(lesson);
          else if (lesson.type === 'mc') checkMc(lesson);
          else if (lesson.type === 'zuordnung') checkZuordnung(lesson);
        } else if (act === 'table') {
          const tb = document.getElementById('tb-' + lesson.id);
          if (tb) tb.classList.toggle('show');
        } else if (act === 'reset') {
          resetLesson(lesson);
        }
      });

      LESSONS.forEach(renderLesson);
    }

    renderVocab();
    renderFlash();

    const mtW = document.getElementById('mt-wortschatz');
    const mtU = document.getElementById('mt-uebungen');
    const mtS = document.getElementById('mt-schnelltest');
    if (mtW) mtW.addEventListener('click', function () { switchMain('wortschatz'); });
    if (mtU) mtU.addEventListener('click', function () { switchMain('uebungen'); });
    if (mtS) mtS.addEventListener('click', function () { switchMain('schnelltest'); });

    const btnListe = document.getElementById('ws-btn-liste');
    const btnTrain = document.getElementById('ws-btn-training');
    if (btnListe) btnListe.addEventListener('click', function () { wsView('liste'); });
    if (btnTrain) btnTrain.addEventListener('click', function () { wsView('training'); });

    const btnFlash = document.getElementById('tr-btn-flash');
    const btnQuiz = document.getElementById('tr-btn-quiz');
    if (btnFlash) btnFlash.addEventListener('click', function () { trainMode('flash'); });
    if (btnQuiz) btnQuiz.addEventListener('click', function () { trainMode('quiz'); });

    const viBtn = document.getElementById('viToggle');
    if (viBtn) viBtn.addEventListener('click', toggleVI);

    const fcEl = document.getElementById('flashcardEl');
    if (fcEl) fcEl.addEventListener('click', function () { flashBack = !flashBack; renderFlash(); });

    const fcPrev = document.getElementById('fc-prev');
    const fcRand = document.getElementById('fc-rand');
    const fcNext = document.getElementById('fc-next');
    const fcSpeak = document.getElementById('fc-speak');
    if (fcPrev) fcPrev.addEventListener('click', function () {
      flashIdx = (flashIdx - 1 + ALL_VOCAB.length) % ALL_VOCAB.length; flashBack = false; renderFlash();
    });
    if (fcRand) fcRand.addEventListener('click', function () {
      flashIdx = Math.floor(Math.random() * ALL_VOCAB.length); flashBack = false; renderFlash();
    });
    if (fcNext) fcNext.addEventListener('click', function () {
      flashIdx = (flashIdx + 1) % ALL_VOCAB.length; flashBack = false; renderFlash();
    });
    if (fcSpeak) fcSpeak.addEventListener('click', function () {
      if (ALL_VOCAB[flashIdx]) speak(ALL_VOCAB[flashIdx][0]);
    });

    const fabTop = document.getElementById('fab-top');
    if (fabTop) {
      fabTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('scroll', function () {
        fabTop.classList.toggle('show', window.scrollY > 360);
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
