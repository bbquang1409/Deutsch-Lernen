/* DeutschKompass hub: one page per skill (Lesen / Hören / Diktat) – choose training type, then an exercise */
const mode = document.body.dataset.mode;
const esc = x => String(x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const NAMES = { lesen: ['📖', 'Lesen'], hoeren: ['🎧', 'Hören'], diktat: ['✍️', 'Diktat'] };
const TABS = {
  lesen: [['ueben', 'Üben', 'Eine Aufgabe nach der anderen – du siehst sofort, ob es richtig ist.'], ['pruefung', 'Prüfungstraining', 'Alle Aufgaben auf einer Seite, mit Uhr. Das Ergebnis kommt erst am Ende – wie in der Prüfung (ab 60 % bestanden).']],
  hoeren: [['ueben', 'Üben', 'Höre so oft du willst, mit Tempo-Regler. Sofort sehen: richtig oder falsch.'], ['pruefung', 'Prüfungstraining', 'Du hörst jeden Text nur 2×, ohne Tempo-Regler. Alle Aufgaben auf einer Seite, Ergebnis am Ende.']],
  diktat: [['satz', 'Satz für Satz', 'Höre jeden Satz und schreibe ihn auf. Korrektur Wort für Wort.'], ['luecke', 'Lückendiktat', 'Der Satz steht da – dir fehlen die wichtigen Wörter. Höre und fülle die Lücken.'], ['tempo', 'Tempo', 'Jeder Satz wird nur 1× gelesen und von Satz zu Satz schneller.']]
}[mode];
const mods = window.DK_MODULES.filter(m => m.mode === mode), reg = mods.filter(m => !m.exam), ex = mods.filter(m => m.exam);
const pref = () => { const p = DK.store.get('pref-' + mode); return TABS.some(t => t[0] === p) ? p : TABS[0][0]; };
let tab = pref();

function groups(t) {
  const sub = m => mode === 'diktat' ? `${m.sentences || m.count - 1} Sätze` : `${m.count} Aufgaben${m.exam ? ' · ' + (m.minutes || m.count) + ' Min.' : ''}`;
  const mk = (m, suf, kx) => ({ m, url: m.url + suf, key: m.id + kx, sub: sub(m) });
  if (mode === 'diktat') { const s = t === 'luecke' ? ['?m=luecke', '~luecke'] : t === 'tempo' ? ['?m=tempo', '~tempo'] : ['', '']; return [[null, reg.map(m => mk(m, s[0], s[1]))]]; }
  if (t === 'pruefung') return [['Prüfungen', ex.map(m => mk(m, '', ''))], ['Texte als Prüfung', reg.map(m => mk(m, '?exam=1', '~exam'))]].filter(g => g[1].length);
  return [[null, reg.map(m => mk(m, '', ''))]];
}
function render() {
  const all = DK.store.all(), gs = groups(tab), items = gs.flatMap(g => g[1]);
  const nextOne = items.find(x => !all[x.key]) || items.slice().sort((a, b) => (all[a.key]?.best ?? 0) - (all[b.key]?.best ?? 0))[0];
  const done = items.filter(x => all[x.key]).length;
  const [ico, name] = NAMES[mode];
  document.getElementById('hub').innerHTML = `
    <div class="hubhead"><a class="back" href="index.html">← Start</a><h1>${ico} ${name}</h1></div>
    <div class="seg" role="tablist">${TABS.map(t => `<button role="tab" class="${t[0] === tab ? 'on' : ''}" data-tab="${t[0]}" aria-selected="${t[0] === tab}">${t[1]}</button>`).join('')}</div>
    <p class="tabdesc">${esc(TABS.find(t => t[0] === tab)[2])}</p>
    <div class="hubacts"><a class="btn" href="${nextOne.url}">${done ? 'Weiter' : 'Start'}: ${esc(nextOne.m.name)} →</a><button class="btn ghost" id="rnd">🎲 Zufällig</button></div>
    ${gs.map(([h, list]) => `${h ? `<h2 class="gh">${h}</h2>` : ''}<div class="grid">${list.map(x => {
      const b = all[x.key]?.best, cls = b == null ? '' : b >= 80 ? 'done' : 'mid';
      return `<a class="card" href="${x.url}"><span class="nm">${esc(x.m.name)}</span><span class="sub">${x.sub}</span><span class="badge ${cls}">${b == null ? 'neu' : (b === 100 ? '⭐ ' : '') + b + '%'}</span></a>`;
    }).join('')}</div>`).join('')}`;
  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; DK.store.set('pref-' + mode, tab); render(); });
  document.getElementById('rnd').onclick = () => { const pool = items.filter(x => !all[x.key]); const l = pool.length ? pool : items; location.href = l[Math.floor(Math.random() * l.length)].url; };
}
addEventListener('pageshow', render);
render();
