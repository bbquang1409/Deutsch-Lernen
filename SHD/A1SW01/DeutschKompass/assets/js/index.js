/* DeutschKompass home: 3 modes -> always offers the right next exercise */
const mods = window.DK_MODULES;
const esc = x => String(x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MODES = {
  lesen:  { ico: '📖', name: 'Lesen',  how: ['Lies den Text in Ruhe.', '10 Aufgaben – eine nach der anderen.', 'Sofort sehen: richtig oder falsch.'] },
  hoeren: { ico: '🎧', name: 'Hören',  how: ['Höre die Aufnahme so oft du willst.', '10 Aufgaben mit Tempo-Regler.', 'Fehler gleich noch einmal üben.'] },
  diktat: { ico: '✍️', name: 'Diktat', how: ['Höre jeden Satz und schreibe ihn auf.', 'Korrektur Wort für Wort.', 'Zum Schluss: der ganze Text.'] }
};
/* next exercise: first one not done yet; otherwise the weakest */
function pick(list, all) {
  return list.find(m => !all[m.id]) || list.slice().sort((a, b) => (all[a.id]?.best ?? 0) - (all[b.id]?.best ?? 0))[0];
}
function render() {
  const all = DK.store.all();
  document.getElementById('modes').innerHTML = Object.entries(MODES).map(([k, M]) => {
    const list = mods.filter(m => m.mode === k), done = list.filter(m => all[m.id]);
    const avg = done.length ? Math.round(done.reduce((s, m) => s + all[m.id].best, 0) / done.length) : null;
    const nx = pick(list, all), fresh = !all[nx.id];
    return `<a class="mode m-${k} tilt" href="${nx.url}" aria-label="${M.name} starten"><div class="ico" aria-hidden="true">${M.ico}</div><h2>${M.name}</h2>
      <ul class="how">${M.how.map(h => `<li>${h}</li>`).join('')}</ul>
      <div class="prog"><b>${done.length} / ${list.length} geschafft${avg != null ? ' · Ø ' + avg + '%' : ''}</b><div class="bar"><i style="width:${done.length / list.length * 100}%"></i></div>
      <span class="btn"><span>${fresh ? (done.length ? 'Weiter' : 'Starten') : 'Wiederholen'} →</span><small>${esc(nx.name)}</small></span></div></a>`;
  }).join('');
  document.getElementById('list').innerHTML = Object.entries(MODES).map(([k, M]) =>
    `<h3>${M.ico} ${M.name}</h3>` + mods.filter(m => m.mode === k).map(m => {
      const b = all[m.id]?.best, cls = b == null ? '' : b >= 80 ? 'done' : 'mid';
      return `<a class="row" href="${m.url}"><span>${esc(m.name)}${m.level ? `<span class="lv">${m.level}</span>` : ''}</span><span class="badge ${cls}">${b == null ? 'neu' : (b === 100 ? '⭐ ' : '') + b + '%'}</span></a>`;
    }).join('')).join('');
  DK.tiltAll(document, '.mode.tilt', 8);
}
document.getElementById('reset-all').onclick = () => { if (confirm('Gesamten Fortschritt auf diesem Gerät löschen?')) { DK.store.clear(); render(); } };
DK.tilt(document.querySelector('.hero'), 2);
if (!(DK.compass && DK.compass(document.getElementById('compass')))) document.getElementById('compass').remove();
addEventListener('pageshow', render);
render();
