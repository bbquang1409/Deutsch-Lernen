/* DeutschKompass core: storage, 3D tilt, orbs, confetti */
(function () {
  const KEY = 'dk-a1plus-v2:';
  const safe = (fn, fb) => { try { return fn(); } catch (e) { return fb; } };
  const DK = (window.DK = {});
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  DK.reduce = reduce;

  DK.store = {
    get: id => safe(() => JSON.parse(localStorage.getItem(KEY + id)), null),
    set: (id, v) => safe(() => localStorage.setItem(KEY + id, JSON.stringify(v))),
    all: () => safe(() => {
      const o = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(KEY)) o[k.slice(KEY.length)] = JSON.parse(localStorage.getItem(k));
      }
      return o;
    }, {}),
    clear: () => safe(() => Object.keys(localStorage).filter(k => k.startsWith(KEY)).forEach(k => localStorage.removeItem(k)))
  };

  /* 3D tilt with glare. Works with mouse + touch (pointer events). */
  DK.tilt = function (el, max = 9) {
    if (reduce || el.dataset.tilt) return;
    el.dataset.tilt = '1';
    let raf = 0;
    const set = (rx, ry, mx, my) => {
      el.style.setProperty('--rx', rx + 'deg'); el.style.setProperty('--ry', ry + 'deg');
      el.style.setProperty('--mx', mx + '%'); el.style.setProperty('--my', my + '%');
    };
    el.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        set(((0.5 - y) * max * 2).toFixed(2), ((x - 0.5) * max * 2).toFixed(2), (x * 100).toFixed(0), (y * 100).toFixed(0));
      });
    });
    el.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); set(0, 0, 50, 50); });
  };
  DK.tiltAll = (root = document, sel = '.tilt', max) => root.querySelectorAll(sel).forEach(e => DK.tilt(e, max));

  /* floating 3D orbs with pointer parallax */
  DK.orbs = function () {
    if (document.querySelector('.orbs')) return;
    const w = document.createElement('div');
    w.className = 'orbs'; w.setAttribute('aria-hidden', 'true');
    w.innerHTML = '<i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i><i class="grid3d"></i>';
    document.body.prepend(w);
    if (reduce) return;
    addEventListener('pointermove', e => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      w.style.setProperty('--px', x.toFixed(3)); w.style.setProperty('--py', y.toFixed(3));
    }, { passive: true });
  };

  /* confetti */
  DK.confetti = function (power = 1) {
    if (reduce) return;
    const c = document.createElement('canvas');
    c.className = 'confetti'; document.body.appendChild(c);
    const ctx = c.getContext('2d'), dpr = devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const cols = ['#e0283f', '#ffc233', '#ff6a4f', '#fff2b8', '#ffffff', '#a3122a'];
    const n = Math.round(110 * power);
    const ps = Array.from({ length: n }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .62,
      vx: (Math.random() - .5) * 15, vy: -Math.random() * 16 - 6,
      s: Math.random() * 7 + 4, r: Math.random() * 6, vr: (Math.random() - .5) * .4,
      c: cols[Math.random() * cols.length | 0]
    }));
    let t = 0;
    (function f() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach(p => {
        p.vy += .38; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vx *= .99;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.scale(1, Math.abs(Math.cos(p.r * 2)) + .15);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); ctx.restore();
      });
      if (++t < 150) requestAnimationFrame(f); else c.remove();
    })();
  };

  DK.onReady = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
})();
