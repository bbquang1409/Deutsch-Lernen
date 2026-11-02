/* DeutschKompass home: 3 modes -> always offers the right next exercise */
const mods = window.DK_MODULES;
const esc = x => String(x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MODES = {
  lesen:  { ico: '📖', name: 'Lesen',  how: ['Lies den Text in Ruhe.', 'Üben: sofort sehen, ob es stimmt.', 'Prüfungstraining mit Uhr.'] },
  hoeren: { ico: '🎧', name: 'Hören',  how: ['Höre die Aufnahme – mit Tempo-Regler.', 'Üben: sofort sehen, ob es stimmt.', 'Prüfungstraining: nur 2× hören.'] },
  diktat: { ico: '✍️', name: 'Diktat', how: ['Höre jeden Satz und schreibe ihn auf.', 'Lückendiktat: die wichtigen Wörter.', 'Tempo: schneller, nur 1× hören.'] }
};
/* next exercise: first one not done yet; otherwise the weakest */
function pick(list, all) {
  return list.find(m => !all[m.id]) || list.slice().sort((a, b) => (all[a.id]?.best ?? 0) - (all[b.id]?.best ?? 0))[0];
}
function render() {
  const all = DK.store.all();
  document.getElementById('modes').innerHTML = Object.entries(MODES).map(([k, M]) => {
    const list = mods.filter(m => m.mode === k && !m.exam), done = list.filter(m => all[m.id]);
    const avg = done.length ? Math.round(done.reduce((s, m) => s + all[m.id].best, 0) / done.length) : null;
    const nx = pick(list, all), fresh = !all[nx.id];
    return `<a class="mode tilt" href="${k}.html" aria-label="${M.name}">
      <div class="pic"><img src="assets/img/card-${k}.webp" alt="${M.name}"></div>
      <ul class="how">${M.how.map(h => `<li>${h}</li>`).join('')}</ul>
      <div class="prog"><b>${done.length} / ${list.length} geschafft${avg != null ? ' · Ø ' + avg + '%' : ''}</b><div class="bar"><i style="width:${done.length / list.length * 100}%"></i></div>
      <span class="next">${list.length} Übungen${k === 'diktat' ? ' · 3 Arten' : ' · + Prüfungstraining'} →</span></div></a>`;
  }).join('');
  DK.tiltAll(document, '.mode.tilt', 8);
}
document.getElementById('reset-all').onclick = () => { if (confirm('Gesamten Fortschritt auf diesem Gerät löschen?')) { DK.store.clear(); render(); } };
addEventListener('pageshow', render);
render();
